from flask import jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from models.user_model import users_db
from utils.jwt_helper import generate_token

def login_user(data):
    username = data.get("username")
    password = data.get("password")

    user = users_db.get(username)
    if user and check_password_hash(user["password"], password):
        token = generate_token({"username": username})
        return jsonify({"message": "Giriş başarılı", "token": token}), 200
    else:
        return jsonify({"message": "Kullanıcı adı veya şifre hatalı"}), 401


def register_user(data):
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if username in users_db:
        return jsonify({"message": "Kullanıcı zaten mevcut"}), 400

    hashed_password = generate_password_hash(password)
    users_db[username] = {
        "username": username,
        "email": email,
        "password": hashed_password
    }

    return jsonify({"message": "Kayıt başarılı."}), 201
