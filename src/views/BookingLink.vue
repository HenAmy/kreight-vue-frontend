<template>
  <div class="flex">
    <!-- Main Container -->
    <div class="flex flex-col w-full py-5 lg:py-10 font-mainFont">
      <!-- Header -->
      <div class="space-y-8 mb-24">
        <router-link :to="{ name: 'home' }">
          <img class="mx-auto" src="../../public/assets/img/logo-primary.svg" alt="" />
        </router-link>
        <div class="p-1 bg-primary"></div>
      </div>

      <!-- Main Content -->
      <div class="lg:flex flex-row-reverse space-y-16 lg:gap-10 lg:space-y-0 px-5 lg:px-20">
        <!-- Right Side -->
        <div class="lg:w-2/5 w-full bg-modal rounded-xl px-6 py-8 space-y-10 h-fit">
          <!-- Spinner -->
          <div class="flex justify-center mt-8" v-show="userLoading" role="status">
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
          <div v-show="!userLoading" class="space-y-5">
            <img
              class="w-24 h-24 object-contain rounded-full"
              :src="
                user.business_photo_url
                  ? `${user.business_photo_url}`
                  : 'https://84d36ede214360ad0692cfb46107ad10.cdn.bubble.io/f1712348695728x793058886171252500/avatar_placeholder.png?_gl=1*g916h4*_gcl_au*MTUxNzE0NzI4My4xNzA5ODg5NjI2*_ga*MTk1Nzk2MDM0MC4xNjU1MTE2NjI5*_ga_BFPVR2DEE2*MTcxMjMxNjcwNS4xOS4xLjE3MTIzNDg2NzYuNTguMC4w'
              "
              alt="photo_url"
            />
            <div class="space-y-3">
              <h3 class="text-2xl font-bold">{{ user.business_name }}</h3>
              <p class="text-sm">
                {{ user.business_bio }}
              </p>
            </div>
          </div>
        </div>

        <!-- Left Side -->
        <div class="lg:w-3/5">
          <!-- Header -->
          <div class="">
            <div class="flex justify-between items-center mb-8">
              <p class="font-bold text-xl text-text">Your Booking Details</p>
              <!-- <p class="font-bold text-xl text-text">{{ $route.params.id }}</p> -->
            </div>
          </div>
          <div class="flex flex-col">
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

            <!-- Your details -->
            <vee-form
              v-show="tab === 'form' && !disabledDaysLoading"
              :validation-schema="schema"
              @submit="makeBooking"
              class="pb-6 space-y-10"
            >
              <div class="space-y-8">
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

                <!-- Flexible Dates Question -->
                <!-- <div class="flex flex-col space-y-1">
                  <div class="flex space-x-2">
                    <input type="checkbox" class="w-5 h-5" />
                    <p>Are your willing to reschedule on the date you have selected?</p>
                  </div>
                </div> -->

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
                  <p v-show="whatsappValidError" class="text-red-600 text-sm">
                    Number is not valid
                  </p>
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
                <div class="text-center py-3 rounded" v-show="show_alert" :class="alert_variant">
                  {{ alert_msg }}
                </div>
                <button
                  class="px-3 py-3 w-full text-white bg-secondary rounded-md focus:outline-none text-sm"
                >
                  <i
                    v-if="on_submission"
                    class="pi pi-spin pi-spinner"
                    style="font-size: 1rem; color: white"
                  ></i>
                  <p v-else>Make your booking</p>
                </button>
              </div>
            </vee-form>

            <!-- Your review -->
            <div v-show="tab === 'review'" class="space-y-10 bg-background rounded-xl p-8">
              <!-- Dates -->
              <div class="space-y-10">
                <div class="flex justify-center">
                  <img
                    src="../../public/assets/img/party-popper-svgrepo-com.svg"
                    class="w-32"
                    alt="party"
                  />
                </div>
                <p class="flex justify-center text-center px-28">
                  Great!!! You have made your booking to Jema Photography. Check your email address
                  to for a link to your booking summary
                </p>
              </div>
              <div class="flex flex-col mx-auto space-y-2">
                <div class="px-16 py-3 flex-1 m-auto text-white bg-primary rounded-md text-md">
                  Check your email address
                </div>
                <div
                  @click.prevent="reloadComponent"
                  class="px-16 py-3 flex-1 m-auto text-text bg-transparent rounded-md text-md cursor-pointer"
                >
                  Make another booking
                </div>
              </div>
            </div>

            <!-- Review Backup -->
            <div v-show="tab === 'backup'" class="hidden space-y-10 bg-background rounded-xl p-8">
              <!-- Dates -->
              <div class="flex justify-between items-center">
                <div class="flex flex-col">
                  <p class="font-bold">Date</p>
                  <div class="flex gap-2 flex-wrap">
                    <!-- Date Card -->
                    <div
                      v-for="date in selecteddate"
                      :key="date"
                      class="py-1 px-3 border font-mainFont font-medium text-[14px] rounded-2xl flex justify-center bg-white border-placeholder"
                    >
                      <p>{{ date.toDateString() }}</p>
                    </div>
                  </div>
                </div>
                <p
                  @click.prevent="tab = 'form'"
                  class="cursor-pointer font-bold text-md underline text-primary"
                >
                  Change
                </p>
              </div>

              <!-- Name -->
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-bold">Full Name</p>
                  <p>{{ name }}</p>
                </div>
                <p
                  @click.prevent="tab = 'form'"
                  class="cursor-pointer font-bold text-md underline text-primary"
                >
                  Change
                </p>
              </div>

              <!-- Email -->
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-bold">Email</p>
                  <p>{{ email }}</p>
                </div>
                <p
                  @click.prevent="tab = 'form'"
                  class="cursor-pointer font-bold text-md underline text-primary"
                >
                  Change
                </p>
              </div>

              <!-- Call -->
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-bold">Call Number</p>
                  <p>{{ phone }}</p>
                </div>
                <p
                  @click.prevent="tab = 'form'"
                  class="cursor-pointer font-bold text-md underline text-primary"
                >
                  Change
                </p>
              </div>

              <!-- WhatsApp -->
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-bold">WhatsApp Number</p>
                  <p>{{ whatsapp }}</p>
                </div>
                <p
                  @click.prevent="tab = 'form'"
                  class="cursor-pointer font-bold text-md underline text-primary"
                >
                  Change
                </p>
              </div>

              <!-- Actions -->
              <div class="space-x-2">
                <!-- Alert -->
                <div
                  class="text-center py-3 rounded text-sm"
                  v-if="show_alert"
                  :class="alert_variant"
                >
                  {{ alert_msg }}
                </div>
                <!-- Button -->
                <button
                  @click.prevent="makeBooking"
                  class="p-3 w-full text-white bg-secondary rounded-md focus:outline-none font-mainFont text-md"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
            <!-- End of Review Backup -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <SuccessToast message="Your booking has been cancelled" />
