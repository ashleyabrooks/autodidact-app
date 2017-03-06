import React, { Component } from 'react';
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Modal } from 'react-bootstrap'

class AddContentToCurricButton extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            showModal: false,
            topic_id: this.props.topic_id 
        };
        this.close_modal = this.close_modal.bind(this);
        this.open_modal = this.open_modal.bind(this);
        this.addContentToCurric = this.addContentToCurric.bind(this);
    }

    close_modal() {
        this.setState({ showModal: false });
    }

    open_modal() {
        this.setState({ showModal: true });
    }

    addContentToCurric(e) {
        e.preventDefault();

        var newContentData = $('#newContentForm').serializeArray()

        $.post('http://localhost:5000/create-content', newContentData, this.close_modal);

        var data_to_send = 
                {'topic_id': this.props.topic_id, 
                'content_view': 'active'};

        this.setState({topic_id: this.props.topic_id,
                       currentView: 'active'})

        $.post('http://localhost:5000/curriculum.json', data_to_send).done(response =>
            this.setState({content: response.data}), function() {}.bind(this));
    }

    render() {
        return (
            <div>

                <button onClick={this.open_modal} id='content-button'> Add New Content </button>

                <Modal show={this.state.showModal} onHide={this.close_modal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Content to Your Curriculum</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                        <form id='newContentForm'>
                            Content Title: <input type='text' name='content_title' id='content-title-create' /><br/><br/>
                            Content URL: www.<input type='text' name='content_url' id='content-url-create' /><br/><br/>
                            Content Type:<br/>
                                Article <input type='radio' name='content_type' value='article' id='content-type-create'/>
                                Video <input type='radio' name='content_type' value='video' id='content-type-create'/>
                                Book <input type='radio' name='content_type' value='book' id='content-type-create'/>
                                Note <input type='radio' name='content_type' value='note' id='content-type-create'/>
                                <input type='hidden' name='topic_id' value={this.props.topic_id} />
                        </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <span onClick={this.close_modal}>Cancel</span> &nbsp; &nbsp;
                    <button onClick={this.addContentToCurric}>Add to Curriculum</button>
                  </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default AddContentToCurricButton;