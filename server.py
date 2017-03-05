import sqlalchemy
import json
from sqlalchemy import update
from jinja2 import StrictUndefined
from flask import (Flask, jsonify, render_template, redirect, request, flash, session)
from flask_debugtoolbar import DebugToolbarExtension
from flask_cors import CORS, cross_origin
from model import User, Content, Topic, connect_to_db, db 

app = Flask(__name__)

app.secret_key = 'ABC'

app.jinja_env.undefined = StrictUndefined
CORS(app)

@app.route('/get-progress.json')
@cross_origin()
def get_progress_data():
    """Query database for user's curriculum progress and return JSON object."""

    progress_data = db.session.query(Content.content_title,
                                     Content.completed).filter(User.user_id == 1).all()

    completed = 0
    incomplete = 0

    for item in progress_data:
        if item[1] == True:
            completed += 1
        elif item[1] == False:
            incomplete += 1

    # completed_progress_data = {
    #                           'labels': [
    #                                 'Complete',
    #                                 'Incomplete',
    #                           ],
    #                           'datasets': [
    #                             {
    #                                     'data': [completed, incomplete],
    #                                     'backgroundColor': ['#FF6384', '#36A2EB'],
    #                                     'hoverBackgroundColor': ['#FF6384', '36A2EB']
    #                             }]
    #                            }
    
    # return jsonify(completed_progress_data)

    print completed, incomplete

    return jsonify({'data': [completed, incomplete]})

@app.route('/handle-login', methods=['POST'])
def handle_login():
    """Handle login and redirect to curriculum overview page if accepted."""

    entered_email = request.form.get('user_email')
    entered_pw = request.form.get('user_pw')

    # Check which button user clicked. If they clicked 'Login', validate login creds.
    # If clicked 'Create Account', create account and redirect to /topics.

    if request.form.get('login'):
        user = db.session.query(User).filter(User.email == entered_email).one()
        if entered_pw == user.password:
            session['user'] = user.user_id
            return redirect('/#/topics')
        else:
            flash('Incorrect username or password.')
            return redirect('/#/login')
    elif request.form.get('create-account'):
        user = User(email=entered_email, password=entered_pw, first_name='Test', last_name='Test')
        db.session.add(user)
        db.session.commit()
        flash('New account created')
        return redirect('/#/topics')


@app.route('/logout')
def handle_logout():
    del session['user']
    flash('You have been logged out.')
    print 'logged out'
    return redirect('/#/')


@app.route('/topics.json')
@cross_origin()
def show_topic_overview():
    """Display topic overview page."""

    topics = db.session.query(Topic.topic_name, 
                              Topic.topic_id).filter(Topic.user_id == 1).all()

    return jsonify({'data': topics})


@app.route('/curriculum.json', methods=['GET', 'POST'])
@cross_origin()
def show_curriculum(): #this used to take in topic_id as an argument in order to get curriculum for specific topic
    """Display curriculum page from topic specified in the URL."""


    topic_id = request.form.get('topic_id')
    content_view = request.form.get('content_view')

    print topic_id, content_view

    if content_view == 'active':
        curric_items = db.session.query(Content.content_title,
                                    Content.content_url,
                                    Content.content_id,
                                    Content.content_type,
                                    Content.topic_id).filter(Content.topic_id == topic_id).filter(Content.completed == 'false').all()

    elif content_view == 'all':
        curric_items = db.session.query(Content.content_title,
                                    Content.content_url,
                                    Content.content_id,
                                    Content.content_type,
                                    Content.topic_id).filter(Content.topic_id == topic_id).all()

    elif content_view == 'completed':
        curric_items = db.session.query(Content.content_title,
                                    Content.content_url,
                                    Content.content_id,
                                    Content.content_type,
                                    Content.topic_id).filter(Content.topic_id == topic_id).filter(Content.completed == 'true').all()

    return jsonify({'data': curric_items})


@app.route('/create-content', methods=["POST"])
@cross_origin()
def create_content():
    """Add content to user's curriculum."""

    content_title = request.form.get('content_title')
    content_url = request.form.get('content_url')
    content_type = request.form.get('content_type')
    topic_id = request.form.get('topic_id')

    # format content_url before adding to database:
    content_url = str('http://www.' + content_url)

    new_content = Content(content_type=content_type, content_title=content_title, 
                                              topic_id=topic_id, 
                                              user_id=1,
                                              content_url=content_url)

    print new_content

    db.session.add(new_content)
    db.session.commit()

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/edit-content', methods=['POST'])
@cross_origin()
def edit_content():
    """Edit content with user's input from Edit Content Modal Component."""

    content_id = request.form.get('content_id')
    content_title = request.form.get('new_content_title')
    content_url = request.form.get('new_content_url')
    topic_id = request.form.get('topic_id')

    content_update = db.session.query(Content).filter(Content.content_id==content_id).one()

    content_update.content_title = content_title
    content_update.content_url = content_url

    db.session.commit()

    return redirect('/#/topics/content?topic_id=%s' % topic_id)


@app.route('/create-topic', methods=['POST'])
@cross_origin()
def create_topic():

    topic_name = request.form.get('newTopic')

    new_topic = Topic(topic_name=topic_name, user_id=1)

    db.session.add(new_topic)
    db.session.commit()

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/mark-complete', methods=['POST'])
@cross_origin()
def mark_complete():

    content_id = request.form.get('data')

    content_to_mark_complete = db.session.query(Content).filter(Content.content_id==content_id).one()
    content_to_mark_complete.completed = 'true'

    db.session.commit()

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


if __name__ == "__main__":
    app.debug = True

    app.jinja_env.auto_reload = app.debug  

    connect_to_db(app)

    DebugToolbarExtension(app)
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    app.run(port=5000, host='0.0.0.0')
