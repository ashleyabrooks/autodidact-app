'use strict';

var CurriculumContent = React.createClass({

    render: function() {
        debugger;
        return (
            <ContentList content={this.props.content} />
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
                    {contentList}
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
