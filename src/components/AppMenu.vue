<template>
  <!-- MOBILE MENU -->
  <div
    id="menu"
    class="font-mainFont fixed inset-0 z-10 flex-col items-center self-end w-full h-full m-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white bg-secondary"
    v-show="isActive"
  >
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
      <h4 class="mx-2 mt-2 font-semibold text-md text-white mb-10">{{ user.business_name }}</h4>
    </div>

    <div class="space-y-4">
      <!-- Dashboard -->
      <router-link
        class="flex items-center text-white px-4 py-2 mt-3 gap-3"
        :to="{ name: 'dashboard' }"
      >
        <PhHouse weight="fill" :size="28" />
        <span class="text-sm">Dashboard</span>
      </router-link>

      <!-- Calendar -->
      <router-link
        :to="{ name: 'calendar' }"
        class="flex items-center text-white px-4 py-2 mt-3 gap-3"
      >
        <PhCalendar weight="fill" :size="28" />
        <span class="text-sm">Calendar</span>
      </router-link>

      <!-- Bookings -->
      <router-link
        :to="{ name: 'bookings', query: { s: 'requests' } }"
        class="flex items-center px-4 py-2 mt-2 text-white gap-3"
      >
        <PhCalendarCheck weight="fill" :size="28" />
        <span class="text-sm">Bookings</span>
      </router-link>

      <!-- Past Bookings / History -->
      <router-link
        :to="{ name: 'bookinghistory' }"
        class="flex items-center px-4 py-2 mt-2 text-white gap-3"
      >
        <PhCalendarBlank weight="fill" :size="28" />
        <span class="text-sm">History</span>
      </router-link>

      <!-- Settings -->
      <router-link
        :to="{ name: 'settings' }"
        class="flex items-center px-4 py-2 mt-2 text-white gap-3"
      >
        <PhGear weight="fill" :size="28" />
        <span class="text-sm">Settings</span>
      </router-link>

      <!-- Signout -->
      <button @click="signOut" class="flex items-center px-4 py-2 mt-2 gap-3">
        <PhSignOut class="hover:text-red-300" color="red" weight="fill" :size="28" />
        <span class="text-red-500 text-sm hover:text-red-300">Sign out</span>
      </button>
    </div>
  </div>

  <!-- NAVIGATION -->
  <div class="p-3 z-10 lg:hidden shadow-lg sticky top-0 bg-white">
    <div class="flex items-center justify-between container mx-auto space-x-20 font-mainFont">
      <router-link :to="{ name: 'dashboard' }" class="z-30">
        <img src="../../public/assets/img/logo-primary.svg" alt="" id="logo" class="w-32 md:w-40" />
      </router-link>

      <!-- Hamburger -->
      <PhList
        class="flex lg:hidden cursor-pointer"
        v-show="!isActive"
        @click="toggleActive"
        color="black"
        weight="bold"
        :size="24"
      />
      <PhX
        class="cursor-pointer"
        v-show="isActive"
        @click="toggleActive"
        color="black"
        weight="bold"
        :size="24"
      />
    </div>
  </div>
</template>

<script setup>
import {
  PhX,
  PhList,
  PhHouse,
  PhCalendarCheck,
  PhCalendar,
  PhGear,
  PhSignOut,
  PhCalendarBlank,
} from '@phosphor-icons/vue';
</script>

<script>
import axios from 'axios';
import { mapWritableState } from 'pinia';
import useUserStore from '@/stores/user';

export default {
  name: 'AppMenu',

  data() {
    return {
      isActive: false,
      currentuser: null,
    };
  },

  computed: {
    ...mapWritableState(useUserStore, ['user']),
    ...mapWritableState(useUserStore, ['userLoggedIn']),
  },

  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
    },

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
    },
  },
};
</script>
