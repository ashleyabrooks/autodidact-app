import React, {Component} from 'react';
import EditContentModal from './edit-content-modal.js'

class ContentItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editMode: false,
            url: this.props.url
        }
        this.handleLinkClick = this.handleLinkClick.bind(this);
        this.showEditButton = this.showEditButton.bind(this);
        this.hideEditButton = this.hideEditButton.bind(this);

    }

    showEditButton() {
        this.setState({
            editMode: true
        })
    }

    hideEditButton() {
        this.setState({
            editMode: false
        })
    }

    handleLinkClick() {
        window.open(this.props.url)
    }
    
    render() {
        return (
            <div id={this.props.content_id} 
                     onMouseEnter={this.showEditButton} 
                     onMouseLeave={this.hideEditButton}>
                
                <div onClick={this.handleLinkClick}>
                    {this.props.content_title}
                </div>
                {this.state.editMode ? <EditContentModal content_title={this.props.content_title} 
                                                               content_url={this.props.url}
                                                               content_type={this.props.content_type}
                                                               topic_id={this.props.topic_id}
                                                               content_id={this.props.content_id} /> : null}
            </div>
        );
    }

    
}

export default ContentItem;