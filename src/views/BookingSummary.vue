<template>
  <div class="flex">
    <!-- Main Container -->
    <div class="flex flex-col w-full py-5 lg:py-10 font-mainFont">
      <!-- Header -->
      <div class="space-y-8 mb-20">
        <router-link :to="{ name: 'home' }">
          <img class="mx-auto" src="../../public/assets/img/logo-primary.svg" alt="" />
        </router-link>
        <div class="p-1 bg-primary"></div>
      </div>

      <!-- Content -->
      <div class="space-y-16 mb-10">
        <div class="flex flex-col items-center space-y-5">
          <p class="text-center text-lg text-text w-5/6 md:w-3/5">
            {{ user.business_name }} has received your booking and will get back to you soon. You
            can revisit this link anytime before or during your booking.
          </p>
          <img
            class="w-24"
            :src="
              user.business_photo_url
                ? `${user.business_photo_url}`
                : 'https://84d36ede214360ad0692cfb46107ad10.cdn.bubble.io/f1712348695728x793058886171252500/avatar_placeholder.png?_gl=1*g916h4*_gcl_au*MTUxNzE0NzI4My4xNzA5ODg5NjI2*_ga*MTk1Nzk2MDM0MC4xNjU1MTE2NjI5*_ga_BFPVR2DEE2*MTcxMjMxNjcwNS4xOS4xLjE3MTIzNDg2NzYuNTguMC4w'
            "
            alt=""
          />
          <h3 class="text-3xl font-bold text-center">{{ user.business_name }}</h3>
          <p class="text-center text-text w-5/6 md:w-3/5">
            {{ user.business_bio }}
          </p>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex flex-col justify-center mx-auto px-5 lg:px-20">
        <!-- <p>Your booking choice</p> -->
        <div class="space-y-5">
          <!-- <div class="flex justify-center items-center">
            </div> -->
          <hr class="h-[1px] bg-disabled border-0" />
          <div class="lg:flex lg:space-x-24 lg:space-y-0 space-y-6 py-5">
            <!-- <div></div> -->
            <!-- Name -->
            <div class="">
              <p class="font-bold">Full Name</p>
              <p>{{ booking.client_name }}</p>
            </div>

            <!-- Email -->
            <div class="">
              <p class="font-bold">Email Address</p>
              <p>{{ booking.client_email }}</p>
            </div>

            <!-- Call -->
            <div>
              <p class="font-bold">Call Number</p>
              <p>{{ booking.client_call }}</p>
            </div>

            <!-- WhatsApp -->
            <div class="">
              <p class="font-bold">WhatsApp Number</p>
              <p>{{ booking.client_whatsapp }}</p>
            </div>
          </div>
          <hr class="h-[1px] bg-disabled border-0" />

          <!-- Dates -->
          <div class="space-y-1 py-5">
            <p class="font-bold">Selected Dates</p>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="date in booking.dates"
                :key="date"
                class="py-1 px-4 border font-mainFont font-medium text-[14px] rounded-md flex justify-center bg-white border-placeholder"
              >
                {{ new Date(date).toDateString() }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Spinner -->
      <div class="flex justify-center mt-10" v-show="cancelSpinner" role="status">
        <svg
          aria-hidden="true"
          class="inline w-10 h-10 text-disabled animate-spin fill-primary"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>

      <!-- Actions -->
      <div v-show="!cancelSpinner" class="flex flex-col space-y-3 mx-auto mt-16">
        <router-link
          :to="{ name: 'bookinglink', params: { id: booking.reference_user } }"
          class="px-16 py-3 flex-1 text-white bg-primary rounded-md font-mainFont text-md"
        >
          Make another booking
        </router-link>
        <button
          @click="toggleCancelModal"
          class="py-3 flex-1 text-error bg-transparent font-mainFont text-[16px]"
        >
          Cancel this booking
        </button>
      </div>
    </div>
  </div>

  <!-- Cancel Modal -->
  <div
    v-show="cancelModal"
    class="font-mainFont flex bg-black bg-opacity-60 fixed z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Close -->
        <button
          @click="toggleCancelModal"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-4 md:p-5 text-center">
          <PhWarningCircle class="mx-auto" color="#191E29" weight="regular" :size="64" />
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to cancel this booking?
          </h3>
          <!-- Yes -->
          <button
            @click.prevent="cancelBooking"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          >
            Yes, I'm sure
          </button>
          <!-- No -->
          <button
            @click="toggleCancelModal"
            class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PhWarningCircle } from '@phosphor-icons/vue';
</script>

<script>
import axios from 'axios';
import { mapStores } from 'pinia';

import useModalStore from '@/stores/modal';

export default {
  name: 'BookingSummary',

  data() {
    return {
      booking: {},
      user: {},
      cancelModal: false,
      cancelSpinner: false,
    };
  },

  async created() {
    //Fetch booking with params
    try {
      const response = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/booking?id=${this.$route.params.id}`,
        method: 'GET',
      });

      // if (this.$route.params.id != response.data.response.booking._id) {
      //   this.$router.push({ name: 'notfound' });
      //   return;
      // }

      // console.log(response.data.response.booking);
      this.booking = response.data.response.booking;
    } catch (error) {
      console.log('Error: ', error);
      this.$router.push({ name: 'notfound' });
    }

    //Fetch user with params
    let response = null;
    try {
      response = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/user?id=${this.booking.reference_user}`,
        method: 'GET',
      });
      this.user = response.data.response.user;
      // console.log(response.data.response.user);
    } catch (error) {
      console.log('Error: ', error);
    }
  },

  methods: {
    toggleCancelModal() {
      this.cancelModal = !this.cancelModal;
    },

    toggleToast() {
      this.modalStore.isAccept = !this.modalStore.isAccept;
    },

    async cancelBooking() {
      this.cancelModal = false;
      this.cancelSpinner = true;

      try {
        await axios.request({
          url: `${import.meta.env.VITE_API_URL}/cancel-booking?booking=${this.booking._id}`,
          method: 'GET',
        });
        this.cancelSpinner = false;
        this.toggleToast();
        this.$router.push({
          name: 'bookinglink',
          params: { id: this.user._id },
        });
      } catch (error) {
        console.log('Error: ', error);
      }
    },
  },

  computed: {
    ...mapStores(useModalStore),
  },
};
</script>
