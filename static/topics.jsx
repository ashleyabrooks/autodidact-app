//<!DOCTYPE HTML>
<html>
<head>
<title>Your First React Project</title>
</head>
<body>
<div id="topics"></div>
<script src="https://fb.me/react-0.14.6.js"></script>
<script src="https://fb.me/react-dom-0.14.6.js"></script>
<script src="http://fb.me/JSXTransformer-0.12.1.js"></script>
<script type="text/jsx">

var TopicsList = React.createClass({

    getInitialState: function () {
        return {topics: []};
    },

    getTopics: function () {
        var topics = [];
        fetch('/topics.json')
            .then(r => r.json()) // raises an exception if json decoding fails
            .then(t => this.setState({
                topics: t.topics
            }));
    },

    renderTopics: function () {
        // if (this.state.topics) {
        var i;

        return (
            for (i = 0; i < topics.length; i++) {
                <button key={ i } value={ topic } onClick={ this.openTopic }> 
                    { topic } 
                </button>
            }
        )
    // }
    },

    render () {
        return (
            <h1>Your Topics</h1>

            <body>
                <div id='topics-list'></div>
            </body>)
    }
});

ReactDOM.render(<TopicsList />, document.getElementById('topics-list'));

</script>
</body>
</html>