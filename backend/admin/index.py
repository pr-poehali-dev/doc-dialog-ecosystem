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
                (SELECT COUNT(*) FROM {schema}.masterminds WHERE status = 'pending') as pending_masterminds,
                (SELECT COUNT(*) FROM {schema}.offline_training WHERE status = 'pending') as pending_offline_trainings
        """)
        stats = cur.fetchone()
        
        result = {
            'total_users': stats[0],
            'total_masseurs': stats[1],
            'total_appointments': stats[2],
            'pending_reviews': stats[3],
            'pending_moderations': stats[4],
            'pending_courses': stats[5],
            'pending_masterminds': stats[6],
            'pending_offline_trainings': stats[7]
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
    
    # DELETE /admin?action=delete_user - Delete user (admin only)
    if method == 'DELETE' and action == 'delete_user':
        if not is_admin:
            cur.close()
            conn.close()
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Only admin can delete users'}),
                'isBase64Encoded': False
            }
        
        body = json.loads(event.get('body', '{}'))
        user_id = body.get('user_id')
        
        if not user_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'user_id is required'}),
                'isBase64Encoded': False
            }
        
        # Get user email before deletion
        cur.execute(f"SELECT email FROM {schema}.users WHERE id = {user_id}")
        user = cur.fetchone()
        
        if not user:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'User not found'}),
                'isBase64Encoded': False
            }
        
        user_email = user[0]
        
        # Delete all related data first (in correct order to avoid foreign key violations)
        # Note: Order matters! Delete child records before parent records
        
        # Delete AI dialogs and messages
        cur.execute(f"DELETE FROM {schema}.ai_dialog_messages WHERE dialog_id IN (SELECT id FROM {schema}.ai_dialogs WHERE user_id = {user_id})")
        cur.execute(f"DELETE FROM {schema}.ai_dialogs WHERE user_id = {user_id}")
        
        # Delete balance and transactions
        cur.execute(f"DELETE FROM {schema}.balance_transactions WHERE user_id = {user_id}")
        cur.execute(f"DELETE FROM {schema}.coin_transactions WHERE user_id = {user_id}")
        
        # Delete appointments and bookings
        cur.execute(f"DELETE FROM {schema}.appointments WHERE user_id = {user_id} OR masseur_id = {user_id}")
        
        # Delete favorites
        cur.execute(f"DELETE FROM {schema}.favorites WHERE user_id = {user_id}")
        
        # Delete messages
        cur.execute(f"DELETE FROM {schema}.messages WHERE sender_id = {user_id} OR recipient_id = {user_id}")
        
        # Delete reviews (both written and received)
        cur.execute(f"DELETE FROM {schema}.reviews WHERE user_id = {user_id} OR masseur_id = {user_id}")
        cur.execute(f"DELETE FROM {schema}.course_reviews WHERE user_id = {user_id}")
        cur.execute(f"DELETE FROM {schema}.school_reviews WHERE user_id = {user_id}")
        
        # Delete masseur-specific data
        cur.execute(f"DELETE FROM {schema}.masseur_verifications WHERE masseur_id = {user_id}")
        cur.execute(f"DELETE FROM {schema}.masseur_profiles WHERE user_id = {user_id}")
        
        # Delete school-specific data
        cur.execute(f"DELETE FROM {schema}.school_balance WHERE school_id = (SELECT id FROM {schema}.schools WHERE user_id = {user_id})")
        cur.execute(f"DELETE FROM {schema}.school_teachers WHERE school_id = (SELECT id FROM {schema}.schools WHERE user_id = {user_id})")
        cur.execute(f"DELETE FROM {schema}.school_subscriptions WHERE school_id = (SELECT id FROM {schema}.schools WHERE user_id = {user_id})")
        cur.execute(f"DELETE FROM {schema}.courses WHERE school_id = (SELECT id FROM {schema}.schools WHERE user_id = {user_id})")
        cur.execute(f"DELETE FROM {schema}.masterminds WHERE school_id = (SELECT id FROM {schema}.schools WHERE user_id = {user_id})")
        cur.execute(f"DELETE FROM {schema}.offline_training WHERE school_id = (SELECT id FROM {schema}.schools WHERE user_id = {user_id})")
        cur.execute(f"DELETE FROM {schema}.schools WHERE user_id = {user_id}")
        
        # Delete salon-specific data
        cur.execute(f"DELETE FROM {schema}.salon_vacancies WHERE salon_id = (SELECT id FROM {schema}.salons WHERE user_id = {user_id})")
        cur.execute(f"DELETE FROM {schema}.salons WHERE user_id = {user_id}")
        
        # Delete client-specific data
        cur.execute(f"DELETE FROM {schema}.client_profiles WHERE user_id = {user_id}")
        
        # Delete promo and promotions
        cur.execute(f"DELETE FROM {schema}.promo_requests WHERE user_id = {user_id}")
        cur.execute(f"DELETE FROM {schema}.item_promotions WHERE user_id = {user_id}")
        
        # Delete rate limits
        cur.execute(f"DELETE FROM {schema}.rate_limits WHERE user_id = {user_id}")
        
        # Finally delete the user
        cur.execute(f"DELETE FROM {schema}.users WHERE id = {user_id}")
        
        result = {
            'success': True,
            'deleted_user_id': user_id,
            'deleted_user_email': user_email
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
    
    # POST /admin?action=moderate_offline_training - Moderate offline training
    if method == 'POST' and action == 'moderate_offline_training':
        body = json.loads(event.get('body', '{}'))
        training_id = body.get('training_id')
        approve = body.get('approve', True)
        comment = body.get('comment', '')
        
        status = 'approved' if approve else 'rejected'
        
        cur.execute(f"""
            UPDATE {schema}.offline_training
            SET status = '{status}',
                moderation_comment = '{comment.replace("'", "''")}'
            WHERE id = {training_id}
            RETURNING id, title, status
        """)
        updated_training = cur.fetchone()
        
        if not updated_training:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Offline training not found'}),
                'isBase64Encoded': False
            }
        
        result = {
            'id': updated_training[0],
            'title': updated_training[1],
            'status': updated_training[2]
        }
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
    
    # GET /admin?action=all_courses - Получить все курсы со школами
    if method == 'GET' and action == 'all_courses':
        cur.execute(f"""
            SELECT c.id, c.title, c.school_id, s.name as school_name, u.email as school_email,
                   c.status, c.created_at, c.view_count, c.category
            FROM {schema}.courses c
            LEFT JOIN {schema}.schools s ON c.school_id = s.id
            LEFT JOIN {schema}.users u ON s.user_id = u.id
            ORDER BY c.created_at DESC
        """)
        
        courses = []
        for row in cur.fetchall():
            courses.append({
                'id': row[0],
                'title': row[1],
                'school_id': row[2],
                'school_name': row[3],
                'school_email': row[4],
                'status': row[5],
                'created_at': row[6].isoformat() if row[6] else None,
                'view_count': row[7] or 0,
                'category': row[8]
            })
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(courses),
            'isBase64Encoded': False
        }
    
    # DELETE /admin?action=delete_course&id=X - Удалить курс
    if method == 'DELETE' and action == 'delete_course':
        course_id = query_params.get('id')
        
        if not course_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Course ID required'}),
                'isBase64Encoded': False
            }
        
        cur.execute(f"DELETE FROM {schema}.courses WHERE id = {course_id}")
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': 'Course deleted successfully'}),
            'isBase64Encoded': False
        }
    
    # DELETE /admin?action=delete_all_masterminds - Удалить все мастермайнды
    if method == 'DELETE' and action == 'delete_all_masterminds':
        cur.execute(f"DELETE FROM {schema}.masterminds")
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': 'All masterminds deleted successfully'}),
            'isBase64Encoded': False
        }
    
    # DELETE /admin?action=delete_all_offline_training - Удалить все очные обучения
    if method == 'DELETE' and action == 'delete_all_offline_training':
        cur.execute(f"DELETE FROM {schema}.offline_training")
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': 'All offline trainings deleted successfully'}),
            'isBase64Encoded': False
        }
    
    # DELETE /admin?action=delete_school&id=X - Удалить школу
    if method == 'DELETE' and action == 'delete_school':
        school_id = query_params.get('id')
        
        if not school_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'School ID required'}),
                'isBase64Encoded': False
            }
        
        cur.execute(f"DELETE FROM {schema}.schools WHERE id = {school_id}")
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': 'School deleted successfully'}),
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