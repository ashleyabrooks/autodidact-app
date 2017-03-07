import React, {Component} from 'react';
import { Link } from 'react-router';

class Homepage extends Component {
    render() {
        return (
            <div className='container-fluid' id='homepage'>
                <div id='homepage-div-block'>
                    
                        <h2>Hello, Autodidact!</h2>
                            <p> An app to help self-learners organize their self-learning. </p>
                            <button className='content-button'><Link to='/login' id='homepage-login-link'>Build Your Curriculum</Link></button>
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    
                </div>
            </div>
        );
    }
}

export default Homepage;