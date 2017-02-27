import sqlalchemy
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


# @app.route('/')
# def homepage():
#     """Show homepage."""

#     return render_template('index.html')


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


@app.route('/curriculum.json', methods=['POST'])
def show_curriculum(): #this used to take in topic_id as an argument in order to get curriculum for specific topic
    """Display curriculum page from topic specified in the URL."""

    topic_id = request.form.get("data")

    curric_items = db.session.query(Content.content_title,
                                    Content.content_url,
                                    Content.content_id,
                                    Content.content_type,
                                    Content.topic_id).filter(Content.topic_id == topic_id).all()

    return jsonify({'data': curric_items})


@app.route('/create-content', methods=["POST"])
def create_content():
    """Add content to user's curriculum."""

    print 'in route'

    content_title = request.form.get('content_title')
    content_url = request.form.get('content_url')
    content_type = request.form.get('content_type')
    topic_id = request.form.get('topic_id')

    # format content_url before adding to database:
    content_url = str('http://www.' + content_url)

    new_content = Content(content_type=content_type, content_title=content_title, 
                                              topic_id=topic_id, 
                                              user_id=session['user'],
                                              content_url=content_url)

    print new_content

    db.session.add(new_content)
    db.session.commit()

    return redirect('/#/topics/content?topic_id=%s' % topic_id)

@app.route('/edit-content', methods=['POST'])
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
def create_topic():

    topic_name = request.form.get('newTopic')

    new_topic = Topic(topic_name=topic_name, user_id=session['user'])

    db.session.add(new_topic)
    db.session.commit()

    topic_id = db.session.query(Topic.topic_id).filter(Topic.topic_name == topic_name).one().topic_id

    return redirect('/#/topics/content?topic_id=%s' % topic_id)


@app.route('/save-order', methods=['POST'])
def save_curric_order():
    order = request.form.get('order')

    session['curric_order'] = order


@app.route('/get-order')
def get_curric_order():
    return session['curric_order']


if __name__ == "__main__":
    app.debug = True

    app.jinja_env.auto_reload = app.debug  

    connect_to_db(app)

    DebugToolbarExtension(app)
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    app.run(port=5000, host='0.0.0.0')
