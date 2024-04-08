<template>
  <AppMenu />
  <div class="p-2 bg-primary lg:hidden flex"></div>

  <div class="flex font-mainFont">
    <Sidebar />
    <!-- Main Container -->
    <div class="flex flex-col w-full px-5 py-20 lg:px-20">
      <!-- Header -->
      <div class="lg:flex items-center justify-between mb-10">
        <h3 class="font-mainFont text-5xl font-bold">History</h3>
      </div>

      <!-- Main Content -->
      <div class="lg:flex w-full lg:space-x-8 space-y-16 lg:space-y-0">
        <div class="flex flex-col w-full bg-white">
          <!-- List -->
          <div class="">
            <!-- Spinner -->
            <div class="flex justify-center mt-10" v-show="loadingSpinner" role="status">
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

            <!-- No Content -->
            <div v-show="!pastBookings.length && !loadingSpinner" class="mt-10">
              <img class="w-48 mx-auto" src="../../public/assets/img/nodata.svg" alt="" />
              <h6 class="font-medium text-center text-sm text-gray">No past bookings... yet</h6>
            </div>

            <!-- Content -->
            <div v-show="!loadingSpinner" class="flex flex-col divide-disabled divide-y">
              <!-- Card -->
              <router-link
                :to="{ name: 'bookingpast', params: { id: up._id } }"
                v-for="up in pastBookings"
                :key="up.id"
                class="p-4"
              >
                <p class="text-sm text-right">{{ new Date(up.created_date).toDateString() }}</p>
                <div class="flex justify-between mb-2">
                  <div class="flex flex-wrap gap-4 items-center">
                    <PhUserCircleMinus color="#191E29" weight="thin" :size="62" />
                    <div class="flex flex-col space-y-2">
                      <h6 class="font-semibold">{{ up.client_name }}</h6>
                      <!-- Dates -->
                      <div class="flex gap-2 flex-wrap">
                        <div
                          v-for="date in up.dates"
                          :key="date"
                          class="py-0 px-2 border font-mainFont font-medium text-[14px] rounded-2xl flex justify-center bg-white border-placeholder"
                        >
                          <p>{{ new Date(date).toDateString() }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <ErrorToast message="Booking has been rejected" /> -->
</template>

<script setup>
import { PhUserCircleMinus } from '@phosphor-icons/vue';
</script>

<script>
//   import { mapWritableState } from 'pinia';
import axios from 'axios';

import AppMenu from '@/components/AppMenu.vue';
import Sidebar from '@/components/AppSidebar.vue';
//   import ErrorToast from '@/components/ErrorToast.vue';
import useUserStore from '@/stores/user';

export default {
  name: 'BookingHistory',

  beforeRouteEnter(to, from, next) {
    const store = useUserStore();

    if (store.userLoggedIn) {
      next();
    } else {
      next({ name: 'home' });
    }
  },

  data() {
    return {
      loadingSpinner: false,
      pastBookings: [],
    };
  },

  components: {
    AppMenu,
    Sidebar,
  },

  computed: {
    // ...mapWritableState(useUserStore, ['upcomingBookings']),
    //   ...mapWritableState(useUserStore, ['requestBookings']),
  },

  mounted() {
    this.fetchPast();
    //   this.loadingSpinner = true;

    //   setTimeout(() => {
    //     this.loadingSpinner = false;
    //   }, 2000);
  },

  methods: {
    async fetchPast() {
      this.loadingSpinner = true;

      let response = null;
      try {
        response = await axios.request({
          url: `${import.meta.env.VITE_API_URL}/past-bookings`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        // console.log(response);
        this.pastBookings = response.data.response.bookings;
        this.loadingSpinner = false;
      } catch (error) {
        console.log('Error: ', error);
      }
    },
  },
};
</script>
