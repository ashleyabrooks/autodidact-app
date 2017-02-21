var AddContentToCurricButton = React.createClass({
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
                            <form action='/create-content'>
                                Content Title: <input type='text' name='content_title' /><br/><br/>
                                Content URL: www.<input type='text' name='content_url' /><br/><br/>
                                Content Type:<br/>
                                    Article <input type='radio' name='content_type' value='article' />
                                    Video <input type='radio' name='content_type' value='video' />
                                    Book <input type='radio' name='content_type' value='book' />
                                    Note <input type='radio' name='content_type' value='note' />
                                <input type='hidden' name='topic_id' value='1' />

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    <input type="submit" className="btn btn-primary" value='Add to Curriculum' />
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