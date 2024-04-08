<template>
  <AppMenu />
  <div class="p-2 bg-primary lg:hidden flex"></div>
  <div class="flex font-mainFont">
    <Sidebar />

    <div class="flex flex-col lg:w-full px-5 py-16 lg:px-20 lg:py-20 font-mainFont">
      <!-- Header -->
      <div class="flex flex-wrap justify-between items-center space-y-6 mb-8">
        <h3 class="text-5xl font-bold">Calendar</h3>
        <!-- <button
          @click.prevent="toggleBookingModal"
          class="cursor-pointer px-4 py-3 text-white flex justify-center gap-2 bg-secondary rounded-md text-md w-fit"
        >
          <PhPlus color="white" weight="regular" :size="24" />
          <p>Manually add booking</p>
        </button> -->
      </div>
      <!-- Show calendar for large screen -->
      <div class="md:h-screen h-full">
        <CalendarView
          class="theme-default font-mainFont"
          :items="allEvents"
          :show-date="showDate"
          :disable-past="true"
          :enable-date-selection="true"
          @click-date="onClickDay"
          @click-item="onClickItem"
          :display-period-count="1"
        >
          <template #header="{ headerProps }">
            <CalendarViewHeader :header-props @input="setShowDate" />
          </template>
        </CalendarView>
      </div>

      <!-- Show calendar for mobile screen -->
      <!-- <CalendarView
        class="theme-default font-mainFont"
        :items="allEvents"
        :show-date="showDate"
        :disable-past="true"
        :enable-date-selection="true"
        @click-date="onClickDay"
        @click-item="onClickItem"
        :display-period-count="1"
      >
        <template #header="{ headerProps }">
          <CalendarViewHeader :header-props @input="setShowDate" />
        </template>
      </CalendarView> -->

      <!-- Monthly bookings -->
      <div id="bookings" class="mt-20">
        <div class="flex items-center justify-between py-5">
          <h4 class="text-xl font-semibold">Bookings for {{ findMonth(monthNumber) }}</h4>
          <!-- <p class="font-bold text-primary underline underline-offset-4 cursor-pointer">Today</p> -->
        </div>
        <!-- Content -->
        <div class="flex flex-col w-full">
          <div>
            <!-- Sorting -->
            <!-- <div class="py-5">
              <select
                class="flex-1 p-3 w-72 rounded-md placeholder-placeholder bg-background focus:outline-none"
              >
                <option value="1">Newest first</option>
                <option value="2">Oldest first</option>
              </select>
            </div> -->

            <!-- No Content -->
            <div v-show="!futureEvents.length" class="mt-10">
              <img class="w-48 mx-auto" src="../../public/assets/img/nodata.svg" alt="" />
              <h6 class="font-medium text-center text-sm text-gray">No upcoming events... yet</h6>
            </div>

            <!-- Content -->
            <div class="flex flex-col divide-disabled divide-y">
              <!-- Card -->
              <router-link
                :to="{ name: 'bookingupcoming', params: { id: fe._id } }"
                v-for="fe in futureEvents"
                :key="fe._id"
                class="p-4"
              >
                <!-- <p class="text-sm text-right">Today</p> -->

                <div class="flex justify-between items-center mb-2">
                  <div class="flex flex-wrap gap-4 items-center">
                    <PhUserFocus color="#191E29" weight="thin" :size="64" />
                    <div class="flex flex-col space-y-2">
                      <h6 class="font-semibold">{{ fe.client_name }}</h6>
                      <div class="flex">
                        <!-- Dates -->
                        <div class="flex flex-wrap gap-2">
                          <div
                            v-for="date in fe.dates"
                            :key="date"
                            class="py-0 px-2 border font-mainFont font-medium text-sm rounded-2xl flex justify-center"
                            :class="
                              date < new Date()
                                ? 'bg-disabled border-placeholder'
                                : 'bg-white border-placeholder'
                            "
                          >
                            <p>{{ new Date(date).toDateString() }}</p>
                          </div>
                        </div>
                        <!-- <p class="text-sm text-right">Today</p> -->
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
  <BookingModal @refresh-upcoming="currentUser" />
</template>

<script setup>
import { PhUserFocus } from '@phosphor-icons/vue';
</script>

<script>
import { mapStores, mapWritableState, mapActions } from 'pinia';
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar';
import '../../node_modules/vue-simple-calendar/dist/style.css';
import '../../node_modules/vue-simple-calendar/dist/css/default.css';
import axios from 'axios';
// import _ from 'lodash';

import AppMenu from '@/components/AppMenu.vue';
import Sidebar from '@/components/AppSidebar.vue';
import BookingModal from '@/components/BookingModal.vue';
import useModalStore from '@/stores/modal';
import useUserStore from '@/stores/user';

