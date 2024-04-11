<template>
  <vee-form :validation-schema="schema" @submit="changeProfile" class="space-y-20">
    <!-- Title -->
    <div class="space-y-5">
      <div class="space-y-2">
        <h3 class="text-2xl font-bold">Change Profile</h3>
        <p class="text-sm">
          Update your business information such as your name, bio, and business photo.
        </p>
      </div>
      <hr />
    </div>

    <!-- Business Photo -->
    <div class="bg-white lg:flex items-center space-y-3">
      <p class="md:w-1/3 font-semibold text-sm">Business Photo Url</p>
      <div class="flex flex-col items-center w-full space-y-4">
        <img
          class="w-28 p-2 rounded-full"
          :src="
            user.business_photo_url
              ? `${user.business_photo_url}`
              : 'https://84d36ede214360ad0692cfb46107ad10.cdn.bubble.io/f1712348695728x793058886171252500/avatar_placeholder.png?_gl=1*g916h4*_gcl_au*MTUxNzE0NzI4My4xNzA5ODg5NjI2*_ga*MTk1Nzk2MDM0MC4xNjU1MTE2NjI5*_ga_BFPVR2DEE2*MTcxMjMxNjcwNS4xOS4xLjE3MTIzNDg2NzYuNTguMC4w'
          "
          alt="avatar"
        />
        <p
          v-show="!photoChange"
          @click.prevent="photoChange = true"
          class="font-bold text-sm text-primary underline underline-offset-4 cursor-pointer"
        >
          Change Photo
        </p>
        <vee-field
          v-show="photoChange"
          type="link"
          name="business_photo_url"
          placeholder="Enter business photo url"
          class="rounded-md text-sm cursor-pointer focus:outline-dashed focus:outline-2 focus:outline-primary bg-white border border-[#ddd] px-4 py-3 w-full"
        />
        <ErrorMessage class="text-red-600 text-sm" name="business_photo_url" />
        <p
          v-show="photoChange"
          @click.prevent="photoChange = false"
          class="font-bold text-sm text-text cursor-pointer"
        >
          Cancel
        </p>
      </div>
    </div>
    <!-- Business Name -->
    <div class="bg-white lg:flex items-center w-full space-y-3">
      <p class="md:w-1/3 font-semibold text-sm">Business Name</p>
      <div class="space-y-2 w-full">
        <vee-field
          type="text"
          v-model="user.business_name"
          name="business_name"
          placeholder="Enter business name"
          class="flex-1 rounded-md w-full placeholder-placeholder bg-white px-4 py-3 border border-[#ddd] text-sm"
        />
        <ErrorMessage class="text-red-600 text-sm" name="business_name" />
      </div>
    </div>

    <!-- Bio -->
    <div class="bg-white lg:flex items-center w-full space-y-3">
      <p class="w-1/3 font-semibold text-sm">Bio</p>
      <vee-field
        as="textarea"
        v-model="user.business_bio"
        rows="6"
        name="bio"
        type="text"
        placeholder="Enter bio for your booking link"
        class="rounded-md px-4 py-3 bg-white border border-[#ddd] focus:outline-none text-sm w-full"
      />
    </div>

    <!-- Actions -->
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
import { mapWritableState, mapActions } from 'pinia';
import useUserStore from '@/stores/user';

export default {
  name: 'SettingsProfile',

  data() {
    return {
      photo_file: null,
      photoChange: false,

      schema: {
        business_name: 'required|min:3|max:100',
        business_photo_url: 'url',
      },

      // Default values
      on_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-600',
      alert_msg: 'Something went wrong',
    };
  },

  computed: {
    ...mapWritableState(useUserStore, ['user']),
  },

  methods: {
    ...mapActions(useUserStore, ['currentUser']),
    // upload($event) {
    //   this.photo_file = $event.target.files[0];
    // },

    async changeProfile(values) {
      this.on_submission = true;

      let response = null;
      try {
        if (!this.user.business_photo_url) {
          response = await axios.request({
            url: `${import.meta.env.VITE_API_URL}/settings-profile`,
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            data: {
              photo_url: values.business_photo_url,
              business_name: values.business_name,
              business_bio: values.bio,
            },
          });
        } else {
          response = await axios.request({
            url: `${import.meta.env.VITE_API_URL}/settings-profile`,
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            data: {
              photo_url: this.user.business_photo_url,
              business_name: values.business_name,
              business_bio: values.bio,
            },
          });
        }

        this.show_alert = true;
        console.log('Response: ', response);
        this.alert_variant = 'bg-green-200';
        this.currentUser();
        this.photoChange = false;
        this.alert_msg = 'Profile updated successfully';
        //
      } catch (error) {
        this.on_submission = false;
        this.show_alert = true;
        console.log('Error: ', error);
        this.alert_msg = `${error}`;
        this.alert_variant = 'bg-red-200';
      }

      this.on_submission = false;
    },
  },
};
</script>
