<template>
  <v-container>

    <v-card
        class="mx-auto"
        max-width="344"
    >
      <v-img
          max-height="244"
          src="https://images.unsplash.com/photo-1558365849-6ebd8b0454b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"></v-img>

      <v-card-text>
        <h2 class="title text--secondary">
          Adhésion jeu libre - Mars à août
        </h2>
        Adhésion valable de mars à août 2021 pour la pratique du tennis en jeu libre.
      </v-card-text>



      <v-card-actions>
        <v-btn
            color="primary"
            text
            @click="$router.push('/registration/form')"
        >
          S'inscrire
        </v-btn>

        <v-spacer></v-spacer>

        <v-chip class="primary lighten-1">
          <v-icon
              left
              small
              dark
          >
            mdi-currency-eur
          </v-icon>
          <span class="subtitle-1">158</span>
        </v-chip>
      </v-card-actions>
    </v-card>


  </v-container>
</template>

<script>
export default {
name: "registration-items"
}
</script>

<style scoped>

</style>
