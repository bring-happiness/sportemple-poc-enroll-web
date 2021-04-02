<template>
  <v-container>
    <v-row>
      <v-col
          sm="12"
          md="6"
          offset-md="3"
      >
        <h1 class="my-7 text-center text--secondary">
          Félicitations !
          <br>
          Vous êtes inscrit au club du C.S Clichy
        </h1>

        <img
            width="100%;"
            src="@/assets/celebration.svg"
            alt="Celebration"
        >
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "registration-items",
  props: {
    stripeSessionId: {
      type: String,
      required: true
    }
  },
  async created() {
    //await this.getCheckout();
  },
  data() {
    return {
      checkout: {}
    }
  },
  methods: {
    async getCheckout() {
      this.checkout = (await axios.get(`${process.env.VUE_APP_SPORTEMPLE_ENROLL_API}/center/registration/payment-status/${this.stripeSessionId}`, {
      })).data;
    }
  }
}
</script>

<style scoped>

</style>
