import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Synth.css";
import notes from "../assets/notes.js";
import * as Tone from "tone";
import { toast } from "react-toastify";

export default function Synth() {
	const [gridSize, setGridSize] = useState(8);
	const [sliderOne, setSliderOne] = useState(50);


	const gridArray = Array.from(
		{ length: gridSize * 4 },
		(_, index) => index + 1
	);


	const chorus = new Tone.Chorus(4, 2.5, 0.5).start();
	const limiter = new Tone.Limiter(-6).toDestination();
	const dist = new Tone.Distortion(0.8).toDestination();
	const compressor = new Tone.Compressor(-30, 3);
	
	const [formData, setFormData] = useState({
		name: "",
		a_d_s_r: [chorus, limiter, dist],
		freq: [0, 0, 0, 0],
	});

	// ! EQ not working
	const equaliser = new Tone.EQ3({
		low: 64,
		mid: -64,
		high: -64,
	});

	const fmSynth = new Tone.FMSynth({
		envelope: {
			attack: 0.2,
			decay: 0.2,
			sustain: 0.1,
			release: 0.3,
	}}).connect(equaliser).connect(dist).connect(chorus).connect(compressor).connect(limiter);


	async function handleClick(e) {
		console.clear();
		console.log(e.target.innerText);
		let noteToPlay = e.target.innerText;
		if (noteToPlay === "") {
			return;
		} else {
			await Tone.start();
			fmSynth.triggerAttackRelease(`${noteToPlay}`, '4n');
		}
	}

	// function handleSliderChange(event) {
	// 	setSliderOne(event.target.value);
	// }

	// async function handleSubmit(e) {
	// 	e.preventDefault();
	// 	try {
	// 		const token = localStorage.getItem("token");
	// 		const { data } = await axios.post(`http://localhost:8000/api/synthesiser/`, formData, {
	// 			headers: { Authorization: `Bearer ${token}` },
	// 		});
	// 		toast.success("Synth added to your collection!");
	// 		navigate("/collection");
	// 	} catch (err) {
	// 		toast.error("Sorry, we have encountered an error!");
	// 	}
	// }

	// function handleChange(e) {
	// 	const newFormData = structuredClone(formData);

	// 	newFormData[e.target.name] = e.target.value;
	//     console.log(newFormData[e.target.name]);
	//     console.log(e.target.name);
	// 	setFormData(newFormData);
	// }

	return (
		<>
			<h2 className="home-header">Synth</h2>
			{/* <div className="grid-container settings-grid-container"> */}

			{/* </div> */}
			{/* <form onSubmit={handleSubmit}>
					<div className="field">
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
						<label className="label">Attack</label>
						<div className="control">
							<select
								className="input"
								type="number"
								name="size"
								onChange={handleChange}
								value={formData.a_d_s_r}
							></select>
						</div>
					</div>
					<div className="field">
						<label className="label">
							Freq
						</label>
						<div className="control">
							<input
								className="input"
								type="number"
								name="Freq"
								onChange={handleChange}
								value={formData.freq}
							/>
						</div>
					</div>
                    
					<button className="button" type="submit">
						Create Shirt
					</button>
				</form>
			</div> */}
			<div className="grid-container synth-grid-container">
				{gridArray.map((index) => (
					<div
						key={index}
						className="grid-item"
						onClick={(e) => handleClick(e)}
					>
						{notes[index]}
					</div>
				))}
			</div>
		</>
	);
}
