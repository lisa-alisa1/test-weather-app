import { defineStore } from 'pinia';
import axios from 'axios';

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        weeklyWeatherData: [],
        hourlyWeatherData: [],
        locationWeather: null, 
    }),

    actions: {
        async getCurrentWeather(city) {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
                );

                const resp = response.data;

                resp.main.temp = Math.round(resp.main.temp);
                return resp;

            } catch (error) {
                console.error('getCurrentWeather error', error);
                return error;
            }
        },
        setLocationWeather(weatherData) {
            console.log(weatherData, 'weatherData');
            console.log( this.locationWeather, ' this.locationWeather');

            this.locationWeather = weatherData;  
        },

        async getWeeklyWeather(city) {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
                );

                const resp = response.data;
                const respWeelkyWeatherData = this.processWeeklyData(resp.list);

                this.weeklyWeatherData = respWeelkyWeatherData
                this.hourlyWeatherData = this.getHourlyWeather(resp.list);

                return respWeelkyWeatherData

            } catch(error) {
                console.log('getWeeklyWeather error', error);
            }
        },

        getHourlyWeather(hourlyWeather) {
            const todayDate = new Date().toISOString().slice(0, 10);
            const currentDayData = hourlyWeather.filter(entry => entry.dt_txt.startsWith(todayDate));
            return currentDayData

        },

        processWeeklyData(weatherList) {
            const days = {};
          
            weatherList.forEach(entry => {
              const dateObj = new Date(entry.dt_txt);
              const day = dateObj.getDate();
              const month = dateObj.getMonth() + 1; 
              const formattedDate = `${day}/${month}`; 
          
              if (!days[formattedDate]) {
                days[formattedDate] = {
                  temperatures: [],
                  weather: entry.weather[0].main,
                };
              }
              days[formattedDate].temperatures.push(entry.main.temp);
            });
          
            return Object.keys(days).map(date => {
              const temperatures = days[date].temperatures;
              const averageTemp = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
              return {
                date, 
                averageTemp: Math.round(averageTemp),
                weather: days[date].weather
              };
            });
        },

        
    }
})