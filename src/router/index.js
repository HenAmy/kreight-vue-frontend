import { createRouter, createWebHistory } from 'vue-router';
// Auth
const Home = () => import('@/views/HomeView.vue');
const GetStarted = () => import('@/views/GetStarted.vue');
const SignIn = () => import('@/views/SignIn.vue');
const ForgotPassword = () => import('@/views/ForgotPassword.vue');
const ConfirmEmail = () => import('@/views/ConfirmEmail.vue');

// import Home from '@/views/HomeView.vue';
// import SignIn from '@/views/SignIn.vue';
// import GetStarted from '@/views/GetStarted.vue';
// import ForgotPassword from '@/views/ForgotPassword.vue';
// import ResetPassword from '@/views/ResetPassword.vue';
// import ConfirmEmail from '@/views/ConfirmEmail.vue';

// Main
const Dashboard = () => import('@/views/AppDashboard.vue');
const AppBookings = () => import('@/views/AppBookings.vue');
const BookingRequest = () => import('@/views/BookingRequest.vue');
const BookingsUpcoming = () => import('@/views/BookingUpcoming.vue');
const BookingHistory = () => import('@/views/BookingHistory.vue');
const BookingPast = () => import('@/views/BookingPast.vue');
const Calendar = () => import('@/views/AppCalendar.vue');
const Settings = () => import('@/views/Settings.vue');

// import Dashboard from '@/views/AppDashboard.vue';
// import AppBookings from '@/views/AppBookings.vue';
// import BookingRequest from '@/views/BookingRequest.vue';
// import BookingsUpcoming from '@/views/BookingUpcoming.vue';
// import BookingHistory from '@/views/BookingHistory.vue';
// import BookingPast from '@/views/BookingPast.vue';
// import Calendar from '@/views/AppCalendar.vue';
// import Settings from '@/views/Settings.vue';

// Links
const BookingLink = () => import('@/views/BookingLink.vue');
const BookingSummary = () => import('@/views/BookingSummary.vue');
const NotFound = () => import('@/views/NotFound.vue');

// import BookingLink from '@/views/BookingLink.vue';
// import BookingSummary from '@/views/BookingSummary.vue';
// import NotFound from '@/views/NotFound.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'signin',
    path: '/sign-in',
    component: SignIn,
  },
  {
    name: 'getstarted',
    path: '/get-started',
    component: GetStarted,
  },
  {
    name: 'forgotpassword',
    path: '/forgot-password',
    component: ForgotPassword,
  },
  // {
  //   name: 'resetpassword',
  //   path: '/reset-password',
  //   component: ResetPassword,
  // },
  {
    name: 'confirmemail',
    path: '/confirm-email',
    component: ConfirmEmail,
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
  },
  {
    name: 'bookings',
    path: '/bookings',
    component: AppBookings,
  },
  {
    name: 'bookingrequests',
    path: '/booking-requests/:id',
    component: BookingRequest,
  },
  {
    name: 'bookingupcoming',
    path: '/booking-upcoming/:id',
    component: BookingsUpcoming,
  },
  {
    name: 'bookinghistory',
    path: '/booking-history',
    component: BookingHistory,
  },
  {
    name: 'bookingpast',
    path: '/booking-past/:id',
    component: BookingPast,
  },
  {
    name: 'calendar',
    path: '/calendar',
    component: Calendar,
  },
  {
    name: 'settings',
    path: '/settings',
    component: Settings,
  },
  {
    name: 'bookinglink',
    path: '/booking-link/:id',
    component: BookingLink,
  },
  {
    name: 'bookingsummary',
    path: '/booking-summary/:id',
    component: BookingSummary,
  },
  {
    name: 'notfound',
    path: '/notfound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-primary',
});

export default router;
