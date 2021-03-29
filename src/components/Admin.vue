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

      <template v-slot:item.studientCheckFilePath="{ item }">
        <a
            :href="'http://localhost:3001/' + item.studientCheckFilePath"
            target="_blank"
            class="file-preview"
        >
          <img :src="'http://localhost:3001/' + item.studientCheckFilePath">
        </a>
      </template>

      <template v-slot:item.proofResidenceFilPath="{ item }">
        <a
          :href="'http://localhost:3001/' + item.proofResidenceFilPath"
          target="_blank"
          class="file-preview"
        >
          <img :src="'http://localhost:3001/' + item.proofResidenceFilPath">
        </a>
      </template>

      <template v-slot:item.medicalCertificateFilePath="{ item }">
        <a
          :href="'http://localhost:3001/' + item.medicalCertificateFilePath"
          target="_blank"
          class="file-preview"
        >
          <img :src="'http://localhost:3001/' + item.medicalCertificateFilePath">
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
      dialogChecklist: false,
      registrationFabIdOpen: -1,
      headers: [
        { text: 'Statut', value: '_status',},
        { text: 'Actions', value: '_actions' },
        { text: 'Civilité', value: 'civility',},
        { text: 'Nom', value: 'lastname' },
        { text: 'Prénom', value: 'firstname' },
        { text: 'Date de naissance', value: 'dateOfBirth' },
        { text: 'Nationalité', value: 'nationality' },
        { text: 'Adresse', value: 'postalAddress' },
        { text: 'Code postal', value: 'postalCode' },
        { text: 'Ville', value: 'city' },
        { text: 'Pays', value: 'country' },
        { text: 'Téléphone', value: 'phone' },
        { text: 'Email', value: 'email' },
        { text: 'Déjà licencié ?', value: 'alreadyLicenced' },
        { text: 'Consentement', value: '_allowed' },
        { text: 'Justicatif étudiant', value: 'studientCheckFilePath' },
        { text: 'Justicatif domicile', value: 'proofResidenceFilPath' },
        { text: 'Certificat médical', value: 'medicalCertificateFilePath' },
        { text: 'Paiement', value: '_payment' },
      ],
      registrations: []
    }
  },
  methods: {
    async getAllRegistrations() {
      this.registrations = (await axios.get('http://localhost:3001/center/registration')).data
    },
    isActionButtonsOpen(item) {
      return item._id === this.registrationFabIdOpen;
    },
    openActionButtons(item) {
      this.registrationFabIdOpen = item._id
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
      this.dialogChecklist = true;

      await axios.post('http://localhost:3001/center/registration/status', {
        id: registration._id,
        status: 'OK'
      });

      await this.getAllRegistrations();
    },
    async refuseRegistration(registration) {
      this.dialogChecklist = true;

      await axios.post('http://localhost:3001/center/registration/status', {
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
