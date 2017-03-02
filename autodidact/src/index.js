import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import TopicsPage from './topics-page.js'
import Curriculum from './curriculum.js'
import LoginPage from './login-page.js'
import Overview from './overview.js'
import { Router, Route, hashHistory } from 'react-router'

ReactDOM.render((
    <Router history={ hashHistory }>
        <Route path="/" component={ App }>
            <Route path='/overview' component={ Overview } />
            <Route path="/topics" component={ TopicsPage } />
            <Route path="/topics/content" component={ Curriculum }>
                <Route path='/topics/content/all?topic_id=2' component={Curriculum} />
                <Route path='/topics/content/active?topic_id=2' component={Curriculum} />
                <Route path='/topics/content/completed?topic_id=2' component={Curriculum} />
                // <Route path='/topics/content/:content_status' component={Curriculum} />
            </Route>
            <Route path="/login" component={ LoginPage } />
        </Route>
    </Router>
), document.getElementById('app'))