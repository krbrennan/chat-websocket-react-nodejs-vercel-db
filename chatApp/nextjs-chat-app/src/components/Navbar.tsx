import { auth } from '../../utils/firebase';
import { signOut } from 'firebase/auth';

type NavbarProps = {
    isLoggedIn: boolean;
}


function Navbar({isLoggedIn}: NavbarProps) {

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="nav-container">
            <div className="logo-left">
                <a href="/">Chit</a>
            </div>
            <div className="right-nav">
                {isLoggedIn ? (
                    <>
                        <a href="/profile">Profile</a>
                        <a href="/" onClick={handleLogout}>Logout</a>
                    </>
                ) : (
                    <a href="/login">Login</a>
                )}
            </div>
        </div>
    );
}

export default Navbar;