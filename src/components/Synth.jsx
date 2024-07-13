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
    const [isNotes, setIsNotes] = useState(true)
	const [formData, setFormData] = useState({
		name: `My Synth`,
		a_d_s_r: [100, 200, 999, 300],
        waveform: "sine",
		effects: [
            { distortion: 0.5 },
            { chorus: [4, 8, 0.6] },

        ],
		freqs: notes,
	});

    console.log(formData.freqs)
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

    const volume = formData.waveform !== "sine" ? -16 : 0;
	const limiter = new Tone.Limiter(-64);
	const dist = new Tone.Distortion(formData.effects.distortion, 1);
	const compressor = new Tone.Compressor(-30, 9);
    // const feedbackDelay = newTone.feedbackDelay();

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
        volume: volume
	}).chain(dist, chorus, compressor, limiter).toDestination()
    // .connect(dist).toDestination()
    // .connect(chorus).toDestination()
    // .connect(compressor).toDestination()
    // .connect(limiter).toDestination()
    // .toDestination();

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
        if (isNotes) {
            setIsNotes(false)
            console.log(isNotes)
        } else {
            setIsNotes(true)
            console.log(isNotes)
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
            console.log(formData)
			const token = localStorage.getItem("token");
			const { data } = await axios.post(
				`${baseUrl}/synths/`,
				formData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			toast.success("Synth added to your collection!");
			navigate("/collection");
		} catch (err) {
            console.log(err)
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
						>
                        {oscillatorTypes.map((type, index)=>
                        <option key={index} value={type}>
                            {type}
                        </option>)}
                        </select>
					</div>
				</div>
				<div className="field">
					<label className="label">Attack</label>
					<div className="control">
						<input
							type="range"
							min="100"
							max="2000"
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
							min="10"
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
							min="0"
							max="2000"
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
							min="0"
							max="999"
							name="distortion"
							onChange={(e) => handleChange(e)}
							value={formData.effects[0].distortion}
						/>
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
							value={formData.effects[1].chorus}
						/>
					</div>
				</div>

				<button className="button" type="submit">
					Create Synth
				</button>
			</form>
            <button className="button" onClick={handleIsNotes}>{isNotes? "Hz active" : "Notes active"}</button>
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
						{notes[index-1]}
					</div>
				))}
			</div>
		</>
	);
}

export default Synth;
