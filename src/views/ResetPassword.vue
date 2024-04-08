<template>
  <MobileMenu />
  <div class="p-2 bg-primary md:hidden flex"></div>

  <div class="flex flex-col mx-auto md:flex-row md:space-x-10">
    <!-- Content -->
    <div class="flex flex-col md:w-1/2 p-8 justify-center space-y-10">
      <div class="space-x-1 justify-between mb-10 flex">
        <a href="/">
          <img
            src="../../public/assets/img/logo-primary.svg"
            alt=""
            class="w-[160px] lg:flex hidden"
          />
        </a>
        <router-link :to="{ name: 'getstarted' }" class="font-mainFont">
          New member? <span class="font-bold">Sign Up</span>
        </router-link>
      </div>

      <div class="space-y-8">
        <h5 class="text-3xl font-bold text-left text-text font-mainFont">Reset Password</h5>
      </div>
      <div class="flex flex-col space-y-16">
        <div class="space-y-7">
          <div class="flex flex-col space-y-1">
            <label for="password" class="font-mainFont font-bold text-[14px]"> Password: </label>
            <input
              type="password"
              class="flex-1 rounded-md w-full placeholder-placeholder bg-background px-4 py-2 focus:outline-none font-mainFont text-[14px]"
              placeholder="Enter password"
              id="password"
            />
          </div>
          <div class="flex flex-col space-y-1">
            <label for="confirm" class="font-mainFont font-bold text-[14px]">
              Confirm Password:
            </label>
            <input
              type="password"
              class="flex-1 rounded-md w-full placeholder-placeholder bg-background px-4 py-2 focus:outline-none font-mainFont text-[14px]"
              placeholder="Confirm password"
              id="confirm"
            />
          </div>
        </div>
        <div class="flex flex-col space-y-3">
          <router-link
            :to="{ name: 'signin' }"
            class="px-3 py-3 flex justify-center text-white bg-secondary rounded-md focus:outline-none font-mainFont text-[16px]"
          >
            Reset Password
          </router-link>
        </div>
      </div>
    </div>

    <!-- Image -->
    <div
      class="sticky top-0 md:w-1/2 h-screen bg-primary md:flex items-center justify-center hidden"
    >
      <img class="p-32" src="../../public/assets/img/icons-group.png" alt="icons-group" />
    </div>
  </div>
</template>

<script>
import MobileMenu from '@/components/MobileMenu.vue';

export default {
  name: 'AppResetPassword',
  components: {
    MobileMenu,
  },
};
</script>
