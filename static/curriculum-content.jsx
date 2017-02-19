'use strict';

var CurriculumContent = React.createClass({

    getInitialState: function() {
        return {
            content: []
        }
    },

    componentDidMount: function() {
        $.getJSON('/curriculum.json', {topic_id: this.props.params.topic_id}).done(function(response) {
            this.setState({content: response.data});
        }.bind(this));
    },

    render: function() {
        if (this.state.content)
            return (
                <div>
                    <ContentList content={this.state.content} />
                </div>
            );
        return (
            <div>
                Add content to create a curriculum.
            </div>
        );
    }
});

var ContentList = React.createClass({

    render: function() {
        var contentList = this.props.content.map(function(result) {
            return (<ContentItem key={result[1]} content={result[0]}/>);
        })

        return (
            <div>
                <ul>
                    <b>Content:</b> {contentList}
                </ul>
            </div>
        );
    }
});

var ContentItem = React.createClass({
    
    render: function() {
        return (
            <div>
                <ReactRouter.Link to='/'>{this.props.content}</ReactRouter.Link>
            </div>
        );
    }
});
