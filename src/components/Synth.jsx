import { useState } from 'react'
import '../styles/Synth.css'
import notes from '../assets/notes.js'
import * as Tone from 'tone'

export default function Synth() {

const [gridSize, setGridSize] = useState(16)

const gridArray = Array.from({ length: gridSize * 4}, (_, index) => index + 1);

const synth = new Tone.Synth().toDestination();

async function handleClick(e) {
    console.clear()
    console.log(e.target.innerText)
    let noteToPlay = e.target.innerText
    if (noteToPlay === "") {
        return
    } else {
    await Tone.start();
    synth.triggerAttackRelease(`${noteToPlay}`, '16n')
    }
}


    return <>
    
    <h1 className="home-header">Synth</h1>
        <div className="grid-container">
            {gridArray.map(index =>
            <div key={index} className="grid-item" onClick={(e)=>handleClick(e)}>{notes[index]}</div>
            
        )}
        </div>
    </>
}