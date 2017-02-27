import React, {Component} from 'react';
import NewTopicTextField from './new-topic-textfield.js'

class AddContentButton extends Component {

    constructor() {
        super()
        this.state = {
            showTextField: false
        }
    }

    showTextField() {
        this.setState({
            showTextField: true
        });
    }

    render() {
        return (
            <div>
                <button type='button' onClick={ this.showTextField }>{this.props.cta}</button>
                { this.state.showTextField ? <NewTopicTextField /> : null }
            </div>
        );
    }
}

export default AddContentButton;