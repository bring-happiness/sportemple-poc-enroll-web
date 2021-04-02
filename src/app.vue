<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">

        <router-link to="/" class="club-link white--text">
          <span class="club-title mr-5">
            C.S Clichy tennis - Inscription
          </span>
        </router-link>

        <!-- <a class="white--text club-link" href="http://www.csclichytennis.com/">
          <v-icon class="mr-1">mdi-web</v-icon>
          Site du club
        </a> -->

      </div>
    </v-app-bar>

    <v-main>
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view/>
      </transition>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'app',
});
</script>

<style>
  .club-link {
    text-decoration: none;
  }

  .club-link:hover {
    opacity: 0.6;
  }

  .club-title {
    font-size: 1.5rem;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .3s ease;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateX(2em);
  }

</style>
