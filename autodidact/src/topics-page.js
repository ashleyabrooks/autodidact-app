import React, {Component} from 'react';
import TopicsList from './topics-list.js'
import $ from 'jquery'

class TopicsPage extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {topics: [], currentTopic: '', newTopic: ''};
    }

    componentDidMount() {
        $.getJSON('http://localhost:5000/topics.json').done(function(response) {
            this.setState({topics: response.data});
        }.bind(this));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.newTopic} />
                    <button> Create New Topic </button>
                </form>
                
                <h3>Topics:</h3>
                <TopicsList topics={this.state.topics}/>
            </div>
        );
    }

    handleChange(e) {
        this.setState({newTopic: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        var newTopic = {newTopic: this.state.newTopic};

        $.post('http://localhost:5000/create-topic', newTopic, function() {
            //this.props.router.push('/#/topics/content?topic_id=' + this.props.topic_id);
            console.log('Added new topic')
        });
        
        $.getJSON('http://localhost:5000/topics.json').done(function(response) {
            this.setState({topics: response.data});
        }.bind(this));
    }
}

export default TopicsPage;

