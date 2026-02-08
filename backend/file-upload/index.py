import json
import os
import boto3
import base64
import uuid
from datetime import datetime

def handler(event: dict, context) -> dict:
    """Загрузка файлов в S3 хранилище"""
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'})
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        # Получаем base64 изображение
        image_base64 = body.get('image')
        file_name = body.get('fileName', f'{uuid.uuid4()}.jpg')
        
        if not image_base64:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Изображение не предоставлено'})
            }
        
        # Декодируем base64
        if ',' in image_base64:
            image_base64 = image_base64.split(',')[1]
        
        image_data = base64.b64decode(image_base64)
        
        # Подключаемся к S3
        s3 = boto3.client(
            's3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
        )
        
        # Генерируем уникальное имя файла
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        unique_filename = f'avatars/{timestamp}_{file_name}'
        
        # Загружаем файл
        s3.put_object(
            Bucket='files',
            Key=unique_filename,
            Body=image_data,
            ContentType='image/jpeg',
            ACL='public-read'
        )
        
        # Формируем CDN URL (bucket name is 'files', not part of the path)
        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{unique_filename}"
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'url': cdn_url})
        }
        
    except Exception as e:
        print(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка загрузки: {str(e)}'})
        }