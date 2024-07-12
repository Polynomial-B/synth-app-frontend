import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Synth.css";
import * as Tone from "tone";
import { toast } from "react-toastify";
import notes from "../assets/notes.js";
import oscillatorTypes from "../assets/oscillatorTypes.js";
import { baseUrl } from "../config";

function Synth() {
	const navigate = useNavigate();
	const [gridSize, setGridSize] = useState(8);
	const [formData, setFormData] = useState({
		name: `My Synth`,
		a_d_s_r: [100, 200, 999, 300],
        waveform: "sine",
		effects: [
            { distortion: 0.5 },
            { chorus: [4, 8, 0.6] },

        ],
		freqs: [220, 2, 2, 2],
	});

    console.log(formData.waveform)
    // console.log('Attack', (formData.a_d_s_r[0])/1000)
    // console.log('Decay', (formData.a_d_s_r[1])/1000)
    // console.log('Sustain', (formData.a_d_s_r[2])/1000)
    // console.log('Release', (formData.a_d_s_r[3])/1000)



	useEffect(() => {
		document.title = "Create Synth";
	}, []);

	const gridArray = Array.from(
		{ length: gridSize * 4 },
		(_, index) => index + 1
	);

	const chorus = new Tone.Chorus(
		formData.effects[1].chorus[0],
		formData.effects[1].chorus[1],
		formData.effects[1].chorus[2]
	).start();

	const limiter = new Tone.Limiter(-6);
	const dist = new Tone.Distortion(formData.effects.distortion);
	// const compressor = new Tone.Compressor(-30, 3);


	const Synth = new Tone.Synth({
		oscillator: {
            type: formData.waveform
        },
        envelope: {
            attack: formData.a_d_s_r[0] / 1000,
			decay: formData.a_d_s_r[1] / 1000,
			sustain: formData.a_d_s_r[2] / 1000,
			release: formData.a_d_s_r[3] / 1000,
		},

	})
    Synth
    .connect(dist)
    .connect(chorus)
    // .connect(compressor)
    .connect(limiter)
    .toDestination();

	useEffect(() => {
		return () => {
			async function dispose() {
                console.log("HEllooo")
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
			newFormData.effects[0].distortion = value;
            console.log('Distortion', newFormData.effects[0].distortion)
		} else if (name === "chorus") {
			newFormData.effects[1].chorus = value;
		}
		setFormData(newFormData);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const token = localStorage.getItem("token");
			const { data } = await axios.post(
				`${baseUrl}/api/synths/`,
				formData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			toast.success("Synth added to your collection!");
			navigate("/collection");
		} catch (err) {
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
					<div className="control">
						<select
							type="select"
							name="waveform"
                            
							onChange={(e) => handleChange(e)}
							
						>
                        {oscillatorTypes.map((type, index)=>
                        <option key={index} value={type}>
                            {type}
                        </option>)}
                        </select>
					</div>
				</div>
				<div className="field">
					<label className="label">Attack (ms)</label>
					<div className="control">
						<input
							type="range"
							min="10"
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
							min="10"
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
							min="10"
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
							max="999"
							name="distortion"
							onChange={(e) => handleChange(e)}
							value={formData.effects.distortion}
						/>
						<span>{formData.effects.distortion}</span>
					</div>
				</div>
				<div className="field">
					<label className="label">Chorus</label>
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
                        onMouseDown={(e) => handleClick(e)}
                        onMouseUp={(e) => handleMouseOff(e)}
                        onMouseLeave={handleMouseOff}
                        onTouchStart={() => handleClick()}
                        onTouchEnd={() => handleMouseOff()}

					>
						{notes[index]}
					</div>
				))}
			</div>
		</>
	);
}

export default Synth;
