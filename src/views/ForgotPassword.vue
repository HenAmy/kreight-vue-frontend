<template>
  <MobileMenu />
  <div class="p-2 bg-primary md:hidden flex"></div>

  <div class="flex flex-col h-full mx-auto md:flex-row md:space-x-10">
    <!-- Content -->
    <div class="flex flex-col md:w-1/2 p-8 justify-center space-y-10">
      <div class="space-x-1 justify-between mb-10 flex">
        <router-link :to="{ name: 'home' }">
          <img
            src="../../public/assets/img/logo-primary.svg"
            alt="logo"
            class="w-[160px] lg:flex hidden"
          />
        </router-link>
        <router-link :to="{ name: 'getstarted' }" class="font-mainFont">
          New member? <span class="font-bold">Sign Up</span>
        </router-link>
      </div>

      <div class="space-y-8">
        <h5 class="text-3xl font-bold text-left text-text font-mainFont">Forgot Password</h5>
      </div>
      <div class="flex flex-col space-y-16">
        <div class="space-y-7">
          <div class="flex flex-col space-y-1">
            <label htmlFor="emailaddress" class="font-mainFont font-bold text-[14px]">
              Email Address:
            </label>
            <input
              type="email"
              class="flex-1 rounded-md w-full placeholder-placeholder bg-background px-4 py-3 focus:outline-none font-mainFont text-[14px]"
              placeholder="Enter email address"
              id="emailaddress"
            />
          </div>
        </div>
        <div class="flex flex-col space-y-3">
          <router-link
            :to="{ name: 'resetpassword' }"
            class="px-3 py-3 flex justify-center text-white bg-secondary rounded-md focus:outline-none font-mainFont text-[16px]"
          >
            Send Email
          </router-link>
        </div>
      </div>
    </div>

    <!-- Image -->
    <div class="md:w-1/2 bg-primary md:flex items-center justify-center hidden">
      <img class="p-32 sm:p-32" src="../../public/assets/img/icons-group.png" alt="icons-group" />
    </div>
  </div>
</template>

<script>
import MobileMenu from '@/components/MobileMenu.vue';

export default {
  name: 'AppForgotPassword',
  components: {
    MobileMenu,
  },
};
</script>
