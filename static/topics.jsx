'use strict';

var Topics = React.createClass({
    render: function() {
        if (this.state.topics)
            return (
                <div>
                    Topics List: <TopicsList topics={this.props.topics}/>
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
    render: function() {
        return (
            <div>
                <ReactRouter.Link to='/topics/:{this.props.topic_id}/curriculum-content'>
                    {this.props.topic}
                </ReactRouter.Link>
            </div> 
        );
    }
});





