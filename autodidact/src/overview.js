import React, {Component} from 'react';
import $ from 'jquery';
import ProgressChart from './progress-chart.js'


class Overview extends Component {

    constructor(props) {
        super(props)
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            completedContent: '',
            activeContent: '',
            progressData: '',
        }
    }

    componentDidMount() {
        $.getJSON('http://localhost:5000/get-progress.json').done(response =>
            this.setState({completedContent: response.data[0],
                          activeContent: response.data[1] }), function() {}.bind(this));
    }

    render() {
        if (this.state.completedContent && this.state.activeContent)
            return (
                <div>
                    <h3>Progress:</h3><br/>
                        Completed: {this.state.completedContent}
                        <br/>
                        Active: {this.state.activeContent}
                        
                </div>
            );
        return (
            <div>
                Add content to view your progress!
            </div>
        );
    }
}

export default Overview;