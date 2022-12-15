import { SoundPlayer } from "../interfaces";
import Sound from "react-native-sound";
import ballKickSound from '../../../assets/sounds/ball_kick.wav'
import hoopSound from '../../../assets/sounds/hoop.mp3'
import scoreSound from '../../../assets/sounds/score.mp3'
import { Audio } from 'expo-av';

const sounds = {
  ballKick: ballKickSound,
  hoop: hoopSound,
  score: scoreSound
}

export class Splayer extends SoundPlayer {
  constructor () {
    super();
    this.actions = sounds
  }

  async playSound(type: keyof typeof sounds, volume?: number): Promise<void> {
    const tune = this.actions[type];
    if (tune) {
      const { sound } = await Audio.Sound.createAsync(tune as any, { volume: volume ?? 1 });

      await sound.playAsync()

    }
  }
}