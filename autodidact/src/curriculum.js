import React, {Component} from 'react';
import ContentList from './content-list.js'
import $ from 'jquery'
import AddContentToCurricButton from './add-content-to-curric-button.js'
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
import { Link } from 'react-router';

class Curriculum extends Component {

    constructor() {
        super()
        this.state = {
            content: [],
            currentView: ''
        };
    }

    componentWillReceiveProps() {
        var topic_id = this.props.location.query.topic_id
        var content_view = this.props.location.query.content_view

        var data_to_send = 
                {'topic_id': topic_id, 
                'content_view': content_view};

        this.setState({topic_id: topic_id,
                       currentView: content_view})

        $.post('http://localhost:5000/curriculum.json', data_to_send).done(
            response => { console.log("cwrp callback done", response.data); 
                          console.log("this=", this);
                          this.setState({content: response.data})
                         });
    }

    componentWillMount() {

        var topic_id = this.props.location.query.topic_id
        var content_view = this.props.location.query.content_view

        var data_to_send = 
                {'topic_id': topic_id, 
                'content_view': content_view};

        this.setState({topic_id: topic_id,
                       currentView: content_view})
        
        $.post('http://localhost:5000/curriculum.json', data_to_send).done(response => {
            this.setState({content: response.data})});
    }

    render() {
        if (this.state.content.length)
            return (
                <div>
                <ul className="nav nav-tabs">
                    <li role="presentation"><Link to={{ pathname: '/topics/content', query: { topic_id: this.state.topic_id, content_view: 'all' }  }}> All </Link></li>
                    <li role="presentation" className="active"><Link to={{ pathname: '/topics/content', query: { topic_id: this.state.topic_id, content_view: 'active' } }}> Active </Link></li>
                    <li role="presentation"><Link to={{ pathname: '/topics/content', query: { topic_id: this.state.topic_id, content_view: 'completed' } }}> Completed </Link></li>
                </ul>

                    <div className='page'>
                        <AddContentToCurricButton topic_id={this.state.topic_id}/>
                        <ContentList content={this.state.content} />
                    </div>
                    
                </div>
            );
        return (
            <div>
                Add content to create a curriculum.
                <AddContentToCurricButton topic_id={this.state.topic_id}/>
                
            </div>
        );
    }
}

export default Curriculum;