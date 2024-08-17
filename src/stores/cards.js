import { defineStore } from 'pinia';
import { useWeatherStore } from '@/stores';

export const useCardsStore = defineStore('cards', {
  state: () => ({
    weatherBlocks: [],
  }),

  actions: {

    deleteBlock(index) {
      if (index >= 0 && index < this.weatherBlocks.length) {
        this.weatherBlocks.splice(index, 1); 
      } else {
        console.error('Invalid index for weather block.');
      }
    },



    async addENewBlock(city) {
      const weatherStore = useWeatherStore();
      const weatherData = await weatherStore.getCurrentWeather(city);
      
      if (weatherData && !this.weatherBlocks.some(block => block.id === weatherData.id)) {
        this.weatherBlocks.push(weatherData);
      } else {
        return
      }
    }
  }
});