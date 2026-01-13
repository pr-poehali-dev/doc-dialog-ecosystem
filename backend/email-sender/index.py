import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def handler(event: dict, context) -> dict:
    """
    Отправка email через SMTP (регистрация, восстановление пароля, уведомления)
    
    POST body:
    {
      "to": "user@example.com",
      "subject": "Тема письма",
      "template": "registration" | "password-reset" | "notification",
      "data": {
        "name": "Имя пользователя",
        "link": "https://...",
        "code": "123456"
      }
    }
    """
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        smtp_config_str = os.environ.get('SMTP_CONFIG', '{}')
        
        try:
            smtp_config = json.loads(smtp_config_str)
        except json.JSONDecodeError as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Invalid SMTP_CONFIG format: {str(e)}'})
            }
        
        if not smtp_config or not smtp_config.get('host'):
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'SMTP not configured properly'})
            }
        
        body_str = event.get('body', '{}')
        try:
            body_data = json.loads(body_str) if isinstance(body_str, str) else body_str
        except json.JSONDecodeError as e:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Invalid JSON in request body: {str(e)}'})
            }
        to_email = body_data.get('to')
        subject = body_data.get('subject')
        template = body_data.get('template')
        template_data = body_data.get('data', {})
        
        if not to_email or not subject:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing required fields: to, subject'})
            }
        
        html_body = generate_email_html(template, template_data, subject)
        
        msg = MIMEMultipart('alternative')
        msg['From'] = smtp_config['from']
        msg['To'] = to_email
        msg['Subject'] = subject
        
        html_part = MIMEText(html_body, 'html', 'utf-8')
        msg.attach(html_part)
        
        with smtplib.SMTP(smtp_config['host'], smtp_config['port']) as server:
            server.starttls()
            server.login(smtp_config['user'], smtp_config['password'])
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True, 'message': 'Email sent successfully'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }


def generate_email_html(template: str, data: dict, subject: str) -> str:
    """Генерация HTML письма по шаблону"""
    
    base_style = """
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Док диалог</h1>
        </div>
        <div style="background: #ffffff; padding: 40px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
            {content}
        </div>
        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>Это автоматическое письмо. Не отвечайте на него.</p>
            <p>© 2025 Док диалог. Все права защищены.</p>
        </div>
    </div>
    """
    
    if template == 'registration':
        name = data.get('name', 'Пользователь')
        link = data.get('link', '#')
        content = f"""
        <h2 style="color: #333; margin-top: 0;">Добро пожаловать, {name}!</h2>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Спасибо за регистрацию на платформе <strong>Док диалог</strong>!
        </p>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Чтобы завершить регистрацию, подтвердите ваш email адрес:
        </p>
        <div style="text-align: center; margin: 30px 0;">
            <a href="{link}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Подтвердить email
            </a>
        </div>
        <p style="color: #999; font-size: 14px;">
            Если кнопка не работает, скопируйте и вставьте эту ссылку в браузер:<br>
            <span style="color: #667eea;">{link}</span>
        </p>
        """
    
    elif template == 'password-reset':
        name = data.get('name', 'Пользователь')
        code = data.get('code', '000000')
        link = data.get('link', '#')
        content = f"""
        <h2 style="color: #333; margin-top: 0;">Восстановление пароля</h2>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Здравствуйте, {name}!
        </p>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Вы запросили восстановление пароля на платформе <strong>Док диалог</strong>.
        </p>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Ваш код подтверждения:
        </p>
        <div style="text-align: center; margin: 30px 0;">
            <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #667eea;">
                {code}
            </div>
        </div>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Или нажмите кнопку для сброса пароля:
        </p>
        <div style="text-align: center; margin: 30px 0;">
            <a href="{link}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Сбросить пароль
            </a>
        </div>
        <p style="color: #ff6b6b; font-size: 14px;">
            ⚠️ Код действителен в течение 1 часа. Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.
        </p>
        """
    
    elif template == 'notification':
        title = data.get('title', 'Уведомление')
        message = data.get('message', '')
        link = data.get('link', '')
        content = f"""
        <h2 style="color: #333; margin-top: 0;">{title}</h2>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
            {message}
        </p>
        """
        if link:
            content += f"""
            <div style="text-align: center; margin: 30px 0;">
                <a href="{link}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                    Перейти
                </a>
            </div>
            """
    
    else:
        content = f"""
        <h2 style="color: #333; margin-top: 0;">{subject}</h2>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
            {data.get('message', 'Спасибо за использование Док диалог!')}
        </p>
        """
    
    return base_style.format(content=content)