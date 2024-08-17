import { defineStore } from 'pinia';
import axios from 'axios';

export const useLocationStore = defineStore('location', {
    state: () => ({
        city: null,
        country: null,
        lat: null,
        lon: null,
        error: null
    }),

    actions: {
      async fetchUserLocation() {
        this.error = null;
        try {
          const response = await axios.get('http://ip-api.com/json');
          if (response.data) {
            this.city = response.data.city;
            this.country = response.data.country;
            this.lat = response.data.lat;
            this.lon = response.data.lon;

          } else {
            throw new Error('Failed to retrieve location data');
          }
        } catch (error) {
          this.error = 'Unable to determine user location';
        } 
      },
    }
})