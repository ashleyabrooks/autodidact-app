import React, {Component} from 'react';
import ContentList from './content-list.js'
import $ from 'jquery'
import AddContentToCurricButton from './add-content-to-curric-button.js'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Link } from 'react-router'

class Curriculum extends Component {

    constructor() {
        super()
        this.state = {
            content: [],
            checkboxes: [],
            currentView: ''
        };
    }

    componentDidMount() {

        var topic_id = this.props.location.query.topic_id

        this.setState({topic_id: topic_id})

        $.post('http://localhost:5000/curriculum.json', 
            {data: topic_id})
            .done(function(response) {
                this.setState({content: response.data});
        }.bind(this));
    }

    render() {
        if (this.state.content)
            return (
                <div>
                <ul className="nav nav-tabs">
                    <li role="presentation" className="active"><Link to='/topics/content/all'>All</Link></li>
                    <li role="presentation"><Link to='/topics/content/active'>Active</Link></li>
                    <li role="presentation"><Link to='/topics/content/completed'>Completed</Link></li>
                </ul>
                    <AddContentToCurricButton topic_id={this.state.topic_id}/>
                    <ContentList content={this.state.content} />
                    
                    {this.props.children}
                </div>
            );
        return (
            <div>
                Add content to create a curriculum.
                <AddContentToCurricButton topic_id={this.state.topic_id}/>
                {this.props.children}
            </div>
        );
    }
}

export default Curriculum;