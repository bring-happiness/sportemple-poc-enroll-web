<template>
  <div>
    <video id="webcam" autoplay playsinline width="450" height="380"></video>
    <canvas id="canvas" class="d-none"></canvas>

    <v-btn @click="takeSnapshot">Prendre une photo</v-btn>
    <v-btn @click="flip">Passer à l'autre caméra</v-btn>

    <a :href="pictureHref">aa</a>
  </div>
</template>

<script>
import Vue from 'vue';
import Webcam from 'webcam-easy'

export default Vue.extend({
  name: 'WebCam',
  mounted() {
    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');
    const snapSoundElement = document.getElementById('snapSound');
    this.webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);

    this.webcam.start()
        .then(result => {
          console.log("webcam started");
        })
        .catch(err => {
          console.log(err);
        });
  },

  data: () => {
    return {
      webcam: null,
      pictureHref: null
    }
  },
  methods: {
    takeSnapshot() {
      this.pictureHref = this.webcam.snap();
    },
    flip() {
      this.webcam.flip();
    }
  }
});
</script>
