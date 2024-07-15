import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Synth.css";
import "../App.css";
import * as Tone from "tone";
import { toast } from "react-toastify";
import { baseUrl } from "../config";


import notes from "../assets/notes.js";
import oscillatorTypes from "../assets/oscillatorTypes.js";
import warpFrequencies from "../assets/warpFrequencies.js";



function Tinker() {
	const { synthId } = useParams();
	const navigate = useNavigate();
	const [gridSize, setGridSize] = useState(8);
	const [isNotes, setIsNotes] = useState(true);
	const [formData, setFormData] = useState({
		name: `My Synth`,
		a_d_s_r: [100, 200, 999, 300],
		waveform: "sine",
		effects: [
            { distortion: 1 },
            { chorus: [4, 8, 0.6] },
            { feedback: [0.01, 0.5]}
        ],
		freqs: warpFrequencies,
	});

	useEffect(() => {
		document.title = "Synth Adjustments";
	}, []);


	useEffect(() => {
		async function fetchSynth() {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.get(
					`${baseUrl}/synths/${synthId}/`,
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				setFormData(response.data);
				console.log(response.data)
			} catch (error) {
				toast.error("Error unpacking synth");
			}
		}
		fetchSynth();
	}, [synthId]);

	const gridArray = Array.from(
		{ length: gridSize * 4 },
		(_, index) => index + 1
	);

	// ! Note: be careful when manipulating the 'volume' parameter below:
	const volume = formData.waveform !== "sine" ? -24 : -12;

	const limiter = new Tone.Limiter(-64).toDestination();
	const distortion = new Tone.Distortion(
		formData.effects[0].distortion / 1000,
		"2x"
	).connect(limiter);
	const compressor = new Tone.Compressor(-30, 9).connect(distortion);
	const feedbackDelay = new Tone.FeedbackDelay({
		delayTime: `${formData.effects[2].feedback[0]}n.`,
		feedback: `${formData.effects[2].feedback[1]}`,
	}).connect(compressor);

	const chorus = new Tone.Chorus(
		formData.effects[1].chorus[0],
		formData.effects[1].chorus[1],
		formData.effects[1].chorus[2]
	).connect(feedbackDelay);

	const Synth = new Tone.Synth({
		oscillator: {
			type: formData.waveform,
		},
		envelope: {
			attack: formData.a_d_s_r[0] / 1000,
			decay: formData.a_d_s_r[1] / 1000,
			sustain: formData.a_d_s_r[2] / 1000,
			release: formData.a_d_s_r[3] / 1000,
		},
		volume: volume,
	}).connect(chorus);

	useEffect(() => {
		return () => {
			async function dispose() {
				Synth.dispose();
			}
			dispose();
		};
	});

	async function handleClick(e) {
		console.log(e.target.innerText);
		let noteToPlay = e.target.innerText;
		if (noteToPlay === "") {
			return;
		} else {
			await Tone.start();
			Synth.triggerAttack(`${noteToPlay}`);
		}
	}

	function handleMouseOff() {
		Synth.triggerRelease();
	}

	const formMappings = {
		attack: 0,
		decay: 1,
		sustain: 2,
		release: 3,
	};

	function handleIsNotes() {
		const newFormData = structuredClone(formData);
		if (isNotes) {
			setIsNotes(false);
			newFormData.freqs = warpFrequencies;
			setFormData(newFormData);
			console.log(newFormData.freqs);
		} else {
			setIsNotes(true);
			newFormData.freqs = notes;
			console.log(newFormData.freqs);
            setFormData(newFormData);
		}
	}

	function handleChange(e) {
		const { name, value } = e.target;
		const newFormData = structuredClone(formData);
		if (
			name.includes("attack") ||
			name.includes("decay") ||
			name.includes("sustain") ||
			name.includes("release")
		) {
			newFormData.a_d_s_r[formMappings[name]] = value;
		} else if (name === "name") {
			newFormData.name = value;
		} else if (name === "waveform") {
			newFormData.waveform = value;
		} else if (name === "distortion") {
			newFormData.effects[0].distortion = parseInt(value, 10);
			console.log("Distortion", newFormData.effects[0].distortion);
		} else if (name === "chorus") {
			newFormData.effects[1].chorus = value;
		} else if (name === "delay") {
			newFormData.effects[2].feedback[0] = value;
		} else if (name === "freqs") {
			newFormData.freqs = name;
		}
		setFormData(newFormData);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const token = localStorage.getItem("token");
			const { data } = await axios.put(
				`${baseUrl}/synths/${synthId}/`,
				formData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			toast.success("Settings saved!");
		} catch (err) {
			console.log(err.response.data);
			toast.error("Sorry, we have encountered an error!");
		}
	}

	async function handleDelete() {
		try {
			const token = localStorage.getItem("token");
			await axios.delete(`${baseUrl}/synths/${synthId}/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			toast.success("Synth removed from collection!");
			navigate("/collection");
		} catch (error) {
			toast.error("Sorry, we have encountered an error!");
		}
	}

	return (
		<>
			<h2 className="synth-header">{formData.name}</h2>
			{/* <div className="grid-container settings-grid-container"> */}

			<form onSubmit={handleSubmit}>
				<div className="name-field field">
					<label className="label">Name</label>
					<div className="control">
						<input
							className="input"
							type="text"
							name="name"
							onChange={handleChange}
							value={formData.name}
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Waveform</label>
					<div className="select is-primary">
						<select
							type="select"
							name="waveform"
							onChange={(e) => handleChange(e)}
							value={formData.waveform}
						>
							{oscillatorTypes.map((type, index) => (
								<option key={index} value={type}>
									{type}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="field">
					<label className="label">Attack</label>
					<div className="control">
						<input
							type="range"
							min="10"
							max="5000"
							name="attack"
							onChange={(e) => handleChange(e, 0)}
							value={formData.a_d_s_r[0]}
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Decay</label>
					<div className="control">
						<input
							type="range"
							min="10"
							max="2000"
							name="decay"
							onChange={(e) => handleChange(e, 1)}
							value={formData.a_d_s_r[1]}
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Sustain</label>
					<div className="control">
						<input
							type="range"
							min="1"
							max="999"
							name="sustain"
							onChange={(e) => handleChange(e, 2)}
							value={formData.a_d_s_r[2]}
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Release</label>
					<div className="control">
						<input
							type="range"
							min="1"
							max="5000"
							name="release"
							onChange={(e) => handleChange(e, 3)}
							value={formData.a_d_s_r[3]}
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Distortion</label>
					<div className="control">
						<input
							type="range"
							min="1"
							max="999"
							name="distortion"
							onChange={(e) => handleChange(e)}
							value={formData.effects[0].distortion[0]}
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Chorus</label>
					<div className="control">
						<input
							type="range"
							min="1"
							max="99"
							name="chorus"
							onChange={(e) => handleChange(e)}
							value={formData.effects[1].chorus}
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Delay</label>
					<div className="control">
						<input
							type="range"
							min="1"
							max="5"
							name="delay"
							onChange={(e) => handleChange(e)}
							value={formData.effects[2].feedback[0]}
						/>
					</div>
				</div>

				<button
					className="button"
					name="freqs"
					type="button"
					onClick={handleIsNotes}
				>
					{isNotes ? "Notes active" : "Warp active"}
				</button>
				<button className="button is-danger" type="submit">
					Save Settings
				</button>
			</form>
			<button className="button is-danger" onClick={handleDelete}>
				Delete Synth
			</button>
			<div className="grid-container synth-grid-container">
				{gridArray.map((index) => (
					<div
						key={index}
						name="freqs"
						className="freq-grid-item"
						onMouseDown={(e) => handleClick(e)}
						onMouseUp={(e) => handleMouseOff(e)}
						onMouseLeave={handleMouseOff}
						onTouchStart={(e) => handleClick(e)}
						onTouchEnd={handleMouseOff}
						onChange={(e) => handleChange(e)}
					>
						{formData.freqs[index - 1] / 100}
					</div>
				))}
			</div>
		</>
	);
}

export default Tinker;
