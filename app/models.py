# app/models.py

from app import db


class Event(db.Model):

    """
    Create an Event table
    """

    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60))
    description = db.Column(db.String(200))
    date = db.Column(db.String(20))

    def __repr__(self):

        return '<Event: {0}>'.format(self.name)
