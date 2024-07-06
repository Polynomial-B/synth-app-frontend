import { Link } from "react-router-dom";
import '../App.css'

function Navbar() {
	return (
		<>
			<div className="static-navbar-left">
				<div className="static-navbar-left-content">L</div>
				<div className="static-navbar-left-content">T</div>
				<div className="static-navbar-left-content">P</div>
			</div>
			<div className="navbar-container">
            <div className="navbar-main">OSE</div>
				<div className="navbar-main">HE</div>
				<div className="navbar-main">ROJECT</div>
				<div id="navbar-links">
                <Link to="/" className="button is-link is-outlined" draggable="false">
					Home
				</Link>
				<Link to="/synth" className="button is-warning is-link" draggable="false">
					Synth
				</Link>
				<Link to="/auth/signup" className="button is-link" draggable="false">
					Signup
				</Link>
				<Link to="/auth/login" className="button is-link" draggable="false">
					Login
				</Link>
                </div>
			</div>
		</>
	);
}
export default Navbar;
