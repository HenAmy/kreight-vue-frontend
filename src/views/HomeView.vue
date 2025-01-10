<template>
  <StickyMenu />

  <!-- HERO -->
  <section id="home" class="mt-40 font-mainFont w-full">
    <div class="space-y-24">
      <!-- Content -->
      <div class="flex flex-col space-y-6 items-center px-6">
        <div
          class="bg-secondary rounded-[40px] text-white p-[7px] w-fit flex justify-center font-mainFont font-medium text-sm px-6"
        >
          Best Schedule Platform for Creatives
        </div>
        <h1 class="text-6xl text-text font-bold text-center">Simply the organizing done for you</h1>
        <p class="lg:w-1/2 text-center">
          Take the stress out of your clutter and make your professional organizing effortless. We
          handle everything so you can handle your work
        </p>
        <!-- Form -->
        <form
          id="link-form"
          class="flex flex-col lg:w-2/5 md:space-y-0 md:flex-row md:space-x-3 space-y-4 w-full"
        >
          <input
            type="text"
            v-model="business_name"
            class="flex-1 p-3 rounded-md placeholder-placeholder bg-white focus:outline-none border border-[#bbb]"
            placeholder="Enter your business name"
            id="link-input"
          />
          <button
            @click.prevent="businessName(business_name)"
            class="px-10 py-4 text-white bg-secondary rounded-md focus:outline-none"
          >
            Get Started
          </button>
        </form>
      </div>
      <!-- Image -->
      <img src="../../public/assets/img/hero-image.svg" class="hidden md:flex w-full" alt="" />
      <!-- <div class=""></div> -->
    </div>
    <div class="hidden xl:flex justify-center w-full p-5 bg-secondary">
      <div class="flex justify-center items-center space-x-10 text-white">
        <p>Photographer</p>
        <div class="bg-disabled h-2 w-12"></div>
        <p>Videographer</p>
        <div class="bg-disabled h-2 w-12"></div>
        <p>Model</p>
        <div class="bg-disabled h-2 w-12"></div>
        <p>Master of Ceremony</p>
        <div class="bg-disabled h-2 w-12"></div>
        <p>Actor</p>
        <div class="bg-disabled h-2 w-12"></div>
        <p>Disk Juggler</p>
      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section id="features" class="pt-64 pb-180 font-mainFont w-full bg-background px-6">
    <div class="space-y-24">
      <!-- Content -->
      <div class="space-y-24 container mx-auto">
        <div class="space-y-3">
          <div
            class="bg-secondary rounded-[40px] text-white p-[7px] w-fit flex justify-center font-mainFont font-medium text-sm px-6"
          >
            What is Kreight
          </div>
          <h2 class="text-5xl text-text font-bold">
            Everthing you <br />
            need in one account
          </h2>
        </div>

        <div class="space-y-8 text-text">
          <div class="lg:grid grid-cols-3 md:gap-8 lg:space-y-0 space-y-8">
            <div class="bg-white px-6 py-10 flex flex-col justify-between">
              <h3 class="font-bold text-3xl">
                Integrate your <br />
                calendars
              </h3>
              <img src="../../public/assets/img/Feature1.png" class="mx-auto" alt="" />
              <p class="mt-10">
                Sync all your appointments into one place, see all your commitments in one place
                instead of jumping between different apps, you can view everything at a glance.
              </p>
            </div>
            <div class="bg-white px-6 py-10 flex flex-col justify-between">
              <h3 class="font-bold text-3xl">
                Manage your <br />
                availability
              </h3>
              <img src="../../public/assets/img/Feature2.png" class="mx-auto" alt="" />
              <p class="mt-10">
                Actively update your schedule to reflect the times you are available for
                appointments to ensure clients know when you are free.
              </p>
            </div>
            <div class="bg-white px-6 py-10 flex flex-col justify-between">
              <h3 class="font-bold text-3xl">
                Get instant <br />
                reminders
              </h3>
              <img src="../../public/assets/img/Feature3.png" class="mx-auto" alt="" />
              <p class="mt-10">
                Receive immediate reminders for your bookings and scheduling tasks, so important
                appointments do not slip through the cracks
              </p>
            </div>
          </div>

          <div class="lg:grid grid-cols-3 md:gap-8 lg:space-y-0 space-y-8">
            <div class="bg-white px-6 py-10 col-span-2 flex flex-col justify-between">
              <h3 class="font-bold text-3xl">
                Real-Time <br />
                rescheduling
              </h3>
              <img src="../../public/assets/img/Feature4.png" class="mx-auto" alt="" />
              <p class="mt-10">
                Reschedule your bookings in real time. Cancel or change your bookings as soon as
                your plans shift, offering flexibility to caters to the dynamic nature of the
                creative professional work. All parties are informed, reducing the possibility of
                miscommunications. This means that changes that arise can be catered for easily
              </p>
            </div>
            <div class="bg-white px-6 py-10 flex flex-col justify-between">
              <h3 class="font-bold text-3xl">
                Share creative <br />
                profile
              </h3>
              <img src="../../public/assets/img/Feature5.png" class="mx-auto" alt="" />
              <p class="mt-10">
                Allow clients to see essential details related to their reservations allowing them
                to easily access and understand their bookings
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PRICING -->
  <section
    id="pricing"
    class="-mt-56 absolute left-0 right-0 mx-auto font-mainFont bg-secondary container rounded-3xl"
  >
    <p class="text-white py-8 text-5xl flex justify-center">It's all FREE</p>
    <div class="bg-primary rounded-3xl px-8 lg:px-16 py-16">
      <div class="flex flex-row justify-between items-center">
        <!-- Content Left -->
        <div class="text-text space-y-10">
          <div class="space-y-4">
            <p class="text-3xl">Starts at:</p>
            <div class="flex">
              <p class="text-6xl font-bold">$0 USD</p>
              <p class="text-6xl text-light">/mo</p>
            </div>
          </div>
          <p class="text-lg">No credit card</p>
        </div>
        <!-- Content Right -->
        <div class="hidden lg:flex text-right">
          <h3 class="text-text text-7xl font-bold">
            Free <br />
            Forever
          </h3>
        </div>
      </div>
      <!-- <div class="mt-16">
        <button
          class="w-full px-10 py-6 text-text rounded-md border-4 border-white focus:outline-none text-xl"
        >
          Get Started
        </button>
      </div> -->
    </div>
  </section>

  <!-- PROFESSIONALS -->
  <section id="professionals" class="py-180 font-mainFont w-full bg-text">
    <!-- Content -->
    <div class="space-y-24 container mx-auto">
      <!-- ROW 1-->
      <div class="lg:grid grid-cols-2 px-6 space-y-20 lg:space-y-0 lg:flex-row lg:gap-64 lg:px-24">
        <!-- Professional 1 -->
        <div class="text-white space-y-3">
          <div class="flex items-end justify-between">
            <h3 class="text-3xl font-bold">Photographer</h3>
            <div class="bg-primary rounded-full p-5">
              <img src="../../public/assets/icons/SolarCameraBroken.svg" class="w-12" alt="" />
              <!-- <PhCamera weight="light" :size="64" /> -->
            </div>
          </div>
          <p class="lg:w-5/6">
            Capture not just images but emotions and moments frozen in time, telling stories &
            highlighting the unseen
          </p>
        </div>
        <!-- Professional 2 -->
        <div class="text-white space-y-3">
          <div class="flex items-end justify-between">
            <h3 class="text-3xl font-bold">Model</h3>
            <div class="bg-primary rounded-full px-6 py-4">
              <img src="../../public/assets/icons/SolarWalkingRoundBroken.svg" class="w-7" alt="" />
            </div>
          </div>
          <p class="lg:w-5/6">
            Every shoot as an opportunity to embody a vision, to transform and tell a story through
            expressions and movements.
          </p>
        </div>
      </div>
      <!-- ROW 2 -->
      <div class="lg:grid grid-cols-2 px-6 space-y-20 lg:space-y-0 lg:flex-row lg:gap-64 lg:px-24">
        <div class="text-white space-y-3">
          <div class="flex items-end justify-between">
            <h3 class="text-3xl font-bold">MC</h3>
            <div class="bg-primary rounded-full px-5 py-4">
              <img src="../../public/assets/icons/SolarMicrophone2Broken.svg" class="w-10" alt="" />
            </div>
          </div>
          <p class="lg:w-5/6">
            Be the bridge that connects the audience to the experience blending charisma, precision
            and attention to details
          </p>
        </div>
        <div class="text-white space-y-3">
          <div class="flex items-end justify-between">
            <h3 class="text-3xl font-bold">Videographer</h3>
            <div class="bg-primary rounded-full px-5 py-6">
              <img
                src="../../public/assets/icons/SolarVideocameraRecordBroken.png"
                class="w-10"
                alt=""
              />
            </div>
          </div>
          <p class="lg:w-5/6">
            Capture the power of storytelling through motion, from the essence of the moment through
            weaving visuals and sound
          </p>
        </div>
      </div>
      <!-- ROW 3 -->
      <div class="lg:grid grid-cols-2 px-6 space-y-20 lg:space-y-0 lg:flex-row lg:gap-64 lg:px-24">
        <div class="text-white space-y-3">
          <div class="flex items-end justify-between">
            <h3 class="text-3xl font-bold">Actor</h3>
            <div class="bg-primary rounded-full p-5">
              <img
                src="../../public/assets/icons/SolarVideoFramePlayHorizontalBroken.svg"
                class="w-10"
                alt=""
              />
            </div>
          </div>
          <p class="lg:w-5/6">
            Each role is an opportunity to step into another world, to understand and embody a
            character’s truth
          </p>
        </div>
        <div class="text-white space-y-3">
          <div class="flex items-end justify-between">
            <h3 class="text-3xl font-bold">DJ</h3>
            <div class="bg-primary rounded-full p-5">
              <img
                src="../../public/assets/icons/SolarRecordSquareBroken.svg"
                class="w-10"
                alt=""
              />
            </div>
          </div>
          <p class="lg:w-5/6">
            Don't just play music, create an experience with every beat, mix, blend and juggle to
            craft an atmosphere
          </p>
        </div>
      </div>

      <!-- Row 1 -->
      <!-- <div class="grid grid-cols-3 gap-56 text-white items-start">
        <div class="flex items-center gap-3">
          <PhCalendarBlank color="#01C38D" weight="light" :size="56" />
          <p class="text-4xl font-bold">Photographers</p>
        </div>
        <p class="text-lg leading-normal col-span-2">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
          accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
          sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
          elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
          diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
          et
        </p>
      </div> -->
    </div>
  </section>

  <!-- PRICING -->
  <section
    id="pricing"
    class="-mt-56 absolute left-0 right-0 mx-auto font-mainFont bg-secondary container rounded-3xl"
  >
    <p class="text-white py-8 text-5xl flex justify-center">It's all FREE</p>
    <div class="bg-primary rounded-3xl px-8 lg:px-16 py-16">
      <div class="flex flex-row justify-between items-center">
        <!-- Content Left -->
        <div class="text-text space-y-10">
          <div class="space-y-4">
            <p class="text-3xl">Starts at:</p>
            <div class="flex">
              <p class="text-6xl font-bold">$0 USD</p>
              <p class="text-6xl text-light">/mo</p>
            </div>
          </div>
          <p class="text-lg">No credit card</p>
        </div>
        <!-- Content Right -->
        <div class="hidden lg:flex text-right">
          <h3 class="text-text text-7xl font-bold">
            Free <br />
            Forever
          </h3>
        </div>
      </div>
      <!-- <div class="mt-16">
        <button
          class="w-full px-10 py-6 text-text rounded-md border-4 border-white focus:outline-none text-xl"
        >
          Get Started
        </button>
      </div> -->
    </div>
  </section>

  <!-- REVIEWS -->
  <section id="reviews" class="py-180 font-mainFont w-full bg-background">
    <!-- Content -->
    <div class="space-y-40 container mx-auto">
      <div class="text-text lg:grid grid-cols-2 gap-24 px-4 lg:px-0">
        <img src="../../public/assets/img/reviews.svg" class="hidden lg:flex" alt="" />
        <div class="space-y-16">
          <!-- Content -->
          <div class="space-y-3">
            <div
              class="bg-secondary rounded-[40px] text-white p-[7px] w-fit flex justify-center font-mainFont font-medium text-sm px-6"
            >
              Reviews
            </div>
            <h2 class="text-6xl text-text font-bold">
              Creative professional <br />
              love <span class="text-primary">Kreight</span>
            </h2>
          </div>
          <!-- Counters -->
          <div class="space-y-16 text-text">
            <div class="flex items-center space-x-4">
              <h6 class="font-bold text-6xl">100+</h6>
              <p class="text-2xl">professionals</p>
            </div>
            <div class="flex items-center space-x-4">
              <h6 class="font-bold text-6xl">1000+</h6>
              <p class="text-2xl">bookings made</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section
    id="pricing"
    class="-mt-36 absolute left-0 right-0 container mx-auto font-mainFont bg-primary rounded-3xl"
  >
    <div class="bg-primary lg:px-20 py-16 lg:flex justify-between items-center px-6 space-y-10">
      <!-- Content Left -->
      <p class="text-text text-6xl font-bold">
        Get your business <br />
        organized
      </p>

      <!-- Content Right -->
      <div class="flex space-x-0">
        <router-link
          :to="{ name: 'getstarted' }"
          class="px-10 py-4 text-white bg-secondary rounded-md focus:outline-none text-md"
        >
          Get Started
        </router-link>
        <button class="px-10 py-4 text-white bg-transparent rounded-md focus:outline-none text-md">
          Contact Us
        </button>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <section id="features" class="pt-80 pb-20 font-mainFont w-full bg-white px-6 lg:px-0">
    <div class="space-y-24">
      <div class="container mx-auto space-y-10">
        <!-- 1st Content -->
        <div class="md:flex space-y-4 md:space-y-0 justify-between items-center">
          <img
            src="../../public/assets/img/logo-primary.svg"
            alt=""
            id="logo"
            class="w-32 md:w-40"
          />
          <p class="text-text">© Kreight, All rights reserved</p>
        </div>

        <hr class="" />

        <!-- 2nd Content -->
        <div class="lg:flex justify-between lg:space-y-0 space-y-10">
          <!-- Column 1 -->
          <div class="text-text space-y-4">
            <h6 class="font-bold text-xl">Discover</h6>
            <div class="space-y-3 flex flex-col">
              <p class="cursor-pointer">About Us</p>
              <p class="cursor-pointer">Contact Us</p>
              <p class="cursor-pointer">FAQs</p>
            </div>
          </div>
          <!-- Column 2 -->
          <div class="text-text space-y-4">
            <h6 class="font-bold text-xl">Resources</h6>
            <div class="space-y-3 flex flex-col">
              <p class="cursor-pointer">Security</p>
              <p class="cursor-pointer">Feedback</p>
              <p class="cursor-pointer">Blog</p>
            </div>
          </div>
          <!-- Column 3 -->
          <div class="text-text space-y-4">
            <h6 class="font-bold text-xl">Legal</h6>
            <div class="space-y-3">
              <p class="cursor-pointer">Terms of Service</p>
              <p class="cursor-pointer">Privacy</p>
              <!-- <p>FAQs</p> -->
            </div>
          </div>
          <!-- Column 4 -->
          <div class="text-text space-y-4">
            <h6 class="font-bold text-xl">Social</h6>
            <div class="space-y-3">
              <p class="cursor-pointer">Instagram</p>
              <p class="cursor-pointer">Facebook</p>
              <p class="cursor-pointer">Twitter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// import { PhCamera } from '@phosphor-icons/vue';
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
