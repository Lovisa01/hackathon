from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from models import db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

db.init_app(app)

bcrypt = Bcrypt(app)


## ROUTES ##

@app.route('/users', methods=['GET', 'POST'])
@cross_origin()
def users():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify([u.serialize() for u in users])
    elif request.method == 'POST':
        user = User(name=request.json['name'], passwordHash=bcrypt.generate_password_hash(request.json['password']).decode('utf-8'))
        db.session.add(user)
        db.session.commit()
        return jsonify(user.serialize())

@app.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@cross_origin()
def user(id):
    if request.method == 'GET':
        user = User.query.get(id)
        return jsonify(user.serialize())
    elif request.method == 'PUT':
        user = User.query.get(id)
        user.name = request.json['name']
        user.passwordHash = bcrypt.generate_password_hash(request.json['password']).decode('utf-8')
        db.session.commit()
        return jsonify(user.serialize())
    elif request.method == 'DELETE':
        user = User.query.get(id)
        db.session.delete(user)
        db.session.commit()
        return jsonify(user.serialize())

@app.route('/users/<int:id>/win', methods=['PUT'])
@cross_origin()
def Win(id):
    if request.method == 'PUT':
        user = User.query.get(id)
        user.gamesWon += 1
        user.totalGames += 1 
        db.session.commit()
        return jsonify(user.serialize())

 
@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    if request.method == 'POST':
        user = User.query.filter_by(name=request.json['name']).first()
        if user and bcrypt.check_password_hash(user.passwordHash, request.json['password']):
            return jsonify(user.serialize())
        else:
            return jsonify(error='Invalid username or password'), 401

@app.route('/signup', methods=['POST'])
@cross_origin()
def signup():
    if request.method == 'POST':
        user = User.query.filter_by(name=request.json['name']).first()
        if user:
            return jsonify(error='Username already exists'), 409
        else:
            user = User(name=request.json['name'], passwordHash=bcrypt.generate_password_hash(request.json['password']).decode('utf-8'))
            db.session.add(user)
            db.session.commit()
            return jsonify(user.serialize())


if __name__ == '__main__':
    with app.app_context():
        db.create_all() # Create sql tables for our data models
    app.run(port=5001,  debug=True)

