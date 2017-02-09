import sqlalchemy
from jinja2 import StrictUndefined
from flask import (Flask, jsonify, render_template, redirect, request, flash, session, url_for)
from flask_debugtoolbar import DebugToolbarExtension
from model import User, Content, Topic, connect_to_db, db 

app = Flask(__name__)

app.secret_key = 'ABC'

app.jinja_env.undefined = StrictUndefined

@app.route('/')
def homepage():
    """Show homepage."""

    return render_template('homepage.html')


@app.route('/login')
def login():
    """Show login page."""

    return render_template('login.html')

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
            return redirect('/topics')
        else:
            flash('Incorrect username or password.')
            return redirect('/login')
    elif request.form.get('create-account'):
        user = User(email=entered_email, password=entered_pw, first_name='Test', last_name='Test')
        db.session.add(user)
        db.session.commit()
        return redirect('/topics')


@app.route('/logout')
def handle_logout():
    del session['user']
    flash('You have been logged out.')
    return redirect('/')


@app.route('/topics')
def show_topic_overview():
    """Display topic overview page."""

    topics = db.session.query(Topic.topic_name, 
                              Topic.topic_id).filter(Topic.user_id == session['user']).all()

    return render_template('topics.html', topics=topics)


@app.route('/add-topic')
def add_new_topic():
    """Display add-topic page."""

    return render_template('add-topic.html')

@app.route('/curriculum/<int:topic_id>')
def show_curriculum(topic_id):
    """Display curriculum page from topic specified in the URL."""

    curric_items = db.session.query(Content).filter(Content.topic_id == topic_id).all()

    return render_template('curriculum.html', topic_id=topic_id, curric_items=curric_items)


@app.route('/curriculum/<int:topic_id>/add-content')
def add_content(topic_id):
    """Display add-content page."""

    return render_template('add-content.html', topic_id=topic_id)


@app.route('/create-content')
def create_content():
    """Add content to user's curriculum."""

    content_title = request.args.get('content_title')
    content_url = request.args.get('content_url')
    content_type = request.args.get('content_type')
    topic_id = request.args.get('topic_id')

    new_content = Content(content_type=content_type, content_title=content_title, 
                                              topic_id=topic_id, 
                                              user_id=session['user'],
                                              content_url=content_url)

    db.session.add(new_content)
    db.session.commit()

    return redirect('/curriculum/%s' % new_content.topic_id)


@app.route('/create-topic')
def create_topic():

    topic_name = request.args.get('topic_name')

    new_topic = Topic(topic_name=topic_name, user_id=session['user'])

    db.session.add(new_topic)
    db.session.commit()

    return redirect('/topics')


if __name__ == "__main__":
    app.debug = True

    # Ensure templates, etc. are not cached in debug mode
    app.jinja_env.auto_reload = app.debug  

    connect_to_db(app)

    DebugToolbarExtension(app)
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    app.run(port=5000, host='0.0.0.0')