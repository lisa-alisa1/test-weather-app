import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        favoritesBlocks: JSON.parse(localStorage.getItem('favoritesBlocks')) || [],
    }),
    getters: {
        isFavorite: (state) => (city) => {
            return state.favoritesBlocks.some(b => b.name === city);
        },
    },
    actions: {
        addFavoriteBlock(block) {
            if (!this.favoritesBlocks.some(b => b.name === block.name) && this.favoritesBlocks.length <= 4) {
                console.log(this.favoritesBlocks, 'this.favoritesBlocks');
                this.favoritesBlocks.push(block);
                this.saveToLocalStorage(); 
            }
        },

        removeFavoriteBlock(block) {
            console.log('block name', block.name);
            this.favoritesBlocks = this.favoritesBlocks.filter(b => b.name !== block.name);
            this.saveToLocalStorage();
        },

        saveToLocalStorage() {
            localStorage.setItem('favoritesBlocks', JSON.stringify(this.favoritesBlocks));
        }
    },

})