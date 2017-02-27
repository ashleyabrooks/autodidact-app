import React, {Component} from 'react';

class ContentModal extends Component {
    submit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <button className="glyphicon glyphicon-pencil" aria-hidden='true'data-toggle="modal" data-target="#editContentModal"/>
                <div className="modal fade" id="editContentModal" tabIndex="-1" role="dialog" aria-labelledby="editContentModal">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title" id="myModalLabel">Edit Curriculum Item</h4>
                      </div>
                      <div className="modal-body">
                        <form>
                            Content Title: <input type="text" id="edit-content-title" name="content_title" placeholder={this.props.content_title} /><br/><br/>
                            Content URL: <input type="text" id="edit-content-url" name="content_url" placeholder={this.props.content_url} /><br/><br/>
                            <input type='hidden' name='topic_id' id='topic-id' value={this.props.topic_id} />
                            <input type='hidden' name='content_id' id='content-id' value={this.props.content_id} />
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                                <input type="submit" className="btn btn-primary" data-dismiss="modal" value="Submit Edit to Curriculum" onClick={this.submitEdit}/>
                            </div>                            
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

        );
    }
}

export default ContentModal;