'use strict';

var AutodidactApp = React.createClass({
    
    render: function() {
            return (
                <div>
                    <nav className="navbar navbar-default" role="navigation">
                        <div className="container">
                            <div className="navbar-header">
                                <ReactRouter.IndexLink className="navbar-brand" to="/">
                                    Autodidact
                                </ReactRouter.IndexLink>
                            </div>
                            <ul className='nav navbar-nav'>
                                <li>
                                    <ReactRouter.Link to="/topics">
                                        Topics
                                    </ReactRouter.Link>
                                </li>
                                <li>
                                    <ReactRouter.Link to='/login'>
                                        Login 
                                    </ReactRouter.Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    {this.props.children}
                </div>
            );
    },

});


ReactDOM.render(
    <ReactRouter.Router history={ ReactRouter.hashHistory }>
        <ReactRouter.Route path="/" component={ AutodidactApp }>
            <ReactRouter.Route path="/topics" component={ Topics }/>
            <ReactRouter.Route path="/topic/:content" component={ CurriculumContent }/>
        </ReactRouter.Route>
    </ReactRouter.Router>,

    document.getElementById('app')
);