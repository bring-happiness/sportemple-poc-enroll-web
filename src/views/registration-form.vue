<template>
  <div class="main-container">
    <v-container>

      <v-row no-gutters>
        <v-col
            lg="8"
            offset-lg="2"
        >
          <v-stepper
              v-model="step"
              vertical
          >
            <v-stepper-step
                step="1"
                :complete="step > 1"
                :color="step > 1 ? 'success' : 'primary'"
                editable
                edit-icon="mdi-account"
                :rules="persoInfoRules"
            >
              Informations personnelles
            </v-stepper-step>

            <v-stepper-content step="1">

              <v-col>
                <v-form
                    ref="form-personal-infos"
                    lazy-validation
                >
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
                      :rules="lastnameRules"
                      label="Nom de famille"
                      placeholder="Federer"
                      outlined
                  ></v-text-field>

                  Prénom
                  <v-text-field
                      v-model="firstname"
                      :rules="firstnameRules"
                      label="Prénom"
                      placeholder="Roger"
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
                          :rules="dateOfBirthRules"
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
                      :rules="nationalityRules"
                      label="Nationalité"
                      placeholder="Française"
                      outlined
                  ></v-text-field>

                  <v-btn
                      @click="goToNextPersonalInfos"
                      color="primary"
                  >
                    Suivant
                  </v-btn>
                </v-form>
              </v-col>
            </v-stepper-content>

            <v-stepper-step
                step="2"
                :complete="step > 2"
                :editable="step > 2"
                :color="step > 2 ? 'success' : 'primary'"
                edit-icon="mdi-map-marker-radius"
            >
              <!-- :rules="locationRules" -->
              Localisation
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-col>
                <v-form
                    ref="form-location"
                    lazy-validation
                >
                  Adresse postale
                  <v-text-field
                      v-model="postalAddress"
                      :rules="postalAdressRules"
                      label="Adresse postale"
                      placeholder="5 rue Victor Hugo"
                      outlined
                  ></v-text-field>

                  Code postal
                  <v-text-field
                      v-model="postalCode"
                      :rules="postalCodeRules"
                      label="Code postal"
                      placeholder="75001"
                      outlined
                  ></v-text-field>

                  Ville
                  <v-text-field
                      v-model="city"
                      :rules="cityRules"
                      label="Ville"
                      placeholder="Paris"
                      outlined
                  ></v-text-field>

                  <transition name="fade">
                    <div
                        v-if="$vuetify.breakpoint.mobile && residenceShowCamera"
                        class="webcam-app d-flex flex-column"
                    >

                      <v-alert
                          color="pink"
                          dark
                          icon="mdi-newspaper-variant-outline"
                          class="camera-file-title"
                          border="top"
                      >
                        Justificatif de domicile
                      </v-alert>

                      <web-cam
                          ref="webcam-residence"
                          @new-picture="onResidenceNewPicture"
                          class="web-cam-full-screen">
                      </web-cam>

                      <v-bottom-navigation
                          :value="bottomNavResidence"
                          color="primary"
                          class="mt-auto"
                      >
                        <v-btn
                            @click="residenceShowCamera = false"
                            value="exit"
                        >
                          <span>Quitter</span>

                          <v-icon>mdi-arrow-left</v-icon>
                        </v-btn>

                        <v-btn
                            @click="$refs['webcam-residence'].snap()"
                            value="snap"
                        >
                          <span>Prendre une photo</span>

                          <v-icon>mdi-camera</v-icon>
                        </v-btn>

                        <v-btn
                            @click="$refs['webcam-residence'].flip()"
                            value="flip"
                        >
                          <span>Tourner</span>

                          <v-icon>mdi-shape-circle-plus</v-icon>
                        </v-btn>
                      </v-bottom-navigation>
                    </div>
                  </transition>

                  <template
                      v-if="homeCheck"
                  >
                    Justificatif de domicile
                    <v-file-input
                        v-model="proofResidence"
                        :rules="proofResidenceRules"
                        outlined
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

                      <template
                          v-slot:append-outer
                          v-if="$vuetify.breakpoint.mobile"
                      >

                        <v-btn
                            @click="residenceShowCamera = true"
                            fab
                            dark
                            color="pink"
                            class="btn-camera"
                        >
                          <v-icon dark>
                            mdi-camera
                          </v-icon>
                        </v-btn>
                      </template>

                    </v-file-input>
                  </template>

                  <v-btn
                      color="primary"
                      @click="goToNextLocation"
                  >
                    Suivant
                  </v-btn>
                  <v-btn
                      @click="step = 1"
                      text>
                    Précédent
                  </v-btn>
                </v-form>
              </v-col>
            </v-stepper-content>

            <v-stepper-step
                step="3"
                :complete="step > 3"
                :editable="step > 3"
                :color="step > 3 ? 'success' : 'primary'"
                edit-icon="mdi-email"

            >
              <!-- :rules="communicationRules" -->
              Coordonnées
            </v-stepper-step>

            <v-stepper-content step="3">
              <v-col>
                <v-form
                    ref="form-communication"
                    lazy-validation
                >

                  <v-text-field
                      v-model="phone"
                      label="Téléphone"
                      placeholder="0612345678"
                      prepend-icon="mdi-phone"
                      outlined
                  ></v-text-field>

                  <div class="input-field-toggle mb-4">
                    <v-switch
                        v-model="informationsSmsAllowed"
                        label="J'accepte de recevoir des informations ou demandes de renseignements par SMS"
                        class="switch"
                        inset
                    ></v-switch>
                  </div>

                  <div>
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Adresse email"
                        placeholder="roger@federer.com"
                        prepend-icon="mdi-email"
                        outlined
                    ></v-text-field>

                    <div class="input-field-toggle">
                      <v-switch
                          v-model="informationsEmailAllowed"
                          class="switch"
                          label="J'accepte de recevoir des informations ou demandes de renseignements par email"
                          inset
                      ></v-switch>
                    </div>
                  </div>

                  <v-btn
                      color="primary"
                      @click="goToNextCommunication"
                  >
                    Suivant
                  </v-btn>
                  <v-btn
                      @click="step = 2"
                      text>
                    Précédent
                  </v-btn>
                </v-form>
              </v-col>
            </v-stepper-content>

            <v-stepper-step
                step="4"
                :complete="step > 4"
                :editable="step > 4"
                :color="step > 4 ? 'success' : 'primary'"
                edit-icon="mdi-progress-question"

            >
              Consentements
              <!-- :rules="consentmentRules" -->
            </v-stepper-step>

            <v-stepper-content step="4">

              <v-col>

                <v-switch
                    v-model="partnersAllowed"
                    label="J'accepte d'être contacté pour devenir partenaire de jeu"
                    inset
                ></v-switch>

                <v-switch
                    v-model="bookingConfirmAllowed"
                    label="J'accepte de recevoir les confirmations de réservation par email"
                    inset
                ></v-switch>

                <v-switch
                    v-model="pass92Allowed"
                    label="Je bénéficie d'un PASS 92"
                    inset
                ></v-switch>

                <v-switch
                    v-model="proofPaymentAllowed"
                    label="Je souhaite un justificatif de paiement"
                    inset
                ></v-switch>
              </v-col>

              <v-btn
                  color="primary"
                  @click="step = 5"
              >
                Suivant
              </v-btn>
              <v-btn
                  @click="step = 3"
                  text
              >
                Précédent
              </v-btn>
            </v-stepper-content>

            <v-stepper-step
                step="5"
                :complete="step > 5"
                :editable="step > 5"
                :color="step > 5 ? 'success' : 'primary'"
                edit-icon="mdi-newspaper-variant-outline"

            >
              <!-- :rules="doubleAdhesionRules" -->
              Double adhésion
            </v-stepper-step>

            <v-stepper-content step="5">

              <v-col>
                <v-form
                    ref="form-double-adhesion"
                    lazy-validation
                >
                  Êtes vous licencié dans un <u>autre</u> club ?
                  <v-radio-group
                      v-model="alreadyLicenced"
                  >
                    <v-radio
                        label="Oui"
                        value="Oui"
                    ></v-radio>

                    <v-radio
                        label="Non"
                        value="Non"
                    ></v-radio>
                  </v-radio-group>

                  <div
                      v-if="alreadyLicenced === 'Oui'"
                  >
                    N° de licence
                    <v-text-field
                        v-model="lisence"
                        :rules="[v => !!v || 'Numéro de licence requis']"
                        label="Licence"
                        placeholder="1234567Z"
                        outlined
                    ></v-text-field>

                    Année sportive
                    <v-text-field
                        v-model="sportYear"
                        :rules="[v => (v && v.length === 4) || 'Année sportive requise']"
                        label="Année sportive"
                        placeholder="2021"
                        outlined
                    ></v-text-field>

                    Auprès de quel club
                    <v-text-field
                        v-model="clubLisenced"
                        :rules="[v => !!v || 'Club actuel requis']"
                        label="Auprès de quel club"
                        placeholder="T.C Démo"
                        outlined
                    ></v-text-field>
                  </div>

                  <v-btn
                      color="primary"
                      @click="goToNextDoubleAdhesion"
                  >
                    Suivant
                  </v-btn>
                  <v-btn
                      @click="step = 4"
                      text
                  >
                    Précédent
                  </v-btn>
                </v-form>
              </v-col>

            </v-stepper-content>

            <v-stepper-step
                step="6"
                :complete="step > 6"
                :editable="step > 6"
                :color="step > 6 ? 'success' : 'primary'"
                edit-icon="mdi-account"

            >
              <!-- :rules="studentRules" -->
              Étudiant
            </v-stepper-step>

            <v-stepper-content step="6">

              <v-col>

                <v-form
                    ref="form-student"
                    lazy-validation
                >

                  <div>

                    Êtes vous étudiant ?
                    <v-radio-group
                        v-model="isStudent"
                    >
                      <v-radio
                          label="Oui"
                          value="Oui"
                      ></v-radio>

                      <v-radio
                          label="Non"
                          value="Non"
                      ></v-radio>
                    </v-radio-group>

                    <transition name="fade">
                      <div
                          v-if="$vuetify.breakpoint.mobile && studentShowCamera"
                          class="webcam-app d-flex flex-column"
                      >

                        <v-alert
                            color="pink"
                            dark
                            icon="mdi-newspaper-variant-outline"
                            class="camera-file-title"
                            border="top"
                        >
                          Justificatif étudiant de l'année en cours
                        </v-alert>

                        <web-cam
                            ref="webcam-student"
                            @new-picture="onStudentNewPicture"
                            class="web-cam-full-screen">
                        </web-cam>

                        <v-bottom-navigation
                            :value="bottomNavStudent"
                            color="primary"
                            class="mt-auto"
                        >
                          <v-btn
                              @click="studentShowCamera = false"
                              value="exit"
                          >
                            <span>Quitter</span>

                            <v-icon>mdi-arrow-left</v-icon>
                          </v-btn>

                          <v-btn
                              @click="$refs['webcam-student'].snap()"
                              value="snap"
                          >
                            <span>Prendre une photo</span>

                            <v-icon>mdi-camera</v-icon>
                          </v-btn>

                          <v-btn
                              @click="$refs['webcam-student'].flip()"
                              value="flip"
                          >
                            <span>Tourner</span>

                            <v-icon>mdi-shape-circle-plus</v-icon>
                          </v-btn>
                        </v-bottom-navigation>
                      </div>
                    </transition>

                    <v-file-input
                        v-if="isStudent === 'Oui'"
                        v-model="studentFile"
                        :rules="[v => !!v || 'Fichier requis']"
                        outlined
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

                      <template
                          v-slot:append-outer
                          v-if="$vuetify.breakpoint.mobile"
                      >

                        <v-btn
                            @click="studentShowCamera = true"
                            fab
                            dark
                            color="pink"
                            class="btn-camera"
                        >
                          <v-icon dark>
                            mdi-camera
                          </v-icon>
                        </v-btn>
                      </template>

                    </v-file-input>
                  </div>
                </v-form>
              </v-col>

              <v-btn
                  color="primary"
                  @click="goToNextStudent"
              >
                Suivant
              </v-btn>
              <v-btn text
                     @click="step = 5"
              >
                Précédent
              </v-btn>
            </v-stepper-content>

            <v-stepper-step
                step="7"
                :complete="step > 7"
                :editable="step > 7"
                :color="step > 7 ? 'success' : 'primary'"
                edit-icon="mdi-newspaper-variant"

            >
              <!-- :rules="medicalRules" -->
              Certificat médical
            </v-stepper-step>

            <v-stepper-content step="7">

              <transition name="fade">
                <div
                    v-if="$vuetify.breakpoint.mobile && medicalCertificateShowCamera"
                    class="webcam-app d-flex flex-column"
                >

                  <v-alert
                      color="pink"
                      dark
                      icon="mdi-newspaper-variant-outline"
                      style="margin-bottom: -37px;"
                      class="camera-file-title"
                      border="top"
                  >
                    Certificat médical de <u>moins de 3 mois</u>.
                    <br>
                    Il doit préciser la pratique du sport en compétition
                  </v-alert>

                  <web-cam
                      ref="webcam-medical"
                      @new-picture="onMedicalCertificateNewPicture"
                      class="web-cam-full-screen">
                  </web-cam>

                  <v-bottom-navigation
                      :value="bottomNavMedicalCertificate"
                      color="primary"
                      class="mt-auto"
                  >
                    <v-btn
                        @click="medicalCertificateShowCamera = false"
                        value="exit"
                    >
                      <span>Quitter</span>

                      <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>

                    <v-btn
                        @click="$refs['webcam-medical'].snap()"
                        value="snap"
                    >
                      <span>Prendre une photo</span>

                      <v-icon>mdi-camera</v-icon>
                    </v-btn>

                    <v-btn
                        @click="$refs['webcam-medical'].flip()"
                        value="flip"
                    >
                      <span>Tourner</span>

                      <v-icon>mdi-shape-circle-plus</v-icon>
                    </v-btn>
                  </v-bottom-navigation>
                </div>
              </transition>

              <v-col>
                <v-form
                    ref="form-medical-certificate"
                >
                  <div class="mb-2">
                    Certificat médical de <u>moins de 3 mois</u>.
                    <br>
                    Il doit préciser la pratique du sport en compétition
                  </div>

                  <v-file-input
                      v-model="medicalCertificate"
                      :rules="[v => !!v || 'Fichier requis']"
                      outlined
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

                    <template
                        v-slot:append-outer
                        v-if="$vuetify.breakpoint.mobile"
                    >

                      <v-btn
                          @click="medicalCertificateShowCamera = true"
                          fab
                          dark
                          color="pink"
                          class="btn-camera"
                      >
                        <v-icon dark>
                          mdi-camera
                        </v-icon>
                      </v-btn>
                    </template>

                  </v-file-input>

                  <v-btn
                      color="primary"
                      @click="goToNextMedicalCertificate"
                      :loading="isLoadingGoPay"
                  >
                    Finaliser l'inscription
                  </v-btn>
                  <v-btn
                      @click="step = 6"
                      text
                  >
                    Précédent
                  </v-btn>
                </v-form>
              </v-col>

            </v-stepper-content>

          </v-stepper>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TennisPlayerMale from './../components/icons/tennis-player-male'
