'use strict';

var AutodidactApp = React.createClass({
    
    getInitialState: function() {
        return {
            auth: 'Login'
        }
    },
    
    render: function() {
            return (
                <div>
                    <nav className="navbar navbar-default">
                      <div className="container-fluid">
                        <div className="navbar-header">
                          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                          </button>
                          <ReactRouter.Link to='/#' className="navbar-brand">Autodidact</ReactRouter.Link>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                          <ul className="nav navbar-nav">
                            <li className="active"><ReactRouter.Link to="/topics">Topics <span className="sr-only">(current)</span></ReactRouter.Link></li>
                          </ul>

                          <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                              <ul className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Login <span className="caret"></span></ul>
                              <ul className="dropdown-menu">
                                <li><ReactRouter.Link to="#/login">Login</ReactRouter.Link></li>
                                <li role="separator" className="divider"></li>
                                <li><ReactRouter.Link to="#"><AuthenticationButton /></ReactRouter.Link></li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                        </div>
                    </nav>
                    
                    {this.props.children}
                </div>
            );
    },

});

var LoginPage = React.createClass({

    render: function() {
        return (
            <div>    
                <h1>Welcome! Login or create an account to get started with Autodidact.</h1>

                <form action='/handle-login' method='POST'>
                    
                    Email: <input type='text' name='user_email'/><br/><br/>
                    Password: <input type='password' name='user_pw' maxLength='70'/><br/><br/>
                    
                    <input type='submit' name='login' value='Login'/>
                    <input type='submit' name='create-account' value='Create New Account'/>
                
                </form>
            </div>
        );
    }
});

var AuthenticationButton = React.createClass({

    handleLogout: function() {
        $.get('/logout', function() {
            this.setState({auth: 'Login'})
            console.log('Logged out')
        })
    },


    render: function() {
        return (
            <div>
                <button type='button' onClick={this.handleLogout}>
                    Logout
                </button>
            </div>
        );
    }
});


ReactDOM.render(
    <ReactRouter.Router history={ ReactRouter.hashHistory }>
        <ReactRouter.Route path="/" component={ AutodidactApp }>
            <ReactRouter.Route path="/topics" component={ Topics }/>
            <ReactRouter.Route path="/topics/content" component={ CurriculumContent }/>
            <ReactRouter.Route path="/login" component={ LoginPage }/>
        </ReactRouter.Route>
    </ReactRouter.Router>,

    document.getElementById('app')
);