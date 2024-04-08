<template>
  <AppMenu />
  <div class="p-2 bg-primary lg:hidden flex"></div>

  <div class="flex font-mainFont">
    <Sidebar />

    <!-- Main Container -->
    <div class="flex flex-col w-full px-5 py-16 lg:px-20 lg:py-20" v-if="user">
      <!-- Header -->
      <div class="space-y-6 mb-8">
        <h3 class="font-mainFont text-5xl font-bold">Dashboard</h3>
        <div class="space-y-0">
          <h6 class="font-mainFont text-lg font-bold">Your booking profile</h6>
          <div class="space-x-3 mb-10 flex font-mainFont">
            <p class="">
              Copy and paste the link to you social media pages and websites.
              <span class="font-bold text-primary">
                <router-link
                  v-if="user._id"
                  :to="{ name: 'bookinglink', params: { id: user._id } }"
                  target="_blank"
                >
                  Open Link
                </router-link>
              </span>
            </p>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="lg:flex w-full lg:space-x-8 space-y-24 lg:space-y-0">
        <!-- Left Side -->
        <div class="flex flex-col space-y-20 lg:w-1/2">
          <!-- Copy Link  -->
          <div class="flex flex-col space-y-3">
            <input
              type="url"
              disabled
              v-model="user.business_link"
              class="rounded-md bg-disabled px-4 py-3 focus:outline-none font-mainFont text-[14px] text-black"
            />
            <button
              @click.prevent="copyLink"
              href="#/"
              class="px-3 py-3 text-white flex justify-center gap-2 rounded-md focus:outline-none font-mainFont text-[16px]"
              :class="copied ? 'bg-primary' : 'bg-secondary'"
            >
              <div v-show="copied" class="flex space-x-2">
                <PhCheck color="white" weight="regular" :size="22" />
                <p>Copied</p>
              </div>
              <div v-show="!copied" class="flex">
                <PhLink color="white" weight="regular" :size="24" />
                <p>Copy Link</p>
              </div>
            </button>
          </div>

          <!-- Business Days -->
          <div class="flex flex-col space-y-8 font-mainFont">
            <div class="flex justify-between">
              <h3 class="font-mainFont text-2xl font-bold">Business Days</h3>
              <!-- <div class="flex space-x-2">
                <input type="checkbox" class="w-5 h-5" />
                <p>Everyday</p>
              </div> -->
            </div>
            <div class="space-y-4">
              <!-- Day -->
              <div
                v-for="day in businessDays"
                :key="day.id"
                class="w-full border rounded-md py-3 px-6"
                :class="day.active ? 'bg-accent border-primary' : 'bg-white border-gray'"
              >
                <div class="flex justify-between space-x-2">
                  <div class="flex space-x-4">
                    <div class="flex items-center space-x-2">
                      <!-- Switch -->
                      <label class="inline-flex items-center cursor-pointer">
                        <input
                          @click="
                            day.active
                              ? setDayInactive(day.day_number)
                              : setDayActive(day.day_number)
                          "
                          type="checkbox"
                          v-model="day.active"
                          class="sr-only peer"
                        />
                        <div
                          class="relative w-11 h-6 bg-disabled peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
                        ></div>
                      </label>
                    </div>
                    <p class="font-semibold">
                      {{ day.day_name }}
                    </p>
                  </div>
                  <i
                    class="pi pi-spin pi-spinner"
                    v-show="businessDaysSpinner == day.day_number"
                    style="font-size: 1.5rem; color: green"
                  ></i>
                </div>
              </div>
            </div>
            <!-- <button
              class="px-3 py-3 text-white bg-secondary rounded-md focus:outline-none font-mainFont text-[16px]"
            >
              Save Days
            </button> -->
          </div>
        </div>

        <!-- Right Side -->
        <div class="flex flex-col lg:w-1/2 space-y-3 font-mainFont">
          <div class="flex justify-between items-center">
            <h5 class="text-2xl font-bold text-left text-text">Recent Bookings</h5>
            <router-link
              :to="{ name: 'bookings', query: { s: 'requests' } }"
              class="font-mainFont font-bold"
              >See All</router-link
            >
          </div>
          <!-- Spinner -->
          <div class="flex justify-center mt-40" v-show="bookingSpinner" role="status">
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
          <div v-show="!requestBookingsMini.length && !bookingSpinner" class="mt-40">
            <img class="w-48 mx-auto" src="../../public/assets/img/nodata.svg" alt="" />
            <h6 class="font-medium text-center text-sm text-gray">No bookings made... yet</h6>
          </div>

          <!-- Contents -->
          <div v-show="!bookingSpinner" class="flex flex-col divide-disabled divide-y">
            <!-- Upcoming Booking Card -->
            <router-link
              v-for="b of requestBookingsMini"
              :key="b._id"
              class="py-4"
              :to="{ name: 'bookingrequests', params: { id: b._id } }"
            >
              <p class="font-mainFont text-sm text-right">
                {{ moment(new Date(b.created_date)).fromNow() }}
              </p>
              <div class="flex justify-between mb-2">
                <div class="flex flex-wrap gap-4 items-center">
                  <PhUserFocus color="#191E29" weight="thin" :size="64" />
                  <div class="flex flex-col space-y-2">
                    <h6 class="font-semibold">{{ b.client_name }}</h6>
                    <!-- Dates -->
                    <div class="flex gap-2 flex-wrap">
                      <!-- Date Card -->
                      <div
                        v-for="bd in b.dates"
                        :key="bd"
                        class="py-0 px-2 border font-mainFont font-medium text-[14px] rounded-2xl flex justify-center bg-white border-placeholder"
                      >
                        <p>{{ new Date(bd).toDateString() }}</p>
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

  <ErrorToast message="Booking has been rejected" />
