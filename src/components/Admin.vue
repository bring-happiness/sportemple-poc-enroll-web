<template>
  <div style="margin: 21px;">
    <v-data-table
        :headers="headers"
        :items="registrations"
        :items-per-page="10"
        class="elevation-1"
    >

      <template v-slot:item.proofResidenceFilPath="{ item }">
        <img :src="'http://localhost:3001/' + item.proofResidenceFilPath">
      </template>

      <template v-slot:item.medicalCertificateFilePath="{ item }">
        <img :src="'http://localhost:3001/' + item.medicalCertificateFilePath">
      </template>

      <template v-slot:item._documents="{  }">
        <v-chip
            color="green"
            dark
        >
          Complet
        </v-chip>
      </template>

    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Admin",
  async created() {
    this.registrations = (await axios.get('http://localhost:3001/center/registration')).data
  },
  data() {
    return {
      headers: [
        {
          text: 'Civilité',
          value: 'civility',
        },
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
        { text: 'Justicatif domicile', value: 'proofResidenceFilPath' },
        { text: 'Certificat médical', value: 'medicalCertificateFilePath' },
        { text: 'Paiement', value: '_payment' },
      ],
      registrations: []
    }
  }
}
</script>

<style scoped>

</style>
