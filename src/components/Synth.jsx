import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Synth.css";
import notes from "../assets/notes.js";
import * as Tone from "tone";
import { toast } from "react-toastify";


function Synth() {
	const navigate = useNavigate();
	const [gridSize, setGridSize] = useState(8);
	const [formData, setFormData] = useState({
		name: "My Synth",
		a_d_s_r: [100, 200, 100, 300],
        effects: [
            { distortion: 0.5 },
            { chorus: [4, 2.5, 0.5] },
        ],
		freqs: [2, 2, 2, 2],
	});
    
    console.log(formData.effects[0]);
    

	const gridArray = Array.from(
		{ length: gridSize * 4 },
		(_, index) => index + 1
	);

	const chorus = new Tone.Chorus(4, 2.5, 0.5).start();
	const limiter = new Tone.Limiter(-6);
	const dist = new Tone.Distortion(formData.effects.distortion);
	const compressor = new Tone.Compressor(-30, 3);

	// ! EQ not working
	// const equaliser = new Tone.EQ3({
	// 	low: -16,
	// 	mid: -16,
	// 	high: -16,
	// });



	const fmSynth = new Tone.FMSynth({
		envelope: {
			attack: (formData.a_d_s_r[0] / 1000),
			decay: (formData.a_d_s_r[1] / 1000),
			sustain: (formData.a_d_s_r[2] / 1000),
			release: (formData.a_d_s_r[3] / 1000),
		},

	})
    // .connect(equaliser)
    .connect(dist)
    .connect(chorus)
    .connect(compressor)
    .connect(limiter)
    .toDestination();
    
	async function handleClick(e) {
        console.clear();
		console.log(e.target.innerText);
		let noteToPlay = e.target.innerText;
		if (noteToPlay === "") {
            return;
		} else {
            await Tone.start();
			fmSynth.triggerAttackRelease(`${noteToPlay}`, "4n");
		}
	}
    
    const formMappings = {
        attack: 0,
        decay: 1,
        sustain: 2,
        release: 3
    }
    
	function handleChange(e) {
        const { name, value } = e.target
        const newFormData = structuredClone(formData);
        if (name.includes('attack') || name.includes('decay') || name.includes('sustain') || name.includes('release')) {
            newFormData.a_d_s_r[formMappings[name]] = value;

        } else if (name === 'name') {
            newFormData.name = value;
            
            console.log('Name: ', newFormData.name)
        } else if (name === 'distortion') {
            newFormData.effects[0].distortion = value;
        } else if (name === 'chorus') {
            newFormData.effects[1].chorus = value;

        }
        setFormData(newFormData)
    
    }


	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const token = localStorage.getItem("token");
			const { data } = await axios.post(
				`http://localhost:8000/api/synths/`,
				formData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			toast.success("Synth added to your collection!");
			navigate("/collection");
		} catch (err) {
            console.log(err.response.data);
			toast.error("Sorry, we have encountered an error!");
		}
	}

	return (
		<>
			<h2 className="home-header">{formData.name}</h2>
			{/* <div className="grid-container settings-grid-container"> */}

			<form onSubmit={handleSubmit}>
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
					<label className="label">Attack (ms)</label>
					<div className="control">
						<input
							type="range"
							min="0"
							max="2000"
							name="attack"
							onChange={(e) => handleChange(e, 0)}
							value={formData.a_d_s_r[0]}
						/>
						<span>{formData.a_d_s_r[0]} ms</span>
					</div>
				</div>
				<div className="field">
					<label className="label">Decay (ms)</label>
					<div className="control">
						<input
							type="range"
							min="0"
							max="2000"
							name="decay"
							onChange={(e) => handleChange(e, 1)}
							value={formData.a_d_s_r[1]}
						/>
						<span>{formData.a_d_s_r[1]} ms</span>
					</div>
				</div>
				<div className="field">
					<label className="label">Sustain (ms)</label>
					<div className="control">
						<input
							type="range"
							min="0"
							max="999"
							name="sustain"
							onChange={(e) => handleChange(e, 2)}
							value={formData.a_d_s_r[2]}
						/>
						<span>{formData.a_d_s_r[2]} ms</span>
					</div>
				</div>
				<div className="field">
					<label className="label">Release (ms)</label>
					<div className="control">
						<input
							type="range"
							min="0"
							max="2000"
							name="release"
							onChange={(e) => handleChange(e, 3)}
							value={formData.a_d_s_r[3]}
						/>
						<span>{formData.a_d_s_r[3]} ms</span>
					</div>
				</div>
                <div className="field">
					<label className="label">Distortion</label>
					<div className="control">
						<input
							type="range"
							min="0"
							max="99"
							name="distortion"
							onChange={(e) => handleChange(e)}
							value={formData.effects.distortion}
						/>
						<span>{formData.effects.distortion}</span>
					</div>
				</div>

				<button className="button" type="submit">
					Create Synth
				</button>
			</form>

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

export default Synth;