</template>

<script setup>
import { PhUserFocus, PhLink, PhCheck } from '@phosphor-icons/vue';
</script>

<script>
import { mapWritableState, mapActions } from 'pinia';
import axios from 'axios';
import moment from 'moment';

import AppMenu from '@/components/AppMenu.vue';
import Sidebar from '@/components/AppSidebar.vue';
import ErrorToast from '@/components/ErrorToast.vue';
import useUserStore from '@/stores/user';

export default {
  name: 'AppDashboard',

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
      booking: [],
      copied: false,
      bookingSpinner: false,
      businessDaysSpinner: 10,

      button_variant: 'bg-white border-gray',
    };
  },

  created() {
    this.bookingSpinner = true;

    // this.loadingSpinner = false;
    setTimeout(() => {
      this.bookingRequestsMini(5);
      this.bookingSpinner = false;
    }, 1000);
  },

  computed: {
    ...mapWritableState(useUserStore, ['user']),
    ...mapWritableState(useUserStore, ['businessDays']),
    ...mapWritableState(useUserStore, ['requestBookings']),
    ...mapWritableState(useUserStore, ['requestBookingsMini']),
  },

  watch: {
    // user(newValue) {
    //   if (newValue) console.log('checking the user');
    // },
  },

  methods: {
    ...mapActions(useUserStore, ['bookingRequestsMini']),
    // ...mapActions(useUserStore, ['userDays']),

    async copyLink() {
      let text = `${this.user.business_link}`;
      await navigator.clipboard.writeText(text);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 3000);
    },

    async setDayActive(id) {
      this.businessDaysSpinner = id;
      this.businessDays[id].active = true;

      try {
        await axios.request({
          url: `${import.meta.env.VITE_API_URL}/day-active`,
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          data: {
            day_id: id,
          },
        });
        this.businessDaysSpinner = 10;
        //
      } catch (error) {
        console.log('Error: ', error);
        // this.alert_msg = `${error.response.data.message}`;
      }
    },

    async setDayInactive(id) {
      // console.log('setInactive: ', id);
      this.businessDaysSpinner = id;
      this.businessDays[id].active = false;

      try {
        await axios.request({
          url: `${import.meta.env.VITE_API_URL}/day-inactive`,
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          data: {
            day_id: id,
          },
        });
        // console.log('Response: ', response);
        this.businessDaysSpinner = 10;
        //
      } catch (error) {
        console.log('Error: ', error);
        // this.alert_msg = `${error.response.data.message}`;
      }
    },
  },

  components: {
    AppMenu,
    Sidebar,
  },
};
</script>
