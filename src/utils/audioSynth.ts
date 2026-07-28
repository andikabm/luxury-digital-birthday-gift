class LuxuryAudioEngine {
  private audio: HTMLAudioElement;
  private isPlaying = false;
  private isMuted = false;

  constructor() {
    this.audio = new Audio('/music/Beautiful.mp3');
    this.audio.loop = true;
    this.audio.volume = 0.5;
  }

  public async startMusic() {
    if (this.isPlaying) return;

    try {
      await this.audio.play();
      this.isPlaying = true;
    } catch (e) {
      console.log('Audio gagal diputar', e);
    }
  }

  public stopMusic() {
    this.audio.pause();
    this.isPlaying = false;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.audio.muted = this.isMuted;
    return this.isMuted;
  }

  public getIsMuted() {
    return this.isMuted;
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  public playClickSound() {
    // sengaja dikosongkan dulu
  }

  public playEnvelopeOpenSound() {}

  public playLoveSparkleSound() {}
}

export const luxuryAudio = new LuxuryAudioEngine();