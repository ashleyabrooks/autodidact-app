import React, {Component} from 'react';
import EditContentModal from './edit-content-modal.js'
// import Checkbox from './checkbox.js'
import './index.css';

class ContentItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editMode: false,
            url: this.props.url,
            content_id: this.props.content_id,
            completed: false,
        };

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
        if (this.state.showModal === false)
            this.setState({
                editMode: false
            })
        else if (this.state.showModal === true)
            this.setState({
                editMode: true
            })
    }

    handleLinkClick() {
        window.open(this.props.url)
    }

    render() {
        return (
            <div id='content-item-div'
                     onMouseEnter={this.showEditButton} 
                     onMouseLeave={this.hideEditButton}>

                <span id='checkbox-span'>
                    <button className='checkbox' onClick={() => { this.props.onClick(this.props.content_id) }}>
                    </button>
                </span>


                <span id='content-item' onClick={this.handleLinkClick}>
                    {this.props.content_title}
                </span>
                <span id='edit-content-button'>
                    {this.state.editMode ? <EditContentModal content_title={this.props.content_title} 
                                                               content_url={this.props.url}
                                                               content_type={this.props.content_type}
                                                               topic_id={this.props.topic_id}
                                                               content_id={this.props.content_id} /> : null}
                </span>
            </div>
        );
    }

    
}

export default ContentItem;