<template>
  <div class="bg-white lg:flex items-center space-y-3">
    <p class="md:w-1/3 font-semibold text-sm">Business Photo</p>
    <!-- <div
      class="rounded-md cursor-pointer bg-background border-2 border-primary border-dashed px-4 py-3 h-40 w-full"
    >
      <p class="text-sm text-placeholder">Upload your business photo</p>
    </div> -->
    <input
      type="file"
      @change="upload($event)"
      placeholder="Upload or Drag & Drop"
      class="rounded-md text-sm cursor-pointer bg-background border-2 border-primary border-dashed px-4 py-3 h-40 w-full"
    />
  </div>
</template>

<script>
export default {
  name: 'PhotoUpload',

  data() {
    return {};
  },

  method: {
    upload($event) {
      console.log($event);
    },
  },
};
</script>
