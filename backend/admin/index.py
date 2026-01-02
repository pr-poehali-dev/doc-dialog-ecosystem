import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """API для администрирования: управление пользователями, ролями и модерацией контента"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    # Check admin authorization
    auth_header = event.get('headers', {}).get('X-Authorization', '')
    if not auth_header.startswith('Bearer '):
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Unauthorized'}),
            'isBase64Encoded': False
        }
    
    token = auth_header.replace('Bearer ', '')
    
    # Connect to database
    dsn = os.environ.get('DATABASE_URL')
    schema = 't_p46047379_doc_dialog_ecosystem'
    
    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    cur = conn.cursor()
    
    # Verify admin access - find user by token or check all admins
    # For now, get any admin/moderator user (in production, decode token to get user_id)
    cur.execute(f"SELECT id, email, is_admin, is_moderator FROM {schema}.users WHERE (is_admin = TRUE OR is_moderator = TRUE) ORDER BY id LIMIT 1")
    admin_user = cur.fetchone()
    
    if not admin_user or not (admin_user[2] or admin_user[3]):  # is_admin or is_moderator
        cur.close()
        conn.close()
        return {
            'statusCode': 403,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Access denied: Admin or Moderator role required'}),
            'isBase64Encoded': False
        }
    
    admin_id = admin_user[0]
    is_admin = admin_user[2]
    
    # Get action from query parameters
    query_params = event.get('queryStringParameters', {}) or {}
    action = query_params.get('action', '')
    
    # GET /admin - Get dashboard stats
    if method == 'GET' and not action:
        cur.execute(f"""
            SELECT 
                (SELECT COUNT(*) FROM {schema}.users) as total_users,
                (SELECT COUNT(*) FROM {schema}.masseur_profiles) as total_masseurs,
                (SELECT COUNT(*) FROM {schema}.appointments) as total_appointments,
                (SELECT COUNT(*) FROM {schema}.reviews WHERE moderation_status = 'pending') as pending_reviews,
                (SELECT COUNT(*) FROM {schema}.moderation_logs WHERE status = 'pending') as pending_moderations,
                (SELECT COUNT(*) FROM {schema}.courses WHERE status = 'pending') as pending_courses,
                (SELECT COUNT(*) FROM {schema}.masterminds WHERE status = 'pending') as pending_masterminds
        """)
        stats = cur.fetchone()
        
        result = {
            'total_users': stats[0],
            'total_masseurs': stats[1],
            'total_appointments': stats[2],
            'pending_reviews': stats[3],
            'pending_moderations': stats[4],
            'pending_courses': stats[5],
            'pending_masterminds': stats[6]
        }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # GET /admin/users - List all users
    if method == 'GET' and action == 'users':
        cur.execute(f"""
            SELECT id, email, role, is_admin, is_moderator, created_at
            FROM {schema}.users
            ORDER BY created_at DESC
        """)
        users = cur.fetchall()
        
        result = [{
            'id': u[0],
            'email': u[1],
            'role': u[2],
            'is_admin': u[3],
            'is_moderator': u[4],
            'created_at': u[5].isoformat() if u[5] else None
        } for u in users]
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # GET /admin/moderation - List pending items for moderation
    if method == 'GET' and action == 'moderation':
        cur.execute(f"""
            SELECT 
                ml.id, ml.user_id, u.email, ml.action_type, ml.entity_type, 
                ml.entity_id, ml.new_data, ml.status, ml.created_at
            FROM {schema}.moderation_logs ml
            LEFT JOIN {schema}.users u ON ml.user_id = u.id
            WHERE ml.status = 'pending'
            ORDER BY ml.created_at DESC
            LIMIT 100
        """)
        logs = cur.fetchall()
        
        result = [{
            'id': log[0],
            'user_id': log[1],
            'user_email': log[2],
            'action_type': log[3],
            'entity_type': log[4],
            'entity_id': log[5],
            'new_data': log[6],
            'status': log[7],
            'created_at': log[8].isoformat() if log[8] else None
        } for log in logs]
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # PUT /admin?action=update_user - Update user roles (admin only)
    if method == 'PUT' and action == 'update_user':
        if not is_admin:
            cur.close()
            conn.close()
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Only admin can manage user roles'}),
                'isBase64Encoded': False
            }
        
        body = json.loads(event.get('body', '{}'))
        user_id = body.get('user_id')
        is_admin_new = body.get('is_admin', False)
        is_moderator_new = body.get('is_moderator', False)
        
        cur.execute(f"""
            UPDATE {schema}.users
            SET is_admin = {is_admin_new}, is_moderator = {is_moderator_new}
            WHERE id = {user_id}
            RETURNING id, email, is_admin, is_moderator
        """)
        updated_user = cur.fetchone()
        
        if not updated_user:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'User not found'}),
                'isBase64Encoded': False
            }
        
        result = {
            'id': updated_user[0],
            'email': updated_user[1],
            'is_admin': updated_user[2],
            'is_moderator': updated_user[3]
        }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # POST /admin?action=moderate - Approve moderation item
    if method == 'POST' and action == 'moderate':
        body = json.loads(event.get('body', '{}'))
        log_id = body.get('log_id')
        approve = body.get('approve', True)
        comment = body.get('comment', '')
        
        status = 'approved' if approve else 'rejected'
        
        cur.execute(f"""
            UPDATE {schema}.moderation_logs
            SET status = '{status}',
                moderator_id = {admin_id},
                moderation_comment = '{comment.replace("'", "''")}',
                moderated_at = NOW()
            WHERE id = {log_id}
            RETURNING id, status
        """)
        updated_log = cur.fetchone()
        
        if not updated_log:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Moderation log not found'}),
                'isBase64Encoded': False
            }
        
        result = {
            'id': updated_log[0],
            'status': updated_log[1]
        }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # GET /admin?action=courses - Get pending courses
    if method == 'GET' and action == 'courses':
        cur.execute(f"""
            SELECT c.id, c.school_id, s.name as school_name, c.title, c.description, 
                   c.category, c.course_type, c.price, c.currency, c.duration_hours, 
                   c.image_url, c.external_url, c.status, c.moderation_comment, c.created_at
            FROM {schema}.courses c
            LEFT JOIN {schema}.schools s ON c.school_id = s.id
            WHERE c.status = 'pending'
            ORDER BY c.created_at DESC
        """)
        courses = cur.fetchall()
        
        result = [{
            'id': c[0],
            'school_id': c[1],
            'school_name': c[2],
            'title': c[3],
            'description': c[4],
            'category': c[5],
            'course_type': c[6],
            'price': float(c[7]) if c[7] else None,
            'currency': c[8],
            'duration_hours': c[9],
            'image_url': c[10],
            'external_url': c[11],
            'status': c[12],
            'moderation_comment': c[13],
            'created_at': c[14].isoformat() if c[14] else None
        } for c in courses]
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # POST /admin?action=moderate_course - Moderate course
    if method == 'POST' and action == 'moderate_course':
        body = json.loads(event.get('body', '{}'))
        course_id = body.get('course_id')
        approve = body.get('approve', True)
        comment = body.get('comment', '')
        
        status = 'approved' if approve else 'rejected'
        
        cur.execute(f"""
            UPDATE {schema}.courses
            SET status = '{status}',
                moderation_comment = '{comment.replace("'", "''")}',
                approved_at = {'NOW()' if approve else 'NULL'},
                approved_by = {admin_id if approve else 'NULL'}
            WHERE id = {course_id}
            RETURNING id, title, status
        """)
        updated_course = cur.fetchone()
        
        if not updated_course:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Course not found'}),
                'isBase64Encoded': False
            }
        
        result = {
            'id': updated_course[0],
            'title': updated_course[1],
            'status': updated_course[2]
        }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # GET /admin?action=masterminds - Get pending masterminds
    if method == 'GET' and action == 'masterminds':
        cur.execute(f"""
            SELECT m.id, m.school_id, s.name as school_name, m.title, m.description,
                   m.event_date, m.location, m.max_participants, m.price, m.currency,
                   m.image_url, m.external_url, m.status, m.moderation_comment, m.created_at
            FROM {schema}.masterminds m
            LEFT JOIN {schema}.schools s ON m.school_id = s.id
            WHERE m.status = 'pending'
            ORDER BY m.created_at DESC
        """)
        masterminds = cur.fetchall()
        
        result = [{
            'id': m[0],
            'school_id': m[1],
            'school_name': m[2],
            'title': m[3],
            'description': m[4],
            'event_date': m[5].isoformat() if m[5] else None,
            'location': m[6],
            'max_participants': m[7],
            'price': float(m[8]) if m[8] else None,
            'currency': m[9],
            'image_url': m[10],
            'external_url': m[11],
            'status': m[12],
            'moderation_comment': m[13],
            'created_at': m[14].isoformat() if m[14] else None
        } for m in masterminds]
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # POST /admin?action=moderate_mastermind - Moderate mastermind
    if method == 'POST' and action == 'moderate_mastermind':
        body = json.loads(event.get('body', '{}'))
        mastermind_id = body.get('mastermind_id')
        approve = body.get('approve', True)
        comment = body.get('comment', '')
        
        status = 'approved' if approve else 'rejected'
        
        cur.execute(f"""
            UPDATE {schema}.masterminds
            SET status = '{status}',
                moderation_comment = '{comment.replace("'", "''")}',
                approved_at = {'NOW()' if approve else 'NULL'},
                approved_by = {admin_id if approve else 'NULL'}
            WHERE id = {mastermind_id}
            RETURNING id, title, status
        """)
        updated_mastermind = cur.fetchone()
        
        if not updated_mastermind:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Mastermind not found'}),
                'isBase64Encoded': False
            }
        
        result = {
            'id': updated_mastermind[0],
            'title': updated_mastermind[1],
            'status': updated_mastermind[2]
        }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    cur.close()
    conn.close()
    return {
        'statusCode': 404,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Endpoint not found'}),
        'isBase64Encoded': False
    }