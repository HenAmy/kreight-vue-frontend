<template>
  <AppMenu />
  <div class="p-2 bg-primary lg:hidden flex"></div>

  <div class="flex">
    <Sidebar />

    <!-- Main Container -->
    <div class="flex flex-col w-full px-5 py-5 lg:px-20 lg:py-20 font-mainFont">
      <!-- Header -->
      <div class="flex justify-between mb-16">
        <!-- <h3 class="font-mainFont text-4xl font-bold">Bookings</h3> -->
        <a
          @click="$router.go(-1)"
          class="bg-secondary py-2 px-6 text-white rounded-full flex items-center w-fit gap-3 shadow-md cursor-pointer"
        >
          <PhCaretLeft weight="regular" :size="20" />
          <p>Back to bookings</p>
        </a>
      </div>

      <div class="lg:flex w-full lg:space-x-8 space-y-24 lg:space-y-0">
        <!-- Left Side -->
        <div class="flex flex-col lg:w-3/5 bg-white">
          <!-- Conflict Booking -->
          <div>
            <h4 class="text-xl font-semibold">Conflict Booking</h4>

            <!-- No Content -->
            <div v-show="!conflictDates.length && !conflictSpinner" class="mt-10">
              <img class="w-48 mx-auto" src="../../public/assets/img/nodata.svg" alt="" />
              <h6 class="font-medium text-center text-sm text-gray">No other bookings conflict</h6>
            </div>

            <!-- Spinner -->
            <div class="flex justify-center mt-10" v-show="conflictSpinner" role="status">
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

            <div v-show="!conflictSpinner" class="flex flex-col divide-disabled divide-y">
              <!-- Upcoming Booking Card -->
              <div v-for="cb of conflictDates" :key="cb._id" class="py-4">
                <p class="font-mainFont text-[14px] text-right">
                  {{ moment(new Date(cb.created_date)).fromNow() }}
                </p>
                <div class="flex justify-between mb-2">
                  <div class="flex flex-wrap gap-4 items-center">
                    <PhUserFocus color="#191E29" weight="thin" :size="64" />
                    <div class="flex flex-col space-y-2">
                      <h6 class="font-semibold">{{ cb.client_name }}</h6>
                      <!-- Dates -->
                      <div class="flex gap-2 flex-wrap">
                        <!-- Date Card -->
                        <div
                          v-for="bd in cb.dates"
                          :key="bd"
                          class="py-0 px-2 border font-medium text-sm rounded-2xl flex justify-center"
                          :class="
                            errorDates.includes(new Date(bd).toDateString())
                              ? 'text-error bg-red-100 border-error'
                              : 'text-text bg-white border-placeholder'
                          "
                        >
                          <p>{{ new Date(bd).toDateString() }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side -->
        <div class="bg-modal flex flex-col lg:w-2/5 md:p-5 h-fit sticky top-10">
          <h4 class="text-xl font-semibold">Booking Details</h4>

          <!-- Spinner -->
          <div class="flex justify-center mt-10" v-show="bookingSpinner" role="status">
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

          <!-- Content -->
          <div v-show="!bookingSpinner" class="space-y-6 mt-14">
            <div class="space-y-3">
              <p class="flex justify-center">
                <!-- <span class="font-bold">Created on: </span> -->
                {{ moment(new Date(booking.created_date)).fromNow() }}
              </p>
              <h6 class="font-semibold text-xl text-center">{{ booking.client_name }}</h6>
              <!-- Date & Time -->
              <div class="space-y-3">
                <div class="flex flex-wrap justify-center gap-2">
                  <div
                    v-for="b in booking.dates"
                    :key="b._id"
                    class="py-1 px-4 border font-medium text-sm rounded-2xl flex items-center justify-center bg-white border-placeholder"
                    :class="
                      errorDates.includes(new Date(b).toDateString())
                        ? 'text-error bg-red-400 border-red-600'
                        : 'text-text bg-white border-placeholder'
                    "
                  >
                    <p>{{ new Date(b).toDateString() }}</p>
                  </div>
                </div>
              </div>
              <!-- Contacts -->
              <div class="flex justify-center space-x-4">
                <a
                  :href="`tel:${booking.client_call}`"
                  target="_blank"
                  class="p-3 border border-gray rounded-md"
                >
                  <PhPhone weight="regular" :size="40" />
                </a>
                <a
                  :href="`https://wa.me/${booking.client_whatsapp}`"
                  target="_blank"
                  class="p-3 border rounded-md"
                >
                  <PhWhatsappLogo weight="regular" :size="40" />
                </a>
                <a
                  :href="`mailto:${booking.client_email}`"
                  target="_blank"
                  class="p-3 border rounded-md"
                >
                  <PhEnvelopeSimple weight="regular" :size="40" />
                </a>
              </div>
              <!-- Reschedule -->
              <p
                @click.prevent="showReschedule = true"
                class="flex justify-center text-primary underline underline-offset-4 font-bold cursor-pointer"
              >
                Reschedule
              </p>
              <!-- Reschedule Form -->
              <vee-form
                v-show="showReschedule === true"
                :validation-schema="schema"
                @submit="rescheduleBooking"
              >
                <div class="bg-white flex flex-col space-y-3 md:px-10 py-6">
                  <VueDatePicker
                    name="datepicker"
                    v-model="selecteddate"
                    format="dd MMM yyyy"
                    :action-row="{ showPreview: false }"
                    :highlight="booking.dates"
                    :enable-time-picker="false"
                    :min-date="new Date()"
                    :disabled-week-days="disableddays"
                    :multi-dates="{ limit: 6 }"
                    disable-year-select
                  ></VueDatePicker>
                  <div class="flex flex-wrap gap-3">
                    <div
                      v-for="date in selecteddate"
                      :key="date"
                      class="py-1 px-3 border font-mainFont font-medium text-[14px] rounded-2xl flex justify-center bg-white border-placeholder"
                    >
                      <p>{{ new Date(date).toDateString() }}</p>
                    </div>
                  </div>
                  <ErrorMessage class="text-red-600 text-sm" name="datepicker" />
                  <!-- Proxy Input for DatePicker -->
                  <div class="hidden flex-col space-y-1">
                    <label class="font-bold text-sm">Mirror DatePicker</label>
                    <vee-field
                      name="datepicker"
                      v-model="selecteddate"
                      type="text"
                      class="flex-1 rounded-md w-full placeholder-placeholder bg-white px-4 py-2 border border-[#ddd] focus:outline-none text-sm"
                      placeholder=""
                    />
                    <ErrorMessage class="text-red-600 text-sm" name="datepicker" />
                  </div>
                  <!-- Alert -->
                  <div
                    class="text-center py-3 rounded text-sm"
                    v-if="show_alert"
                    :class="alert_variant"
                  >
                    {{ alert_msg }}
                  </div>
                  <button class="py-3 text-white bg-secondary rounded-md text-sm">
                    <i
                      v-if="on_submission"
                      class="pi pi-spin pi-spinner"
                      style="font-size: 1rem; color: white"
                    ></i>
                    <p v-else>Reschedule</p>
                  </button>
                  <p
                    class="text-center text-sm cursor-pointer"
                    @click.prevent="showReschedule = false"
                  >
                    Cancel
                  </p>
                </div>
              </vee-form>
            </div>

            <!-- Spinner -->
            <div class="flex justify-center mt-16" v-show="actionsBooking" role="status">
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
            <div
              v-show="booking.status === 'Pending' && !actionsBooking && !showReschedule"
              class="flex flex-col space-y-2"
            >
              <button
                @click="toggleAcceptModal"
                class="px-16 py-3 flex-1 text-white bg-green-500 rounded-md"
              >
                <i
                  v-if="acc_submission"
                  class="pi pi-spin pi-spinner"
                  style="font-size: 1rem; color: white"
                ></i>
                <p v-else>Accept</p>
              </button>
              <button
                @click.prevent="toggleRejectModal"
                class="py-3 flex-1 text-error bg-transparent font-mainFont text-[16px]"
              >
                <i
                  v-if="acc_submission"
                  class="pi pi-spin pi-spinner"
                  style="font-size: 1rem; color: white"
                ></i>
                <p v-else>Reject</p>
              </button>
            </div>
            <!-- Accepted tag -->
            <div
              v-show="booking.status === 'Accepted'"
              class="rounded-full bg-accent mx-auto text-white w-fit px-6 py-1"
            >
              <p class="text-primary">Accepted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <SuccessToast message="Booking has been rescheduled" />

  <!-- Reject Modal -->
  <div
    v-show="rejectModal"
    class="font-mainFont flex bg-black bg-opacity-60 fixed z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          @click="toggleRejectModal"
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
          <PhWarningCircle class="mx-auto" color="#191E29" weight="regular" :size="60" />
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to reject this booking?
          </h3>
          <!-- Yes -->
          <button
            @click.prevent="rejectBooking(booking._id)"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          >
            Yes, I'm sure
          </button>
          <!-- No -->
          <button
            @click="toggleRejectModal"
            class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Accept Modal -->
  <div
    v-show="acceptModal"
    class="font-mainFont flex bg-black bg-opacity-60 fixed z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Close -->
        <button
          @click="toggleAcceptModal"
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
          <PhCheckCircle class="mx-auto" color="#191E29" weight="regular" :size="64" />
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to accept this booking?
          </h3>
          <!-- Yes -->
          <button
            @click.prevent="acceptBooking"
            class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          >
            Yes, I'm sure
          </button>
          <!-- No -->
          <button
            @click="toggleAcceptModal"
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
import {
  PhUserFocus,
  PhCaretLeft,
  PhPhone,
  PhCheckCircle,
  PhWarningCircle,
  PhEnvelopeSimple,
  PhWhatsappLogo,
} from '@phosphor-icons/vue';
</script>

<script>
import { mapWritableState, mapActions, mapStores } from 'pinia';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

import AppMenu from '@/components/AppMenu.vue';
import Sidebar from '@/components/AppSidebar.vue';
import SuccessToast from '@/components/SuccessToast.vue';
import useUserStore from '@/stores/user';
import useModalStore from '@/stores/modal';

export default {
  name: 'BookingRequest',

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
      booking: {},
      notes: {},
      conflicts: null,
      conflictDates: [],
      errorDates: [],
      showReschedule: false,
      showNote: false,

      bookingSpinner: false,
      actionsBooking: false,
      conflictSpinner: false,
      rejectSpinner: false,
      showToast: false,

      //form data
      selecteddate: null,
      rejectModal: false,
      acceptModal: false,

      // all business days
      days: [],
      disableddays: [],

      schema: {
        datepicker: 'required',
      },

      noteSchema: {
        description: 'required',
      },

      // Reschedule default values
      on_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-600',
      alert_msg: 'Something went wrong',

      // Accept default values
      acc_submission: false,
      acc_show_alert: false,
      acc_alert_variant: 'bg-blue-600',
      acc_alert_msg: 'Something went wrong',

      // Accept default values
      n_on_submission: false,
      n_show_alert: false,
      n_alert_variant: 'bg-blue-600',
      n_alert_msg: 'Something went wrong',
    };
  },

  components: {
    AppMenu,
    Sidebar,
    VueDatePicker,
  },

  async created() {
    this.bookingSpinner = true;
    this.conflictSpinner = true;

    //Fetch booking with params
    try {
      const response = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/booking?id=${this.$route.params.id}`,
        method: 'GET',
      });
      this.booking = response.data.response.booking;
      localStorage.setItem('booking_id', this.booking._id);
      // console.log('Booking: ', this.booking);
      this.bookingSpinner = false;

      // Fetching conflicted booking
      try {
        let arr = [];
        const response = await axios.request({
          url: `${import.meta.env.VITE_API_URL}/conflict-booking?currentbooking=${this.$route.params.id}`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        this.conflicts = response.data.response.bookings;
        for (let index = 0; index < this.booking.dates.length; index++) {
          arr.push(new Date(this.booking.dates[index]).toDateString());
          this.conflictSpinner = false;
        }
        for (let index = 0; index < this.conflicts.length; index++) {
          for (let i = 0; i < this.conflicts[index].dates.length; i++) {
            let oneArr = [new Date(this.conflicts[index].dates[i]).toDateString()];
            let res = _.intersection(arr, oneArr);
            if (res.length) {
              this.errorDates.push(new Date(this.conflicts[index].dates[i]).toDateString());
              // Check if booking is already in the array
              if (this.conflictDates.includes(this.conflicts[index])) {
                break;
              } else {
                this.conflictDates.push(this.conflicts[index]);
              }
            }
          }
        }
        // console.log('Error dates: ', this.conflictDates);
      } catch (error) {
        console.log('Error: ', error);
      }
    } catch (error) {
      console.log(error);
    }

    // Fetching disabled days
    try {
      let arr = [];
      // let final = [];
      const response = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/business-days?user=${this.user._id}`,
        method: 'GET',
      });

      this.days = response.data.response.days;

      this.days.forEach(function (d) {
        if (d.active == false) {
          arr.push(d);
        }
      });

      for (let index = 0; index < arr.length; index++) {
        this.disableddays.push(arr[index].day_number);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  },

  computed: {
    ...mapWritableState(useUserStore, ['user']),
    ...mapStores(useModalStore),
  },

  methods: {
    ...mapActions(useUserStore, ['currentUser']),

    toggleRejectModal() {
      this.rejectModal = !this.rejectModal;
    },

    toggleAcceptModal() {
      this.acceptModal = !this.acceptModal;
    },

    toggleToast() {
      this.modalStore.isAccept = !this.modalStore.isAccept;
    },

    async acceptBooking() {
      this.acceptModal = false;
      this.acc_on_submission = true;
      this.actionsBooking = true;

      try {
        await axios.request({
          url: `${import.meta.env.VITE_API_URL}/accept-booking?id=${this.$route.params.id}`,
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        // console.log('Response: ', response);
        this.acc_show_alert = true;
        this.acc_alert_variant = 'bg-green-200';
        this.acc_alert_msg = 'Booking accepted successfully';
        this.currentUser();
        this.actionsBooking = false;
        this.toggleToast();
        this.$router.push({ name: 'bookingupcoming', params: { id: this.$route.params.id } });
      } catch (error) {
        // this.acc_on_submission = true;
        this.acc_show_alert = true;
        this.acc_alert_msg = `${error}`;
        console.log('Error: ', error);
      }

      this.acc_on_submission = false;
    },

    async rescheduleBooking() {
      // console.log('Before: ', this.conflictDates);
      this.conflictDates = [];
      this.errorDates = [];
      // console.log('After: ', this.conflictDates);
      this.on_submission = true;

      try {
        await axios.request({
          url: `${import.meta.env.VITE_API_URL}/reschedule-booking?id=${this.$route.params.id}`,
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          data: {
            dates: this.selecteddate,
          },
        });
        this.show_alert = true;
        // console.log('Response: ', response);
        this.alert_variant = 'bg-green-200';
        this.alert_msg = 'Dates have been rescheduled';
        this.currentUser();
        // console.log('current user method run');
        this.callBookingAgain();
        // console.log('booking method run');
        this.callDisabledDaysAgain();
        // console.log('disabled days method run');
        this.showReschedule = false;
        // this.$router.go(-1);
        this.selecteddate = '';
      } catch (error) {
        this.on_submission = true;
        this.show_alert = true;
        this.alert_msg = `${error}`;
        console.log('Error: ', error);
      }
      this.on_submission = false;
    },

    async callBookingAgain() {
      try {
        const response = await axios.request({
          url: `${import.meta.env.VITE_API_URL}/booking?id=${this.$route.params.id}`,
          method: 'GET',
        });
        this.booking = response.data.response.booking;
        localStorage.setItem('booking_id', this.booking._id);

        try {
          let arr = [];
          const response = await axios.request({
            url: `${import.meta.env.VITE_API_URL}/conflict-booking?currentbooking=${this.$route.params.id}`,
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          });
          this.conflicts = response.data.response.bookings;
          for (let index = 0; index < this.booking.dates.length; index++) {
            arr.push(new Date(this.booking.dates[index]).toDateString());
            // console.log(arr);
          }
          for (let index = 0; index < this.conflicts.length; index++) {
            // The code below is an array
            // console.log(this.conflicts[index].dates);

            for (let i = 0; i < this.conflicts[index].dates.length; i++) {
              // console.log([new Date(this.conflicts[index].dates[i]).toDateString()]);
              let oneArr = [new Date(this.conflicts[index].dates[i]).toDateString()];
              let res = _.intersection(arr, oneArr);
              if (res.length) {
                this.errorDates.push(new Date(this.conflicts[index].dates[i]).toDateString());
                // Check if booking is already in the array
                if (this.conflictDates.includes(this.conflicts[index])) {
                  break;
                } else {
                  this.conflictDates.push(this.conflicts[index]);
                }
                // this.conflictDates.push(this.conflicts[index]);
              }
              // console.log('Res: ', res);
              // console.log('End Inner loop');
            }
            // console.log('End Outer Loop');
          }
          // console.log('ConflictDates: ', this.conflictDates);
        } catch (error) {
          console.log('Error: ', error);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    },

    async callDisabledDaysAgain() {
      try {
        let arr = [];
        // let final = [];
        const response = await axios.request({
          url: `${import.meta.env.VITE_API_URL}/business-days?user=${this.user._id}`,
          method: 'GET',
        });

        this.days = response.data.response.days;

        this.days.forEach(function (d) {
          if (d.active == false) {
            arr.push(d);
          }
        });

        for (let index = 0; index < arr.length; index++) {
          this.disableddays.push(arr[index].day_number);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    },

    async callConflictBooking() {
      // Resetting conflict dates

      try {
        let arr = [];
        const response = await axios.request({
          url: `${import.meta.env.VITE_API_URL}/conflict-booking?currentbooking=${this.$route.params.id}`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        // List of conflicts from api
        this.conflicts = response.data.response.bookings;

        //Loop through dates of page booking
        for (let index = 0; index < this.booking.dates.length; index++) {
          // Add formatted page booking dates to "arr" array
          arr.push(new Date(this.booking.dates[index]).toDateString());
        }

        // Loop through conflicts
        for (let index = 0; index < this.conflicts.length; index++) {
          // Loop through each conflict dates
          for (let i = 0; i < this.conflicts[index].dates.length; i++) {
            // Store each date in "oneArr"
            let oneArr = [new Date(this.conflicts[index].dates[i]).toDateString()];
            // Do comparison between page booking dates & selected conflict date
            let res = _.intersection(arr, oneArr);
            // If comparison is true, save it to "conflictDates" array
            if (res.length) {
              this.conflictDates.push(this.conflicts[index]);
            }
          }
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    },

    async rejectBooking(id) {
      this.rejectModal = false;
      this.acc_submission = true;
      this.actionsBooking = true;

      try {
        await axios.request({
          url: `${import.meta.env.VITE_API_URL}/reject-booking?booking_id=${id}`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        this.currentUser();
        this.acc_show_alert = true;
        this.actionsBooking = false;
        this.toggleToast();
        this.$router.go(-1);
        // this.acc_on_submission = false;
      } catch (error) {
        this.acc_on_submission = true;
        this.acc_show_alert = true;
        this.acc_alert_msg = `${error}`;
        console.log('Error: ', error);
      }
    },
  },

  watch: {},
};
</script>
