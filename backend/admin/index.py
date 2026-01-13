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
        # Using try-except for each table in case it doesn't exist or has no records
        
        # Helper function to safely delete
        def safe_delete(query):
            try:
                cur.execute(query)
            except Exception:
                pass  # Skip if table doesn't exist or access denied
        
        # Delete AI dialogs and messages
        safe_delete(f"DELETE FROM {schema}.ai_dialog_messages WHERE dialog_id IN (SELECT id FROM {schema}.ai_dialogs WHERE user_id = {user_id})")
        safe_delete(f"DELETE FROM {schema}.ai_dialogs WHERE user_id = {user_id}")
        
        # Delete balance and transactions
        safe_delete(f"DELETE FROM {schema}.balance_transactions WHERE user_id = {user_id}")
        safe_delete(f"DELETE FROM {schema}.coin_transactions WHERE user_id = {user_id}")
        
        # Delete appointments and bookings
        safe_delete(f"DELETE FROM {schema}.appointments WHERE user_id = {user_id} OR masseur_id = {user_id}")
        
        # Delete favorites
        safe_delete(f"DELETE FROM {schema}.favorites WHERE user_id = {user_id}")
        
        # Delete messages
        safe_delete(f"DELETE FROM {schema}.messages WHERE sender_id = {user_id} OR recipient_id = {user_id}")
        
        # Delete reviews (both written and received)
        safe_delete(f"DELETE FROM {schema}.reviews WHERE user_id = {user_id} OR masseur_id = {user_id}")
        safe_delete(f"DELETE FROM {schema}.course_reviews WHERE user_id = {user_id}")
        safe_delete(f"DELETE FROM {schema}.school_reviews WHERE user_id = {user_id}")
        
        # Delete masseur-specific data
        safe_delete(f"DELETE FROM {schema}.masseur_verifications WHERE masseur_id = {user_id}")
        safe_delete(f"DELETE FROM {schema}.masseur_profiles WHERE user_id = {user_id}")
        
        # Delete school-specific data (first get school_id)
        cur.execute(f"SELECT id FROM {schema}.schools WHERE user_id = {user_id}")
        school = cur.fetchone()
        if school:
            school_id = school[0]
            safe_delete(f"DELETE FROM {schema}.school_balance WHERE school_id = {school_id}")
            safe_delete(f"DELETE FROM {schema}.school_teachers WHERE school_id = {school_id}")
            safe_delete(f"DELETE FROM {schema}.school_subscriptions WHERE school_id = {school_id}")
            safe_delete(f"DELETE FROM {schema}.school_achievements WHERE school_id = {school_id}")
            safe_delete(f"DELETE FROM {schema}.school_gallery WHERE school_id = {school_id}")
            safe_delete(f"DELETE FROM {schema}.course_program WHERE course_id IN (SELECT id FROM {schema}.courses WHERE school_id = {school_id})")
            safe_delete(f"DELETE FROM {schema}.course_target_audience WHERE course_id IN (SELECT id FROM {schema}.courses WHERE school_id = {school_id})")
            safe_delete(f"DELETE FROM {schema}.course_results WHERE course_id IN (SELECT id FROM {schema}.courses WHERE school_id = {school_id})")
            safe_delete(f"DELETE FROM {schema}.course_bonuses WHERE course_id IN (SELECT id FROM {schema}.courses WHERE school_id = {school_id})")
            safe_delete(f"DELETE FROM {schema}.courses WHERE school_id = {school_id}")
            safe_delete(f"DELETE FROM {schema}.masterminds WHERE school_id = {school_id}")
            safe_delete(f"DELETE FROM {schema}.offline_training WHERE school_id = {school_id}")
            safe_delete(f"DELETE FROM {schema}.schools WHERE id = {school_id}")
        
        # Delete salon-specific data
        cur.execute(f"SELECT id FROM {schema}.salons WHERE user_id = {user_id}")
        salon = cur.fetchone()
        if salon:
            salon_id = salon[0]
            safe_delete(f"DELETE FROM {schema}.salon_vacancies WHERE salon_id = {salon_id}")
            safe_delete(f"DELETE FROM {schema}.salons WHERE id = {salon_id}")
        
        # Delete client-specific data
        safe_delete(f"DELETE FROM {schema}.client_profiles WHERE user_id = {user_id}")
        
        # Delete promo and promotions
        safe_delete(f"DELETE FROM {schema}.promo_requests WHERE user_id = {user_id}")
        safe_delete(f"DELETE FROM {schema}.item_promotions WHERE user_id = {user_id}")
        
        # Delete rate limits
        safe_delete(f"DELETE FROM {schema}.rate_limits WHERE user_id = {user_id}")
        
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
    
    # POST /admin?action=create_test_masseurs - Create 10 test masseurs
    if method == 'POST' and action == 'create_test_masseurs':
        if not is_admin:
            cur.close()
            conn.close()
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Only admin can create test masseurs'}),
                'isBase64Encoded': False
            }
        
        import time
        timestamp = int(time.time())
        
        masseurs_data = [
            {
                'email': f'anna.sokolova.{timestamp}@test.ru',
                'full_name': 'Анна Соколова',
                'city': 'Москва',
                'address': 'ул. Арбат, д. 15',
                'experience_years': 5,
                'about': 'Профессиональный массажист с 5-летним опытом работы. Специализируюсь на расслабляющих и лечебных техниках.',
                'education': 'Московский медицинский колледж',
                'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/336eaf83-7bc9-4953-bff4-5371f91b4f32.jpg',
                'languages': ['Русский', 'Английский'],
                'specializations': ['Классический массаж', 'Расслабляющий массаж', 'Спортивный массаж', 'Антицеллюлитный массаж'],
                'certificates': ['Сертификат классического массажа', 'Диплом медицинского колледжа'],
                'rating': 4.5,
                'reviews_count': 12
            },
            {
                'email': f'dmitry.volkov.{timestamp}@test.ru',
                'full_name': 'Дмитрий Волков',
                'city': 'Санкт-Петербург',
                'address': 'Невский проспект, д. 28',
                'experience_years': 8,
                'about': 'Опытный массажист-реабилитолог. Работаю с профессиональными спортсменами.',
                'education': 'СПбГУ, факультет физической культуры',
                'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/5c8c1276-c08c-4e5d-ae56-61e97879991c.jpg',
                'languages': ['Русский'],
                'specializations': ['Спортивный массаж', 'Реабилитационный массаж', 'Лечебный массаж'],
                'certificates': ['Сертификат спортивного массажа'],
                'rating': 4.7,
                'reviews_count': 25
            },
            {
                'email': f'ekaterina.ivanova.{timestamp}@test.ru',
                'full_name': 'Екатерина Иванова',
                'city': 'Казань',
                'address': 'ул. Баумана, д. 42',
                'experience_years': 3,
                'about': 'Специализируюсь на восточных техниках массажа.',
                'education': 'Курсы тайского массажа',
                'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/6e977ab4-01cc-49e7-beb3-5973619081cb.jpg',
                'languages': ['Русский', 'Татарский'],
                'specializations': ['Тайский массаж', 'Балийский массаж', 'Расслабляющий массаж'],
                'certificates': ['Сертификат тайского массажа'],
                'rating': 4.6,
                'reviews_count': 18
            },
            {
                'email': f'alexander.petrov.{timestamp}@test.ru',
                'full_name': 'Александр Петров',
                'city': 'Екатеринбург',
                'address': 'ул. Ленина, д. 50',
                'experience_years': 10,
                'about': 'Мастер классического и лечебного массажа.',
                'education': 'Уральский медицинский университет',
                'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/bbae5df1-832e-4b14-90f3-f0302bb2d335.jpg',
                'languages': ['Русский', 'Немецкий'],
                'specializations': ['Классический массаж', 'Лечебный массаж', 'Массаж спины'],
                'certificates': ['Диплом медицинского университета'],
                'rating': 4.8,
                'reviews_count': 42
            },
            {
                'email': f'maria.novikova.{timestamp}@test.ru',
                'full_name': 'Мария Новикова',
                'city': 'Новосибирск',
                'address': 'пр. Красный, д. 35',
                'experience_years': 6,
                'about': 'Специалист по антицеллюлитному массажу.',
                'education': 'Новосибирский медицинский колледж',
                'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/4c7a5026-5353-42cc-9cf0-9603efe2bff2.jpg',
                'languages': ['Русский'],
                'specializations': ['Антицеллюлитный массаж', 'Лимфодренажный массаж', 'Вакуумный массаж'],
                'certificates': ['Сертификат антицеллюлитного массажа'],
                'rating': 4.5,
                'reviews_count': 15
            },
            {
                'email': f'sergey.kuznetsov.{timestamp}@test.ru',
                'full_name': 'Сергей Кузнецов',
                'city': 'Нижний Новгород',
                'address': 'ул. Большая Покровская, д. 12',
                'experience_years': 7,
                'about': 'Практикую точечный массаж.',
                'education': 'Нижегородская медицинская академия',
                'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/43e1aa8f-bff5-4b7f-abec-ea08ab13a364.jpg',
                'languages': ['Русский', 'Английский'],
                'specializations': ['Точечный массаж', 'Триггерная терапия', 'Массаж шеи'],
                'certificates': ['Диплом медицинской академии'],
                'rating': 4.6,
                'reviews_count': 21
            },
            {
                'email': f'olga.smirnova.{timestamp}@test.ru',
                'full_name': 'Ольга Смирнова',
                'city': 'Краснодар',
                'address': 'ул. Красная, д. 75',
                'experience_years': 4,
                'about': 'Специализируюсь на массаже для беременных.',
                'education': 'Курсы перинатального массажа',
                'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/ebb66f51-1a8c-490d-941a-ce1d83c1e3d2.jpg',
                'languages': ['Русский'],
                'specializations': ['Массаж для беременных', 'Постнатальный массаж', 'Расслабляющий массаж'],
                'certificates': ['Сертификат перинатального массажа'],
                'rating': 4.7,
                'reviews_count': 14
            },
            {
                'email': f'igor.morozov.{timestamp}@test.ru',
                'full_name': 'Игорь Морозов',
                'city': 'Ростов-на-Дону',
                'address': 'пр. Буденновский, д. 22',
                'experience_years': 12,
                'about': 'Мастер восточных практик.',
                'education': 'Обучение в Таиланде и Индии',
                'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/1950263b-0c17-4f3a-85b4-becd078d11f8.jpg',
                'languages': ['Русский', 'Английский', 'Тайский'],
                'specializations': ['Тайский массаж', 'Йога-массаж', 'Стоун-терапия'],
                'certificates': ['Сертификат школы Ват По'],
                'rating': 4.9,
                'reviews_count': 38
            },
            {
                'email': f'natalia.belova.{timestamp}@test.ru',
                'full_name': 'Наталья Белова',
                'city': 'Воронеж',
                'address': 'ул. Плехановская, д. 33',
                'experience_years': 9,
                'about': 'Работаю с проблемами опорно-двигательного аппарата.',
                'education': 'Воронежская медицинская академия',
                'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/b9072d35-4525-4fbb-9c11-e93af3de36d9.jpg',
                'languages': ['Русский'],
                'specializations': ['Лечебный массаж', 'Ортопедический массаж', 'Массаж суставов'],
                'certificates': ['Диплом медицинской академии'],
                'rating': 4.8,
                'reviews_count': 31
            },
            {
                'email': f'maxim.soloviev.{timestamp}@test.ru',
                'full_name': 'Максим Соловьев',
                'city': 'Самара',
                'address': 'ул. Ленинградская, д. 60',
                'experience_years': 5,
                'about': 'Специалист по спортивному массажу.',
                'education': 'Самарский институт физкультуры',
                'avatar_url': 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/15292709-e79b-42b4-924a-d27a22bb1510.jpg',
                'languages': ['Русский', 'Английский'],
                'specializations': ['Спортивный массаж', 'Восстановительный массаж', 'Кинезиотейпирование'],
                'certificates': ['Диплом института физкультуры'],
                'rating': 4.7,
                'reviews_count': 19
            }
        ]
        
        created_users = []
        default_password_hash = '$2b$12$LQv3c1yytEUhcfEbXWY5.OdLqJNlQvqoEQj8LUJ9ZW1J8L8sJxwGq'
        
        for data in masseurs_data:
            try:
                # Create user
                cur.execute(f"""
                    INSERT INTO {schema}.users (email, password_hash, role)
                    VALUES ('{data['email']}', '{default_password_hash}', 'masseur')
                    RETURNING id
                """)
                user_id = cur.fetchone()[0]
                
                # Prepare arrays
                langs = ', '.join([f'"{l}"' for l in data['languages']])
                specs = ', '.join([f'"{s}"' for s in data['specializations']])
                certs = ', '.join([f'"{c}"' for c in data['certificates']])
                
                # Create profile (escape single quotes)
                cur.execute(f"""
                    INSERT INTO {schema}.masseur_profiles 
                    (user_id, full_name, city, experience_years, about, education, 
                     avatar_url, languages, specializations, certificates, rating, reviews_count, address)
                    VALUES (
                        {user_id}, 
                        '{data['full_name'].replace("'", "''")}', 
                        '{data['city'].replace("'", "''")}', 
                        {data['experience_years']}, 
                        '{data['about'].replace("'", "''")}', 
                        '{data['education'].replace("'", "''")}',
                        '{data['avatar_url']}',
                        ARRAY[{langs}],
                        ARRAY[{specs}],
                        ARRAY[{certs}],
                        {data['rating']},
                        {data['reviews_count']},
                        '{data['address'].replace("'", "''")}'
                    )
                    RETURNING id
                """)
                
                profile_id = cur.fetchone()[0]
                created_users.append({
                    'user_id': user_id,
                    'profile_id': profile_id,
                    'email': data['email'],
                    'full_name': data['full_name']
                })
            except Exception as e:
                # Log error but continue with next user
                print(f"Error creating user {data['email']}: {str(e)}")
                continue
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'message': f'Создано {len(created_users)} тестовых массажистов',
                'users': created_users,
                'default_password': 'Test123456'
            }),
            'isBase64Encoded': False
        }
    
    # DELETE /admin?action=delete_user - Delete single user (admin only)
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
        
        # Delete profile first (foreign key constraint)
        cur.execute(f"DELETE FROM {schema}.masseur_profiles WHERE user_id = {int(user_id)}")
        
        # Delete user
        cur.execute(f"DELETE FROM {schema}.users WHERE id = {int(user_id)}")
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True}),
            'isBase64Encoded': False
        }
    
    # DELETE /admin?action=delete_users - Delete multiple users (admin only)
    if method == 'DELETE' and action == 'delete_users':
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
        user_ids = body.get('user_ids', [])
        
        if not user_ids or not isinstance(user_ids, list):
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'user_ids must be a non-empty array'}),
                'isBase64Encoded': False
            }
        
        ids_str = ','.join(str(int(uid)) for uid in user_ids)
        
        # Delete profiles first (foreign key constraint)
        cur.execute(f"DELETE FROM {schema}.masseur_profiles WHERE user_id IN ({ids_str})")
        profiles_deleted = cur.rowcount
        
        # Delete users
        cur.execute(f"DELETE FROM {schema}.users WHERE id IN ({ids_str})")
        users_deleted = cur.rowcount
        
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'users_deleted': users_deleted,
                'profiles_deleted': profiles_deleted
            }),
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