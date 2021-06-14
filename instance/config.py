# instance/cofig.py

import os

basedir = os.path.abspath(os.path.dirname(__file__))

SECRET_KEY = "42fee66a-08tf-4c2a-beab-ebr52ca4ada4"

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'database.db')
