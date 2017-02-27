import React, {Component} from 'react';
import EditContentModal from './edit-content-modal.js'


class ContentItem extends Component {

    getInitialState() {
        return {
            showEditButton: false
        }
    }

    showEditButton() {
        this.setState({
            showEditButton: true
        })
    }

    hideEditButton() {
        this.setState({
            showEditButton: false
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
                {this.state.showEditButton ? <EditContentModal content_title={this.props.content_title} 
                                                               content_url={this.props.url}
                                                               content_type={this.props.content_type}
                                                               topic_id={this.props.topic_id}
                                                               content_id={this.props.content_id} /> : null}
            </div>
        );
    }
}

export default ContentItem;