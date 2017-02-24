var AddContentToCurricButton = React.createClass({

    addContentToCurric: function(e) {
        e.preventDefault();

        var newContent = {
            'content_title': $('#content-title-create').val(),
            'content_url': $('#content-url-create').val(),
            'content_type': $('#content-type-create').val(),
            'topic_id': this.props.topic_id,
        };

        $.post('/create-content', newContent, function() {
            console.log('added content');
        });
    },

    render: function() {
        return (
            <div>
                <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal">
                  Add Content to Curriculum
                </button>

                <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title" id="myModalLabel">Add New Content</h4>
                      </div>
                      <div className="modal-body">
                            <form>
                                Content Title: <input type='text' name='content_title' id='content-title-create' /><br/><br/>
                                Content URL: www.<input type='text' name='content_url' id='content-url-create' /><br/><br/>
                                Content Type:<br/>
                                    Article <input type='radio' name='content_type' value='article' id='content-type-create'/>
                                    Video <input type='radio' name='content_type' value='video' id='content-type-create'/>
                                    Book <input type='radio' name='content_type' value='book' id='content-type-create'/>
                                    Note <input type='radio' name='content_type' value='note' id='content-type-create'/>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    <input type="submit" className="btn btn-primary" data-dismiss="modal" value='Add to Curriculum' onClick={this.addContentToCurric} />
                                </div>
                            </form>
                      </div>
                      
                    </div>
                  </div>
                </div>
            </div>
        );
    }
});