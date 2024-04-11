<template>
  <MobileMenu />
  <div class="p-2 bg-primary md:hidden flex"></div>

  <div class="flex flex-col h-full mx-auto md:flex-row md:space-x-10 font-mainFont">
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
      <!-- Form -->
      <vee-form :validation-schema="schema" @submit="sendLink" class="flex flex-col space-y-16">
        <div class="space-y-7">
          <div class="flex flex-col space-y-1">
            <label class="font-mainFont font-bold text-[14px]"> Email Address: </label>
            <vee-field
              type="email"
              name="email"
              class="flex-1 rounded-md w-full placeholder-placeholder bg-white px-4 py-2 border border-[#ddd] text-sm"
              placeholder="Enter email address"
            />
            <ErrorMessage class="text-red-600 text-sm" name="email" />
          </div>
        </div>
        <div class="flex flex-col space-y-3">
          <button
            class="px-3 py-3 flex justify-center text-white bg-secondary rounded-md focus:outline-none font-mainFont text-[16px]"
          >
            <i
              v-if="on_submission"
              class="pi pi-spin pi-spinner"
              style="font-size: 1.5rem; color: white"
            ></i>
            <p v-else>Send Email</p>
          </button>
        </div>
      </vee-form>
    </div>

    <!-- Image -->
    <div class="md:w-1/2 bg-primary md:flex items-center justify-center hidden">
      <img class="p-32 sm:p-32" src="../../public/assets/img/icons-group.png" alt="icons-group" />
    </div>
  </div>
</template>

<script>
import MobileMenu from '@/components/MobileMenu.vue';
import axios from 'axios';

export default {
  name: 'AppForgotPassword',

  components: {
    MobileMenu,
  },

  data() {
    return {
      schema: {
        email: 'required|email',
      },

      // Upon submission
      on_submission: false,
      // Showing alert box
      show_alert: false,
      // Alert box color
      alert_variant: 'bg-red-200',
      // Button color
      log_button_variant: 'bg-secondary',
      // Button message
      log_button_msg: 'Loading... Please wait',
      // Alert box message
      log_error_msg: 'Something went wrong',
    };
  },

  methods: {
    async sendLink(values) {
      this.on_submission = true;
      this.log_button_msg = 'Loading... Please wait';

      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/forgot-password`, {
          email: values.email,
        });
      } catch (err) {
        this.on_submission = false;
        this.show_alert = true;
        this.alert_variant = 'bg-red-200';
        this.log_error_msg = `${err.response.data.message}`;
        return;
      }

      this.show_alert = false;
      this.userLoggedIn = true;
      this.$router.push({
        name: 'confirmemail',
      });
    },
  },
};
</script>
