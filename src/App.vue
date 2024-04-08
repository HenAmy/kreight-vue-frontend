<template>
  <router-view></router-view>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia';
import useUserStore from '@/stores/user';

export default {
  name: 'App',

  data() {
    return {};
  },

  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn']),
  },

  methods: {
    ...mapActions(useUserStore, ['currentUser']),
    ...mapActions(useUserStore, ['userDays']),
  },

  watch: {
    userLoggedIn: {
      handler() {
        if (this.userLoggedIn) {
          this.currentUser();
          this.userDays();
        } else {
          if (localStorage.getItem('token')) {
            this.userLoggedIn = true;
          }
        }
      },
      immediate: true,
    },
  },
};
</script>
