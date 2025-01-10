<template>
  <MobileMenu />
  <div class="p-2 bg-primary md:hidden flex"></div>

  <div class="flex flex-col h-full mx-auto md:flex-row md:space-x-10">
    <!-- Left Side -->
    <div class="md:w-1/2 bg-primary md:flex items-center justify-center hidden">
      <img class="p-32 sm:p-32" src="../../public/assets/img/icons-group.png" alt="icons-group" />
    </div>

    <!-- Right Side -->
    <div class="flex flex-col md:w-1/2 p-8 justify-center space-y-10 font-mainFont">
      <div class="flex space-x-1 justify-between mb-10">
        <router-link :to="{ name: 'home' }">
          <img
            src="../../public/assets/img/logo-primary.svg"
            alt=""
            class="w-[160px] lg:flex hidden"
          />
        </router-link>
        <router-link :to="{ name: 'signin' }" class="font-mainFont">
          Already a member? <span class="font-bold">Sign In</span>
        </router-link>
      </div>

      <div class="space-y-8">
        <h5 class="text-3xl font-bold text-left text-text font-mainFont">Get Started</h5>
      </div>
      <vee-form class="flex flex-col space-y-16" :validation-schema="schema" @submit="getStarted">
        <div class="space-y-7">
          <!-- Business name -->
          <div class="flex flex-col space-y-1">
            <label class="font-mainFont font-bold text-[14px]"> Business Name: </label>
            <vee-field
              name="business_name"
              type="text"
              v-model="namefromHome"
              class="flex-1 rounded-md w-full placeholder-placeholder bg-white px-4 py-2 border border-[#ddd] text-sm"
              placeholder="Enter business name"
            />
            <ErrorMessage class="text-red-600 text-sm" name="business_name" />
          </div>
          <!-- Email address -->
          <div class="flex flex-col space-y-1">
            <label class="font-mainFont font-bold text-[14px]"> Email Address: </label>
            <vee-field
              name="email"
              type="email"
              class="flex-1 rounded-md w-full placeholder-placeholder bg-white px-4 py-2 border border-[#ddd] text-sm"
              placeholder="Enter email address"
            />
            <ErrorMessage class="text-red-600 text-sm" name="email" />
          </div>
          <!-- Password -->
          <div class="flex flex-col space-y-1">
            <label class="font-mainFont font-bold text-[14px]"> Password: </label>
            <vee-field name="password" :bails="false" v-slot="{ field, errors }">
              <input
                type="password"
                v-bind="field"
                class="flex-1 rounded-md w-full placeholder-placeholder bg-white px-4 py-2 border border-[#ddd] text-sm"
                placeholder="Enter password"
              />
              <div class="text-red-600 text-sm" v-for="error in errors" :key="error">
                {{ error }}
              </div>
            </vee-field>
            <!-- <ErrorMessage class="text-red-600" name="password" /> -->
          </div>
          <!-- Confirm Password -->
          <div class="flex flex-col space-y-1">
            <label class="font-mainFont font-bold text-[14px]"> Confirm Password: </label>
            <vee-field
              name="confirm_password"
              type="password"
              class="flex-1 rounded-md w-full placeholder-placeholder bg-white px-4 py-2 border border-[#ddd] text-sm"
              placeholder="Confirm password"
            />
            <ErrorMessage class="text-red-600 text-sm" name="confirm_password" />
          </div>
        </div>

        <div class="space-y-2">
          <!-- Alert box -->
          <div
            class="bg-red-200 text-center py-3 rounded"
            v-if="reg_show_alert"
            :class="reg_alert_variant"
          >
            {{ reg_error_msg }}
          </div>
          <button
            class="w-full p-3 flex justify-center text-white rounded-md text-md"
            type="submit"
            :class="reg_button_variant"
            :disabled="reg_in_submission"
          >
            <i
              v-if="reg_in_submission"
              class="pi pi-spin pi-spinner"
              style="font-size: 1.5rem; color: white"
            ></i>
            <p v-else>Get Started</p>
            <!-- <p v-if="reg_in_submission">{{ reg_button_msg }}</p> -->
          </button>
        </div>
      </vee-form>
    </div>
  </div>
</template>

<script>
// import { auth, usersCollection } from '@/includes/firebase';

import MobileMenu from '@/components/MobileMenu.vue';
import axios from 'axios';
import { mapWritableState } from 'pinia';
import useUserStore from '@/stores/user';

export default {
  name: 'AppGetStarted',
  data() {
    return {
      menuActive: false,
      namefromHome: '',

      schema: {
        business_name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        password: 'required|min:9|max:100|excluded:password',
        confirm_password: 'passwords_mismatch:@password',
      },
      // Default values
      // Upon submission
      reg_in_submission: false,
      // Showing alert box
      reg_show_alert: false,
      // Alert box color
      reg_alert_variant: 'bg-blue-600',
      // Button color
      reg_button_variant: 'bg-secondary',
      // Button message
      reg_button_msg: 'Loading... Please wait',
      // Alert box message
      reg_error_msg: 'Something went wrong',
    };
  },

  components: {
    MobileMenu,
  },

  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn']),
  },

  created() {
    const { name } = this.$route.query;
    if (name) {
      this.namefromHome = name;
    } else {
      return;
    }
  },

  methods: {
    async getStarted(values) {
      this.reg_in_submission = true;
      this.reg_button_msg = 'Loading... Please wait';

      //FIREBASE OPERATIONS
      // let userCredentials = null;
      // try {
      //   userCredentials = await auth.createUserWithEmailAndPassword(values.email, values.password);
      // } catch (error) {
      //   this.reg_in_submission = false;
      //   this.reg_show_alert = true;
      //   this.reg_alert_variant = 'bg-red-200';
      //   // this.reg_error_msg = `${error.response.data.message}`;
      //   this.reg_error_msg = 'An unexpected error occured. Please try again later.';
      //   return;
      // }

      // await usersCollection.add({
      //   business_name: values.business_name,
      //   business_email: values.email
      // })

      // BUBBLE OPERATIONS
      let userCred = null;
      try {
        userCred = await axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, {
          business_name: values.business_name,
          email_address: values.email,
          password: values.password,
          confirm_password: values.confirm_password,
        });
      } catch (err) {
        this.reg_in_submission = false;
        this.reg_show_alert = true;
        this.reg_alert_variant = 'bg-red-200';
        this.reg_error_msg = `${err.response.data.message}`;
        return;
      }

      localStorage.setItem('token', userCred.data.response.token);
      this.userLoggedIn = true;
      // this.reg_show_alert = true;
      // this.reg_alert_variant = 'bg-green-500'
      // console.log(userCredentials);
      this.$router.push({
        name: 'dashboard',
        reload: true,
      });
    },
  },
};
</script>
