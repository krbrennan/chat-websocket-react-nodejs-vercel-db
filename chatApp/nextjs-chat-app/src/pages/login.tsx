
// In your Next.js component or page, e.g., pages/login.js
import { auth } from '../../utils/firebase'; // Adjust path if needed
import { signInWithEmailAndPassword } from 'firebase/auth';

// ... inside your component
const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // User is logged in!
  } catch (error) {
    // Handle errors
  }
};


function Login(){
    return(
        <div className="login-container">
            <h1>Login</h1>
            <div className="form-container">
                <form>
                    <div className="email-field">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="password-field">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button onClick={handleLogin} type="button">Login</button>
                </form>
                <div className="form-footer">
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login;