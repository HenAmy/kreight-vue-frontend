<template>
  <MobileMenu />
  <div class="p-2 bg-primary md:hidden flex"></div>

  <div class="flex flex-col h-full mx-auto md:flex-row md:space-x-10 font-mainFont">
    <!-- Left Side -->
    <div class="flex flex-col md:w-1/2 p-8 justify-center space-y-10">
      <div class="space-x-1 justify-between mb-10 flex">
        <RouterLink :to="{ name: 'home' }">
          <img
            src="../../public/assets/img/logo-primary.svg"
            alt=""
            class="w-[160px] lg:flex hidden"
          />
        </RouterLink>
        <router-link :to="{ name: 'getstarted' }" class="font-mainFont">
          New member? <span class="font-bold">Sign Up</span>
        </router-link>
      </div>

      <div class="space-y-8">
        <h5 class="text-3xl font-bold text-left text-text font-mainFont">Sign In</h5>
      </div>
      <!-- Form -->
      <vee-form class="flex flex-col space-y-16" :validation-schema="schema" @submit="login">
        <div class="space-y-7">
          <!-- Email address -->
          <div class="flex flex-col space-y-1">
            <label class="font-bold text-sm"> Email Address: </label>
            <vee-field
              name="email"
              type="email"
              class="flex-1 rounded-md w-full placeholder-placeholder bg-white px-4 py-2 border border-[#bbb] text-sm"
              placeholder="Enter email address"
            />
            <ErrorMessage class="text-red-600 text-sm" name="email" />
          </div>
          <!-- Password -->
          <div class="flex flex-col space-y-1">
            <label class="font-mainFont font-bold text-[14px]"> Password: </label>
            <vee-field
              name="password"
              type="password"
              class="flex-1 rounded-md w-full placeholder-placeholder bg-white px-4 py-2 border border-[#ddd] text-sm"
              placeholder="Enter password"
            />
            <ErrorMessage class="text-red-600 text-sm" name="password" />
          </div>
        </div>
        <div class="flex flex-col space-y-3">
          <div
            class="bg-red-200 text-center py-3 rounded"
            v-if="log_show_alert"
            :class="log_alert_variant"
          >
            {{ log_error_msg }}
          </div>
          <button
            type="submit"
            :disabled="log_in_submission"
            :class="log_button_variant"
            class="px-3 py-3 flex justify-center text-white bg-secondary rounded-md focus:outline-none font-mainFont text-[16px]"
          >
            <i
              v-if="log_in_submission"
              class="pi pi-spin pi-spinner"
              style="font-size: 1.5rem; color: white"
            ></i>
            <p v-else>Sign In</p>
          </button>
          <RouterLink :to="{ name: 'forgotpassword' }" class="font-mainFont mx-auto">
            Forgot Password?
          </RouterLink>
        </div>
      </vee-form>
    </div>

    <!-- Right Side -->
    <div class="md:w-1/2 bg-primary md:flex items-center justify-center hidden">
      <img class="p-32 sm:p-32" src="../../public/assets/img/icons-group.png" alt="icons-group" />
    </div>
  </div>
</template>

<script>
import MobileMenu from '@/components/MobileMenu.vue';
import axios from 'axios';
import { mapWritableState } from 'pinia';
import useUserStore from '@/stores/user';

export default {
  name: 'AppSignIn',
  components: {
    MobileMenu,
  },

  data() {
    return {
      schema: {
        email: 'required|email',
        password: 'required|min:9|max:100',
      },
      // Default values
      // Upon submission
      log_in_submission: false,
      // Showing alert box
      log_show_alert: false,
      // Alert box color
      log_alert_variant: 'bg-red-200',
      // Button color
      log_button_variant: 'bg-secondary',
      // Button message
      log_button_msg: 'Loading... Please wait',
      // Alert box message
      log_error_msg: 'Something went wrong',
    };
  },

  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn']),
  },

  methods: {
    async login(values) {
      this.log_in_submission = true;
      this.log_button_msg = 'Loading... Please wait';

      let userCred = null;
      try {
        userCred = await axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, {
          email_address: values.email,
          password: values.password,
        });
      } catch (err) {
        this.log_in_submission = false;
        this.log_show_alert = true;
        this.log_alert_variant = 'bg-red-200';
        this.log_error_msg = `${err.response.data.message}`;
        return;
      }

      localStorage.setItem('token', userCred.data.response.token);
      this.log_show_alert = false;
      this.userLoggedIn = true;
      this.$router.push({
        name: 'dashboard',
        reload: true,
      });
    },
  },
};
</script>
