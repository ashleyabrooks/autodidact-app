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
        return redirect('/curriculum')
    else:
        flash('Incorrect username or password.')
        return redirect('/login')


@app.route('/logout')
def handle_logout():
    session.pop('user', None)
    flash('You have been logged out.')
    return redirect('/')


@app.route('/curriculum')
def show_curriculum_overview():
    """Display curriculum overview page."""

    return render_template('curriculum.html')



if __name__ == "__main__":
    app.debug = True

    # Ensure templates, etc. are not cached in debug mode
    app.jinja_env.auto_reload = app.debug  

    connect_to_db(app)

    DebugToolbarExtension(app)
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    app.run(port=5000, host='0.0.0.0')