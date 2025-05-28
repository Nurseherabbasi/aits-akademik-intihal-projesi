from flask import Blueprint, request, jsonify
from controllers.auth_controller import login_user, register_user

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    result, status = login_user(data)
    return jsonify(result), status

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    result, status = register_user(data)
    return jsonify(result), status
