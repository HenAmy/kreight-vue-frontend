<template>
  <!-- Notification Content -->
  <div class="font-mainFont space-y-20 panel panel-4">
    <!-- Title -->
    <div class="space-y-5">
      <div class="space-y-2">
        <h3 class="text-2xl font-bold">Change Notifications</h3>
        <p class="text-sm">
          Updating your notification settings to stay updated about new bookings and/or upcoming
          bookings
        </p>
      </div>
      <hr />
    </div>
    <!-- Email -->
    <div class="bg-white flex items-center w-full justify-between">
      <p class="md:w-1/3 font-regular text-md">Email Notifications</p>
      <div class="flex items-center space-x-2">
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="emailStatus" class="sr-only peer" />
          <div
            class="relative w-11 h-6 bg-disabled peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
          ></div>
          <span class="ms-3 text-md text-text">Active</span>
        </label>
      </div>
    </div>
    <!-- Push -->
    <!-- <div class="bg-white flex items-center w-full justify-between">
      <p class="md:w-1/3 font-regular text-md">Push Notifications</p>
      <div class="flex space-x-2 items-center">
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="pushStatus" class="sr-only peer" />
          <div
            class="relative w-11 h-6 bg-disabled peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
          ></div>
          <span class="ms-3 text-md text-text">Active</span>
        </label>
      </div>
    </div> -->

    <div class="space-y-2">
      <div class="text-center py-3 rounded text-sm" v-if="show_alert" :class="alert_variant">
        {{ alert_msg }}
      </div>
      <div class="flex space-x-14 justify-end">
        <!-- <button class="py-3 text-text bg-transparent focus:outline-none font-mainFont text-sm">
        Cancel
      </button> -->
        <button
          :disabled="on_submission"
          @click.prevent="updateNotifications"
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
  </div>
</template>

<script>
import axios from 'axios';
import { mapWritableState, mapActions } from 'pinia';
import useUserStore from '@/stores/user';

export default {
  name: 'SettingsNotifications',

  data() {
    return {
      emailStatus: false,
      pushStatus: false,

      // Default values
      on_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-600',
      alert_msg: 'Something went wrong',
    };
  },

  created() {
    // console.log('Email status: ', this.user.email_notification);
    // console.log('Push status: ', this.user.push_notification);
    this.emailStatus = this.user.email_notification;
    this.pushStatus = this.user.push_notification;
  },

  computed: {
    ...mapWritableState(useUserStore, ['user']),
  },

  methods: {
    ...mapActions(useUserStore, ['currentUser']),

    async updateNotifications() {
      this.on_submission = true;

      try {
        await axios.request({
          url: `${import.meta.env.VITE_API_URL}/settings-notification`,
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          data: {
            email_status: this.emailStatus,
            // push_status: this.pushStatus,
          },
        });

        this.show_alert = true;
        // this.on_submission = false;
        // console.log('Response: ', response);
        this.alert_variant = 'bg-green-200';
        this.currentUser();
        this.alert_msg = 'Notifications changed successfully';
        //
      } catch (error) {
        this.on_submission = false;
        this.show_alert = true;
        console.log('Error: ', error);
        // this.alert_msg = `${error.response.data.message}`;
        this.alert_variant = 'bg-red-200';
      }

      this.on_submission = false;
    },
  },
};
</script>
