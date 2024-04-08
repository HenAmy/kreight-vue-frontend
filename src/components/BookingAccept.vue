<template>
  <div
    class="bg-black bg-opacity-60 flex justify-center items-center h-screen font-mainFont fixed z-50 inset-0 overflow-y-auto"
    id="modal"
    :class="hiddenAccept"
  >
    <div class="bg-white p-8 rounded-lg w-[700px] space-y-10">
      <!-- Header -->
      <div class="">
        <p class="font-bold text-center text-xl">Accept booking</p>
      </div>
      <!-- Body -->
      <div>
        <p class="text-md text-center px-10">
          Accepting this booking will add it to your calendar...
        </p>
      </div>
      <!-- Actions -->
      <div class="space-y-4">
        <button
          class="w-full cursor-pointer py-3 text-white flex justify-center gap-2 bg-secondary rounded-md text-md"
        >
          <p>Proceed to accept</p>
        </button>
        <button
          @click="isAccept = false"
          class="w-full cursor-pointer py-3 text-text flex items-center justify-center gap-2 bg-white rounded-md text-md"
        >
          <PhCaretLeft color="FF0000" weight="regular" :size="20" />
          <p class="text-sm text-red-600">Back to booking</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PhCaretLeft } from '@phosphor-icons/vue';
</script>

<script>
import { mapState, mapWritableState } from 'pinia';
import useModalStore from '@/stores/modal';

export default {
  name: 'AcceptModal',

  computed: {
    ...mapState(useModalStore, ['hiddenAccept']),
    ...mapWritableState(useModalStore, ['isAccept']),
  },
};
</script>
