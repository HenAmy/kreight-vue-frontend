<template>
  <AppMenu />
  <div class="p-2 bg-primary lg:hidden flex"></div>
  <div class="flex font-mainFont">
    <Sidebar />

    <div class="flex flex-col lg:w-full px-5 py-16 lg:px-20 lg:py-20 font-mainFont">
      <!-- Header -->
      <div class="space-y-6 mb-8">
        <h3 class="text-5xl font-bold">Settings</h3>
      </div>
      <!-- Tabs Feature -->
      <div class="font-mainFont text-xl space-y-6">
        <!-- TabLists -->
        <div class="md:flex gap-6 text-[16px] mb-14">
          <!-- Business Profile -->
          <div
            @click.prevent="tab = 'profile'"
            :class="{ 'bg-primary text-white font-semibold': tab === 'profile' }"
            class="px-5 py-3 rounded-[4px] flex items-center cursor-pointer"
          >
            Business Profile
          </div>

          <!-- Password -->
          <div
            @click.prevent="tab = 'password'"
            :class="{ 'bg-primary text-white font-semibold': tab === 'password' }"
            class="px-5 py-3 rounded-[4px] cursor-pointer"
          >
            Password
          </div>

          <!-- Notifications -->
          <!-- <div
            @click.prevent="tab = 'notifications'"
            :class="{ 'bg-primary text-white font-semibold': tab === 'notifications' }"
            class="px-5 py-3 rounded-[4px] cursor-pointer"
          >
            Notifications
          </div> -->
        </div>

        <!-- Tab Panels -->
        <div class="">
          <!-- Profile Content -->
          <SettingsProfile v-show="tab === 'profile'" />

          <!-- Password Content -->
          <SettingsPassword v-show="tab === 'password'" />

          <SettingsNotifications v-show="tab === 'notifications'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppMenu from '@/components/AppMenu.vue';
import Sidebar from '@/components/AppSidebar.vue';
import SettingsProfile from '@/components/SettingsProfile.vue';
import SettingsPassword from '@/components/SettingsPassword.vue';
import SettingsNotifications from '@/components/SettingsNotifications.vue';
import useUserStore from '@/stores/user';

export default {
  name: 'AppSettings',

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
      tab: 'profile',
    };
  },

  components: {
    AppMenu,
    Sidebar,
    SettingsProfile,
    SettingsPassword,
    SettingsNotifications,
  },
};
</script>
