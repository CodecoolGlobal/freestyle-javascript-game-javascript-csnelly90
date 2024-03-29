from psycopg2.extras import RealDictCursor
import database_common

# Sign up and login functions


@database_common.connection_handler
def add_new_user(cursor: RealDictCursor, email, password, username):
    query = f"""
            INSERT INTO users (email, password, username)
            VALUES('{email}', '{password}', '{username}');
            """
    cursor.execute(query)


@database_common.connection_handler
def get_user_id_by_email(cursor: RealDictCursor, email):
    query = """SELECT id FROM users WHERE email = %(email)s"""
    value = {"email": email}
    cursor.execute(query, value)
    return cursor.fetchall()[0].get("id")


@database_common.connection_handler
def get_username_by_email(cursor: RealDictCursor, email):
    query = """SELECT username FROM users WHERE email = %(email)s"""
    value = {"email": email}
    cursor.execute(query, value)
    return cursor.fetchall()[0].get("username")


@database_common.connection_handler
def get_all_users(cursor: RealDictCursor):
    cursor.execute("""SELECT * FROM users ORDER BY email""")
    return cursor.fetchall()


@database_common.connection_handler
def get_all_emails(cursor: RealDictCursor):
    # used to check whether an account with that email exists in the database
    cursor.execute("""SELECT email FROM users ORDER BY email""")
    email_dicts = cursor.fetchall()
    emails = []
    for elem in email_dicts:
        for value in elem.values():
            emails.append(value)
    return emails


@database_common.connection_handler
def get_hashed_password(cursor: RealDictCursor, email):
    # used to check whether the password belongs to the user
    query = """SELECT password FROM users WHERE email = %(email)s"""
    value = {'email': email}
    cursor.execute(query, value)
    result = cursor.fetchone()
    if result is not None:
        return result["password"]
    else:
        return "not_found"


# Scores


@database_common.connection_handler
def save_user_score(cursor: RealDictCursor, score, user_id):
    query = f"""
            INSERT INTO scores (score, user_id) 
            VALUES ('{score}', '{user_id}')
            RETURNING score;
            """
    cursor.execute(query)


@database_common.connection_handler
def get_best_user_scores(cursor: RealDictCursor):
    cursor.execute("""SELECT users.username, scores.score FROM scores 
        JOIN users ON scores.user_id = users.id
        ORDER BY score DESC LIMIT 6""")
    score_dicts = cursor.fetchall()
    scores = []
    for elem in score_dicts:
        for value in elem.values():
            scores.append(value)
    result = []
    for i in range(len(scores) - 1):
        if i % 2 != 0:
            result.append((scores[i + 1], scores[i]))
    return result


@database_common.connection_handler
def get_max_user_score(cursor: RealDictCursor, name):
    query = """SELECT MAX(scores.score) FROM scores 
        JOIN users ON scores.user_id = users.id
        WHERE username = %(name)s"""
    value = {"name": name}
    cursor.execute(query, value)
    return cursor.fetchone().get("max")
