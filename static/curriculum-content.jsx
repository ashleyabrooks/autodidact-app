'use strict';

var CurriculumContent = React.createClass({

    getInitialState: function() {
        return {
            content: []
        }
    },

    componentDidMount: function() {

        var topic_id = this.props.location.query.topic_id

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
                    <AddContentToCurricButton />
                </div>
            );
        return (
            <div>
                Add content to create a curriculum.
                <AddContentToCurricButton />
            </div>
        );
    }
});

var ContentList = React.createClass({

    render: function() {
        var contentList = this.props.content.map(function(result) {
            return (<ContentItem key={result[3]} content={result[0]} url={result[1]}/>);
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

    onMouseEnter: function() {
        this.setState({
            showEditButton: true
        })
    },

    onMouseLeave: function() {
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
            <div>
                <a href='http:/\\//www.{this.props.url}'>{this.props.content}</a>
                {this.state.showEditButton ? <EditContentButton /> : null}
            </div>
        );
    }
});

var EditContentButton = React.createClass({
    render: function() {
        return (
            <div class="glyphicon glyphicon-pencil" aria-hidden='true' />
        );
    }
});

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