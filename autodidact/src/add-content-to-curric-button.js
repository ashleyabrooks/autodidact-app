import React, { Component } from 'react';
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Modal, Header, Body } from 'react-bootstrap'

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

        var newContent = {
            'content_title': $('#content-title-create').val(),
            'content_url': $('#content-url-create').val(),
            'content_type': $('#content-type-create').val(),
            'topic_id': this.props.topic_id,
        };

        $.post('http://localhost:5000/create-content', newContent, this.close_modal);
    }

    render() {
        return (
            <div>

                <button onClick={this.open_modal}> Add New Content </button>

                <Modal show={this.state.showModal} onHide={this.close}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Content to Your Curriculum</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                        <form>
                            Content Title: <input type='text' name='content_title' id='content-title-create' /><br/><br/>
                            Content URL: www.<input type='text' name='content_url' id='content-url-create' /><br/><br/>
                            Content Type:<br/>
                                Article <input type='radio' name='content_type' value='article' id='content-type-create'/>
                                Video <input type='radio' name='content_type' value='video' id='content-type-create'/>
                                Book <input type='radio' name='content_type' value='book' id='content-type-create'/>
                                Note <input type='radio' name='content_type' value='note' id='content-type-create'/>
                        </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <span onClick={this.close}>Cancel</span> &nbsp; &nbsp;
                    <button onClick={this.addContentToCurric}>Add to Curriculum</button>
                  </Modal.Footer>
                </Modal>
            </div>
        );
    }
}



            //     <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#add-content-modal">
            //       Add Content to Curriculum
            //     </button>

            //     <div className="modal fade" id="add-content-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            //       <div className="modal-dialog" role="document">
            //         <div className="modal-content">
            //           <div className="modal-header">
            //             <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            //             <h4 className="modal-title" id="myModalLabel">Add New Content</h4>
            //           </div>
            //           <div className="modal-body">
                            

            //                     <div className="modal-footer">
            //                         <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            //                         <input type="submit" className="btn btn-primary" data-dismiss="modal" value='Add to Curriculum' onClick={this.addContentToCurric} />
            //                     </div>
            //                 </form>
            //           </div>
                      
            //         </div>
            //       </div>
            //     </div>
            // </div>

export default AddContentToCurricButton;