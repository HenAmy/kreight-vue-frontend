<template>
  <div
    class="bg-black bg-opacity-60 flex justify-center items-center h-screen font-mainFont fixed z-10 inset-0 overflow-y-auto"
    id="modal"
    :class="hiddenClass"
  >
    <div class="bg-white p-8 rounded-lg w-[500px] space-y-8">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <PhCaretLeft class="invisible" weight="regular" :size="24" />
        <p class="font-bold text-2xl">Booking Details</p>
        <div class="cursor-pointer" @click="isOpen = false">
          <PhX weight="regular" :size="24" />
        </div>
      </div>
      <p class="text-md text-center">
        Manually adding bookings are not encouraged, and should be used in emergencies
      </p>

      <!-- Spinner -->
      <div class="flex justify-center mt-8" v-show="disabledDaysLoading" role="status">
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

      <!-- Form -->
      <!-- Your details -->
      <vee-form
        v-show="!disabledDaysLoading"
        :validation-schema="schema"
        @submit="makeBooking"
        class="space-y-4"
      >
        <div class="space-y-4">
          <!-- Selected Dates -->
          <div class="flex flex-col space-y-1">
            <label class="font-bold text-sm">Selected Date(s)</label>
            <VueDatePicker
              name="datepicker"
              v-model="selecteddate"
              format="dd MMM yyyy"
              :required="true"
              :action-row="{ showPreview: false }"
              :highlight="new Date()"
              :enable-time-picker="false"
              :min-date="new Date()"
              :disabled-week-days="disableddays"
              :multi-dates="{ limit: 6 }"
              disable-year-select
            ></VueDatePicker>
            <ErrorMessage class="text-red-600 text-sm" name="datepicker" />
            <!-- Selected dates cards -->
            <div class="flex gap-3">
              <div
                v-for="date in selecteddate"
                :key="date"
                class="py-1 px-3 border font-mainFont font-medium text-[14px] rounded-2xl flex justify-center bg-white border-placeholder"
              >
                <p>{{ date.toDateString() }}</p>
              </div>
            </div>
          </div>
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

          <!-- Full Name -->
          <div class="flex flex-col space-y-1">
            <label class="font-bold text-[14px]">Full Name</label>
            <vee-field
              name="fullname"
              v-model="name"
              type="text"
              class="flex-1 rounded-md w-full placeholder-placeholder bg-white px-4 py-2 border border-[#ddd] focus:outline-none text-sm"
              placeholder="Enter your full name"
            />
            <ErrorMessage class="text-red-600 text-sm" name="fullname" />
          </div>

          <!-- Email Address -->
          <div class="flex flex-col space-y-1">
            <label class="font-bold text-sm">Email Address</label>
            <label class="text-sm">An email will be sent to this email address</label>
            <vee-field
              name="email"
              v-model="email"
              type="email"
              class="flex-1 rounded-md w-full placeholder-placeholder bg-white px-4 py-2 border border-[#ddd] focus:outline-none text-sm"
              placeholder="Enter your email address"
            />
            <ErrorMessage class="text-red-600 text-sm" name="email" />
          </div>

          <!-- Phone Number -->
          <div class="flex flex-col space-y-1">
            <label class="font-bold text-[14px]">Call Number</label>
            <vue-tel-input
              name="callnumber"
              class="text-sm"
              v-model="phone"
              @on-input="onPhoneInput"
              mode="international"
              v-bind="phoneBindProps"
            ></vue-tel-input>
            <p v-show="phoneValid" class="text-green-600 text-sm">Number is valid</p>
            <p v-show="phoneValidError" class="text-red-600 text-sm">Number is not valid</p>
            <ErrorMessage class="text-red-600 text-sm" name="callnumber" />
          </div>
          <!-- Proxy Input for phone number -->
          <div class="hidden flex-col space-y-1">
            <label class="font-bold text-sm">Mirror phone number</label>
            <vee-field
              name="callnumber"
              v-model="phone"
              type="text"
              class="flex-1 rounded-md w-full placeholder-placeholder bg-white px-4 py-2 border border-[#ddd] focus:outline-none text-sm"
              placeholder=""
            />
            <ErrorMessage class="text-red-600 text-sm" name="callnumber" />
          </div>

          <!-- WhatsApp Number -->
          <div class="flex flex-col space-y-1">
            <label class="font-bold text-[14px]">WhatsApp Number</label>
            <vue-tel-input
              name="whatsappnumber"
              class="text-sm"
              v-model="whatsapp"
              @on-input="onWhatappInput"
              mode="international"
              v-bind="whatsappBindProps"
            ></vue-tel-input>
            <p v-show="whatsappValid" class="text-green-600 text-sm">Number is valid</p>
            <p v-show="whatsappValidError" class="text-red-600 text-sm">Number is not valid</p>
            <ErrorMessage class="text-red-600 text-sm" name="whatsappnumber" />
          </div>
          <!-- Proxy Input for whatsapp number -->
          <div class="hidden flex-col space-y-1">
            <vee-field
              name="whatsappnumber"
              v-model="whatsapp"
              type="number"
              class="flex-1 rounded-md w-full placeholder-placeholder bg-white px-4 py-2 border border-[#ddd] focus:outline-none text-sm"
              placeholder=""
            />
            <ErrorMessage class="text-red-600 text-sm" name="whatsappnumber" />
          </div>
        </div>

        <!-- Action -->
        <div class="flex flex-col space-y-3">
          <button
            class="px-3 py-3 w-full text-white bg-secondary rounded-md focus:outline-none text-sm"
          >
            <i
              v-if="on_submission"
              class="pi pi-spin pi-spinner"
              style="font-size: 1rem; color: white"
            ></i>
            <p v-else>Make Booking</p>
          </button>
        </div>
      </vee-form>
    </div>
  </div>

  <!-- Toast -->
  <div>
    <div
      v-show="toastBooking"
      class="flex font-mainFont items-center w-full max-w-xs p-4 mb-4 text-text bg-white rounded-lg shadow-lg fixed bottom-5 right-5"
      role="alert"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg"
      >
        <PhCheckCircle color="green" weight="fill" :size="24" />
        <span class="sr-only">Check icon</span>
      </div>
      <div class="ms-3 text-sm font-normal">Manual booking has been created</div>
      <button
        type="button"
        class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
        @click="toastBooking = false"
        aria-label="Close"
      >
        <!-- <span class="sr-only">Close</span> -->
        <PhX color="black" weight="regular" :size="20" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { PhX, PhCaretLeft, PhCheckCircle } from '@phosphor-icons/vue';
