import '../styles/Synth.css'
import { useState } from 'react'

export default function Synth() {

const [gridSize, setGridSize] = useState(16)

const gridArray = Array.from({ length: gridSize * 4}, (_, index) => index + 1);




    return <>
    
    <h1 className="home-header">Synth</h1>
        <div className="grid-container">
            {gridArray.map(index =>
            <div key={index} className="grid-item">{index}</div>
            
        )}
        </div>
    </>
}