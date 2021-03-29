<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">

        <a class="white--text club-link" href="http://www.csclichytennis.com/">
          <v-icon class="mr-1">mdi-arrow-left</v-icon>
          Site du club
        </a>

        <span class="club-title ml-5">
          C.S Clichy tennis - Inscription
        </span>
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'app',
});
</script>

<style scoped>
  .club-link {
    text-decoration: none;
  }

  .club-link:hover {
    opacity: 0.6;
  }

  .club-title {
    font-size: 1.5rem;
  }
</style>
