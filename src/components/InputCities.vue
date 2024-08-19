<template>
    <div class="autocomplete">
      <input
        v-model="inputData"
        type="text"
        placeholder="Enter city"
        @input="fetchCities"
      />

      <ul class="autocomplete-list"  v-if="cities.length > 0">
        <li
          v-for="city in cities"
          :key="city.id"
          @click="selectCity(city.name)"
        >
          {{ city.name }}
        </li>
      </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'InputCities',
    data() {
        return {
            inputData: '',
            cities: []
        }
    },
    methods: {
      async fetchCities() {
        if (this.inputData.length < 3) {
          this.cities = [];
          return;
        }
          axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${this.inputData}&limit=5&appid=${ import.meta.env.VITE_OPENWEATHER_API_KEY }`
          ).then(response => {
             this.cities = response.data.map(city => ({
                id: city.country,
                name: city.name,
                country: city.country,
                lat: city.lat,
                lon: city.lon,
             }))
          })
      },

      selectCity(city) {
        this.cities = [];
        this.inputData = city
        
        this.$emit('selected-city', city)
      },

      clearInput() {
        this.inputData = '';
      }
    } 
}
</script>


<style scoped lang="scss">
  .autocomplete {
    position: relative;
    width: 100%;
    max-width: 320px;

  input {
    outline: 0;
    background-color: #f5f7fb;
    width: 13rem;
    padding: 5px 0px;
    padding-left: 15px;
    height: 33px;
    border-radius: 20px;
    border: none;
    font-size: 16px;
  }

  .autocomplete-list {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    border: 1px solid #ccc;
    border-top: none;
    max-height: 200px;
    box-sizing: border-box;
    overflow-y: auto;
    z-index: 10;

    li {
      padding: 10px;
      cursor: pointer;

      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
}


@media( max-width: 1024px) { 
  .autocomplete input {
    width: 15rem;
  }
}
</style>