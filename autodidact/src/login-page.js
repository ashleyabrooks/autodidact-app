import React, {Component} from 'react';

class LoginPage extends Component {
    render() {
        return (
            <div>    
                <h1>Welcome! Login or create an account to get started with Autodidact.</h1>

                <form action='/handle-login' method='POST'>
                    
                    Email: <input type='text' name='user_email'/><br/><br/>
                    Password: <input type='password' name='user_pw' maxLength='70'/><br/><br/>
                    
                    <input type='submit' name='login' value='Login'/>
                    <input type='submit' name='create-account' value='Create New Account'/>
                
                </form>
            </div>
        );
    }
}

export default LoginPage;