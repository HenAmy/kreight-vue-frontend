<template>
  <AppMenu />
  <div class="p-2 bg-primary lg:hidden flex"></div>

  <div class="flex">
    <Sidebar />

    <!-- Main Container -->
    <div class="flex flex-col w-full px-5 py-5 lg:px-20 lg:py-20 font-mainFont">
      <!-- Header -->
      <div class="space-y-6 mb-16">
        <!-- <h3 class="font-mainFont text-4xl font-bold">Calendar</h3> -->
        <a
          @click="this.$router.push({ name: 'bookinghistory' })"
          class="py-2 px-6 text-white bg-secondary rounded-full flex items-center w-fit gap-3 cursor-pointer"
        >
          <PhCaretLeft weight="regular" :size="20" />
          <p>Back to history</p>
        </a>
      </div>

      <!-- Content -->
      <div class="lg:flex flex-row-reverse w-full gap-8 space-y-24 lg:space-y-0">
        <!-- Right Side -->
        <div class="bg-modal flex flex-col lg:w-2/5 px-2 py-4 h-fit lg:sticky lg:top-10">
          <h4 class="text-xl font-semibold">Booking Details</h4>

          <!-- Spinner -->
          <div class="mx-auto mt-16" v-show="bookingSpinner" role="status">
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

          <div v-show="!bookingSpinner" class="space-y-6 mt-14">
            <div class="space-y-3">
              <p class="flex justify-center">Today</p>
              <h6 class="font-semibold text-xl text-center">{{ booking.client_name }}</h6>
              <!-- Date & Time -->
              <div class="space-y-3">
                <div class="flex flex-wrap justify-center gap-2">
                  <div
                    v-for="b in booking.dates"
                    :key="b._id"
                    class="py-1 px-4 border font-medium text-sm rounded-2xl flex items-center justify-center bg-disabled border-placeholder"
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
              <!-- <p class="flex justify-center text-placeholder font-bold">Reschedule</p> -->
            </div>

            <!-- Actions -->
            <div class="rounded-full bg-disabled mx-auto text-gray w-fit px-6 py-1">
              <p>{{ booking.status }}</p>
            </div>
          </div>
        </div>

        <!-- Left Side -->
        <div class="flex flex-col lg:w-3/5 bg-white">
          <!-- Notes -->
          <div class="">
            <!-- Header -->
            <div class="flex items-center justify-between py-5">
              <h4 class="text-xl font-semibold">Notes</h4>
              <!-- <p class="font-bold text-placeholder">Attach Notes</p> -->
            </div>

            <!-- Spinner -->
            <div class="flex justify-center mt-10" v-show="notesSpinner" role="status">
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
            <div v-show="!notes.length && !notesSpinner" class="mt-20">
              <img class="w-48 mx-auto" src="../../public/assets/img/nodata.svg" alt="" />
              <h6 class="font-medium text-center text-sm text-gray">No notes made... yet</h6>
            </div>

            <!-- List of notes -->
            <div v-show="!notesSpinner" class="space-y-6 mt-3">
              <!-- Note Card -->
              <div
                v-for="note in notes"
                :key="note._id"
                class="py-8 px-6 rounded-md bg-yellow-200 h-fit"
              >
                <div class="flex">
                  <div class="w-full flex space-x-10 justify-between items-center">
                    <p class="font-extralight text-2xl">{{ note.text }}</p>
                    <!-- Actions -->
                    <div class="space-y-8">
                      <PhPushPin
                        class="hover:shadow-md cursor-pointer"
                        v-show="!pinSpinner"
                        @click="note.pinned ? unpinNote(note._id) : pinNote(note._id)"
                        :weight="note.pinned ? 'fill' : 'regular'"
                        :size="35"
                      />

                      <!-- Spinner -->
                      <div class="p-0 m-0" v-show="pinSpinner" role="status">
                        <svg
                          aria-hidden="true"
                          class="inline w-8 h-8 text-disabled animate-spin fill-text"
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

                      <!-- <PhPushPin
                        v-show="!note.pinned"
                        @click.prevent="pinNote(note._id)"
                        class="hover:shadow-md cursor-pointer"
                        
                        weight="regular"
                        :size="35"
                      /> -->
                      <!-- <PhPen class="hover:shadow-md" weight="fill" :size="32" /> -->
                      <PhTrash
                        v-show="!pinSpinner"
                        @click.prevent="deleteNote(note._id)"
                        class="cursor-pointer hover:shadow-md"
                        weight="fill"
                        color="#FF0000"
                        :size="32"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <SuccessToast message="Booking has been accepted" />
</template>

<script setup>
import {
  PhCaretLeft,
  PhPhone,
  PhEnvelopeSimple,
  PhPushPin,
  PhWhatsappLogo,
  // PhPen,
  PhTrash,
} from '@phosphor-icons/vue';
</script>

<script>
import { mapWritableState, mapActions } from 'pinia';
import axios from 'axios';
// import _ from 'lodash';

import AppMenu from '@/components/AppMenu.vue';
import Sidebar from '@/components/AppSidebar.vue';
import SuccessToast from '@/components/SuccessToast.vue';
import useUserStore from '@/stores/user';

export default {
  name: 'BookingUpcoming',

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
      // Loading spinners
      bookingSpinner: false,
      notesSpinner: false,
      pinSpinner: false,

      pinState: false,

      booking: [],
      notes: [],
      showReschedule: false,
      showNote: false,

      //form data
      selecteddate: null,
      title: '',
      description: '',

      schema: {
        datepicker: 'required',
      },

      noteSchema: {
        description: 'required',
      },
    };
  },

  components: {
    AppMenu,
    Sidebar,
  },

  async created() {
    this.bookingSpinner = true;
    this.notesSpinner = true;

    //Fetch booking with params
    try {
      const response = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/booking?id=${this.$route.params.id}`,
        method: 'GET',
      });
      this.booking = response.data.response.booking;
      this.bookingSpinner = false;
      console.log('Bookings: ', this.booking);
    } catch (error) {
      console.log('Error: ', error);
    }

    // Fetch notes
    try {
      const response = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/all-notes?id=${this.booking._id}`,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      this.notes = response.data.response.notes;
      this.notesSpinner = false;
    } catch (error) {
      console.log('Error: ', error);
    }
  },

  computed: {
    ...mapWritableState(useUserStore, ['user']),
  },

  methods: {
    ...mapActions(useUserStore, ['currentUser']),

    async allNotes() {
      // this.notesSpinner = true;
      try {
        const response = await axios.request({
          url: `${import.meta.env.VITE_API_URL}/all-notes?id=${this.booking._id}`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        this.notes = response.data.response.notes;
      } catch (error) {
        console.log('Error: ', error);
      }
      this.pinSpinner = false;
    },
  },

  watch: {},
};
</script>
