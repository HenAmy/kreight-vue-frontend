<template>
  <div :class="hiddenAccept">
    <div
      id="toast-success"
      class="flex font-mainFont items-center w-full max-w-xs p-4 mb-4 text-text bg-white rounded-lg shadow-lg fixed bottom-5 right-5"
      role="alert"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg"
      >
        <PhCheckCircle color="green" weight="fill" :size="24" />
        <span class="sr-only">Check icon</span>
      </div>
      <div class="ms-3 text-sm font-normal">{{ message }}</div>
      <button
        type="button"
        class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
        @click="isAccept = false"
        aria-label="Close"
      >
        <!-- <span class="sr-only">Close</span> -->
        <PhX color="black" weight="regular" :size="20" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { PhCheckCircle, PhX } from '@phosphor-icons/vue';
</script>

<script>
import { mapState, mapWritableState } from 'pinia';
import useModalStore from '@/stores/modal';

export default {
  name: 'SuccessToast',

  props: ['message'],

  computed: {
    ...mapState(useModalStore, ['hiddenAccept']),
    ...mapWritableState(useModalStore, ['isAccept']),
  },

  methods: {},
};
</script>
