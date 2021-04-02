<template>
  <div class="home">

    <!--J'autorise l'utilisation par le club de ma photographie
    <v-switch
        v-model="pictureAllowed"
        inset
    ></v-switch>-->

      <!-- Photo d'identité
      <v-file-input
          accept="image/*"
          label="Photo d'identité"
      >

        <template v-slot:selection="{ text }">
          <v-chip
              small
              label
              color="primary"
          >
            {{ text }}
          </v-chip>
        </template>

      </v-file-input>-->

    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
});
</script>

<style>
.home {
  width: 500px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
