import React, {Component} from 'react';
import $ from 'jquery';
// import ProgressChart from './progress-chart.js'

var Donut = require("react-chartjs").Doughnut;


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
            this.setState({
                completedContent: response.data[0],
                activeContent: response.data[1],
                }), function() {}.bind(this));

        // var completed = this.props.completedContent
        // var active = this.props.activeContent

        var labels;
        var datasets;

        var progressData = [
            labels: [
                "Active",
                "Completed"
            ],
            datasets: [
                {
                    data: [50, 30],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB"
                    ]
                }]
        ]

        this.setState({progressData: progressData}, function() {}.bind(this));

    }

    render() {
        console.log(this.state.progressData)
        if (this.state.progressData)
            return (
                <div className='page'>
                    <Donut data={this.props.progressData} />
                        
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

// <h3>Progress:</h3><br/>
//     <b>Completed # of Items:</b> {this.state.completedContent}
//     <br/>
//     <b>Active # of Items:</b> {this.state.activeContent}