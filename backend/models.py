from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    passwordHash = db.Column(db.String, nullable=False)
    gamesWon = db.Column(db.Integer, default=0, nullable=False)
    totalGames = db.Column(db.Integer, default=0, nullable=False)

    def __repr__(self):
        return '<ExampleModel %r>' % self.name

    def serialize(self):
        return dict(id=self.id, name=self.name, gamesWon=self.gamesWon, totalGames=self.totalGames)

