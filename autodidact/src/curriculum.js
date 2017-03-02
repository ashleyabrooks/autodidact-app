import React, {Component} from 'react';
import ContentList from './content-list.js'
import $ from 'jquery'
import AddContentToCurricButton from './add-content-to-curric-button.js'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Link } from 'react-router';

class Curriculum extends Component {

    constructor() {
        super()
        this.state = {
            content: [],
            checkboxes: [],
            currentView: ''
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {

        var topic_id = this.props.location.query.topic_id
        var content_status = this.props.location.pathname

        var data_to_send = 
                {'topic_id': topic_id, 
                'content_status': content_status};

        this.setState({topic_id: topic_id,
                       content_status: content_status})

        $.post('http://localhost:5000/curriculum.json', data_to_send).done(response =>
            this.setState({content: response.data}), function() {}.bind(this));
    }

    handleClick() {
        this.setState({content_status: this.props.location.pathname})
        console.log(this.state.content_status)
    }

    render() {
        if (this.state.content)
            return (
                <div>
                <ul className="nav nav-tabs">
                    <li role="presentation" ><Link to={{ pathname: '/topics/content/all?topic_id=2', query: { topic_id: this.props.topic_id } }} onClick={this.handleClick}>All</Link></li>
                    <li role="presentation" className="active"><Link to={{ pathname: '/topics/content/active?topic_id=2', query: { topic_id: this.props.topic_id } }} onClick={this.handleClick}>Active</Link></li>
                    <li role="presentation"><Link to={{ pathname: '/topics/content/completed?topic_id=2', query: { topic_id: this.props.topic_id } }} onClick={this.handleClick}>Completed</Link></li>
                </ul>
                    <AddContentToCurricButton topic_id={this.state.topic_id}/>
                    <ContentList content={this.state.content} />
                    
                    
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