from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

app = Flask(__name__)
CORS(app)

# Basit veritabanı yerine kullanılacak sözlük
users_db = {}

# JWT için gizli anahtar
app.config['SECRET_KEY'] = 'gizli-anahtar'

# Kullanıcı kayıt işlemi
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"message": "Tüm alanlar zorunludur."}), 400

    if username in users_db:
        return jsonify({"message": "Kullanıcı zaten mevcut."}), 400

    hashed_password = generate_password_hash(password)
    users_db[username] = {
        "username": username,
        "email": email,
        "password": hashed_password
    }

    return jsonify({"message": "Kayıt başarılı."}), 201

# Kullanıcı giriş işlemi
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = users_db.get(username)
    if user and check_password_hash(user["password"], password):
        token = jwt.encode({
            "username": username,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, app.config["SECRET_KEY"], algorithm="HS256")

        return jsonify({"message": "Giriş başarılı", "token": token}), 200
    else:
        return jsonify({"message": "Kullanıcı adı veya şifre hatalı"}), 401

if __name__ == "__main__":
    app.run(debug=True)
