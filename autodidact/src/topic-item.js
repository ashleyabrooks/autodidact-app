import React, {Component} from 'react';
import { Link } from 'react-router';

class TopicItem extends Component {

    render() {
        return (
            <div>
                <Link to={{ pathname: '/topics/content', query: { topic_id: this.props.topic_id, content_view: 'active' } }}>
                    {this.props.topic}
                </Link>
            </div>
        );
    }
}



export default TopicItem;