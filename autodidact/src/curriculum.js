import React, {Component} from 'react';
import ContentList from './content-list.js'
import $ from 'jquery'
import AddContentToCurricButton from './add-content-to-curric-button.js'

class Curriculum extends Component {

    constructor() {
        super()
        this.state = {
            content: []
        }
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
                <div id='container'>
                    <ContentList content={this.state.content} />
                    <AddContentToCurricButton topic_id={this.state.topic_id}/>
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
