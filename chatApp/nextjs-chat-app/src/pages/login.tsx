
// In your Next.js component or page, e.g., pages/login.js
import { auth } from '../../utils/firebase'; // Adjust path if needed
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';




type LoginProps = {
    setIsLoggedIn: (value: boolean) => void;
};



function Login({ setIsLoggedIn }: LoginProps) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const handleLogin = async (email: string, password: string) => {
    const handleLogin = async (e: React.FormEvent) => {
        console.log("ok")
        e.preventDefault();
        console.log(e)
        // const email = (e.target as HTMLFormElement).email.value;
        // const password = (e.target as HTMLFormElement).password.value;

        // const data = {
        //     email,
        //     password,
        // };

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // User is logged in!
            setIsLoggedIn(true);
            // send user to home page
            window.location.href = '/';
        } catch (error) {
            // Handle errors
            alert("Login failed. Please check your credentials.");
        }
    };


    return(
        <div className="login-container">
            <h1>Login</h1>
            <div className="form-container">
                <form onSubmit={handleLogin}>
                    <div className="email-field">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="password-field">
                        <label htmlFor="password">Password:</label>
                        <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                        onChange={e => setPassword(e.target.value)}
                        // onKeyDown={(e) => {
                        // if (e.key == "Enter") {
                        //     console.log('ENTERRRRR')
                        //     {handleLogin};
                        //     }
                        // }}
                        />
                    </div>
                    {/* <button onClick={handleLogin} type="button">Login</button> */}
                    <button type="submit">Login</button>
                </form>
                <div className="form-footer">
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login;