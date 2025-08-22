
function Register(){
    return(
        <div className="register-container">
            <h1>Register</h1>
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