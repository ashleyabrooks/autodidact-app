import sqlalchemy
from jinja2 import StrictUndefined
from flask import (Flask, jsonify, render_template, redirect, request, flash, session)
from flask_debugtoolbar import DebugToolbarExtension
from model import User, Content, Topic, connect_to_db, db 

app = Flask(__name__)

app.secret_key = 'ABC'

app.jinja_env.undefined = StrictUndefined