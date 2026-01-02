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
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': ''
        }
    
    # Check admin authorization
    auth_header = event.get('headers', {}).get('X-Authorization', '')
    if not auth_header.startswith('Bearer '):
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Unauthorized'})
        }
    
    token = auth_header.replace('Bearer ', '')
    
    # Connect to database
    dsn = os.environ.get('DATABASE_URL')
    schema = 't_p46047379_doc_dialog_ecosystem'
    
    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    cur = conn.cursor()
    
    # Verify admin access
    cur.execute(f"SELECT id, email, is_admin, is_moderator FROM {schema}.users WHERE id = 1")
    admin_user = cur.fetchone()
    
    if not admin_user or not (admin_user[2] or admin_user[3]):  # is_admin or is_moderator
        cur.close()
        conn.close()
        return {
            'statusCode': 403,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Access denied: Admin or Moderator role required'})
        }
    
    admin_id = admin_user[0]
    is_admin = admin_user[2]
    
    path_params = event.get('pathParams', {})
    action = path_params.get('action', '')
    
    # GET /admin - Get dashboard stats
    if method == 'GET' and not action:
        cur.execute(f"""
            SELECT 
                (SELECT COUNT(*) FROM {schema}.users) as total_users,
                (SELECT COUNT(*) FROM {schema}.masseur_profiles) as total_masseurs,
                (SELECT COUNT(*) FROM {schema}.appointments) as total_appointments,
                (SELECT COUNT(*) FROM {schema}.reviews WHERE moderation_status = 'pending') as pending_reviews,
                (SELECT COUNT(*) FROM {schema}.moderation_logs WHERE status = 'pending') as pending_moderations
        """)
        stats = cur.fetchone()
        
        result = {
            'total_users': stats[0],
            'total_masseurs': stats[1],
            'total_appointments': stats[2],
            'pending_reviews': stats[3],
            'pending_moderations': stats[4]
        }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result)
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
            'body': json.dumps(result)
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
            'body': json.dumps(result)
        }
    
    # PUT /admin/users/:id/role - Update user roles (admin only)
    if method == 'PUT' and action == 'users':
        if not is_admin:
            cur.close()
            conn.close()
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Only admin can manage user roles'})
            }
        
        user_id = path_params.get('id')
        body = json.loads(event.get('body', '{}'))
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
                'body': json.dumps({'error': 'User not found'})
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
            'body': json.dumps(result)
        }
    
    # POST /admin/moderation/:id/approve - Approve moderation item
    if method == 'POST' and action == 'moderation':
        log_id = path_params.get('id')
        body = json.loads(event.get('body', '{}'))
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
                'body': json.dumps({'error': 'Moderation log not found'})
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
            'body': json.dumps(result)
        }
    
    cur.close()
    conn.close()
    return {
        'statusCode': 404,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Endpoint not found'})
    }
