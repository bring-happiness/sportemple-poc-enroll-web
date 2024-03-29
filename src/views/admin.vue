<template>
  <div style="margin: 21px;">

    <v-dialog
        v-model="dialogChecklist"
        width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Tâches
        </v-card-title>

        <v-card-text style="margin-top: 21px;">
          Avez vous bien créé le profil dans ADSL ?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="dialogChecklist = false"
          >
            Oui
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
        :headers="headers"
        :items="registrations"
        :items-per-page="10"
        class="elevation-1"
    >

      <template v-slot:item._status="{ item }">
        <v-chip
            :color="getRegistrationStatusColor(item.status)"
            dark
        >
          {{ getRegistrationStatusLabel(item.status) }}
        </v-chip>
      </template>



      <template v-slot:item._actions="{ item }">
        <v-speed-dial
            direction="right"
            transition="slide-x-transition"
        >
          <template v-slot:activator>
            <v-btn
                @click="openActionButtons(item)"
                color="blue darken-2"
                dark
                small
                fab
            >
              <v-icon v-if="isActionButtonsOpen(item)">
                mdi-close
              </v-icon>
              <v-icon v-else>
                mdi-pencil
              </v-icon>
            </v-btn>
          </template>
          <v-btn
              @click="acceptRegistration(item)"
              fab
              dark
              small
              color="green"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn
              @click="refuseRegistration(item)"
              fab
              dark
              small
              color="red"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-speed-dial>
      </template>

      <template v-slot:item.stripeSession="{ item }">

        <v-chip
            :color="getPaymentStatusColor(item.stripeSession ? item.stripeSession.payment_status : '')"
            dark
        >
          {{ item.stripeSession ? getPaymentStatus(item.stripeSession.payment_status) : '' }}
          {{ item.stripeSession ? getAmountTotal(item.stripeSession.amount_total) : '' }}
          {{ item.stripeSession ? getCurrency(item.stripeSession.currency) : '' }}
        </v-chip>

      </template>

      <template v-slot:item.studientCheckFilePath="{ item }">
        <a
            v-if="item.studientCheckFilePath !== null"
            :href="`${filePrefix}` + item.studientCheckFilePath"
            target="_blank"
            class="file-preview"
        >
          <img :src="`${filePrefix}` + item.studientCheckFilePath">
        </a>
      </template>

      <template v-slot:item.proofResidenceFilPath="{ item }">
        <a
            v-if="item.proofResidenceFilPath !== null"
            :href="`${filePrefix}` + item.proofResidenceFilPath"
            target="_blank"
            class="file-preview"
        >
          <img :src="`${filePrefix}` + item.proofResidenceFilPath">
        </a>
      </template>

      <template v-slot:item.medicalCertificateFilePath="{ item }">
        <a
            v-if="item.medicalCertificateFilePath !== null"
            :href="`${filePrefix}` + item.medicalCertificateFilePath"
            target="_blank"
            class="file-preview"
        >
          <img :src="`${filePrefix}` + item.medicalCertificateFilePath">
        </a>
      </template>

    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Admin",
  async created() {
    await this.getAllRegistrations();
  },
  data() {
    return {
      filePrefix: process.env.VUE_APP_SPORTEMPLE_ENROLL_API + '/',
      dialogChecklist: false,
      registrationFabIdOpen: -1,
      headers: [
        {text: 'Dossier', value: '_status',},
        {text: 'Actions', value: '_actions'},
        {text: 'Paiement', value: 'stripeSession'},
        {text: 'Civilité', value: 'civility',},
        {text: 'Nom', value: 'lastname'},
        {text: 'Prénom', value: 'firstname'},
        {text: 'Date de naissance', value: 'dateOfBirth'},
        {text: 'Nationalité', value: 'nationality'},
        {text: 'Adresse', value: 'postalAddress'},
        {text: 'Code postal', value: 'postalCode'},
        {text: 'Ville', value: 'city'},
        {text: 'Pays', value: 'country'},
        {text: 'Téléphone', value: 'phone'},
        {text: 'Email', value: 'email'},
        {text: 'Déjà licencié ?', value: 'alreadyLicenced'},
        {text: 'Consentement', value: '_allowed'},
        {text: 'Justicatif étudiant', value: 'studientCheckFilePath'},
        {text: 'Justicatif domicile', value: 'proofResidenceFilPath'},
        {text: 'Certificat médical', value: 'medicalCertificateFilePath'},
      ],
      registrations: []
    }
  },
  methods: {
    async getAllRegistrations() {
      this.registrations = (await axios.get(`${process.env.VUE_APP_SPORTEMPLE_ENROLL_API}/center/registration`)).data

      const promises = [];

      for (let i = 0; i < this.registrations.length; i++) {
        const registration = this.registrations[i];
        const stripeSessionId = registration.stripeSessionId;

        const promise = axios.get(`${process.env.VUE_APP_SPORTEMPLE_ENROLL_API}/center/registration/payment-status/${stripeSessionId}`, {
            });
        promises.push(promise);
      }

      Promise.all(promises).then((checkouts) => {
        checkouts.forEach((checkout, index) => {
          this.$set(this.registrations[index], 'stripeSession', checkout.data);
        })
      })
    },
    isActionButtonsOpen(item) {
      return item._id === this.registrationFabIdOpen;
    },
    openActionButtons(item) {
      this.registrationFabIdOpen = item._id
    },
    getPaymentStatus(paymentStatus) {
      if(paymentStatus === 'paid') return 'Payé'
      if(paymentStatus === 'unpaid') return 'Impayé'
      else return paymentStatus
    },
    getPaymentStatusColor(paymentStatus) {
      if(paymentStatus === 'paid') return 'success'
      if(paymentStatus === 'unpaid') return 'error'
      else return 'grey'
    },
    getAmountTotal(amountTotal) {
      return amountTotal / 100;
    },
    getCurrency(currency) {
      if (currency === 'eur') return '€'
      else return '$'
    },
    getRegistrationStatusLabel(status) {
      if (status === 'INIT') return 'À valider'
      else if (status === 'OK') return 'Validé'
      else if (status === 'KO') return 'Échec'
      else if (status === 'NEED_CHANGE') return 'Attente modif'
    },
    getRegistrationStatusColor(status) {
      if (status === 'INIT') return 'primary'
      else if (status === 'OK') return 'success'
      else if (status === 'KO') return 'error'
      else if (status === 'NEED_CHANGE') return 'Attente modif'
    },
    async acceptRegistration(registration) {
      // this.dialogChecklist = true;

      await axios.post(`${process.env.VUE_APP_SPORTEMPLE_ENROLL_API}/center/registration/status`, {
        id: registration._id,
        status: 'OK'
      });

      await this.getAllRegistrations();
    },
    async refuseRegistration(registration) {
      // this.dialogChecklist = true;

      await axios.post(`${process.env.VUE_APP_SPORTEMPLE_ENROLL_API}/center/registration/status`, {
        id: registration._id,
        status: 'KO'
      });

      await this.getAllRegistrations();
    }
  }
}
</script>

<style scoped>
.file-preview img {
  max-width: 100%;
  max-height: 100%;
}
</style>
