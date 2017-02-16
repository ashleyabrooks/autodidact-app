'use strict';

var Curriculum = React.createClass({
    render: function() {
        return (
            <div>
                Topics List: <TopicsList topics={this.props.topics}/>
            </div>
        );
    }
});


var TopicsList = React.createClass({

    render: function() {
        var topicsList = this.props.topics.map(function(result) {
            return(<TopicItem key={result[1]} topic={result[0]}/>);
        })
        
        return (
            <div>
                <ul>
                    {topicsList}
                </ul>
            </div>
        );
    }
});

var TopicItem = React.createClass({
    render: function() {
        return <div>{this.props.topic}</div>;
    }
});