<template>
  <MobileMenu />
  <div class="p-2 bg-primary md:hidden flex"></div>

  <div class="flex flex-col mx-auto md:flex-row md:space-x-10">
    <!-- Image -->
    <div class="md:w-1/2 h-screen bg-primary md:flex items-center justify-center hidden">
      <img class="p-32 sm:p-32" src="" alt="" />
    </div>

    <!-- Content -->
    <div class="flex flex-col md:w-1/2 p-8 justify-center space-y-10">
      <div class="flex space-x-1 justify-between mb-10">
        <router-link :to="{ name: 'home' }">
          <img
            src="../../public/assets/img/logo-primary.svg"
            alt="logo"
            class="w-[160px] lg:flex hidden"
          />
        </router-link>
        <!-- <a href="/sign-in" class="font-mainFont">
              Already a member? <span class="font-bold">Sign In</span>
            </a> -->
      </div>

      <div class="space-y-8">
        <h5 class="text-3xl font-bold text-left text-text font-mainFont">Email Confirmation</h5>
      </div>
      <div class="flex flex-col space-y-16">
        <p class="font-mainFont text-xl">
          We sent an email to your email address to confirm your identity. Please confirm your email
          address to start your Kreight journey
        </p>
        <router-link
          :to="{ name: 'signin' }"
          class="px-3 py-3 flex justify-center text-white bg-secondary rounded-md focus:outline-none font-mainFont text-[16px]"
        >
          Resend Email
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import MobileMenu from '@/components/MobileMenu.vue';

export default {
  name: 'AppConfirmEmail',
  components: {
    MobileMenu,
  },
};
</script>
