<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        C.S Clichy
      </div>

      <v-spacer></v-spacer>

      <v-btn
          @click="goToAdmin"
        text
      >
        <span class="mr-2">
          <span v-if="!admin">Admin</span>
          <span v-else>Inscription</span>

        </span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <HelloWorld
          v-if="!admin"
      />

      <Admin
        v-else
      ></Admin>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Admin from './components/Admin';

export default Vue.extend({
  name: 'App',

  components: {
    HelloWorld,
    Admin
  },

  data: () => ({
    admin: false,
  }),

  methods: {
    goToAdmin() {
      this.admin = !this.admin;
    }
  }
});
</script>
