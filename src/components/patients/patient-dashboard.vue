<template>
  <div style=";width: 100%">
    <div class="ma-2 mb-4 font-weight-medium" style="font-size:1.5rem">Tus Pacientes</div>
    <v-sheet color="white" elevation="1" height="100%" rounded width="100%">
      <v-row align="center" justify="center">
        <v-col class="d-flex flex-wrap">
          <v-card class="mx-auto mb-10 pb-3 justify-center" width="280" v-for="patient in patients"
                  :key="patient">
            <v-col align="center">
              <v-avatar class="mt-4" width="100" height="100">
                <img :src="patient.img"></v-avatar>
            </v-col>
            <v-card-title class="justify-center font-weight-bold text-lg-body-1">{{ patient.lastName }} {{ patient.firstName }}</v-card-title>
            <v-card-subtitle class="text-center" style="font-size:1rem">{{ patient.date }}
            </v-card-subtitle>
            <v-card-text class="text-center" style="color: black">{{ patient.email }}</v-card-text>
            <v-card-actions>
              <v-btn  @click="redirectTo(psychologistId, patient.id.toString())" color="primary" class="light-blue--text" text>LogBook</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import AppointmentApiService from "../../core/services/appointments-api.service"
export default {
  name: "patientDBs",

  data: () => ({
    id: '',
    lastName: '',
    firstName: '',
    email: '',
    date: '',
    img: '',
    patients: [],
    psychologistId: '',
  }),
  async created() {
    this.psychologistId = this.$route.params.id;
    try {
      const response = await AppointmentApiService.getPatientsByPsychologistId(this.psychologistId);
      this.patients = response.data;
    }
    catch (e)
    {
      console.error(e);
    }
  },
  methods: {
    redirectTo(psychoId, patientId) {
      this.$router.push({name: 'psychologist-logbook', params:{psycho_id: psychoId, patient_id: patientId}});
      console.log(this.psychologistId);
    }
  },

}
</script>

<style scoped>
.circular_image {
  border-radius: 50%;
}
</style>