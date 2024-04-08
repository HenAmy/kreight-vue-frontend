<template>
  <!-- <MobileMenu />
  <div class="p-2 bg-primary md:hidden flex"></div> -->

  <div class="bg-[#EDEEF1] h-screen font-mainFont flex justify-center items-center">
    <div class="flex flex-col items-center space-y-10">
      <img class="w-auto h-8" src="../../public/assets/img/logo-primary.svg" alt="" />
      <img class="w-64" src="../../public/assets/img/notfound.png" alt="" />
      <p class="font-bold text-4xl text-center">404 PAGE NOT FOUND</p>
      <button
        class="px-10 py-3 flex-1 text-white bg-secondary rounded-md font-mainFont text-[16px]"
      >
        <router-link :to="{ name: 'home' }">Back to homepage</router-link>
      </button>
    </div>
  </div>
</template>

<script>
// import MobileMenu from '@/components/MobileMenu.vue';

export default {
  name: 'NotFound',

  components: {
    // MobileMenu,
  },
};
</script>