export default {
  name: 'AppCalendar',

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
      showDate: this.thisMonth(1),
      monthNumber: new Date().getMonth(),
      futureEvents: [],
      monthlyEvents: [],
      allEvents: [],
      pastEvents: [],
    };
  },

  components: {
    AppMenu,
    Sidebar,
    CalendarView,
    CalendarViewHeader,
  },

  computed: {
    ...mapStores(useModalStore),
    ...mapWritableState(useUserStore, ['upcomingBookings']),
  },

  created() {
    // Find bookings in the selected month
    try {
      this.futureEvents = [];

      for (let index = 0; index < this.upcomingBookings.length; index++) {
        for (let i = 0; i < this.upcomingBookings[index].dates.length; i++) {
          if (new Date(this.upcomingBookings[index].dates[i]).getMonth() == this.monthNumber) {
            if (this.futureEvents.includes(this.upcomingBookings[index])) {
              break;
            } else {
              this.futureEvents.push(this.upcomingBookings[index]);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

    // Events for calendar
    try {
      // Sorting
      this.futureEvents.forEach((element) => {
        element.dates.sort((a, b) => new Date(a) - new Date(b));
        this.monthlyEvents.push(element);
      });

      // Loading calendar events
      this.monthlyEvents.forEach((element) => {
        let colors = ['colorone', 'colortwo', 'colorthree', 'colorfour', 'colorfive'];
        let pastColor = 'colorPast';
        let random_color = colors[Math.floor(Math.random() * colors.length)];

        let firstEl = new Date(element.dates.slice(0, 1)[0]);

        let lastEl = new Date(element.dates[element.dates.length - 1]);

        if (new Date() > lastEl) {
          this.allEvents.push({
            id: element._id,
            title: element.client_name,
            startDate: firstEl.toISOString(),
            endDate: lastEl.toISOString(),
            classes: pastColor,
          });
        } else {
          this.allEvents.push({
            id: element._id,
            title: element.client_name,
            startDate: firstEl.toISOString(),
            endDate: lastEl.toISOString(),
            classes: random_color,
          });
        }
      });

      for (let index = 0; index < this.upcomingBookings.length; index++) {
        // let colors = ['colorone', 'colortwo', 'colorthree', 'colorfour', 'colorfive'];
        // let pastColor = 'colorPast';
        // let random_color = colors[Math.floor(Math.random() * colors.length)];
        // for (let i = 0; i < this.upcomingBookings[index].dates.length; i++) {
        // }
        // this.upcomingBookings[index].dates.sort((a, b) => new Date(a) - new Date(b));
        // console.log(`Sorted Dates: ${this.upcomingBookings[index].dates}`);
        // let firstElement = new Date(this.upcomingBookings[index].dates.slice(0, 1)[0]);
        // let lastElement = new Date(
        //   this.upcomingBookings[index].dates[this.upcomingBookings[index].dates.length - 1],
        // );date.setDate(date.getDate() + 1);

        //Find past events
        for (let i = 0; i < this.upcomingBookings[index].dates.length; i++) {
          if (new Date(this.upcomingBookings[index].dates[i]).getMonth() < new Date().getMonth()) {
            if (this.pastEvents.includes(this.upcomingBookings[index])) {
              break;
            } else {
              this.pastEvents.push(this.upcomingBookings[index]);
              // this.futureEvents.push(this.upcomingBookings[index]);
            }
            // console.log(
            //   `Past Event: , ${this.upcomingBookings[index].client_name} : ${new Date(this.upcomingBookings[index].dates[0]).toISOString()}`,
            // );
          }
        }

        // this.allEvents.push({
        //   id: index,
        //   title: this.upcomingBookings[index].client_name,
        //   startDate: firstElement.toISOString(),
        //   endDate: lastElement.toISOString(),
        //   classes: random_color,
        // });
        // if (new Date() > lastElement) {
        //   // console.log('Using past color: ', pastColor);
        //   this.allEvents.push({
        //     id: index,
        //     title: this.upcomingBookings[index].client_name,
        //     startDate: firstElement.toISOString(),
        //     endDate: lastElement.toISOString(),
        //     classes: pastColor,
        //   });
        // } else {
        //   this.allEvents.push({
        //     id: index,
        //     title: this.upcomingBookings[index].client_name,
        //     startDate: firstElement.toISOString(),
        //     endDate: lastElement.toISOString(),
        //     classes: random_color,
        //   });
        // }
      }
      if (this.pastEvents.length) {
        this.runPastDates();
        // console.log('Past Events: ', this.pastEvents);
        // console.log(JSON.stringify(this.pastEvents);
      }

      // console.log('All Events: ', this.allEvents);
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    ...mapActions(useUserStore, ['bookingUpcoming']),
    ...mapActions(useUserStore, ['currentUser']),

    toggleBookingModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
    },

    onClickDay() {},

    onClickItem() {
      const element = document.getElementById('bookings');
      element.scrollIntoView();
    },

    thisMonth(d, h, m) {
      const t = new Date();
      this.monthNumber = t.getMonth();
      // console.log('month number: ', this.monthNumber);
      return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0);
    },

    findMonth(d) {
      const monthNames = [
        'January',
        'Febuary',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      // console.log('Reported Month ' + monthNames[d]);
      return monthNames[d];
    },

    setShowDate(d) {
      // const monthNames = [
      //   'Jan',
      //   'Feb',
      //   'Mar',
      //   'Apr',
      //   'May',
      //   'Jun',
      //   'Jul',
      //   'Aug',
      //   'Sep',
      //   'Oct',
      //   'Nov',
      //   'Dec',
      // ];

      // const date = d;
      // console.log('The current month is ' + monthNames[date.getMonth()]);

      this.showDate = d;
      this.monthNumber = d.getMonth();
      // console.log('month number reset: ', this.monthNumber);

      this.futureEvents = [];
      this.monthlyEvents = [];
      this.allEvents = [];

      for (let index = 0; index < this.upcomingBookings.length; index++) {
        for (let i = 0; i < this.upcomingBookings[index].dates.length; i++) {
          if (new Date(this.upcomingBookings[index].dates[i]).getMonth() == this.monthNumber) {
            if (this.futureEvents.includes(this.upcomingBookings[index])) {
              break;
            } else {
              this.futureEvents.push(this.upcomingBookings[index]);
            }
          }
        }
      }
      // console.log(this.futureEvents);

      this.futureEvents.forEach((element) => {
        element.dates.sort((a, b) => new Date(a) - new Date(b));
        this.monthlyEvents.push(element);
      });

      // console.log(this.monthlyEvents);

      this.monthlyEvents.forEach((element) => {
        let colors = ['colorone', 'colortwo', 'colorthree', 'colorfour', 'colorfive'];
        let pastColor = 'colorPast';
        let random_color = colors[Math.floor(Math.random() * colors.length)];

        let firstEl = new Date(element.dates.slice(0, 1)[0]);

        let lastEl = new Date(element.dates[element.dates.length - 1]);

        if (new Date() > lastEl) {
          this.allEvents.push({
            id: element._id,
            title: element.client_name,
            startDate: firstEl.toISOString(),
            endDate: lastEl.toISOString(),
            classes: pastColor,
          });
        } else {
          this.allEvents.push({
            id: element._id,
            title: element.client_name,
            startDate: firstEl.toISOString(),
            endDate: lastEl.toISOString(),
            classes: random_color,
          });
        }
      });
    },

    runPastDates() {
      this.pastEvents.forEach((element) => {
        axios
          .request({
            url: `${import.meta.env.VITE_API_URL}/create-past-bookings?id=${element._id}`,
            method: 'POST',
            data: {
              status: 'Past',
            },
          })
          .then(console.log('Past updated'), this.bookingUpcoming())
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
};
</script>

<style>
/* @import 'qalendar/dist/style.css'; */

.theme-default .cv-day.outsideOfMonth {
  background-color: #fbfbfb;
}

.theme-default .cv-item.continued::before,
.theme-default .cv-item.toBeContinued::after {
  content: '';
}

.theme-default .cv-item {
  border-radius: 1em;
  /* background-color: #01c38d; */
  color: white;
  text-align: center;
  cursor: pointer;
}

.theme-default .cv-header .periodLabel {
  justify-content: center;
}

.theme-default .cv-header {
  flex: auto;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 40px;
  max-height: 7em;
  background-color: white;
}

.cv-header-nav button {
  padding: 1em 1em;
}

.theme-default .cv-day.past {
  background-color: #e2e2e2;
}

/* Random colors */
.theme-default .cv-item.c.o.l.o.r.o.n.e {
  background-color: #2188ff;
}
.theme-default .cv-item.c.o.l.o.r.t.w.o {
  background-color: #4f378b;
}
.theme-default .cv-item.c.o.l.o.r.t.h.r.e.e {
  background-color: #39c5cf;
}
.theme-default .cv-item.c.o.l.o.r.f.o.u.r {
  background-color: #132d46;
}
.theme-default .cv-item.c.o.l.o.r.f.i.v.e {
  background-color: #191e29;
}
.theme-default .cv-item.c.o.l.o.r.P.a.s.t {
  background-color: #696e79;
}
</style>
