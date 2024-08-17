<template>
    <div>
        <main>
            <section class="manage-block">
                <div class="input-wrap">
                    <input-cities  
                        ref="inputCities"  
                        @selected-city="fetchWeather" 
                    />
                    <button class="add-new-city" @click="addCity"> 
                        <img src="../../assets/img/icons/add.svg" alt="">
                    </button>
                </div>
            </section>

            <section class="weather-blocks adaptive">
                <div v-for="(block, index) in weatherBlocks" :key="index">
                    <weather-block 
                        @modal-open="openModal"
                        @request-delete="confirmDeleteModal"
                        :weather-data-prop="block" 
                        :index-block="index" 
                        class="block" 
                    />
                </div>
            </section>

            <section class="weather-chart">
                 <weather-chart :weather-data="locationWeather" />
            </section>
           
            <delete-modal 
                :is-modal-open="isModalOpen"
                :is-modal-open-home="isModalOpenHome"
                @confirm="deleteBlock"
                @close="closeModal"
            />
        </main>
    </div>
</template>


<script>
import InputCities from '@/components/InputCities.vue';
import WeatherBlock from '@/components/WeatherBlock.vue';
import WeatherChart from '@/components/WeatherChart.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import { useWeatherStore, useCardsStore, useLocationStore, useFavoritesStore } from '@/stores';
import { mapState } from 'pinia';

export default {
    setup() {
        const locationStore = useLocationStore();
        const weatherStore = useWeatherStore();
        const cardsStore = useCardsStore();

        return {locationStore, weatherStore, cardsStore}
    },
    components: { 
        InputCities, 
        WeatherBlock, 
        WeatherChart, 
        DeleteModal 
    },

    mounted() {
        this.locationStore.fetchUserLocation().then(() => {
            if (this.locationStore.city) {
                this.cardsStore.addENewBlock(this.locationStore.city)
            }
        });
    },

    data() {
        return {
            selectedCity: null,
            newCityWeather: null,
            isModalOpen: false,
            isModalOpenHome: false,
            notifModal: false,
            blockToDelete: null 
        };
    },

    computed: {
        ...mapState(useCardsStore, ['weatherBlocks']),
        ...mapState(useWeatherStore, ['locationWeather']), 
        ...mapState(useFavoritesStore, ['favoritesBlocks']),
    },

    methods: {
        fetchWeather(city) {
            this.selectedCity = city
        },

        addCity() {
            console.log(this.weatherStore.weatherBlocks);
            if (this.selectedCity && this.weatherBlocks.length < 5) {
                this.cardsStore.addENewBlock(this.selectedCity); 
                this.$refs.inputCities.clearInput();
 
            } else {
                this.openModal()
                return
                
            }
        },

        deleteBlock() {
            if (this.blockToDelete !== null) {
                this.cardsStore.deleteBlock(this.blockToDelete)
                this.blockToDelete = null;
                this.closeModal(); 
            }
        },

        closeModal() {
            this.isModalOpen = false
            this.isModalOpenHome = false
        },

        confirmDeleteModal(index) {
            this.blockToDelete = index; 
            this.isModalOpen = true;
        },

        openModal() {
            this.isModalOpenHome = true;
        }
    },
}
</script>


<style lang="scss" scoped>
@import '../../assets/scss/variables';

    main {
        padding: 40px;
        min-height: calc(100vh -  64px);
    }

    .manage-block {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .input-wrap {
            display: flex;
            align-items: center;

            button {
                background-color: transparent;
                border: none;
                cursor: pointer;
            }
        }
    }

    .weather-blocks::-webkit-scrollbar {
        display: none;  
    }
    
    .block {
        flex-shrink: 0;
        padding-right: 40px;
    }

    .weather-chart {
        margin-top: 2rem;
    }

@media(max-width: 1024px) {
    .adaptive {
        justify-content: flex-start
    }
}
    
@media( max-width: 460px) {
    main {
        min-height: calc(100vh -  5.5rem);
    }
}
</style>