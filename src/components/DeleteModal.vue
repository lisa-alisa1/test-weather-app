<template>
    <div 
      v-if="isModalOpen || isModalOpenHome" 
      class="modal-overlay"
    >
        <div 
          class="modal-content" 
          :class="{deleteContent: isModalOpen}"
        >
            <div>
              <p v-if="isModalOpen">
                Are you sure you want to delete this block?
              </p>

              <p v-else-if="isModalOpenHome">
                To add a new city remove 1 card 
              </p>
            </div>

            <div class="modal-buttons">
                <div v-if="isModalOpen" class="button-wrap">
                    <button 
                      class="delete-button" 
                      @click="confirmDelete"
                    > 
                      Delete 
                    </button>
                    <button 
                      class="cancel-button" 
                      @click="closeModal"
                    > 
                      Cancel 
                    </button>
                </div>
                <div v-else-if="isModalOpenHome" class="button-wrap">
                    <button class="cancel-button" @click="closeModal"> OK </button>
                </div>
            </div>
        </div>
    </div>
  </template>


<script>
export default {
  props: {
    isModalOpen: Boolean,
    isModalOpenHome: Boolean,

  },
  methods: {
 
    closeModal() {
      this.$emit('close');
    },
    confirmDelete() {
      this.$emit('confirm');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  height: 5rem;
  width: 18rem;
  border-radius: 8px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.deleteContent {
  height: 6rem;
  width: 20rem;
}

.button-wrap {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.delete-wrap {
  margin-top: 5px;
}

.delete-button {
  background-color: $primary-color;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button {
  background-color: #95a5a6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer
}
</style>