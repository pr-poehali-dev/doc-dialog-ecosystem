import json
import os
import base64
import requests

def handler(event: dict, context) -> dict:
    """Проверка статуса платежа в ЮКассе"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    try:
        params = event.get('queryStringParameters') or {}
        payment_id = params.get('payment_id')
        
        if not payment_id:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Требуется payment_id'}),
                'isBase64Encoded': False
            }
        
        shop_id = os.environ.get('YOOMONEY_SHOP_ID')
        secret_key = os.environ.get('YOOMONEY_SECRET_KEY')
        
        if not shop_id or not secret_key:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Платёжная система не настроена'}),
                'isBase64Encoded': False
            }
        
        # Запрашиваем статус платежа у ЮКассы
        auth_string = f"{shop_id}:{secret_key}"
        auth_header = base64.b64encode(auth_string.encode()).decode()
        
        response = requests.get(
            f'https://api.yookassa.ru/v3/payments/{payment_id}',
            headers={
                'Authorization': f'Basic {auth_header}',
                'Content-Type': 'application/json'
            },
            timeout=10
        )
        
        if response.status_code != 200:
            print(f"YooKassa API error: {response.text}")
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Ошибка проверки платежа', 'details': response.text}),
                'isBase64Encoded': False
            }
        
        payment_data = response.json()
        status = payment_data.get('status')
        paid = payment_data.get('paid', False)
        amount = payment_data.get('amount', {}).get('value', '0')
        metadata = payment_data.get('metadata', {})
        
        print(f"Payment check: id={payment_id}, status={status}, paid={paid}, amount={amount}")
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'payment_id': payment_id,
                'status': status,
                'paid': paid,
                'amount': amount,
                'metadata': metadata
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
