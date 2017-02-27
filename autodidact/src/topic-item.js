import React, {Component} from 'react';
// import Link from 'react-router';

class TopicItem extends Component {

    render() {
        return (
            <div>
                TOPICS from TopicItem: {this.props.topic}
            </div>
        );
    }
}

// <Link to={{ pathname: '/topics/content', query: { topic_id: this.props.topic_id } }}>
//                     {this.props.topic}
//                 </Link>

export default TopicItem;