import { Cloud, CloudLightning, CloudRain, Snowflake, Sun } from "lucide-react";

// 天気の定義
export const WEATHER_TYPES = {
  SUNNY: "sunny",
  CLOUDY: "cloudy",
  RAINY: "rainy",
  SNOWY: "snowy",
  THUNDER: "thunder",
};

// 天気の表示内容を定義（アイコンとラベル）
export const WEATHER = {
  [WEATHER_TYPES.SUNNY]: {
    icon: Sun,
    label: "Sunny",
  },
  [WEATHER_TYPES.CLOUDY]: {
    icon: Cloud,
    label: "Cloudy",
  },
  [WEATHER_TYPES.RAINY]: {
    icon: CloudRain,
    label: "Rainy",
  },
  [WEATHER_TYPES.SNOWY]: {
    icon: Snowflake,
    label: "Snowy",
  },
  [WEATHER_TYPES.THUNDER]: {
    icon: CloudLightning,
    label: "Thunder",
  },
};

/**
 * 天気コードから天気タイプを判定する
 */
export const getWeatherType = (weatherCode: number) => {
  // 晴れ: 0,1  曇り: 2~48  雨: 51~67, 80~82  雪: 71~77, 85,86 * 雷: 95~99
  if (weatherCode === 0 || weatherCode === 1) {
    return WEATHER_TYPES.SUNNY;
  } else if (weatherCode >= 2 && weatherCode <= 48) {
    return WEATHER_TYPES.CLOUDY;
  } else if (
    (weatherCode >= 51 && weatherCode <= 67) ||
    (weatherCode >= 80 && weatherCode <= 82)
  ) {
    return WEATHER_TYPES.RAINY;
  } else if (
    (weatherCode >= 71 && weatherCode <= 77) ||
    weatherCode === 85 ||
    weatherCode === 86
  ) {
    return WEATHER_TYPES.SNOWY;
  } else if (weatherCode >= 95 && weatherCode <= 99) {
    return WEATHER_TYPES.THUNDER;
  }

  // デフォルトは雨
  return WEATHER_TYPES.RAINY;
};
