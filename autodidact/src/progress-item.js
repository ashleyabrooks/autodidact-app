import React, {Component} from 'react';

class ProgressItem extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         topic_name: this.props.topic_name,
    //         completed: this.props.completed,
    //         incomplete: this.props.incomplete
    //     };
    // }

    render() {
        return (
            <div>
                {this.props.topic_name} 
                - completed: {this.props.completed} 
                - incomplete: {this.props.incomplete}
            </div>
        );
    }
}

export default ProgressItem;