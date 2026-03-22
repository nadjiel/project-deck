import * as Tone from "tone";

export default class Xylophone {

  private synth: Tone.Synth;

  constructor() {
    this.synth = new Tone.Synth({
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
  }

  public play(note = "C4", duration = "4n") {
    // Start audio context on user interaction (required by browsers)
    Tone.start();

    this.synth.triggerAttackRelease(note, duration);
  }

  public clear() {
    this.synth.dispose();
  }

}