</template>

<script>
// import { mapActions } from 'pinia';
// import useUserStore from '@/stores/user';
import SuccessToast from '@/components/SuccessToast.vue';
// import MobileMenu from '@/components/MobileMenu.vue';

import axios from 'axios';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
// import moment from 'moment';

export default {
  name: 'BookingLink',

  data() {
    return {
      user: {},
      booking: {},
      tab: 'form',

      //Spinner
      userLoading: false,
      disabledDaysLoading: false,

      // all business days
      days: [],
      disableddays: [],

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

      schema: {
        fullname: 'required|min:3|max:100',
        email: 'required|email',
        datepicker: 'required',
        callnumber: 'required',
        whatsappnumber: 'required',
      },

      // Default values
      on_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-600',
      alert_msg: 'Something went wrong',
    };
  },

  components: {
    VueDatePicker,
    VueTelInput,
    SuccessToast,
    // MobileMenu,
  },

  computed: {
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

  async created() {
    this.userLoading = true;
    this.disabledDaysLoading = true;

    //Fetch user with params
    try {
      const response = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/user?id=${this.$route.params.id}`,
        method: 'GET',
      });

      if (this.$route.params.id != response.data.response.user._id) {
        this.$router.push({ name: 'notfound' });
        return;
      }
      // if (!response.data.response.user.length) {
      //   this.$router.push({ name: 'notfound' });
      //   return;
      // }

      this.user = response.data.response.user;
      this.userLoading = false;
      // console.log(response.data.response.user);
    } catch (error) {
      console.log('Error: ', error);
    }

    //Fetch business days with params
    try {
      let arr = [];
      // let final = [];
      const response = await axios.request({
        url: `${import.meta.env.VITE_API_URL}/business-days?user=${this.$route.params.id}`,
        method: 'GET',
        headers: {},
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
        // console.log(`For loop: ${arr[index].day_number} `, arr.active);
        this.disableddays.push(arr[index].day_number);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  },

  methods: {
    // ...mapActions(useUserStore, ['currentUser']),

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
            // headers: {
            //   Authorization: 'Bearer ' + localStorage.getItem('token'),
            // },
            data: {
              dates: this.selecteddate,
              full_name: this.name,
              email_address: this.email,
              call_number: this.phone,
              whatsapp_number: this.whatsapp,
              user: this.$route.params.id,
              booking_status: 'Pending',
            },
          });
          // this.show_alert = true;
          // console.log('Response: ', response);
          this.booking = response.config.data;
          // this.currentUser();
          // this.alert_variant = 'bg-green-200';
          this.tab = 'review';
          // this.alert_msg = 'Booking submitted successfully';
          //
        } catch (error) {
          this.on_submission = false;
          this.show_alert = true;
          // console.log('Error: ', error.response.data.body.status);
          this.alert_msg = `${error.response.data.body.status}`;
          this.alert_variant = 'bg-red-200';
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

      // console.log('Booking: ', this.booking);
    },

    onPhoneInput(phone, phoneObject) {
      if (phoneObject.valid) {
        this.phoneValid = phoneObject.valid;
        this.phoneValidError = false;
        // console.log('Phone is valid');
      } else {
        this.phoneValid = phoneObject.valid;
        // console.log('Phone is invalid');
      }
    },

    onWhatappInput(phone, whatsObject) {
      if (whatsObject.valid) {
        this.whatsappValid = whatsObject.valid;
        this.whatsappValidError = false;
        // console.log('Phone is valid');
      } else {
        this.whatsappValid = whatsObject.valid;
        // console.log('Phone is invalid');
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
