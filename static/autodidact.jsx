'use strict';

var AutodidactSite = React.createClass({

    getInitialState: function() {
        return {
            topics: []
        }
    },

    componentDidMount: function() {
        $.getJSON('/topics.json', this.showResults)
    },

    showResults: function(response) {
        this.setState({
            topics: response.data
        }, this.handleResults)
    },

    handleResults: function() {
        return this.state.topics
    },

    

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
                                <ReactRouter.Link to="/curriculum">
                                    Curriculum
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
                </div>
            </div>
        );
    },

});

ReactDOM.render(
    <ReactRouter.Router history={ ReactRouter.hashHistory }>
        <ReactRouter.Route path="/" component={ AutodidactSite }>
            <ReactRouter.Route path="/curriculum" component={ Curriculum }/>
        </ReactRouter.Route>
    </ReactRouter.Router>,

    document.getElementById('root')
);