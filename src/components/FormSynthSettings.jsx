import React from "react";

function FormSynthSettings({
	handleChange,
	handleSubmit,
	handleIsNotes,
	isNotes,
	handleWarp,
	formData,
	oscillatorTypes,
	divisions,
}) {
	return (
		<>
			<form onSubmit={handleSubmit} className="form">
				<div className="name-field field">
					<label className="label">Name</label>
					<div className="control">
						<input
							className="input"
							type="text"
							name="name"
							onChange={handleChange}
							value={formData.name}
                            maxLength="30"
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Waveform</label>
					<div>
						<select
							type="select"
							name="waveform"
							onChange={(e) => handleChange(e)}
						>
							{oscillatorTypes.map((type, index) => (
								<option key={index} value={type}>
									{type}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="slide-settings-container">
					<div className="settings-grid-container field">
						<label className="label">Attack</label>
						<div className="control form-element">
							<input
								className="control-form-input"
								type="range"
								min="1"
								max="1000"
								name="attack"
								onChange={(e) => handleChange(e, 0)}
								value={formData.a_d_s_r[0]}
							/>
						</div>
					</div>

					<div className="settings-grid-container field">
						<label className="label">Decay</label>
						<div className="control form-element">
							<input
								className="control-form-input"
								type="range"
								min="1"
								max="2000"
								name="decay"
								onChange={(e) => handleChange(e, 1)}
								value={formData.a_d_s_r[1]}
							/>
						</div>
					</div>

					<div className="settings-grid-container field">
						<label className="label">Sustain</label>
						<div className="control form-element">
							<input
								className="control-form-input"
								type="range"
								min="1"
								max="999"
								name="sustain"
								onChange={(e) => handleChange(e, 2)}
								value={formData.a_d_s_r[2]}
							/>
						</div>
					</div>

					<div className="settings-grid-container field">
						<label className="label">Release</label>
						<div className="control form-element">
							<input
								className="control-form-input"
								type="range"
								min="1"
								max="5000"
								name="release"
								onChange={(e) => handleChange(e, 3)}
								value={formData.a_d_s_r[3]}
							/>
						</div>
					</div>

					<div className="settings-grid-container field">
						<label className="label">Distortion</label>
						<div className="control form-element">
							<input
								className="control-form-input"
								type="range"
								min="1"
								max="999"
								name="distortion"
								onChange={(e) => handleChange(e)}
								value={formData.effects[0].distortion}
							/>
						</div>
					</div>

					<div className="settings-grid-container field">
						<label className="label">Chorus</label>
						<div className="control form-element">
							<input
								className="control-form-input"
								type="range"
								min="1"
								max="99"
								name="chorus"
								onChange={(e) => handleChange(e)}
								value={formData.effects[1].chorus}
							/>
						</div>
					</div>

					<div className="settings-grid-container field">
						<label className="label">Delay</label>
						<div className="control form-element">
							<input
								className="control-form-input"
								type="range"
								min="1"
								max="5"
								name="delay"
								onChange={(e) => handleChange(e)}
								value={formData.effects[2].feedback[0]}
							/>
						</div>
					</div>
				</div>
				<button
					className="button"
					name="freqs"
					type="button"
					onClick={handleIsNotes}
				>
					{isNotes ? "Warp Lock" : "Warp Unlock"}
				</button>
				{!isNotes ? (
					<button
						className="button"
						name="more-notes"
						type="button"
						onClick={(e) => handleWarp(e)}
						value="+"
					>
						+
					</button>
				) : null}
				<div className="button">{divisions}</div>
				{!isNotes ? (
					<button
						className="button"
						name="less-notes"
						type="button"
						onClick={(e) => handleWarp(e)}
						value="-"
					>
						-
					</button>
				) : null}
				<button className="button is-danger" type="submit">
					Save Settings
				</button>
			</form>
		</>
	);
}

export default FormSynthSettings;
