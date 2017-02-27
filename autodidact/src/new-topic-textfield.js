import React, {Component} from 'react';
import $ from 'jquery'


class NewTopicTextField extends Component {

    addNewTopic(e) {
        e.preventDefault();

        var newTopicInput = {
            'newTopic': $('#new-topic-name').val()
        };

        console.log(newTopicInput.newTopic);

        $.post('/create-topic', newTopicInput, function() {
            this.props.router.push('/#/topics/content?topic_id=' + this.props.topic_id);
            console.log('Added new topic')
        })
    }

    render() {
        return (
            <div>
                <form>
                    <input type='text' id='new-topic-name' />
                    <input type='submit' name='submit-new-topic' onClick={ this.addNewTopic }/>
                </form>
            </div>
        );
    }
}

export default NewTopicTextField;