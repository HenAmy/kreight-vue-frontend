<template>
  <aside
    v-if="user"
    class="hidden lg:flex flex-col w-64 h-screen px-4 pt-8 overflow-y-auto bg-white sticky top-0 font-mainFont shadow-lg"
  >
    <router-link :to="{ name: 'dashboard' }" class="mx-auto">
      <img class="w-auto h-6 sm:h-7" src="../../public/assets/img/logo-primary.svg" alt="" />
    </router-link>

    <!-- Avatar -->
    <div class="flex flex-col items-center mt-10 -mx-2">
      <img
        class="w-24 h-24 object-contain rounded-full"
        :src="
          user.business_photo_url
            ? `${user.business_photo_url}`
            : 'https://84d36ede214360ad0692cfb46107ad10.cdn.bubble.io/f1712348695728x793058886171252500/avatar_placeholder.png?_gl=1*g916h4*_gcl_au*MTUxNzE0NzI4My4xNzA5ODg5NjI2*_ga*MTk1Nzk2MDM0MC4xNjU1MTE2NjI5*_ga_BFPVR2DEE2*MTcxMjMxNjcwNS4xOS4xLjE3MTIzNDg2NzYuNTguMC4w'
        "
        alt="avatar"
      />
      <h4 class="mx-2 mt-2 font-semibold text-md text-text">{{ user.business_name }}</h4>
    </div>

    <!-- Navigation -->
    <div class="flex flex-col justify-between flex-1 mt-4">
      <div>
        <!-- Dashboard -->
        <router-link
          class="flex items-center text-gray px-4 py-2 mt-3 gap-3"
          :to="{ name: 'dashboard' }"
        >
          <PhHouse weight="fill" :size="28" />
          <span class="text-sm">Dashboard</span>
        </router-link>

        <!-- Calendar -->
        <router-link
          :to="{ name: 'calendar' }"
          class="flex items-center px-4 py-2 mt-2 text-gray gap-3"
        >
          <PhCalendar weight="fill" :size="28" />
          <span class="text-sm">Calendar</span>
        </router-link>

        <!-- Bookings -->
        <router-link
          :to="{ name: 'bookings', query: { s: 'requests' } }"
          class="flex items-center px-4 py-2 mt-2 text-gray gap-3"
        >
          <PhCalendarCheck weight="fill" :size="28" />
          <span class="text-sm">Bookings</span>
        </router-link>

        <!-- Past Bookings / History -->
        <router-link
          :to="{ name: 'bookinghistory' }"
          class="flex items-center px-4 py-2 mt-2 text-gray gap-3"
        >
          <PhCalendarBlank weight="fill" :size="28" />
          <span class="text-sm">History</span>
        </router-link>

        <!-- Settings -->
        <router-link
          :to="{ name: 'settings' }"
          class="flex items-center px-4 py-2 mt-2 text-gray gap-3"
        >
          <PhGear weight="fill" :size="28" />
          <span class="text-sm">Settings</span>
        </router-link>

        <!-- Join Discord Us -->
        <!-- <a href="" class="flex items-center px-4 py-2 mt-2 text-gray gap-3">
          <PhEnvelope weight="fill" :size="28" />
          <span class="text-sm">E-mail us</span>
        </a> -->

        <!-- Signout -->
        <button @click="signOut" class="flex items-center px-4 py-2 mt-2 gap-3">
          <PhSignOut class="hover:text-red-300" color="#FF0000" weight="fill" :size="28" />
          <span class="text-error text-sm hover:text-red-300">Sign out</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import {
  PhHouse,
  PhCalendarCheck,
  PhCalendar,
  PhGear,
  PhSignOut,
  PhCalendarBlank,
  // PhEnvelope,
} from '@phosphor-icons/vue';
</script>

<script>
import axios from 'axios';
import { mapWritableState } from 'pinia';
import useUserStore from '@/stores/user';

export default {
  name: 'AppSidebar',

  data() {
    return {
      currentuser: null,
    };
  },

  computed: {
    ...mapWritableState(useUserStore, ['user']),
    ...mapWritableState(useUserStore, ['userLoggedIn']),
  },

  methods: {
    async signOut() {
      await axios.post(`${import.meta.env.VITE_API_URL}/sign-out`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.removeItem('token'),
        },
      });
      // this.user = null;
      this.userLoggedIn = false;
      this.$router.push({
        name: 'signin',
        reload: true,
      });
      // this.$router.push({ name: 'signin' });
    },
  },
};
</script>
