import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Forms.css";
import { baseUrl } from "../config";

function Login() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	function handleChange(e) {
		const newFormData = structuredClone(formData);
		newFormData[e.target.name] = e.target.value;
		setFormData(newFormData);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				`${baseUrl}/auth/login/`,
				formData
			);
			toast.success(`Welcome, ${formData.username}`);
			const token = data.token;

			localStorage.setItem("token", token);
			navigate("/");
		} catch (err) {
			toast.error("Login failed");
		}
	}

	return (
		<div className="section">
			<div className="auth-form container">
				<form onSubmit={handleSubmit}>
					<div className="field">
						<label className="label" htmlFor="username">
							Username
						</label>
						<div>
							<input
								className="input"
								type="text"
								name="username"
								onChange={handleChange}
								value={formData.username}
							/>
						</div>
					</div>
					<div className="field">
						<label className="label" htmlFor="password">
							Password
						</label>
						<div>
							<input
								className="input"
								type="password"
								name="password"
								onChange={handleChange}
								value={formData.password}
							/>
						</div>
					</div>
					<button className="button is-danger" type="submit">
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;