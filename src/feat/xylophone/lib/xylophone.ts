import * as Tone from "tone";

// Synth designed for percussive/xylophone sounds
const xylophone = new Tone.Synth({
  oscillator: {
    type: "triangle" // Triangle or sine works well for mallet percussion
  },
  envelope: {
    attack: 0.005, // Very fast attack
    decay: 0.3, // Quick decay
    sustain: 0, // No sustain (like a real mallet strike)
    release: 0.5 // Short release
  }
}).toDestination();

function play(note = "C4", duration = "4n") {
  // Start audio context on user interaction (required by browsers)
  Tone.start();

  xylophone.triggerAttackRelease(note, duration);
}

export default {
  play,
};
