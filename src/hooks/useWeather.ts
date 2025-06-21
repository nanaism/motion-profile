import useSWR from "swr";
import { LOCATION_LATITUDE, LOCATION_LONGITUDE } from "../config/constants";
import { getWeatherType, WEATHER } from "../utils/weather";

// APIからデータを取得するフェッチャー関数
const weatherFetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("天気データを取得できませんでした");
  }
  return response.json();
};

/**
 * 指定された緯度経度の天気情報を取得するカスタムフック
 */
export const useWeather = () => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${LOCATION_LATITUDE}&longitude=${LOCATION_LONGITUDE}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`;

  const { data, error, isLoading } = useSWR(url, weatherFetcher);

  // データを加工
  let weatherData = null;

  if (data) {
    // 天気コードから天気の分類を取得
    const weatherType = getWeatherType(data.current.weather_code);
    const weatherObject = WEATHER[weatherType];

    weatherData = {
      ...weatherObject,
      temperature: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
      weatherType,
    };
  }

  return {
    weatherData,
    isLoading,
    isError: error,
  };
};
