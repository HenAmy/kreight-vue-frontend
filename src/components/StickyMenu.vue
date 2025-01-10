<template>
  <!-- MOBILE MENU -->
  <div
    id="menu"
    class="font-mainFont fixed inset-0 z-10 flex-col items-center self-end w-full h-full m-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white bg-secondary"
    v-show="isActive"
  >
    <div class="w-full py-3 text-center font-mainFont text-[16px]">
      <a href="#home" @click="isActive = false" class="text-sm"> Home </a>
    </div>
    <div class="w-full py-4 text-center">
      <a href="#features" @click="isActive = false" class="text-sm"> Features </a>
    </div>
    <div class="w-full py-4 text-center">
      <a href="#testimonials" @click="isActive = false" class="text-sm"> Testimonials </a>
    </div>
    <div class="w-full py-4 text-center">
      <a href="#contacts" @click="isActive = false" class="text-sm"> Contact </a>
    </div>
    <div class="flex flex-col mt-4 space-y-4 justify-center p-1 w-full">
      <router-link
        :to="{ name: 'signin' }"
        class="px-6 py-4 text-text bg-white rounded-md focus:outline-none font-medium text-md text-center"
      >
        Sign In
      </router-link>
      <router-link
        :to="{ name: 'getstarted' }"
        class="px-6 py-4 text-white bg-secondary border rounded-md focus:outline-none font-medium text-md text-center"
      >
        Get Started
      </router-link>
    </div>
  </div>

  <!-- NAVIGATION -->
  <div class="bg-white p-3 sticky top-0 z-10 font-mainFont">
    <div class="flex items-center justify-between container mx-auto font-mainFont">
      <router-link :to="{ name: 'home' }" class="z-30">
        <img src="../../public/assets/img/logo-primary.svg" alt="" id="logo" class="w-32 md:w-40" />
      </router-link>
      <div class="hidden items-center space-x-10 text-text">
        <a href="#home" class="tracking-widest hover:text-softRed"> Home </a>
        <a href="#features" class="tracking-widest hover:text-softRed"> Features </a>
        <a href="#testimonials" class="tracking-widest hover:text-softRed"> Testimonials </a>
        <a href="#contacts" class="tracking-widest hover:text-softRed"> Contact </a>
      </div>
      <div class="hidden lg:flex space-x-8">
        <router-link
          :to="{ name: 'signin' }"
          class="px-10 py-2 text-text bg-white rounded-md focus:outline-none m-auto md:py-2 font-mainFont text-[18px]"
        >
          Sign In
        </router-link>
        <router-link
          :to="{ name: 'getstarted' }"
          class="py-3 px-10 text-text bg-white border-[3px] border-text rounded-md focus:outline-none font-mainFont text-lg"
        >
          Get Started
        </router-link>
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
        v-show="isActive"
        class="cursor-pointer"
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
  name: 'StickyMenu',

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
