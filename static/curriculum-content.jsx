'use strict';

var CurriculumContent = React.createClass({

    getInitialState: function() {
        return {
            content: []
        }
    },

    componentDidMount: function() {

        var topic_id = this.props.location.query.topic_id

        console.log(topic_id)

        $.post('/curriculum.json', 
            {data: topic_id})
            .done(function(response) {
                this.setState({content: response.data});
        }.bind(this));
    },

    render: function() {
        if (this.state.content)
            return (
                <div>
                    <ContentList content={this.state.content} />
                    <AddContentToCurricButton topic_id={this.topic_id}/>
                </div>
            );
        return (
            <div>
                Add content to create a curriculum.
                <AddContentToCurricButton topic_id={this.topic_id}/>
            </div>
        );
    }
});

var ContentList = React.createClass({

    render: function() {
        var contentList = this.props.content.map(function(result) {
            return (<ContentItem key={result[2]}
                                 content_id={result[2]} 
                                 content_title={result[0]} 
                                 url={result[1]} 
                                 content_type={result[3]} 
                                 topic_id={result[4]}/>);
        })

        return (
            <div>
                <ul>
                    <b>Content:</b> {contentList}
                </ul>
            </div>
        );
    }
});

var ContentItem = React.createClass({

    getInitialState: function() {
        return {
            showEditButton: false
        }
    },

    showEditButton: function() {
        this.setState({
            showEditButton: true
        })
    },

    hideEditButton: function() {
        this.setState({
            showEditButton: false
        })
    },

    createContentURL: function() {
        var url = this.props.url
        console.log(url)
    },
    
    render: function() {
        return (
            <div onMouseEnter={this.showEditButton} onMouseLeave={this.hideEditButton}>
                <a href='http:/\\//www.{this.props.url}' >
                    {this.props.content_title}
                </a>
                {this.state.showEditButton ? <EditContentModal content_title={this.props.content_title} 
                                                               content_url={this.props.url}
                                                               content_type={this.props.content_type}
                                                               topic_id={this.props.topic_id}
                                                               content_id={this.props.content_id} /> : null}
            </div>
        );
    }
});

var EditContentModal = React.createClass({

    submitEdit: function(e) {
        e.preventDefault();

        var editContentInput = {
            'new_content_title': $('#edit-content-title').val(),
            'new_content_url': $('#edit-content-url').val(),
            'content_id': $('#content-id').val(),
            'topic_id': $('#topic-id').val()
        };

        console.log(editContentInput);

        $.post('/edit-content', editContentInput, function() {
            ContentList.forceUpdate()
        })
    },

    render: function() {
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
});

var AddContentToCurricButton = React.createClass({

    addContentToCurric: function(e) {
        e.preventDefault();

        var newContent = {
            'content_title': $('#content-title').val(),
            'content_url': $('#content-url').val(),
            'content_type': $('#content-type').val(),
            'topic_id': $('#topic-id').val()
        };

        console.log(newContent);

        $.post('/create-content', newContent, function() {
            ContentList.forceUpdate()
        })
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
                                Content Title: <input type='text' name='content_title' id='content-title' /><br/><br/>
                                Content URL: www.<input type='text' name='content_url' id='content-url' /><br/><br/>
                                Content Type:<br/>
                                    Article <input type='radio' name='content_type' value='article' id='content-type'/>
                                    Video <input type='radio' name='content_type' value='video' id='content-type'/>
                                    Book <input type='radio' name='content_type' value='book' id='content-type'/>
                                    Note <input type='radio' name='content_type' value='note' id='content-type'/>
                                <input type='hidden' name='topic_id' value={this.props.topic_id} id='topic-id' />

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    <input type="submit" className="btn btn-primary" value='Add to Curriculum' onClick={this.addContentToCurric} />
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