import { Link, useLocation } from "react-router-dom";
import {useEffect, useState } from "react"
import { toast } from "react-toastify"
import '../App.css'

function Navbar() {
    const location = useLocation()
    const [isLoggedIn, setIsLoggedIn]= useState(localStorage.getItem('token'))
    
    useEffect(() =>{
    setIsLoggedIn(localStorage.getItem('token'))
    }, [location])
    
    function logout() {
      toast.success(`Thank you for visiting!`)
      setIsLoggedIn(false)
      localStorage.removeItem('token')
    }




	return (
		<>
			<div className="static-navbar-left">
				<div className="static-navbar-left-content">L</div>
				<div className="static-navbar-left-content">T</div>
				<div className="static-navbar-left-content">S</div>
			</div>
			<div className="navbar-container">
            <div className="navbar-main">OSING</div>
				<div className="navbar-main">HURSDAY</div>
				<div className="navbar-main">ANITY</div>
				
				<div id="navbar-links">
                <Link to="/" className="button is-link is-outlined" draggable="false">
					Home
				</Link>
				{isLoggedIn &&<Link to="/synth" className="button is-warning is-link" draggable="false">
					Create Synth
				</Link>}
				{!isLoggedIn &&<Link to="/auth/signup" className="button is-link" draggable="false">
					Signup
				</Link>}
				{!isLoggedIn &&<Link to="/auth/login" className="button is-link" draggable="false">
					Login
				</Link>}
				{isLoggedIn &&<Link to="/collection" className="button is-link" draggable="false">
					Collection
				</Link>}
				{isLoggedIn &&<button className="button" onClick={logout}>Logout</button>}
                </div>
			</div>
		</>
	);
}
export default Navbar;
