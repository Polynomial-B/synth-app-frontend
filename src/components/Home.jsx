import { useEffect } from "react";

function Home() {

  useEffect(()=> {
    document.title = "SynthSounds"
  }, [])

  return (
    <>
		<h1 className="home-header">SynthSounds</h1>
      <h2>
      Before you begin, please be aware that manipulating sounds can produce unpredictable volumes. 
<br/><br/>
      Make sure that your speakers or headphones are set to a low volume, especially if you are using the <em>distortion</em> effect, and increase gradually where necessary.
      </h2>
			<p>
      Sound waves are vibrations that travel through a medium, such as air, water, or solids, and can be perceived by our ears as sound. These waves are longitudinal, meaning that the particles in the medium oscillate parallel to the direction of wave propagation. When an object vibrates, it creates areas of compression and rarefaction in the medium, producing pressure variations that move outward in all directions. The frequency of these vibrations determines the pitch of the sound, while the amplitude affects the volume. Sound waves can reflect, refract, and diffract, allowing them to bend around obstacles and travel through different materials, making them a fundamental aspect of acoustics and communication.
      Sound waves are vibrations that travel through a medium, such as air, water, or solids, and can be perceived by our ears as sound. These waves are longitudinal, meaning that the particles in the medium oscillate parallel to the direction of wave propagation. When an object vibrates, it creates areas of compression and rarefaction in the medium, producing pressure variations that move outward in all directions. The frequency of these vibrations determines the pitch of the sound, while the amplitude affects the volume. Sound waves can reflect, refract, and diffract, allowing them to bend around obstacles and travel through different materials, making them a fundamental aspect of acoustics and communication.      Sound waves are vibrations that travel through a medium, such as air, water, or solids, and can be perceived by our ears as sound. These waves are longitudinal, meaning that the particles in the medium oscillate parallel to the direction of wave propagation. When an object vibrates, it creates areas of compression and rarefaction in the medium, producing pressure variations that move outward in all directions. The frequency of these vibrations determines the pitch of the sound, while the amplitude affects the volume. Sound waves can reflect, refract, and diffract, allowing them to bend around obstacles and travel through different materials, making them a fundamental aspect of acoustics and communication.

			</p>
    </>
  );
}


export default Home