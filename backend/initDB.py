from models import db, User
from server import app, bcrypt

with app.app_context():
    db.drop_all() # Delete sql tables if they exist
    db.create_all() # Create sql tables for our data models

    # Create a test user
    user = User(name='test', passwordHash=bcrypt.generate_password_hash('test').decode('utf-8'))
    db.session.add(user)

    db.session.commit() # Commit changes to the database