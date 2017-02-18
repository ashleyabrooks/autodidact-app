'use strict';

var Topics = React.createClass({

    getInitialState: function() {
        return {
            topics: []
        }
    },

    componentWillMount: function() {

        $.getJSON('/topics.json').done(function(response) {
            this.setState({topics: response.data});
        }.bind(this));
    },

    render: function() {

        if (this.state.topics)
            return (
                <div>
                    <AddContentButton cta='Add Topic'/>
                    <TopicsList topics={this.state.topics}/>
                </div>
            );
        return (
            <div>
                Add a topic to get started.
            </div>
        );
    }
});

var TopicsList = React.createClass({

    render: function() {
        var topicsList = this.props.topics.map(function(result) {
            return(<TopicItem key={result[1]} topic={result[0]} topic_id={result[1]}/>);
        })
        
        return (
            <div>
                <ul>
                    <b>Topics:</b> {topicsList}
                </ul>
            </div>
        );
    }
});

var TopicItem = React.createClass({

    // setCurrentTopic: function() {
    //     this.setState({
    //         currentTopic: 
    //     })
    // },

    render: function() {
        return (
            <div>
                <ReactRouter.Link to='/topics/curriculum-content'>
                    {this.props.topic}
                </ReactRouter.Link>
            </div> 
        );
    }
});

var CurrentTopic = React.createClass({
    render: function() {
        //pass
    }
});


var AddContentButton = React.createClass({
    
    addNewTopic: function() {
        $.post('/add-topic', data, function() {
            // SUCCESS FUNCTION
            console.log('Added new topic')
        })
    },

    render: function() {
        return (
            
            <ReactRouter.Link to='/add-topic'>
                <button type='button' onClick={ this.addNewTopic }>{this.props.cta}</button>
            </ReactRouter.Link>
        );
    },
});





