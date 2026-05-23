"use client";

export interface AudioSettings {
  bgmVolume: number;
  sfxVolume: number;
  bgmMuted: boolean;
  sfxMuted: boolean;
}

const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  bgmVolume: 0.35,
  sfxVolume: 0.85,
  bgmMuted: false,
  sfxMuted: false,
};

class AudioManager {
  private static instance: AudioManager | null = null;
  private bgmAudio: HTMLAudioElement | null = null;
  private settings: AudioSettings = { ...DEFAULT_AUDIO_SETTINGS };
  private initialized = false;
  private isBgmPlaying = false;
  private currentBgmPath = "";

  private constructor() {
    this.loadSettings();
  }

  public static getInstance(): AudioManager {
    if (typeof window === "undefined") {
      // Return a dummy instance for SSR
      return {} as AudioManager;
    }
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  private loadSettings() {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("game-audio-settings");
      if (saved) {
        this.settings = { ...DEFAULT_AUDIO_SETTINGS, ...JSON.parse(saved) };
        // Smart migration: auto-upgrade volume levels from old defaults to new polished ones
        let modified = false;
        if (this.settings.sfxVolume === 0.6) {
          this.settings.sfxVolume = 0.85;
          modified = true;
        }
        if (this.settings.bgmVolume === 0.4) {
          this.settings.bgmVolume = 0.35;
          modified = true;
        }
        if (modified) {
          this.saveSettings();
        }
      }
    } catch (e) {
      console.error("Failed to load audio settings:", e);
    }
  }

  private saveSettings() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("game-audio-settings", JSON.stringify(this.settings));
    } catch (e) {
      console.error("Failed to save audio settings:", e);
    }
  }

  public init(bgmPath: string = "/sounds/bgm.mp3") {
    if (typeof window === "undefined" || this.initialized) return;

    this.currentBgmPath = bgmPath;
    this.bgmAudio = new Audio(bgmPath);
    this.bgmAudio.loop = true;
    this.bgmAudio.volume = this.settings.bgmMuted ? 0 : this.settings.bgmVolume;
    this.initialized = true;
  }

  public playBgm() {
    if (!this.initialized || !this.bgmAudio) return;
    
    // Play only if not already playing
    if (!this.isBgmPlaying) {
      this.bgmAudio.play()
        .then(() => {
          this.isBgmPlaying = true;
        })
        .catch((err) => {
          console.warn("Autoplay blocked or audio load error. Will play on first user interaction.", err);
        });
    }
  }

  public pauseBgm() {
    if (!this.initialized || !this.bgmAudio) return;
    this.bgmAudio.pause();
    this.isBgmPlaying = false;
  }

  public stopBgm() {
    if (!this.initialized || !this.bgmAudio) return;
    this.bgmAudio.pause();
    this.bgmAudio.currentTime = 0;
    this.isBgmPlaying = false;
  }

  public playSfx(sfxPath: string) {
    if (typeof window === "undefined" || this.settings.sfxMuted) return;

    try {
      const sfx = new Audio(sfxPath);
      sfx.volume = this.settings.sfxVolume;
      sfx.play().catch((err) => {
        // Soft fail if blocked by browser autoplay
        console.debug("SFX play failed or was blocked:", err);
      });
    } catch (e) {
      console.warn("Failed to play SFX:", e);
    }
  }

  public fadeBgm(targetVolume: number, durationMs: number = 1000) {
    if (!this.initialized || !this.bgmAudio || this.settings.bgmMuted) return;

    const startVolume = this.bgmAudio.volume;
    const volumeDiff = targetVolume - startVolume;
    if (volumeDiff === 0) return;

    const intervalTime = 50; // 50ms intervals
    const steps = durationMs / intervalTime;
    const volumeStep = volumeDiff / steps;
    let currentStep = 0;

    const fadeInterval = setInterval(() => {
      if (!this.bgmAudio || this.settings.bgmMuted) {
        clearInterval(fadeInterval);
        return;
      }

      currentStep++;
      const nextVolume = Math.max(0, Math.min(1, startVolume + volumeStep * currentStep));
      this.bgmAudio.volume = nextVolume;

      if (currentStep >= steps) {
        this.bgmAudio.volume = targetVolume;
        clearInterval(fadeInterval);
      }
    }, intervalTime);
  }

  public getSettings(): AudioSettings {
    return { ...this.settings };
  }

  public setBgmVolume(volume: number) {
    this.settings.bgmVolume = Math.max(0, Math.min(1, volume));
    this.saveSettings();
    
    if (this.bgmAudio && !this.settings.bgmMuted) {
      this.bgmAudio.volume = this.settings.bgmVolume;
    }
  }

  public setSfxVolume(volume: number) {
    this.settings.sfxVolume = Math.max(0, Math.min(1, volume));
    this.saveSettings();
  }

  public toggleBgmMute(): boolean {
    this.settings.bgmMuted = !this.settings.bgmMuted;
    this.saveSettings();

    if (this.bgmAudio) {
      if (this.settings.bgmMuted) {
        this.bgmAudio.volume = 0;
        this.bgmAudio.pause();
      } else {
        this.bgmAudio.volume = this.settings.bgmVolume;
        if (this.isBgmPlaying) {
          this.bgmAudio.play().catch(console.warn);
        } else {
          this.playBgm();
        }
      }
    }
    return this.settings.bgmMuted;
  }

  public toggleSfxMute(): boolean {
    this.settings.sfxMuted = !this.settings.sfxMuted;
    this.saveSettings();
    return this.settings.sfxMuted;
  }
}

export default AudioManager;
