

type NavbarProps = {
    isLoggedIn: boolean;
}


function Navbar({isLoggedIn}: NavbarProps) {
    return (
        <div className="nav-container">
            <div className="logo-left">
                <a href="/">Chit</a>
            </div>
            <div className="right-nav">
                {isLoggedIn ? (
                    <a href="/profile">Profile</a>
                ) : (
                    <a href="/login">Login</a>
                )}
            </div>
        </div>
    );
}

export default Navbar;