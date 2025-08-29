import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../utils/firebase'; 


function Register(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;

        try {
            if(email.length == 0) {
                await createUserWithEmailAndPassword(auth, form.email.value, form.password.value)
            } else {
                await createUserWithEmailAndPassword(auth, email, password)
            }
            window.location.href = "/";
        } catch (error) {
            alert(error + " Registration failed. Did you get an actionable error eh?")
        }

        console.log(email,password)
    }

    return(
        <div className="register-container">
            <h1>Register</h1>
            <div className="form-container">
                <form onSubmit={handleRegister}>
                    <div className="email-field">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required onChange={ e => setEmail(e.target.value)} />
                    </div>
                    <div className="password-field">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required onChange={ e => setPassword(e.target.value) } />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <div className="form-footer">
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    )
}

export default Register;