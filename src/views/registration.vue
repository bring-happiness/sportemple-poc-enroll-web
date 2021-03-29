<template>
  <div>

    <template>
      <v-stepper
          v-model="e6"
          vertical
      >
        <v-stepper-step
            :complete="e6 > 1"
            step="1"
        >
          Informations personnelles
        </v-stepper-step>

        <v-stepper-content step="1">

          <div>Sexe</div>

          <div style="display: flex;">
            <div>
              <v-radio-group v-model="civilityGroup">
                <v-radio
                    v-for="civility in civilities"
                    :key="civility"
                    :label="civility"
                    :value="civility"
                ></v-radio>
              </v-radio-group>
            </div>

            <div class="ml-3">
              <transition name="fade" mode="out-in">
                <TennisPlayerFemale v-if="civilityGroup === 'Mme'"/>
                <TennisPlayerMale v-if="civilityGroup === 'M'"/>
              </transition>
            </div>
          </div>

          <div>Nom de famille</div>
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

          <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
          ></v-card>
          <v-btn
              color="primary"
              @click="e6 = 2"
          >
            Continue
          </v-btn>
          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-step
            :complete="e6 > 2"
            step="2"
        >
          Configure analytics for this app
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
          ></v-card>
          <v-btn
              color="primary"
              @click="e6 = 3"
          >
            Continue
          </v-btn>
          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-step
            :complete="e6 > 3"
            step="3"
        >
          Select an ad format and name ad unit
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
          ></v-card>
          <v-btn
              color="primary"
              @click="e6 = 4"
          >
            Continue
          </v-btn>
          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-step step="4">
          View setup instructions
        </v-stepper-step>
        <v-stepper-content step="4">
          <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
          ></v-card>
          <v-btn
              color="primary"
              @click="e6 = 1"
          >
            Continue
          </v-btn>
          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
      </v-stepper>
    </template>

    <form action="">


      <div class="group-2">
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

      <div class="group-3">
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

      <div class="group-4">
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

      <div class="group-5">
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

      <div class="group-6">
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
        </div>

        <div class="group-7">
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
        </div>

        <div class="group-8">
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
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TennisPlayerMale from './../components/icons/tennis-player-male'
import TennisPlayerFemale from './../components/icons/tennis-player-female'

export default Vue.extend({
  name: 'Home',

  components: {
    TennisPlayerMale,
    TennisPlayerFemale
  },

  data() {
    return {
      e6: 1,
      // Group 1
      civilities: ['Mme', 'M'],
      civilityGroup: 'Mme',
      lastname: '',
      firstname: '',
      menu: false,
      dateOfBirth: null,
      nationality: '',

      postalAddress: '',
      postalCode: null,
      city: '',
      country: '',
      phone: '',
      email: '',
      pictureAllowed: false,
      informationsEmailAllowed: false,
      informationsSmsAllowed: false,
      partnersAllowed: false,
      bookingConfirmAllowed: false,
      pass92Allowed: false,
      proofPaymentAllowed: false,
      alreadyLicenced: false,
      lisence: '',
      sportYear: null,
      clubLisenced: null,
      homeCheck: false,
      studientCheck: false,
      studientCheckFile: null,
      proofResidence: null,
      medicalCertificate: null,
    }
  },

  computed: {
    homeResult() {
      return this.homeCheck ? 'Oui' : 'Non';
    }
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
    }
  },

  methods: {
    // Group 1
    save(date) {
      this.$refs.menu.save(date);
    },
  }
});
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

