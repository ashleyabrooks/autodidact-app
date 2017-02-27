import React, {Component} from 'react';
import TopicItem from './topic-item.js'

class TopicsList extends Component {
    constructor() {
        super();
        console.log(this.props);
    }

    render() {
        // var topics = this.props.topics.map(function(result) {
        //     return (
        //         <TopicItem key={result[1]} topic={result[0]} topic_id={result[1]}/>
        //     );
        // })
        
        return (
            <div>
                <ul>
                    <b>Topics:</b>
                </ul>
            </div>
        );
    }
}

export default TopicsList;

// NOTES: 
// removed {topics} from render