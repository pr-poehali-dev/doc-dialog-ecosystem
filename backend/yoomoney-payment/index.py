import json
import os
import uuid
from typing import Any

def handler(event: dict, context: Any) -> dict:
    """Создание платежа через ЮMoney для оплаты курсов"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    shop_id = os.environ.get('YOOMONEY_SHOP_ID')
    secret_key = os.environ.get('YOOMONEY_SECRET_KEY')
    
    if not shop_id or not secret_key:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Payment configuration missing'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        amount = body.get('amount')
        course_title = body.get('courseTitle', 'Курс')
        email = body.get('email', '')
        
        if not amount:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Amount is required'}),
                'isBase64Encoded': False
            }
        
        # Генерируем уникальный ID платежа
        payment_id = str(uuid.uuid4())
        
        # Формируем URL для оплаты ЮMoney
        payment_url = f"https://yoomoney.ru/quickpay/confirm.xml?receiver={shop_id}&quickpay-form=shop&targets={course_title}&paymentType=SB&sum={amount}&label={payment_id}"
        
        if email:
            payment_url += f"&cps_email={email}"
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'paymentUrl': payment_url,
                'paymentId': payment_id,
                'amount': amount
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
