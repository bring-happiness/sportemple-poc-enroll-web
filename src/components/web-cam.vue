<template>
  <div>
    <video id="webcam" autoplay playsinline width="450" height="380"></video>
    <canvas id="canvas" class="d-none"></canvas>
  </div>
</template>

<script>
import Vue from 'vue';
import Webcam from 'webcam-easy'

export default Vue.extend({
  name: 'web-cam',
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
      webcam: null
    }
  },
  methods: {
    snap() {
      const pictureHref = this.webcam.snap();
      this.$emit('new-picture', pictureHref);
    },
    flip() {
      this.webcam.flip();
    }
  }
});
</script>
