"""Models and database functions."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_to_db(app):
    """Connect the database to Flask app."""

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///autodidact'
    db.app = app
    db.init_app(app)


class User(db.Model):
    """User of autodidact app."""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(70), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(70), nullable=False)

    def __repr__(self):
        """Add helpful representation of model object when printed."""

        return "< User user_id = %s, email = %s >" % (self.user_id, self.email)


class Topic(db.Model):
    """Topic to contain content items added by user."""

    __tablename__ = 'topics'

    topic_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    topic_name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    #content_order = db.Column(db.)

    user = db.relationship('User', backref=db.backref('users'))

    def __repr__(self):
        """Add helpful representation of model object when printed."""

        return "< Topic topic_name = %s, topic_id = %s, user_id = %s >" % (self.topic_name,
                                                                           self.topic_id,
                                                                           self.user_id)


class Content(db.Model):
    """Content item added by user."""

    __tablename__ = 'content'

    content_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    content_type = db.Column(db.String(15), nullable=False)
    content_title = db.Column(db.String(50), nullable=True)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.topic_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    content_url = db.Column(db.String(300), nullable=False)
    completed = db.Column(db.Boolean, nullable=False, default='false')

    topic = db.relationship('Topic', backref=db.backref('topics'))
    user = db.relationship('User')

    def __repr__(self):
        """Add helpful representation of model object when printed."""

        return "< Content content_id = %s, content_type = %s, topic_id = %s, user_id = %s >" % (
                                                                                    self.content_id,
                                                                                    self.content_type,
                                                                                    self.topic_id,
                                                                                    self.user_id)


if __name__ == '__main__':
    # Helpful for running this module interactively

    from server import app
    connect_to_db(app)
    print "Connected to db."