import TennisPlayerFemale from './../components/icons/tennis-player-female'
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js";
import WebCam from "@/components/web-cam.vue";

export default Vue.extend({
  name: 'Home',

  components: {
    TennisPlayerMale,
    TennisPlayerFemale,
    WebCam
  },

  data() {
    return {
      step: 1,
      isLoadingGoPay: false,

      residenceShowCamera: false,
      bottomNavResidence: 'snap',

      studentShowCamera: false,
      bottomNavStudent: 'snap',

      medicalCertificateShowCamera: false,
      bottomNavMedicalCertificate: 'snap',

      // Step 1
      personalInfosValid: true,
      showPersonalInfoRules: false,
      civilities: ['Mme', 'M'],
      civilityGroup: 'Mme',
      lastname: '',
      lastnameRules: [
        v => !!v || 'Nom requis'
      ],
      firstname: '',
      firstnameRules: [
        v => !!v || 'Prénom requis'
      ],
      menu: false,
      dateOfBirth: null,
      dateOfBirthRules: [
        v => !!v || 'Date de naissance requise'
      ],
      nationality: '',
      nationalityRules: [
        v => !!v || 'Nationalité requise'
      ],

      showLocationRules: false,
      postalAddress: '',
      postalAdressRules: [
        v => !!v || 'Adresse requise'
      ],
      postalCode: null,
      postalCodeRules: [
        v => (v && v.length === 5) || 'Code postal invalide'
      ],
      city: '',
      cityRules: [
        v => !!v || 'Ville requise'
      ],

      showCommunicationRules: false,
      phone: '',
      email: '',
      emailRules: [
        v => !!v || 'Courriel requis',
        v => /.+@.+\..+/.test(v) || 'Courriel doit être valide',
      ],
      pictureAllowed: false,
      informationsEmailAllowed: true,
      informationsSmsAllowed: true,
      partnersAllowed: true,
      bookingConfirmAllowed: true,
      pass92Allowed: false,
      proofPaymentAllowed: true,

      showDoubleAdhesionRules: false,
      alreadyLicenced: null,
      lisence: '',
      sportYear: null,
      clubLisenced: null,

      showStudentRules: false,
      isStudent: null,
      studentFile: null,
      proofResidence: null,
      proofResidenceRules: [
        v => !!v || 'Fichier requis'
      ],
      medicalCertificate: null,
    }
  },

  computed: {
    homeCheck() {
      return this.postalCode === '92110' // todo : put in .env file
    },
    persoInfoRules() {
      return [() => {
        return !this.showPersonalInfoRules || (this.civilities.includes(this.civilityGroup) && this.lastname.length > 0
            && this.firstname.length > 0 && this.dateOfBirth !== null
            && this.nationality.length > 0)
      }];
    },
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
    },
    postalCode(val) {
      this.city = val === '92110' ? 'Clichy' : '';
    },
    alreadyLicenced(val) {
      if (val === 'Non') this.step++;
    },
    isStudent(val) {
      if (val === 'Non') this.step++;
    }
  },

  methods: {
    // Group 1
    save(date) {
      this.$refs.menu.save(date);
    },

    goToNextPersonalInfos() {
      const value = this.$refs['form-personal-infos'].validate();

      if (!value) {
        this.showPersonalInfoRules = true;
        return;
      }

      this.step = 2;
    },

    goToNextLocation() {
      const value = this.$refs['form-location'].validate();

      if (!value) {
        this.showLocationRules = true;
        return;
      }

      this.step = 3;
    },

    goToNextCommunication() {
      const value = this.$refs['form-communication'].validate();

      if (!value) {
        this.showCommunicationRules = true;
        return;
      }

      this.step = 4;
    },

    goToNextDoubleAdhesion() {
      const value = this.$refs['form-double-adhesion'].validate();

      if (!value) {
        this.showDoubleAdhesionRules = true;
        return;
      }

      this.step = 6;
    },

    goToNextStudent() {
      const value = this.$refs['form-student'].validate();

      if (!value) {
        this.showStudentRules = true;
        return;
      }

      this.step = 7;
    },

    goToNextMedicalCertificate() {
      const value = this.$refs['form-medical-certificate'].validate();

      if (!value) {
        this.showMedicalCertificate = true;
        return;
      }

      this.goPay();
    },

    async onResidenceNewPicture(pictureUrl) {
      const res = await fetch(pictureUrl);
      const blob = await res.blob();

      this.proofResidence = new File([blob], 'residence.png', {type: 'image/png'})
      this.residenceShowCamera = false;
    },

    async onStudentNewPicture(pictureUrl) {
      const res = await fetch(pictureUrl);
      const blob = await res.blob();

      this.studentFile = new File([blob], 'student.png', {type: 'image/png'})
      this.studentShowCamera = false;
    },

    async onMedicalCertificateNewPicture(pictureUrl) {
      const res = await fetch(pictureUrl);
      const blob = await res.blob();

      this.medicalCertificate = new File([blob], 'student.png', {type: 'image/png'})
      this.medicalCertificateShowCamera = false;
    },

    async goPay() {
      this.isLoadingGoPay = true;

      const formData = new FormData();

      formData.append('civility', this.civilityGroup);
      formData.append('lastname', this.lastname);
      formData.append('firstname', this.firstname);
      formData.append('dateOfBirth', this.dateOfBirth);
      formData.append('nationality', this.nationality);
      formData.append('postalAddress', this.postalAddress);
      formData.append('postalCode', this.postalCode);
      formData.append('city', this.city);

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

      formData.append('isStudent', this.isStudent);
      formData.append('studentFile', this.studentFile);

      formData.append('proofResidence', this.proofResidence);
      formData.append('medicalCertificate', this.medicalCertificate);

      const registration = (await axios.post(`${process.env.VUE_APP_SPORTEMPLE_ENROLL_API}/center/registration`, formData)).data;

      const stripe = await loadStripe('pk_test_51IaJpyJBgPLSInDKWuAF12GVj5wlIGLypDG6HbN2XDWvlS5g2n9F2mIaZ0v1WB8RtPnYZYkhaY0ZdLq7vkeGgme300wELrLqus');

      await stripe.redirectToCheckout({
        sessionId: registration.stripeSessionId
      });

      this.isLoadingGoPay = false;
    }
  }
});
</script>

<style>
.input-field-toggle {
  margin-top: -20px;
  margin-left: 37px;
}

.input-field-toggle .switch {
  margin-top: 4px;
}

.main-container {
  background: rgba(33, 150, 243, 0.2);
}

.webcam-app {
  z-index: 90000;
  position: fixed;
  height: calc(100% - 56px);
  background: rgba(33, 150, 243, 0.7);;
  top: 56px;
  width: 100%;
  left: 0;
}

.web-cam-full-screen video {
  position: absolute;
  height: 100%;
  width: 100%;
}

.btn-camera {
  margin-top: -17px;
}

.camera-file-title {
  margin-top: 7px;
}

</style>

