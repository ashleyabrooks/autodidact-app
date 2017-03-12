import React, {Component} from 'react';
import $ from 'jquery';
// import ProgressList from './progress-list.js'
import ProgressItem from './progress-item.js'

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

    // render() {
    //     console.log('in render: ',this.state.progressData)
    //     if (this.state.progressData)

    //         var progressList = this.props.progressData.map(result => (
                        
    //             <ProgressItem key={result[0]}
    //                           completed={result[1]}
    //                           incomplete={result[2]} /> ));

    //         console.log('progress list:', progressList)
            
    //         return (
    //             <div>ITEMS:
    //                 {progressList}
    //             </div>
    //         );
    // }
    render() {
        return (
            <div className='page'> <h3>Your Curriculum Progress</h3>
                <div id='overview-page'>
                    <table id="progressTable" className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>
                                Topic
                            </th>
                            <th>
                                Total # of Items
                            </th>
                            <th>
                                # Items Completed
                            </th>
                            <th>
                                # Items Active
                            </th>
                            <th>
                                % Completion
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Overview;

// <b>Completed # of Items:</b> {this.state.completedContent}
//                         <br/>
//                         <b>Active # of Items:</b> {this.state.activeContent}

