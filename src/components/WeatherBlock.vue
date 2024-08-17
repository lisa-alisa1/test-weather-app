<template>
    <div class="card-wrap">
        <div class="weather-wrap">
            <div v-if="weatherDataProp"  class="weather-data">
                <div class="flex-type">
                    <p class="day">today</p>
                    <div class="icon-wrap">
                          <img 
                            :src="isFavoriteLocal ? '/src/assets/img/icons/favorite-active.svg' : '/src/assets/img/icons/favorite.svg'"  
                            class="favorite-icon"
                            @click="toggleFavorites()"
                          >
                         <img 
                            v-if="indexBlock"
                            src="../assets/img/icons/delete.svg"  
                            class="delete-img"
                            @click="deleteBlock(indexBlock)"
                        >
                    </div>
                </div>
                <p class="name">
                    {{ weatherDataProp.name }} 
                </p>
                <div class="flex-block">
                    <p class="temp"> 
                        {{ weatherDataProp.main.temp }} °C
                    </p>
                    <img :src="`http://openweathermap.org/img/wn/${weatherDataProp.weather[0].icon}@2x.png`" >
                </div>
                
                <p class="description"> 
                    {{ weatherDataProp.weather[0].main}}
                </p>
                <div class="footer-wrap">
                    <div class="change-day">
                        <div> 
                            <img src="../assets/img/icons/sunrise.svg" alt="">
                            {{ formatUnixTimestamp(weatherDataProp.sys.sunrise) }}
                        </div>
                        <div> 
                            <img src="../assets/img/icons/sunset.svg" alt="">
                            {{ formatUnixTimestamp(weatherDataProp.sys.sunset) }}
                        </div>
                    </div>
                    <img src="../assets/img/icons/arrow-back.svg" class="arrow-back">
                </div>
            </div>
            <div v-else> loading.. </div>
        </div>
        <div class="week-weather-wrap">
            <p class="day">week</p>
            <div class="weekly-weather-content">
                <div v-for="day in weeklyWeather" :key="day" >
                <p>
                    {{ day.date }}
                </p> 
                <p>
                    {{ day.weather }}
                </p>
                <p>
                    {{ day.averageTemp }} °C
                </p>
            </div>
            </div>
        </div>
    </div>
</template>


<script>
import { useLocationStore,useWeatherStore, useCardsStore, useFavoritesStore } from '@/stores';
import { mapState } from "pinia";

export default {
    setup() {
        const favoritesStore = useFavoritesStore()
        const locationStore = useLocationStore()
        const weatherStore = useWeatherStore()
        const cardsStore = useCardsStore()

        return {favoritesStore, locationStore, weatherStore, cardsStore}
    },

    props: {
        weatherDataProp: Object,
        indexBlock: Number,
    },
  
    data() {
        return {
            isHovered: false,
            isFavoriteLocal: false, 
            weeklyWeather: null,
        }
    },
    
    created() {
        this.checkIfFavorite()
        this.fetchWeatherForCity()
    },
   
    methods: {
        checkIfFavorite() {
            const city = this.weatherDataProp.name;
            this.isFavoriteLocal = this.favoritesStore.isFavorite(city);
            
            return this.isFavoriteLocal
        },

        toggleFavorites() {
            if (this.favoritesStore.favoritesBlocks.length >= 5 && !this.checkIfFavorite()) {
                this.$emit('modal-open')
                return;
            }

            if (this.checkIfFavorite()) {
                this.favoritesStore.removeFavoriteBlock(this.weatherDataProp); 
            } else {
                this.favoritesStore.addFavoriteBlock(this.weatherDataProp);
            }
            this.checkIfFavorite()
        },

        fetchWeatherForCity() {
            this.weatherStore.getWeeklyWeather(this.weatherDataProp.name)
                .then(res => this.weeklyWeather = res)
        },

        formatUnixTimestamp(timestamp) {
            const date = new Date(timestamp * 1000); 
            return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); 
        },

        deleteBlock(index) {
            console.log(index);
            this.$emit('request-delete', index); 
        }
    },
}
</script>


