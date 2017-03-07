import React, {Component} from 'react';

class LoginPage extends Component {
    render() {
        return (
            <div className='page'>    
                <h3>Welcome! Login or create an account to get started with Autodidact.</h3><br/>

                <form action='/handle-login' method='POST'>
                    
                    Email: <input type='text' name='user_email'/><br/><br/>
                    Password: <input type='password' name='user_pw' maxLength='70'/><br/><br/>
                    
                    <input type='submit' name='login' value='Login' className='content-button'/> &nbsp;
                    <input type='submit' name='create-account' value='Create New Account' className='content-button'/>
                
                </form>
            </div>
        );
    }
}

export default LoginPage;