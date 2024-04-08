<template>
  <!-- MOBILE MENU -->
  <div
    id="menu"
    class="font-mainFont fixed inset-0 z-10 flex-col items-center self-end w-full h-full m-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white bg-secondary"
    v-show="isActive"
  >
    <div class="w-full py-3 text-center font-mainFont text-[16px]">
      <router-link :to="{ name: 'home' }" class="text-sm"> Home </router-link>
    </div>
    <!-- <div class="w-full py-4 text-center">
      <router-link :to="{ name: 'home' }" class="text-sm"> Features </router-link>
    </div>
    <div class="w-full py-4 text-center">
      <router-link :to="{ name: 'home' }" class="text-sm"> Testimonials </router-link>
    </div>
    <div class="w-full py-4 text-center">
      <router-link :to="{ name: 'home' }" class="text-sm"> Contact </router-link>
    </div> -->
    <div class="flex flex-col mt-4 space-y-4 justify-center p-1 w-full">
      <router-link
        :to="{ name: 'signin' }"
        class="px-6 py-3 text-text bg-white rounded-md focus:outline-none font-semibold text-md text-center"
      >
        Sign In
      </router-link>
      <router-link
        :to="{ name: 'getstarted' }"
        class="px-6 py-3 text-white bg-secondary border rounded-md focus:outline-none md:py-4 text-md text-center"
      >
        Get Started
      </router-link>
    </div>
  </div>

  <!-- NAVIGATION -->
  <div class="p-3 z-10 lg:hidden shadow-lg sticky top-0 bg-white">
    <div class="flex items-center justify-between container mx-auto space-x-20 font-mainFont">
      <router-link :to="{ name: 'home' }" class="z-30">
        <img src="../../public/assets/img/logo-primary.svg" alt="" id="logo" class="w-32 md:w-40" />
      </router-link>
      <div v-show="!isActive" class="hidden items-center space-x-10 text-text lg:flex">
        <a href="#home" class="tracking-widest hover:text-softRed"> Home </a>
        <a href="#features" class="tracking-widest hover:text-softRed"> Features </a>
        <a href="#testimonials" class="tracking-widest hover:text-softRed"> Testimonials </a>
        <a href="#contacts" class="tracking-widest hover:text-softRed"> Contact </a>
      </div>
      <div v-show="!isActive" class="hidden lg:flex">
        <a
          href="/sign-in"
          class="px-10 py-2 text-text bg-white rounded-md focus:outline-none m-auto md:py-2 font-mainFont text-[18px]"
        >
          Sign In
        </a>
        <a
          href="/get-started"
          class="px-8 py-8 text-white bg-secondary rounded-md focus:outline-none md:py-4 font-mainFont text-[18px]"
        >
          Get Started
        </a>
      </div>
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
import { PhX, PhList } from '@phosphor-icons/vue';
</script>

<script>
export default {
  name: 'MobileMenu',

  data() {
    return {
      isActive: false,
    };
  },

  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
    },
  },
};
</script>
