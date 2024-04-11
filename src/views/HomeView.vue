<template>
  <StickyMenu />

  <!-- HERO -->
  <section id="home" class="bg-primary font-mainFont">
    <!-- Container -->
    <div class="container flex flex-col mx-auto p-6 lg:flex-row">
      <!-- Content -->
      <div class="flex flex-col space-y-8 lg:mt-16 lg:w-1/2 xl:mb-52">
        <div
          class="bg-secondary rounded-[40px] text-white p-[7px] w-fit flex justify-center font-mainFont font-medium text-sm px-6"
        >
          Best Schedule Platform for Creatives
        </div>
        <h1 class="text-5xl font-bold text-left lg:text-6xl lg:text-left text-secondary">
          Your booking and schedule platform all in one link
        </h1>
        <p
          class="text-lg font-medium text-center text-gray-400 lg:max-w-md lg:text-left text-secondary"
        >
          Organize your resources to become efficient in your services
        </p>
        <div class="w-full">
          <!-- Form -->
          <form
            id="link-form"
            class="flex flex-col space-y-4 rounded-lg md:flex-row md:space-y-0 md:space-x-3"
          >
            <input
              type="text"
              v-model="business_name"
              class="flex-1 p-3 rounded-md placeholder-placeholder bg-background focus:outline-none"
              placeholder="Enter business name"
              id="link-input"
            />
            <button
              @click="businessName(business_name)"
              class="px-10 py-2 text-white bg-secondary rounded-md hover:bg-cyanLight focus:outline-none md:py-2"
            >
              Get Started
            </button>
          </form>
        </div>
      </div>

      <!-- Image -->
      <div class="hidden md:flex mx-auto md:w-180">
        <img src="../../public/assets/img/hero-image.svg" alt="" />
      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section id="features" class="bg-slate-50 font-mainFont pt-40">
    <!-- Container -->
    <div class="container flex flex-col mx-auto px-6 lg:space-x-11 lg:flex-row">
      <!-- Left -->
      <div class="flex flex-col space-y-10 mb-20 lg:mt-16 lg:w-1/3 xl:mb-52">
        <div
          class="bg-secondary rounded-[40px] text-white p-[7px] w-[200px] flex justify-center items-center font-mainFont font-medium text-[14px]"
        >
          For Your Business
        </div>
        <h3 class="text-3xl font-bold lg:text-5xl lg:text-left font-mainFont text-secondary">
          Control how your clients interface with you
        </h3>
      </div>

      <!-- Right -->
      <div class="flex flex-col space-y-16 mb-44 lg:mt-16 lg:w-2/3 xl:mb-52">
        <!-- 1st Row -->
        <div class="flex flex-col space-y-24 md:flex-row md:space-y-0 md:space-x-8 text-text">
          <!-- Item 1 -->
          <div class="flex flex-col items-start space-y-2 md:w-1/2">
            <div class="flex items-center justify-center h-[20px] mb-[16px]">
              <PhCalendarBlank color="#01C38D" weight="light" :size="40" />
            </div>
            <h3 class="text-xl font-bold text-left">Manage Bookings</h3>
            <p class="text-left">
              Plan your bookings to ensure you fill your calendar diligently to accommodate all
              requests by offering spots early without worrying about conflicts.
            </p>
          </div>
          <!-- Item 2 -->
          <div class="flex flex-col space-y-2 md:w-1/2">
            <div class="flex items-center h-[20px] mb-[16px]">
              <PhClock color="#01C38D" weight="light" :size="40" />
            </div>
            <h3 class="text-xl font-bold text-left">Set Business Days</h3>
            <p class="max-w-md text-left">
              Setting working days and times is critical for creating a clear routine and increasing
              productivity. By carefully organizing when you will devote your time to work
            </p>
          </div>
        </div>

        <!-- 2nd Row -->
        <div
          class="flex flex-col space-y-24 mt-28 md:flex-row md:space-y-0 md:space-x-[16px] text-text"
        >
          <!-- Item 3 -->
          <div class="flex flex-col items-start space-y-2 md:w-1/2">
            <div class="flex items-center justify-center h-[20px] mb-[16px]">
              <PhNote color="#01C38D" weight="light" :size="40" />
            </div>
            <h3 class="text-xl font-bold text-left">Attach important notes</h3>
            <p class="max-w-md text-left">
              Attach notes to each booking with changes or reminders, helping you stay organized and
              on track with each booking.
            </p>
          </div>
          <!-- Item 4 -->
          <div class="flex flex-col space-y-2 md:w-1/2">
            <div class="flex items-center h-[20px] mb-[16px]">
              <PhRewind color="#01C38D" weight="light" :size="40" />
            </div>
            <h3 class="text-xl font-bold text-left">View past bookings</h3>
            <p class="max-w-md text-left">
              Look back at all the bookings you have had, including dates, clients, and any notes or
              details associated with them.
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Clients features -->
    <div class="container flex flex-col mx-auto px-6 pb-32 md:flex-row md:space-x-16">
      <!-- Content -->
      <div class="flex flex-col items-start md:w-1/3">
        <div class="flex flex-col space-y-5">
          <div
            class="bg-secondary rounded-[40px] text-white p-[7px] w-[150px] flex justify-center items-center font-mainFont font-medium text-[14px]"
          >
            For Your Clients
          </div>
          <h4 class="text-3xl font-bold lg:text-5xl lg:text-left font-mainFont text-secondary">
            Share access to your profile with your clients
          </h4>
          <p class="text-md md:text-lg">Let your clients know your schedule</p>
        </div>
      </div>

      <!-- Image -->
      <div class="md:w-2/3">
        <img class="mb-10" src="../../public/assets/img/client-form.svg" alt="client-form" />
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section id="testimonials" class="pt-60 font-mainFont">
    <!-- Title -->
    <div
      class="container mx-auto px-3 font-mainFont text-secondary flex flex-col items-center space-y-5"
    >
      <div
        class="bg-secondary rounded-[40px] text-white py-2 px-7 w-fit flex justify-center items-center font-medium text-sm"
      >
        For Your Clients
      </div>
      <h3 class="text-3xl font-bold lg:text-5xl mb-6 text-center">What creatives say</h3>
    </div>

    <!-- Container -->
    <div class="container mx-auto lg:px-6 pt-12">
      <!-- Boxes -->
      <div class="relative flex flex-col w-full space-y-20 lg:flex-row md:space-y-0 lg:space-x-12">
        <!-- Box 1 -->
        <div class="flex flex-col px-6 space-y-6 rounded-lg bg-gray-100 lg:w-1/3">
          <p class="md:text-md">
            I cannot recommend the Kreight enough! As a busy photographer, managing my schedule has
            always been a struggle. But with this platform, my clients know my schedule beforehand.
          </p>
          <!-- Customer Info -->
          <div class="flex space-x-4">
            <!-- <img
              src="../../public/assets/img/kreight-favicon.png"
              alt=""
              class="w-10 h-10 rounded-full"
            /> -->
            <div>
              <h5 class="font-semibold">Qlimax</h5>
              <p class="text-sm font-extralight">Photographer</p>
            </div>
          </div>
        </div>

        <!-- Box 2 -->
        <div class="flex flex-col px-6 space-y-6 rounded-lg bg-gray-100 lg:w-1/3">
          <p class="md:text-md">
            This platform has truly transformed the way I manage my schedule and has saved me so
            much time and stress. Thank you, Kreight, for making my life as a creative so much
            easier!
          </p>
          <!-- Customer Info -->
          <div class="flex space-x-4">
            <!-- <img
              src="../../public/assets/img/kreight-favicon.png"
              alt=""
              class="w-10 h-10 rounded-full"
            /> -->
            <div>
              <h5 class="font-semibold">Jessica</h5>
              <p class="text-sm font-extralight">Model</p>
            </div>
          </div>
        </div>

        <!-- Box 3 -->
        <div class="flex flex-col px-6 space-y-6 rounded-lg bg-gray-100 lg:w-1/3">
          <p class="md:text-md">
            I love how I can easily manage my calendar & set my working schedule. And the best part
            is? I can easily share my profile link with clients, making the booking process a
            breeze.
          </p>
          <!-- Customer Info -->
          <div class="flex space-x-4">
            <!-- <img
              src="../../public/assets/img/kreight-favicon.png"
              alt=""
              class="w-10 h-10 rounded-full"
            /> -->
            <div>
              <h5 class="font-semibold">LJ</h5>
              <p class="text-sm font-extralight">Photographer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTACTS -->
  <section class="font-mainFont pt-60" id="contacts">
    <!-- Title -->
    <div
      class="container mx-auto px-3 font-mainFont text-secondary flex flex-col items-center space-y-5"
    >
      <div
        class="bg-secondary rounded-[40px] text-white p-[7px] w-[200px] flex justify-center items-center font-medium text-sm"
      >
        Have more question?
      </div>
      <h3 class="text-3xl font-bold lg:text-5xl mb-6 text-center">Reach out to us</h3>
    </div>

    <!-- Container -->
    <div class="container mx-auto px-6 pt-12 pb-80 lg:pb-96">
      <!-- Boxes -->
      <div class="relative lg:space-y-0 flex flex-col w-full space-y-6 lg:flex-row lg:space-x-12">
        <!-- Box 1 -->
        <a
          target="_blank"
          href="https://www.instagram.com/kreightives?igsh=MWthajljOWo2eDNt&utm_source=qr"
          class="flex flex-col p-10 space-y-6 rounded-xl bg-secondary text-white lg:w-1/3 font-mainFont shadow-md"
        >
          <h5 class="text-3xl font-mainFont font-semibold md:text-2xl">DM Us</h5>
          <p class="text-sm leading-5 md:text-lg">
            Visit us on instagram to stay updated on features and products we are working on. You
            can send us a DM as well
          </p>
          <PhInstagramLogo color="white" weight="light" :size="72" />
        </a>

        <!-- Box 2 -->
        <a
          href="mailto:henry.amihereha@gmail.com"
          class="flex flex-col p-10 space-y-6 rounded-xl bg-secondary text-white lg:w-1/3 font-mainFont shadow-xl"
        >
          <h5 class="text-3xl font-mainFont font-semibold md:text-2xl">Email Us</h5>
          <p class="text-sm leading-5 md:text-lg">
            If you have any inquiries or concerns, feel free to send us an email and we will
            promptly respond with the information you need.
          </p>
          <!-- Customer Info -->
          <PhAt color="white" weight="light" :size="72" />
        </a>

        <!-- Box 3 -->
        <a
          target="_blank"
          href="https://discord.gg/t2fA7KKT85"
          class="flex flex-col p-10 space-y-6 rounded-xl bg-secondary text-white lg:w-1/3 font-mainFont shadow-xl"
        >
          <h5 class="text-3xl font-mainFont font-semibold md:text-2xl">Community</h5>
          <p class="text-sm leading-5 md:text-lg">
            Share your ideas, collaborate on projects, and gain inspiration from others who share
            your passion for creativity.
          </p>
          <!-- Customer Info -->
          <PhDiscordLogo color="white" weight="light" :size="72" />
        </a>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-primary py-20 font-mainFont" id="cta">
    <div class="flex flex-col p-2 space-y-8 font-mainFont items-center">
      <img class="w-[180px]" src="../../public/assets/img/logo-accent.svg" alt="logo-accent" />
      <h5 class="mx-auto space-y-10 text-4xl font-bold text-center text-text sm:text-5xl">
        Begin your journey to organize your business
      </h5>
      <div class="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6 w-full">
        <!-- Form -->
        <form
          id="link-form"
          class="flex flex-col justify-center w-full space-y-4 rounded-lg md:flex-row md:space-y-0 md:space-x-3"
        >
          <input
            type="text"
            v-model="business_name"
            class="px-5 py-3 rounded-md md:w-1/3 placeholder-placeholder bg-background"
            placeholder="Enter business name"
            id="link-input"
          />
          <button
            @click.prevent="businessName(business_name)"
            class="px-10 py-3 text-white bg-secondary rounded-md focus:outline-none md:py-2"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="bg-text p-6 font-mainFont">
    <!-- Container -->
    <div
      class="flex container items-center justify-center space-x-40 mx-auto font-mainFont lg:justify-between"
    >
      <img src="../../public/assets/img/logo-accent.svg" alt="logo-accent" />
      <div class="hidden items-center space-x-10 text-white md:flex">
        <a href="#home" class=""> Home </a>
        <a href="#features" class=""> Features </a>
        <a href="#testimonials" class=""> Testimonials </a>
        <a href="#contacts" class=""> Contact </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {
  PhCalendarBlank,
  PhClock,
  PhNote,
  // PhLinkSimple,
  PhDiscordLogo,
  PhAt,
  PhRewind,
  PhInstagramLogo,
  // PhPhoneCall,
} from '@phosphor-icons/vue';
</script>

<script>
import StickyMenu from '@/components/StickyMenu.vue';

export default {
  name: 'AppHome',

  components: {
    StickyMenu,
  },

  data() {
    return {
      business_name: '',
    };
  },

  methods: {
    businessName(newValue) {
      this.$router.push({
        name: 'getstarted',
        query: {
          name: newValue,
        },
      });
    },
  },
};
</script>
