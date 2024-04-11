import { defineStore } from 'pinia';
import axios from 'axios';

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
    user: {},
    businessDays: [],
    requestBookings: [],
    upcomingBookings: [],
    requestBookingsMini: [],
  }),

  actions: {
    async currentUser() {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/current-user`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      this.user = response.data.response.user;
      // console.log(this.user._id);

      this.bookingRequestsMini(5);
      this.bookingRequests();
      this.userDays();
      this.bookingUpcoming(this.user._id);
    },

    async userDays() {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user-days`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      this.businessDays = response.data.response.days;
      //   console.log(this.businessDays);
    },

    async bookingRequests() {
      try {
        const response = await axios.request({
          url: `${import.meta.env.VITE_API_URL}/booking-requests`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        this.requestBookings = response.data.response.booking;
        // this.bookingRequestsMini(6);
        // console.log(response.data.response.booking);
      } catch (error) {
        console.log('Error: ', error);
      }
    },

    async bookingRequestsMini(number) {
      try {
        const response = await axios.request({
          url: `${import.meta.env.VITE_API_URL}/booking-requests-mini?number=${number}`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        this.requestBookingsMini = response.data.response.booking;
        // this.bookingRequests(10);
        // console.log(response.data.response.booking);
      } catch (error) {
        console.log('Error: ', error);
      }
    },

    async bookingUpcoming() {
      try {
        const response = await axios.request({
          url: `${import.meta.env.VITE_API_URL}/booking-upcoming`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        this.upcomingBookings = response.data.response.booking;
        // console.log(response.data.response.booking);
      } catch (error) {
        console.log('Error: ', error);
      }
    },
  },
});
