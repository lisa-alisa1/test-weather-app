<template>
    <div>
        <main>
            <section class="weather-blocks favorite-mt" v-if="favoritesBlocks.length">
                <weather-block 
                    v-for="block in favoritesBlocks"
                    :key="block.id"
                    :weather-data-prop="block" 
                    class="block" 
                />
            </section>

            <section v-else>
                <div>
                    Add new cities
                </div>
            </section>
        </main>
    </div>
</template>


<script>
import DeleteModal from '@/components/DeleteModal.vue';
import WeatherBlock from '@/components/WeatherBlock.vue';
import { useFavoritesStore } from '@/stores';
import { mapState } from 'pinia';

export default {
    name: 'FavoritesPage',
    props: {
        weatherDataProp: Object
    },
    components: { WeatherBlock, DeleteModal},

    computed: {
        ...mapState(useFavoritesStore, ['favoritesBlocks'])
    }   
}
</script>


<style lang="scss" scoped>
    main {
        min-height: calc(100vh -  64px);
        box-sizing: border-box;
        padding-top: 0;
    }

    .block {
        flex-shrink: 0;
        padding-right: 40px;
    }

    
    @media(max-width: 1024px) {
        .favorite-mt {
            margin-top: 83px;
        }
    }
</style>