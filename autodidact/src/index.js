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
                <Route path='/topics/content/all' component={Curriculum} />
                <Route path='/topics/content/active' component={Curriculum} />
                <Route path='/topics/content/completed' component={Curriculum} />
            </Route>
            <Route path="/login" component={ LoginPage } />
        </Route>
    </Router>
), document.getElementById('app'))