import React, {Component} from 'react';
import ContentItem from './content-item.js'

class ContentList extends Component {

    constructor(props) {
        super(props)
        this.state = {content: this.props.content}
    }

    render() {
        var contentList = this.props.content.map(function(result) {
            return (<ContentItem key={result[2]}
                                 content_id={result[2]} 
                                 content_title={result[0]} 
                                 url={result[1]} 
                                 content_type={result[3]} 
                                 topic_id={result[4]} />
            );
        })

        return (
            <div id='curriculum'>
                <ul>
                    <li draggable='true'>
                        <b>Content:</b> {contentList}
                    </li>
                </ul>
            </div>
        );
    }
}

export default ContentList;