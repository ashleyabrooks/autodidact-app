import React, {Component} from 'react';
import $ from 'jquery'
import { Modal } from 'react-bootstrap'

class EditContentModal extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            showModal: false,
        };
        this.close_modal = this.close_modal.bind(this);
        this.open_modal = this.open_modal.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
    }

    submitEdit(e) {
        e.preventDefault();

        var editContentInput = {
            'new_content_title': $('#edit-content-title').val(),
            'new_content_url': $('#edit-content-url').val(),
            'content_id': $('#content-id').val(),
            'topic_id': this.props.topic_id
        };

        $.post('/edit-content', editContentInput, function() {
            console.log('edited content')
        })
    }

    close_modal() {
        this.setState({ showModal: false, 
                        editMode: false });
    }

    open_modal() {
        this.setState({ showModal: true });
    }

    render() {
        return (
            <div>

                <button className="glyphicon glyphicon-pencil" aria-hidden='true'data-toggle="modal" data-target="#editContentModal" onClick={this.open_modal}/>

                <Modal show={this.state.showModal} onHide={this.close_modal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Content Item</Modal.Title>
                  </Modal.Header>
                  <form id='editContentForm'>
                    <Modal.Body>
                            Content Title: <input type="text" id="edit-content-title" name="content_title" placeholder={this.props.content_title} /><br/><br/>
                            Content URL: <input type="text" id="edit-content-url" name="content_url" placeholder={this.props.content_url} /><br/><br/>
                            <input type='hidden' name='content_id' id='content-id' value={this.props.content_id} />
                    </Modal.Body>
                      <Modal.Footer>
                        <span onClick={this.close_modal}>Cancel</span> &nbsp; &nbsp;
                        <input type="submit" className="btn btn-primary" data-dismiss="modal" value="Submit Edit to Curriculum" onClick={this.submitEdit}/>
                      </Modal.Footer>
                  </form>
                </Modal>
            </div>






        );
    }
}

export default EditContentModal;