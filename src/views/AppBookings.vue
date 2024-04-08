<template>
  <AppMenu />
  <div class="p-2 bg-primary lg:hidden flex"></div>

  <div class="flex font-mainFont">
    <Sidebar />
    <!-- Main Container -->
    <div class="flex flex-col w-full px-5 py-16 lg:px-20">
      <!-- Header -->
      <div class="lg:flex items-center justify-between mb-10">
        <h3 class="font-mainFont text-5xl font-bold">Bookings</h3>
      </div>

      <!-- Main Content -->
      <div class="lg:flex w-full lg:space-x-8 space-y-16 lg:space-y-0">
        <div class="flex flex-col w-full bg-white">
          <!-- Tabs -->
          <div class="flex text-lg space-x-12 py-2 text-placeholder border-b border-disabled">
            <!-- Upcoming Tab -->
            <!-- <div
              @click.prevent="tab = 'upcoming'"
              class="flex gap-3 cursor-pointer"
              :class="{ 'font-semibold text-text': tab === 'upcoming' }"
            >
              <p>Upcoming</p>
              <p
                class=""
                :class="{ 'py-0 px-2 bg-secondary rounded-full text-white': tab === 'upcoming' }"
              >
                {{ upcomingBookings.length }}
              </p>
            </div> -->

            <!-- Request Tab -->
            <div
              @click.prevent="tab = 'requests'"
              class="flex gap-3 cursor-pointer"
              :class="{ 'font-semibold text-text': tab === 'requests' }"
            >
              <p>Requests</p>
              <p class="" :class="{ 'text-text': tab === 'requests' }">
                {{ requestBookings.length }}
              </p>
            </div>
          </div>

          <!-- Requests -->
          <div v-show="tab === 'requests'" class="">
            <!-- Filters -->
            <div class="py-5">
              <select
                v-model="sorting"
                class="flex-1 p-3 w-72 rounded-md placeholder-placeholder bg-background focus:outline-none"
              >
                <option value="descending">Newest first</option>
                <option value="ascending">Oldest first</option>
              </select>
            </div>

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
            <div v-show="!requestBookings.length && !loadingSpinner" class="mt-10">
              <img class="w-48 mx-auto" src="../../public/assets/img/nodata.svg" alt="" />
              <h6 class="font-medium text-center text-sm text-gray">No bookings made... yet</h6>
            </div>

            <!-- Content -->
            <div v-show="!loadingSpinner" class="flex flex-col divide-disabled divide-y">
              <!-- Card -->
              <router-link
                :to="{ name: 'bookingrequests', params: { id: up._id } }"
                v-for="up in sortedBookings"
                :key="up.id"
                class="p-4"
              >
                <p class="text-sm text-right">
                  {{ moment(new Date(up.created_date)).fromNow() }}
                </p>
                <div class="flex justify-between mb-2">
                  <div class="flex flex-wrap gap-4 items-center">
                    <PhUserCirclePlus color="#191E29" weight="thin" :size="62" />
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

  <ErrorToast message="Booking has been rejected" />
</template>

<script setup>
import { PhUserCirclePlus } from '@phosphor-icons/vue';
</script>

<script>
import { mapWritableState, mapActions } from 'pinia';
import moment from 'moment';

import AppMenu from '@/components/AppMenu.vue';
import Sidebar from '@/components/AppSidebar.vue';
import ErrorToast from '@/components/ErrorToast.vue';
import useUserStore from '@/stores/user';

export default {
  name: 'AppBookings',

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
      tab: this.$route.query.s,
      sorting: 'descending',
      fetchingNumber: 9,
      loadingSpinner: false,
    };
  },

  components: {
    AppMenu,
    Sidebar,
  },

  computed: {
    // ...mapWritableState(useUserStore, ['upcomingBookings']),
    ...mapWritableState(useUserStore, ['requestBookings']),

    sortedBookings() {
      return this.requestBookings.slice().sort((element1, element2) => {
        if (this.sorting === 'descending') {
          return new Date(element2.created_date) - new Date(element1.created_date);
        }

        return new Date(element1.created_date) - new Date(element2.created_date);
      });
    },
  },

  created() {
    // this.loadingSpinner = true;

    if (this.requestBookings.length) {
      this.bookingRequests();
      // this.loadingSpinner = false;
    }
    // setTimeout(() => {

    // }, 2000);

    const { tab } = this.$route.query;
    this.tab = tab === 'upcoming' || tab === 'requests' ? tab : this.$route.query.s;

    // window.addEventListener('scroll', this.handleScroll);
  },

  // beforeUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll);
  // },

  methods: {
    ...mapActions(useUserStore, ['bookingRequests']),
    // handleScroll() {
    //   const { scrollTop, offsetHeight } = document.documentElement;
    //   const { innerHeight } = window;
    //   const bottomofWindow = Math.round(scrollTop) + innerHeight === offsetHeight;
    //   if (bottomofWindow) {
    //     if (this.requestBookings.length > this.fetchingNumber) {
    //       console.log('Bottom of window');
    //       this.bookingRefetch();
    //     }
    //   }
    // },
  },

  watch: {
    tab(newVal) {
      if (newVal === this.$route.query.tab) {
        return;
      }
      this.$router.push({
        query: {
          s: newVal,
        },
      });
    },
  },
};
</script>
