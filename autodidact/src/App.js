import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router'
import AuthenticationButton from './auth-button.js'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      auth: 'Login'
    }
  }
    
  render() {
          return (
              <div>
                  <nav className="navbar navbar-default" style={ {"backgroundImage": "none"} } id='main-navbar'>
                    <div className="container-fluid">
                      <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                        </button>
                        <Link to='/' className="navbar-brand">Autodidact</Link>
                      </div>

                      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                          <li><Link to='/overview'> Overview </Link></li>
                          <li><Link to="/topics">Topics <span className="sr-only">(current)</span></Link></li>
                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                          <li><Link to="/login">Login</Link></li>
                        </ul>
                      </div>
                      </div>
                  </nav>
                  {this.props.children}
              </div>
          );
    }
}



export default App;
