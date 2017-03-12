import React, { Component } from 'react';
import ProgressItem from './progress-item.js'

class ProgressList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progressData: this.props.progressData
        };
    }

    render() {
        var progressItems = this.props.progressData.map(result => (
                
                <ProgressItem key='1'
                              topic={result[0]}
                              completed={result[1]}
                              incomplete={result[2]} /> ))

        return (
            <div id='page'>
                {progressItems}
            </div>
        );

    }
}

export default ProgressList;