import React, {Component} from 'react';
import TopicItem from './topic-item.js'

class TopicsList extends Component {

    render() {
        var topics = this.props.topics.map(function(result) {
            return (
                <TopicItem key={result.id} topic={result[0]} topic_id={result[1]}/>
            );
        })
        
        return (
            <div>
                <ul>
                    {topics}
                </ul>
            </div>
        );
    }
}

export default TopicsList;