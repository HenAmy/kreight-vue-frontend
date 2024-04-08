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
          @click="$router.push({ name: 'calendar' })"
          class="py-2 px-6 text-white bg-secondary rounded-full flex items-center w-fit gap-3 cursor-pointer"
        >
          <PhCaretLeft weight="regular" :size="20" />
          <p>Back to calendar</p>
        </a>
      </div>

      <div class="lg:flex flex-row-reverse w-full gap-8 space-y-24 lg:space-y-0">
        <!-- Right Side -->
        <div class="bg-modal flex flex-col lg:w-2/5 p-2 md:p-5 h-fit lg:sticky lg:top-10">
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
              <!-- <p class="flex justify-center">Today</p> -->
              <h6 class="font-semibold text-xl text-center">{{ booking.client_name }}</h6>
              <!-- Date & Time -->
              <div class="space-y-3">
                <div class="flex flex-wrap justify-center gap-2">
                  <div
                    v-for="b in booking.dates"
                    :key="b._id"
                    class="py-1 px-4 border font-medium text-sm rounded-2xl flex items-center justify-center bg-white border-placeholder"
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

            <!-- Actions -->
            <div class="rounded-full bg-primary mx-auto text-white w-fit px-6 py-1">
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
              <p
                @click.prevent="showNote = true"
                class="font-bold text-primary underline underline-offset-4 cursor-pointer"
              >
                Attach Notes
              </p>
            </div>

            <!-- Content -->
            <div
              v-show="showNote === true"
              class="bg-disabled flex flex-col p-3 space-y-7 md:px-6 py-6 mb-10"
            >
              <p class="text-lg">Attach Note</p>
              <vee-form
                :validation-schema="noteSchema"
                @submit="newNote"
                class="flex flex-col space-y-4"
              >
                <!-- <input
                  v-model="title"
                  type="text"
                  placeholder="Title"
                  class="rounded-md bg-background px-4 py-3 focus:outline-none text-[16px] text-black"
                /> -->
                <vee-field
                  as="textarea"
                  name="description"
                  rows="2"
                  v-model="description"
                  type="text"
                  placeholder="Description"
                  class="rounded-md bg-background px-4 py-3 focus:outline-none text-[16px] text-black"
                />
                <ErrorMessage class="text-red-600 text-sm" name="description" />
                <!-- Actions -->
                <div class="flex flex-col">
                  <button
                    :disabled="n_on_submission"
                    class="px-16 py-3 flex-1 text-white bg-green-700 rounded-md font-mainFont text-[16px]"
                  >
                    <i
                      v-if="n_on_submission"
                      class="pi pi-spin pi-spinner"
                      style="font-size: 1rem; color: white"
                    ></i>
                    <p v-else>Save</p>
                  </button>
                  <button
                    @click.prevent="showNote = false"
                    class="py-3 flex-1 text-text bg-transparent font-mainFont text-[16px]"
                  >
                    Cancel
                  </button>
                </div>
              </vee-form>
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
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
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

      // all business days
      days: [],
      disableddays: [],

      schema: {
        datepicker: 'required',
        // description: 'required',
      },

      noteSchema: {
        //   title: 'required',
        description: 'required',
      },

      // Reschedule default values
      on_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-600',
      alert_msg: 'Something went wrong',

      // Notes default values
      n_on_submission: false,
      n_show_alert: false,
      m_alert_variant: 'bg-blue-600',
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
    this.notesSpinner = true;

    //Fetch booking with params
    try {
      const response = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/booking?id=${this.$route.params.id}`,
        method: 'GET',
      });
      this.booking = response.data.response.booking;
      // this.booking.opened = true;
      localStorage.setItem('booking_id', this.booking._id);
      this.bookingSpinner = false;

      // Update booking opened
      // try {
      //   const res = await axios.request({
      //     url: `${import.meta.env.VITE_API_URL}/opened?id=${this.$route.params.id}`,
      //     method: 'GET',
      //   });
      //   console.log('Pin run: ', res);
      // } catch (error) {
      //   console.log(error);
      // }

      // Fetch conflict bookings
      // try {
      //   await axios.request({
      //     url: `${import.meta.env.VITE_API_URL}/conflict-booking?currentbooking=${this.$route.params.id}`,
      //     method: 'GET',
      //     headers: {
      //       Authorization: 'Bearer ' + localStorage.getItem('token'),
      //     },
      //   });
      // } catch (error) {
      //   console.log('Error: ', error);
      // }
    } catch (error) {
      console.log('Error: ', error);
    }

    // Fetching disabled days
    try {
      let arr = [];
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
      // console.log('Notes: ', response);
    } catch (error) {
      console.log('Error: ', error);
    }
  },

  computed: {
    ...mapWritableState(useUserStore, ['user']),
  },

  methods: {
    ...mapActions(useUserStore, ['currentUser']),

    async rescheduleBooking() {
      this.on_submission = true;

      try {
        const response = await axios.request({
          url: `${import.meta.env.VITE_API_URL}/reschedule-booking?id=${this.$route.params.id}`,
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          data: {
            dates: this.selecteddate,
          },
        });
        // this.show_alert = true;
        console.log('Response: ', response);
        this.alert_variant = 'bg-green-200';
        this.alert_msg = 'Dates have been rescheduled';
        this.currentUser();
        this.callBookingAgain();
        this.callDisabledDaysAgain();
        this.showReschedule = false;
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
          await axios.request({
            url: `${import.meta.env.VITE_API_URL}/conflict-booking?currentbooking=${this.$route.params.id}`,
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          });
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
        // console.log('Notes: ', response);
      } catch (error) {
        console.log('Error: ', error);
      }
      // this.notesSpinner = false;
      this.pinSpinner = false;
    },

    async newNote() {
      this.n_on_submission = true;

      try {
        await axios.request({
          url: `${import.meta.env.VITE_API_URL}/new-note?id=${this.$route.params.id}`,
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          data: {
            // head: this.title,
            description: this.description,
          },
        });
        this.showNote = false;
        this.allNotes();
        this.description = '';
      } catch (error) {
        this.n_on_submission = true;
        this.n_show_alert = true;
        this.n_alert_msg = `${error}`;
        console.log('Error: ', error);
      }

      this.n_on_submission = false;
    },

    async deleteNote(id) {
      this.pinSpinner = true;
      try {
        await axios.request({
          url: `${import.meta.env.VITE_API_URL}/delete-note?id=${id}`,
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          data: {
            id: id,
          },
        });
        this.allNotes();
        console.log('Note deleted');
      } catch (error) {
        console.log('Error: ', error);
      }
    },

    async pinNote(id) {
      this.pinSpinner = true;

      try {
        await axios.request({
          url: `${import.meta.env.VITE_API_URL}/pin?id=${id}`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        this.allNotes();
        console.log('Note pinned');
      } catch (error) {
        console.log('Error: ', error);
      }
      // this.pinSpinner = false;
    },

    async unpinNote(id) {
      this.pinSpinner = true;
      try {
        await axios.request({
          url: `${import.meta.env.VITE_API_URL}/unpin?id=${id}`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        this.allNotes();
        console.log('Note unpinned');
      } catch (error) {
        console.log('Error: ', error);
      }
      // this.pinSpinner = false;
    },
  },

  watch: {},
};
</script>
