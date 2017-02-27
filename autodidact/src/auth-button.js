import React, {Component} from 'react';
import $ from 'jquery'

class AuthenticationButton extends Component {

    handleLogout() {
        $.get('/logout', function() {
            this.setState({auth: 'Login'})
            console.log('Logged out')
        })
    }


    render() {
        return (
            <div>
                <button type='button' onClick={this.handleLogout}>
                    Logout
                </button>
            </div>
        );
    }
}

export default AuthenticationButton;