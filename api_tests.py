import unittest import TestCase
import server import app

class AutodidactIntegrationTest(TestCase):

    def setUp(self):
        """Set up testing database before beginning integration tests."""

        self.client = app.test_client()
        app.config['TESTING'] = True

        connect_to_db(app, 'postgresql:///testdb')

        db.create_all()
        example_data()

    def tearDown(self):
        """Handle tear down of test database."""

        db.session.close()
        db.drop_all()

    def testCurriculumData(self):
        # TODO
        pass

    def testOverview(self):
        # TODO 
        pass
        



