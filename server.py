import sqlalchemy
from jinja2 import StrictUndefined
from flask import (Flask, jsonify, render_template, redirect, request, flash, session)
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
    # first_name = request.form.get('first_name')
    # last_name = request.form.get('last_name')

    # try:
    user = db.session.query(User).filter(User.email == entered_email).one()
    # except:
    #     user = User(email=entered_email, password=entered_pw, first_name=first_name, 
    #                                                           last_name=last_name)
        # db.session.add(user)
        # db.session.commit()
        # flash('Account created. Logged in as %s.' % first_name)
        # return redirect('/')

    if entered_pw == user.password:
        session['user'] = user.user_id
        return redirect('/topics')
    else:
        flash('Incorrect username or password.')
        return redirect('/login')


@app.route('/logout')
def handle_logout():
    session.pop('user', None)
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

    return render_template('curriculum.html', curric_items=curric_items)


@app.route('/add-article')
def add_article():
    """Display add-article page."""

    return render_template('add-article.html')


@app.route('/submit-add-article')
def submit_content():
    """Add article to user's curriculum."""

    content_title = request.args.get('content_title')
    content_url = request.args.get('content_url')
    content_type = request.args.get('content_type')

    new_content = Content(content_type=content_type, content_title=content_title, 
                                              topic_id=1, 
                                              user_id=session['user'],
                                              content_url=content_url)

    db.session.add(new_content)
    db.session.commit()

    return redirect('/curriculum-overview')



if __name__ == "__main__":
    app.debug = True

    # Ensure templates, etc. are not cached in debug mode
    app.jinja_env.auto_reload = app.debug  

    connect_to_db(app)

    DebugToolbarExtension(app)
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    app.run(port=5000, host='0.0.0.0')