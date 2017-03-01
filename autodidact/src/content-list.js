import React, {Component} from 'react';
import ContentItem from './content-item.js'
import Sortable from 'sortablejs';
import $ from 'jquery';

class ContentList extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            content: this.props.content,
            completed: false,
        };
        this.handleComplete = this.handleComplete.bind(this);
    }

    handleComplete(content_id) {
        $.post('http://localhost:5000/mark-complete', {data: content_id}, function() {
            console.log('marked complete')
        });
    }

    render() {
        var contentList = this.props.content.map(result => (
                    
                    <ContentItem key={result[2]}
                                     content_id={result[2]} 
                                     content_title={result[0]} 
                                     url={result[1]} 
                                     content_type={result[3]} 
                                     topic_id={result[4]} 
                                     onClick={this.handleComplete} /> ))

        return (
            <div className='container' ref={this.sortableContainersDecorator}>
                <div className='group'>
                    <h2 className='group-title'>Curriculum</h2>
                    <div className='group-list' ref={this.sortableGroupDecorator}>
                       {contentList}
                    </div>
                </div>
            </div>
        );
    }

    sortableContainersDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
            let options = {
                handle: '.group-title'
            };
            Sortable.create(componentBackingInstance, options);
        }
    }

    sortableGroupDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
            let options = {
                draggable: "div",
                group: "shared"
            };
            Sortable.create(componentBackingInstance, options);
        }
    }
}


export default ContentList;


    // Curriculum holds state of checkbox. Does it have an X or not?
    // Checkbox is its own component
    // Checkbox is rendered in ContentList. ContentItem is rendered at the same time.
    // Checkbox has an onClick attribute/method that is connected to this.props.onClick (or is it this.props.(whatever function exists on the parent))
    // X's are a state maintained by Curriculum. On click, the state is changed and the Checkbox is filled with an X