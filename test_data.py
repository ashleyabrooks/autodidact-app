"""Models and database functions for TESTING purposes."""

from flask_sqlalchemy import SQLAlchemy
from model import User, Topic, Content

db = SQLAlchemy()

def test_data():
    """Create sample data for integration testing."""

    test_topic = Topic(topic_id=1, topic_name='Test Topic', user_id=1)
    test_user = User(user_id=1, email='test@gmail.com', password='testpw123', first_name='Test', 
                                                                              last_name='User')
    test_content = Content(content_id=1, content_type='article', content_title='Test Content Title', 
                                                                 topic_id=1,
                                                                 user_id=1,
                                                                 url='test.com',
                                                                 completed='false')


