import React, {Component} from 'react';
import AddContentButton from './add-content-button.js'
import TopicsList from './topics-list.js'
import $ from 'jquery'

class TopicsPage extends Component {

    // constructor() {
    //     super()
    //     this.state = {
    //         topics: [],
    //         currentTopic: ''
    //     }
    // }

    // componentWillMount() {
    //     $.getJSON('http://localhost:5000/topics.json').done(function(response) {
    //         this.setState({topics: response.data});
    //     }.bind(this));
    // }

    // render() {

        // if (this.state.topics)
        //     return (
        //         <div>
        //             <AddContentButton cta='Add New Topic'/>
        //             <TopicsList topics={this.state.topics}/>
        //         </div>
        //     );
    //     return (
    //         <div>
    //             Create a topic to get started.
    //             <AddContentButton cta='Create New Topic'/>
    //         </div>
    //     );
    // }

    render() {
        return (
            <div>
                Topics
            </div>
        );
    }
}

export default TopicsPage;

