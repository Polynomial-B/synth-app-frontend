# General Assembly Project 4: Synth Sounds
## Brief

##### Project Members:
* Matt Lamb
##### Timeframe:
* 7 Days
##### Goal:
Create a full-stack React application using Python, Django and PostgreSQL.
## SynthSounds
SynthSounds is a customisable music synthesiser that aims to abstract away musical notations (_C, D, E, F, G, A, B, C_ or _Do, Re, Mi, Fa, Sol, La, Si, Do_) to allow experimentation based on the sounds alone without bringing music theory into the mix.

The numbers that are shown for each 'key' in Synth Sounds, that creates a tone, represents the frequency of the sound wave in Hertz.

The app contains a special feature:
#### Warp
 
 Warp allows you to change the amount of notes in each octave. Each octave usually contains `12` notes but with _warp_ you can change the amount of divisions to discover different scales that are seen outside of 'Western' music.

  For example, if you choose `19` then instead of having `12` divisions from one octave to the next, you get an additional `7` notes.

   



[Click here to visit Synth-Sounds](https://synth-sounds.netlify.app/).


## Technologies Used

==To do==
## Approach / Planning / Building Process
#### Concept
For my final project, I wanted to find a way to manipulate the Web Audio in order to create in-browser sound. I discovered that this could be done with relative ease using the Tone.js library.

#### Planning
I spent a long time planning how to approach this project. I devised an idea that I thought would be too confusing to anyone without prior knowledge of atonality to the musical approach.
##### The Atonal Approach
The initial idea was to create a 12-Tone matrix generator for [atonal](https://en.wikipedia.org/wiki/Atonality) music whereby the user must choose _all_ the notes in the 'Western' musical [scale](https://en.wikipedia.org/wiki/Chromatic_scale) and the generator would calculate to output the various orders of the notes ([prime, retrograde, inversion, retrograde inversion](https://musictheory.pugetsound.edu/mt21c/TwelveToneTechnique.html)). The user would then be able to play back these notes in order to create an Atonal piece of music.