<template>
  <div class="home">
    <web-cam style="display: none;"></web-cam>

    <div>

      Civilité

      <v-radio-group v-model="civilityGroup">
        <v-radio
            v-for="civility in civilities"
            :key="civility"
            :label="civility"
            :value="civility"
        ></v-radio>
      </v-radio-group>

      Nom de famille
      <v-text-field
          v-model="lastname"
          label="Nom de famille"
          placeholder="Dupont"
          outlined
      ></v-text-field>

      Prénom
      <v-text-field
          v-model="firstname"
          label="Prénom"
          placeholder="Maxime"
          outlined
      ></v-text-field>

      Date de naissance
      <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="dateOfBirth"
              label="Date de naissance"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
            ref="picker"
            v-model="dateOfBirth"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
            @change="save"
        ></v-date-picker>
      </v-menu>

      Nationalité
      <v-text-field
          v-model="nationality"
          label="Nationalité"
          placeholder="Français"
          outlined
      ></v-text-field>
    </div>


    <div>
      Adresse postale
      <v-text-field
          v-model="postalAddress"
          label="Adresse postale"
          placeholder="5 rue Victor Hugo"
          outlined
      ></v-text-field>

      Code postal
      <v-text-field
          v-model="postalCode"
          label="Code postal"
          placeholder="75001"
          outlined
      ></v-text-field>

      Ville
      <v-text-field
          v-model="city"
          label="Ville"
          placeholder="Paris"
          outlined
      ></v-text-field>

      Pays
      <v-text-field
          v-model="country"
          label="Pays"
          placeholder="France"
          outlined
      ></v-text-field>
    </div>

    <div>
      Téléphone
      <v-text-field
          v-model="phone"
          label="Téléphone"
          placeholder="0987656654"
          outlined
      ></v-text-field>

      J'accepte de recevoir des informations ou demandes de renseignements par SMS
      <v-switch
          v-model="informationsSmsAllowed"
          inset
      ></v-switch>

      Adresse email
      <v-text-field
          v-model="email"
          label="Adresse email"
          placeholder="0687656654"
          outlined
      ></v-text-field>

      J'accepte de recevoir des informations ou demandes de renseignements par email
      <v-switch
          v-model="informationsEmailAllowed"
          inset
      ></v-switch>
    </div>

    <br>

    <!--J'autorise l'utilisation par le club de ma photographie
    <v-switch
        v-model="pictureAllowed"
        inset
    ></v-switch>-->

    <div>
      J'accepte d'être contacté pour devenir partenaire de jeu
      <v-switch
          v-model="partnersAllowed"
          inset
      ></v-switch>

      J'accepte de recevoir les confirmations de réservation par email
      <v-switch
          v-model="bookingConfirmAllowed"
          inset
      ></v-switch>

      Je bénéficie d'un PASS 92
      <v-switch
          v-model="pass92Allowed"
          inset
      ></v-switch>

      Je souhaite un justificatif de paiement
      <v-switch
          v-model="proofPaymentAllowed"
          inset
      ></v-switch>
    </div>

    <div>
      Déjà licencié ?
      <v-switch
          v-model="alreadyLicenced"
          inset
      ></v-switch>

      <div
          v-if="alreadyLicenced"
      >
        N° de licence
        <v-text-field
            v-model="lisence"
            label="Licence"
            placeholder="1234567Z"
            outlined
        ></v-text-field>

        Année sportive
        <v-text-field
            v-model="sportYear"
            label="Année sportive"
            placeholder="2021"
            outlined
        ></v-text-field>

        Auprès de quel club
        <v-text-field
            v-model="clubLisenced"
            label="Auprès de quel club"
            placeholder="T.C Démo"
            outlined
        ></v-text-field>
      </div>
    </div>

    <div>
      Êtes vous étudiant ?

      <v-switch
          v-model="studientCheck"
          inset
      >
      </v-switch>

      <v-file-input
          v-if="studientCheck"
          v-model="studientCheckFile"
          accept="image/*"
          label="Justificatif étudiant de l'année en cours"
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

      </v-file-input>

      <br><br>

      Habitez vous Clichy ?

      <v-switch
          v-model="homeCheck"
          inset
          :label="homeResult"
      >
      </v-switch>

      <v-file-input
          v-if="homeCheck"
          v-model="proofResidence"
          accept="image/*"
          label="Justificatif de domicile"
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

      </v-file-input>

      <br><br>

      Certificat médical de moins de 3 mois.
      <br>
      Il doit préciser la pratique du sport en compétition
      <v-file-input
          v-model="medicalCertificate"
          accept="image/*"
          label="Certificat médical"
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

      </v-file-input>

      <br>

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

    <br><br>

    <v-btn
        @click="sumbitData"
        class="primary"
        block
    >
      M'inscrire
    </v-btn>

  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import WebCam from './WebCam.vue';

import { loadStripe } from '@stripe/stripe-js';

export default Vue.extend({
  name: 'Home',
  components: {
    WebCam
  },


  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    async sumbitData() {
      const sessionId = (await axios.get('http://localhost:3001/checkout-session')).data;
      const stripe = await loadStripe('pk_test_51IaJpyJBgPLSInDKWuAF12GVj5wlIGLypDG6HbN2XDWvlS5g2n9F2mIaZ0v1WB8RtPnYZYkhaY0ZdLq7vkeGgme300wELrLqus');

      await stripe.redirectToCheckout({
        sessionId
      })
      console.log(sessionId)

      /*const formData = new FormData();

      formData.append('civility', this.civilityGroup);
      formData.append('lastname', this.lastname);
      formData.append('firstname', this.firstname);
      formData.append('dateOfBirth', this.dateOfBirth);
      formData.append('nationality', this.nationality);
      formData.append('postalAddress', this.postalAddress);
      formData.append('postalCode', this.postalCode);
      formData.append('city', this.city);
      formData.append('country', this.country);

      formData.append('phone', this.phone);
      formData.append('informationsSmsAllowed', this.informationsSmsAllowed);

      formData.append('email', this.email);
      formData.append('informationsEmailAllowed', this.informationsEmailAllowed);

      formData.append('pictureAllowed', this.pictureAllowed);
      formData.append('partnersAllowed', this.partnersAllowed);
      formData.append('bookingConfirmAllowed', this.bookingConfirmAllowed);
      formData.append('pass92Allowed', this.pass92Allowed);
      formData.append('proofPaymentAllowed', this.proofPaymentAllowed);
      formData.append('alreadyLicenced', this.alreadyLicenced);
      formData.append('lisence', this.lisence);
      formData.append('sportYear', this.sportYear);
      formData.append('clubLisenced', this.clubLisenced);

      formData.append('studientCheck', this.studientCheck);
      formData.append('studientCheckFile', this.studientCheckFile);

      formData.append('proofResidence', this.proofResidence);
      formData.append('medicalCertificate', this.medicalCertificate);

      const res = await axios.post('http://localhost:3001/center/registration', formData);

      console.log(res);*/
    }
  }
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
