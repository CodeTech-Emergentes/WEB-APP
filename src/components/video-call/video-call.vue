<template>
  <div>
    <video ref="camera" :width="500" :height="600" autoplay></video>

    <v-btn type="button" class="button is-rounded" :class="{ 'is-primary' : !isCameraOpen, 'is-danger' : isCameraOpen}" @click="toggleCamera">
      <span v-if="!isCameraOpen">Open Camera</span>
      <span v-else>Close Camera</span>
    </v-btn>

  </div>
</template>


<script>
export default {
  name: "video-call",
  data() {
    return {
      isCameraOpen: false
    }
  },
  methods: {
    toggleCamera() {
      if(this.isCameraOpen) {
        this.isCameraOpen = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },

    createCameraElement() {
      const constraints = (window.constraints = {
        audio: true,
        video: true
      });

      navigator.mediaDevices
          .getUserMedia(constraints)
          .then(stream => {
            this.$refs.camera.srcObject = stream;
            this.$refs.audio.srcObject = stream;
          })
    },
    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();

      tracks.forEach(track => {
        track.stop();
      });
    }
  }
}
</script>

<style scoped>

</style>