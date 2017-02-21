'use strict';

var Topics = React.createClass({

    getInitialState: function() {
        return {
            topics: [],
            currentTopic: ""
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
                    <AddContentButton cta='Add New Topic'/>
                    <TopicsList topics={this.state.topics}/>
                </div>
            );
        return (
            <div>
                Create a topic to get started.
                <AddContentButton cta='Create New Topic'/>
            </div>
        );
    }
});

var TopicsList = React.createClass({

    render: function() {
        var topicsList = this.props.topics.map(function(result) {
            return (
                <TopicItem key={result[1]} topic={result[0]} topic_id={result[1]}/>
            );
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

    render: function() {
        return (
            <div>
                <ReactRouter.Link to={{ pathname: '/topics/content', query: { topic_id: this.props.topic_id } }}>
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

    getInitialState: function() {
        return {
            showTextField: false
        };
    },

    showTextField: function() {
        this.setState({
            showTextField: true
        });
    },

    render: function() {
        return (
            <div>
                <button type='button' onClick={ this.showTextField }>{this.props.cta}</button>
                { this.state.showTextField ? <NewTopicTextField /> : null }
            </div>
        );
    },
});

var NewTopicTextField = React.createClass({

    // addNewTopic: function() {

    //     var newTopicInput = {
    //         'newTopic': $('#new-topic-name').val()
    //     };

    //     console.log(newTopicInput);

    //     $.post('/create-topic', newTopicInput, function() {
    //         // SUCCESS FUNCTION
    //         console.log('Added new topic')
    //     })
    // },

    render: function() {
        return (
            <div>
                <form action='/create-topic'>
                    <input type='text' name='new-topic-name' />
                    <input type='submit' name='submit-new-topic' onClick={ this.addNewTopic }/>
                </form>
            </div>
        );
    }
});





