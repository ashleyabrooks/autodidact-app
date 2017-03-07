import React, {Component} from 'react';
import $ from 'jquery';
// import ProgressList from './progress-list.js'
import ProgressItem from './progress-item.js'

// var Donut = require("react-chartjs").Doughnut;


class Overview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            progressData: '',
        };
        this.componentWillMount = this.componentWillMount.bind(this);

    }

    componentWillMount() {
        $.getJSON('http://localhost:5000/get-progress.json').done(response => {
            console.log('in cwm:',response.data);
            this.setState({
                progressData: response.data})});
    }

    render() {
        console.log('in render: ',this.state.progressData)
        if (this.state.progressData)

            var progressList = this.props.progressData.map(result => (
                        
                <ProgressItem key={result[0]}
                              completed={result[1]}
                              incomplete={result[2]} /> ));

            console.log('progress list:', progressList)
            
            return (
                <div>ITEMS:
                    {progressList}
                </div>
            );
    }
}

export default Overview;

// <b>Completed # of Items:</b> {this.state.completedContent}
//                         <br/>
//                         <b>Active # of Items:</b> {this.state.activeContent}