</script>

<script>
import { mapState, mapWritableState, mapActions } from 'pinia';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import axios from 'axios';

import useModalStore from '@/stores/modal';
import useUserStore from '@/stores/user';

export default {
  name: 'BookingModal',

  data() {
    return {
      // Default values
      on_submission: false,
      toastBooking: false,

      // form data
      selecteddate: null,
      phone: '',
      whatsapp: '',
      name: '',
      email: '',

      // Valid phone numbers
      phoneValid: false,
      phoneValidError: false,
      whatsappValid: false,
      whatsappValidError: false,

      //Spinner
      userLoading: false,
      disabledDaysLoading: false,

      // all business days
      days: [],
      disableddays: [],

      schema: {
        fullname: 'required|min:3|max:100',
        email: 'required|email',
        datepicker: 'required',
        callnumber: 'required',
        whatsappnumber: 'required',
      },
    };
  },

  emits: ['refresh-upcoming'],

  async created() {
    //Fetch business days with params
    try {
      let arr = [];
      // let final = [];
      const response = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/business-days?user=${this.user._id}`,
        method: 'GET',
      });

      this.days = response.data.response.days;
      this.disabledDaysLoading = false;
      // console.log('All days: ', this.days);

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

  components: {
    VueDatePicker,
    VueTelInput,
  },

  computed: {
    ...mapState(useModalStore, ['hiddenClass']),
    ...mapWritableState(useModalStore, ['isOpen']),
    ...mapWritableState(useUserStore, ['user']),

    phoneBindProps() {
      return {
        dropdownOptions: {
          showDialCodeInList: true,
          showDialCodeInSelection: true,
          showFlags: true,
        },
        inputOptions: {
          placeholder: 'Enter your call number',
        },
        validCharactersOnly: true,
        autoFormat: false,
      };
    },
    whatsappBindProps() {
      return {
        dropdownOptions: {
          showDialCodeInList: true,
          showDialCodeInSelection: true,
          // showDialCode: true,
          showFlags: true,
        },
        inputOptions: {
          placeholder: 'Enter your whatsapp number',
        },
        validCharactersOnly: true,
        autoFormat: false,
      };
    },
  },

  methods: {
    ...mapActions(useUserStore, ['bookingUpcoming']),

    toggleToast() {
      this.toastBooking = !this.toastBooking;
    },

    async makeBooking() {
      this.on_submission = true;

      if (this.phoneValid && this.whatsappValid) {
        this.phoneValidError = false;
        this.whatsappValidError = false;

        let response = null;
        try {
          response = await axios.request({
            url: `${import.meta.env.VITE_API_URL}/create-booking`,
            method: 'POST',
            data: {
              dates: this.selecteddate,
              full_name: this.name,
              email_address: this.email,
              call_number: this.phone,
              whatsapp_number: this.whatsapp,
              user: this.user._id,
              booking_status: 'Accepted',
            },
          });
          this.booking = response.config.data;
          // this.bookingUpcoming();
          this.toggleToast();
          this.isOpen = false;
          this.$emit('refresh-upcoming');
          // console.log('The manual booking: ', this.booking);
        } catch (error) {
          this.on_submission = false;
          // this.show_alert = true;
          // this.alert_msg = `${error.response.data.body.status}`;
          // this.alert_variant = 'bg-red-200';
        }
      } else {
        if (!this.phoneValid) {
          this.phoneValidError = true;
        }
        if (!this.whatsappValid) {
          this.whatsappValidError = true;
        }
      }
      this.on_submission = false;
    },

    onPhoneInput(phone, phoneObject) {
      if (phoneObject.valid) {
        this.phoneValid = phoneObject.valid;
        this.phoneValidError = false;
      } else {
        this.phoneValid = phoneObject.valid;
      }
    },

    onWhatappInput(phone, whatsObject) {
      if (whatsObject.valid) {
        this.whatsappValid = whatsObject.valid;
        this.whatsappValidError = false;
      } else {
        this.whatsappValid = whatsObject.valid;
      }
    },
  },
};
</script>

<style>
.vue-tel-input:focus-within {
  box-shadow: none;
  border-color: #ddd;
}
</style>
