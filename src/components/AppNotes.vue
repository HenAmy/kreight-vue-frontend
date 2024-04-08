<template>
  <div class="">
    <div class="flex items-center justify-between py-5">
      <h4 class="text-xl font-semibold">Notes</h4>
      <p
        @click.prevent="showNote = true"
        class="font-bold text-primary underline underline-offset-4 cursor-pointer"
      >
        Attach Notes
      </p>
    </div>
    <!-- Content -->
    <div v-show="showNote === true" class="bg-disabled flex flex-col space-y-7 md:px-6 py-6 mb-10">
      <p class="text-lg">Attach Note</p>
      <vee-form class="flex flex-col space-y-4" @submit="newNote" :validation-schema="schema">
        <!-- <input
                  v-model="title"
                  type="text"
                  placeholder="Title"
                  class="rounded-md bg-background px-4 py-3 focus:outline-none text-[16px] text-black"
                /> -->
        <vee-field
          as="textarea"
          rows="2"
          name="description"
          type="text"
          placeholder="Description"
          class="rounded-md bg-background px-4 py-3 focus:outline-none text-[16px] text-black"
        />
        <ErrorMessage class="text-red-600 text-sm" name="description" />
        <!-- Actions -->
        <div class="flex flex-col">
          <button
            class="px-16 py-3 flex-1 text-white bg-green-700 rounded-md font-mainFont text-[16px]"
          >
            <i
              v-if="n_on_submission"
              class="pi pi-spin pi-spinner"
              style="font-size: 1rem; color: white"
            ></i>
            <p v-else>Save</p>
          </button>
          <button
            @click.prevent="showNote = false"
            class="py-3 flex-1 text-text bg-transparent font-mainFont text-[16px]"
          >
            Cancel
          </button>
        </div>
      </vee-form>
    </div>
    <!-- List of notes -->
    <div class="space-y-6 mt-3">
      <!-- Note Card -->
      <div v-for="note in notes" :key="note._id" class="py-8 px-6 rounded-md bg-yellow-200 h-fit">
        <div class="flex">
          <div class="w-full flex space-x-10 justify-between items-center">
            <p class="font-extralight text-2xl">{{ note.text }}</p>
            <!-- Actions -->
            <div class="space-y-8">
              <PhPushPin weight="regular" :size="35" />
              <PhPen weight="fill" :size="32" />
              <PhTrash
                @click.prevent="deleteNote(note._id)"
                class="cursor-pointer"
                weight="fill"
                color="#FF0000"
                :size="32"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PhPushPin, PhPen, PhTrash } from '@phosphor-icons/vue';
</script>

<script>
import axios from 'axios';

export default {
  name: 'AppNotes',

  data() {
    return {
      notes: {},
      booking: {},

      showNote: false,

      // title: '',
      description: '',

      schema: {
        // title: 'required',
        description: 'required',
      },

      // Notes default values
      n_on_submission: false,
      n_show_alert: false,
      // m_alert_variant: 'bg-blue-600',
      // n_alert_msg: 'Something went wrong',
    };
  },

  created() {
    this.allNotes();
  },

  methods: {
    async newNote(values) {
      this.n_on_submission = true;

      try {
        const response = await axios.request({
          url: `${import.meta.env.VITE_API_URL}/new-note?id=${this.$route.params.id}`,
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          data: {
            // head: this.title,
            description: values.description,
          },
        });
        // this.allNotes();
        this.showNote = false;
        console.log('Note created: ', response);
      } catch (error) {
        this.n_on_submission = true;
        // this.n_show_alert = true;
        // this.n_alert_msg = `${error}`;
        console.log('Error: ', error);
      }
      this.n_on_submission = false;
    },

    async allNotes() {
      try {
        const response = await axios.request({
          url: `${import.meta.env.VITE_API_URL}/all-notes?id=${this.booking._id}`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        this.notes = response.data.response.notes;
        console.log('Notes: ', response);
      } catch (error) {
        console.log('Error: ', error);
      }
    },
  },
};
</script>
