'use strict';

var AutodidactSite = React.createClass({

    getInitialState: function() {
        return {
            topics: []
        }
    },

    componentDidMount: function() {
        $.getJSON('/topics.json').done(function(response) {
            this.setState({topics: response.data});
        }.bind(this));
        $.getJSON('/curriculum.json').done(function(response) {
            this.setState({content: response.data});
        }.bind(this));
    },

    render: function() {
        if (this.state.content && this.state.topics)
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
                                    <ReactRouter.Link to="/curriculum-content">
                                        Curriculum Content 
                                    </ReactRouter.Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                { /* this is where sub-pages of router will go */ }
                            </div>
                        </div>
                    </div>
                    <div>
                        <TopicsList topics={this.state.topics}/>
                        <CurriculumContent content={this.state.content}/>
                    </div>
                </div>
            );
        return (<div>Loading...</div>);
    },

});

ReactDOM.render(
    <ReactRouter.Router history={ ReactRouter.browserHistory }>
        <ReactRouter.Route path="/" component={ AutodidactSite }>
            <ReactRouter.Route path="/topics" component={ Topics }/>
            <ReactRouter.Route path="/curriculum-content" component={ CurriculumContent }/>
        </ReactRouter.Route>
    </ReactRouter.Router>,

    document.getElementById('app')
);