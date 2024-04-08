import { defineStore } from 'pinia';

export default defineStore('modal', {
  state: () => ({
    isOpen: false,
    isAccept: false,
  }),

  getters: {
    hiddenClass(state) {
      return !state.isOpen ? 'hidden' : '';
    },
    hiddenAccept(state) {
      return !state.isAccept ? 'hidden' : '';
    },
  },
});
