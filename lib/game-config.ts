export interface GameSettings {
  pointsPerFind: number;
  pointsPenaltyMiss: number;
  timeoutSuccessAlert: number;
  timeoutErrorAlert: number;
  timeoutModalOpenDelay: number;
  timeoutGameOverDelay: number;
}

export const DEFAULT_SETTINGS: GameSettings = {
  pointsPerFind: 10,
  pointsPenaltyMiss: -5,
  timeoutSuccessAlert: 1800,
  timeoutErrorAlert: 2000,
  timeoutModalOpenDelay: 1400,
  timeoutGameOverDelay: 1000,
};

export const getSettings = (): GameSettings => {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  const saved = localStorage.getItem("game-settings");
  if (!saved) return DEFAULT_SETTINGS;
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = (settings: GameSettings) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("game-settings", JSON.stringify(settings));
  }
};
