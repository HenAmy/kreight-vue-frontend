<template>
  <vee-form :validation-schema="schema" @submit="changePassword" class="space-y-20 panel panel-3">
    <!-- Title -->
    <div class="space-y-5">
      <div class="space-y-2">
        <h3 class="text-2xl font-bold">Change Password</h3>
        <p class="text-sm">
          Updating your password to a strong and unique password to further protect your account.
        </p>
      </div>
      <hr />
    </div>
    <!-- Old Password -->
    <div class="bg-white lg:flex items-center w-full space-y-3">
      <p class="w-1/3 font-semibold text-sm">Old Password</p>
      <div class="w-full space-y-1">
        <vee-field
          name="oldpassword"
          type="password"
          placeholder="Enter your current password"
          class="rounded-md bg-background px-4 py-3 focus:outline-none text-sm w-full"
        />
        <ErrorMessage class="text-red-600 text-sm" name="oldpassword" />
      </div>
    </div>
    <!-- New Password -->
    <div class="bg-white lg:flex items-center w-full space-y-3">
      <p class="w-1/3 font-semibold text-sm">New Password</p>
      <div class="w-full space-y-1">
        <vee-field
          name="newpassword"
          type="password"
          placeholder="Enter your new password"
          class="rounded-md bg-background px-4 py-3 focus:outline-none text-sm w-full"
        />
        <ErrorMessage class="text-red-600 text-sm" name="newpassword" />
      </div>
    </div>
    <!-- Confirm Password -->
    <div class="bg-white lg:flex items-center w-full space-y-3">
      <p class="w-1/3 font-semibold text-sm">Confirm Password</p>
      <div class="w-full space-y-1">
        <vee-field
          name="confirmpassword"
          type="password"
          placeholder="Re-enter your new password"
          class="rounded-md bg-background px-4 py-3 focus:outline-none text-sm w-full"
        />
        <ErrorMessage class="text-red-600 text-sm" name="confirmpassword" />
      </div>
    </div>

    <div class="space-y-2">
      <div class="text-center py-3 rounded text-sm" v-if="show_alert" :class="alert_variant">
        {{ alert_msg }}
      </div>
      <!-- Actions -->
      <div class="flex space-x-14 justify-end">
        <!-- <button
                  class="py-3 text-text bg-transparent focus:outline-none font-mainFont text-sm"
                >
                  Cancel
                </button> -->
        <button
          :disabled="on_submission"
          class="px-16 py-3 text-white bg-secondary rounded-md focus:outline-none font-mainFont text-sm"
        >
          <i
            v-if="on_submission"
            class="pi pi-spin pi-spinner"
            style="font-size: 1rem; color: white"
          ></i>
          <p v-else>Save</p>
        </button>
      </div>
    </div>
  </vee-form>
</template>

<script>
import axios from 'axios';
// import { mapActions } from 'pinia';
// import useUserStore from '@/stores/user';

export default {
  name: 'SettingsPassword',

  data() {
    return {
      schema: {
        oldpassword: 'required|min:3|max:100',
        newpassword: 'required|min:9|max:100|excluded:password',
        confirmpassword: 'passwords_mismatch:@newpassword',
      },

      // Default values
      on_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-600',
      alert_msg: 'Something went wrong',
    };
  },

  methods: {
    // ...mapActions(useUserStore, ['currentUser']),
    // ...mapActions(useUserStore, ['userDays']),

    async changePassword(values) {
      this.on_submission = true;

      let response = null;
      try {
        response = await axios.request({
          url: `${import.meta.env.VITE_API_URL}/settings-password`,
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          data: {
            old_password: values.oldpassword,
            new_password: values.newpassword,
            confirm_password: values.confirmpassword,
          },
        });

        this.show_alert = true;
        console.log('Response: ', response);
        this.alert_variant = 'bg-green-200';
        // this.currentUser();
        this.alert_msg = 'Password changed successfully';
        //
      } catch (error) {
        this.on_submission = false;
        this.show_alert = true;
        // console.log('Error: ', error);
        this.alert_msg = `${error.response.data.message}`;
        this.alert_variant = 'bg-red-200';
      }

      this.on_submission = false;
    },
  },
};
</script>
