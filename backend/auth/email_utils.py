import json
import urllib.request
import urllib.error

EMAIL_SENDER_URL = 'https://functions.poehali.dev/21920113-c479-4edd-9a41-cf0b8a08f47c'

def send_email(to: str, subject: str, template: str, data: dict) -> bool:
    """
    Отправка email через email-sender функцию
    
    Args:
        to: Email получателя
        subject: Тема письма
        template: Шаблон ('registration', 'password-reset', 'notification')
        data: Данные для шаблона
    
    Returns:
        True если письмо отправлено успешно, False в противном случае
    """
    try:
        payload = json.dumps({
            'to': to,
            'subject': subject,
            'template': template,
            'data': data
        }).encode('utf-8')
        
        req = urllib.request.Request(
            EMAIL_SENDER_URL,
            data=payload,
            headers={'Content-Type': 'application/json'},
            method='POST'
        )
        
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode('utf-8'))
            return result.get('success', False)
            
    except urllib.error.URLError as e:
        print(f"Email sending failed: {str(e)}")
        return False
    except Exception as e:
        print(f"Email sending error: {str(e)}")
        return False


def send_registration_email(to: str, name: str, verification_link: str) -> bool:
    """Отправка письма подтверждения регистрации"""
    return send_email(
        to=to,
        subject='Подтверждение регистрации в Док диалог',
        template='registration',
        data={
            'name': name,
            'link': verification_link
        }
    )


def send_password_reset_email(to: str, name: str, reset_code: str, reset_link: str) -> bool:
    """Отправка письма восстановления пароля"""
    return send_email(
        to=to,
        subject='Восстановление пароля в Док диалог',
        template='password-reset',
        data={
            'name': name,
            'code': reset_code,
            'link': reset_link
        }
    )


def send_notification_email(to: str, title: str, message: str, link: str = '') -> bool:
    """Отправка уведомления"""
    return send_email(
        to=to,
        subject=title,
        template='notification',
        data={
            'title': title,
            'message': message,
            'link': link
        }
    )