<style scoped lang="scss">
@import '../assets/scss/variables';

.card-wrap {
    width: 500px;
    height: 300px;
    padding: 5rem 0;

    &:active {
        .weather-wrap {
            transform: perspective(600px) rotateY(-180deg);
        }
        
        .week-weather-wrap {
            transform: perspective(600px) rotateY(0);
        }
    }
}
 .day {
    text-transform: uppercase;
    letter-spacing: 3px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif ;
    font-weight: 800;
    color: $primary-color;
}
.delete-img {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-left: 10px;
}
.weather-wrap {
    width: 500px;
    height: 300px;
    border-radius: 20px;
    background: inherit;
    position: absolute;
    overflow: hidden;  
    background-color: #f8f9fa8a;

    .weather-data {
        height: 100%;
        width: 100%;
        padding: 0 3rem;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: start;

        .flex-type {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
        .icon-wrap {
            .favorite-icon {
                width: 30px;
                height: 30px;
            }
        }
        .name {
            font-size: 2em;
        }
        .description {
            font-size: 2em;
        }
        .footer-wrap {
            display: flex;
        }
        .arrow-back {
            width: 30px;
            height: 30px;
        }
        .change-day {
            display: flex;
            margin-top: 10px;

            div {
                margin-right: 10px;
                display: flex;
                flex-direction: column;
                
                img {
                    width: 45px;
                    height: 45px;
                }
            }
        }
        .footer-wrap {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: end;
        }
        .flex-block {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;

            .temp {
                font-size: 3.5em;
            }
        }
    }
}
 
.week-weather-wrap,
.weather-wrap {
    width: 500px;
    height: 300px;
    overflow: hidden;
    position: absolute;
    backface-visibility: hidden;
    transition: transform .9s ease;
    border-radius: 20px;
    background-color:  rgb(248 249 250 / 69%);
    box-shadow: 3px 4px 11px 0px #00000026;
}

.weather-wrap {
    transform: perspective(600px) rotateY(0);
}

.week-weather-wrap {
    transform: perspective(600px) rotateY(180deg);
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    box-sizing: border-box;
    padding: 15px 3rem;

    .weekly-weather-content {
        margin-top: 15%;
        width: 100%;
        display: flex;
        justify-content: space-between;

        div {
            height: 6rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }
}

@media( max-width: 1024px) {
    .card-wrap {
        width: 400px;
    }
    div.card-wrap.block {
        padding: 2rem 2rem 0 0;
    }
    .weather-wrap, .week-weather-wrap {
        width: 400px;

        .weather-data {
            padding: 0 2rem;
            max-width: 100%;
            max-height: 100%;

            .flex-block {
                .temp {
                    font-size: 2.7em;
                }
            }
            .description {
                font-size: 1.6em;
            }
            .name {
                font-size: 1.6em;
                font-weight: 500;
            }
    }

    .weekly-weather-content {
        margin-top: 10%;
        display: flex;
        flex-direction: column;  

        div {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            width: 90%;
            height: 2rem;
        }
    }
    }
}

@media( max-width: 950px) {
    .weather-wrap, .week-weather-wrap {
        width: 100%;

        .weather-data {
            .icon-wrap  {
                .favorite-icon, .delete-img {
                    width: 40px;
                    height: 40px;
                 }
            }
        }
    }

    .weather-wrap {
        transform: perspective(600px) rotateX(0deg);
    }
    .week-weather-wrap {
        transform: perspective(600px) rotateX(180deg);
    }

    .card-wrap {
        width: 100%;
        &:active {
        .weather-wrap {
            transform: perspective(600px) rotateX(-180deg);
        }
        
        .week-weather-wrap {
            transform: perspective(600px) rotateX(0);
        }
    }

    .weekly-weather-content {
        margin-top: 5%;
    }
    }
}
</style>