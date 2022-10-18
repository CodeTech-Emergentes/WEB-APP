<template>
  <div style="width: 100%; height: 100%">
    <v-card class="mt-10" style="width:100%">
      <v-divider vertical></v-divider>
      <h2 class="ml-9 mb-5">Appointments</h2>
      <v-row v-for="appointment in appointments" :key="appointment">
        <v-col cols="10">
          <v-card class="mr-8 ml-8" color=#03A9F4>
            <v-card-text class="white--text" style="display: flex">
              <v-col cols="10">
                <h3 class="ml-4">
                  <v-icon color="white">mdi-calendar-range</v-icon>
                  Date Scheduled at: {{ appointment.scheduleDate.slice(0, 19).replace('T', ' ')}}
                </h3>
              </v-col>
              <v-col cols="2">
                <h3 class="ml-4 mr-auto">
                  <v-icon class="ml-auto" color="white">mdi-account</v-icon>
                  Patient: {{getPatientName(appointment.patientId)}}</h3>
              </v-col>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="2" class="align-content-center" style="display: grid">
          <v-btn class="mr-6" @click="patientDialog(appointment.patientId, appointment.id)">Details</v-btn>
        </v-col>
      </v-row>
    </v-card>
    <template>
      <!--DIALOG INFO PSICOLOGO SELECCIONADO-->
      <v-dialog v-model="dialogInfo" width="400" v-if="selectedAppointment!=null">
        <v-card>
          <v-card-actions class="justify-end">
            <v-icon @click="closeDialog">mdi-close</v-icon>
          </v-card-actions>
          <v-col align="center">
            <v-avatar width="100" height="100">
              <v-img :src="selectedAppointment.img"></v-img>
            </v-avatar>
          </v-col>
          <v-card-title class="justify-center mb-2">{{ selectedAppointment.firstName + " " + selectedAppointment.lastName }}</v-card-title>
          <v-card-subtitle class="text-center">{{ selectedAppointment.phone }}</v-card-subtitle>
          <v-card-text class="text-justify font-weight-black">{{ selectedAppointment.email }}</v-card-text>
          <v-card-text v-if="flagUrl === true">Enter the url</v-card-text>
          <v-text-field v-if="flagUrl === true" class="mr-4 ml-4" background-color="white" outlined dense color="black" v-model="url"></v-text-field>
          <v-btn class="ml-5" v-if="flagUrl === true" @click="updateUrl()">Save</v-btn>
          <v-card-actions class="justify-center">
            <v-btn @click="setUrlFields" >Join</v-btn>
            <v-btn @click="closeDialog()">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--Fin del Dialog-->
    </template>

  </div>
</template>

<script>

import AppointmentApiService from '../../core/services/appointments-api.service'
import PatientApiService from '../../core/services/patient-api-service'

export default {
  name: "appointments-psycho",
  data: () => ({
    url: '',
    appointments: [],
    dialogPayment:false,
    patients: [],
    userId: "",
    dialogInfo: false,
    dialog: false,
    selectedAppointment: null,
    deleteAppointment: null,
    appointmentId: 0,
    flagUrl: false,
  }),

  async created() {
    this.userId = this.$route.params.id;
    const responsePatient = await PatientApiService.getAll();
    this.patients = responsePatient.data;
    await this.retrieveAppointments();
    console.log(this.dialogInfo)
  },

  methods: {
    getPatientName(id) {
      const patient = this.patients.find(patient => patient.id === id);
      return patient.firstName + " " + patient.lastName;
    },

    async patientDialog(patientId, idAppointment){
      this.appointmentId = idAppointment;
      const response = await PatientApiService.getById(patientId);
      this.selectedAppointment = response.data;
      this.dialogInfo = true;
    },

    openCancelDialog(){
      this.dialog = true;
    },

    closeDialog(){
      this.dialogInfo = false;
    },

    async updateUrl(){
      const response = await AppointmentApiService.getAppointmentId(this.appointmentId);
      let dataAppointment = response.data;
      console.log(response.data);
      let addUrl = {
        psychoNotes: this.url,
        scheduleDate: dataAppointment.scheduleDate,
        createdAt: dataAppointment.createdAt,
        motive: dataAppointment.motive,
        personalHistory: dataAppointment.personalHistory,
        testRealized: dataAppointment.testRealized,
        treatment: dataAppointment.treatment,
      };
      await AppointmentApiService.updateAppointment(dataAppointment.id, addUrl);
      this.flagUrl = false;
    },

    setUrlFields(){
      this.flagUrl = true;
      window.open("https://meet.google.com/new");
      // window.location.href = "https://meet.google.com/new";
    },

    async retrieveAppointments(){
      const response = await AppointmentApiService.getAppointmentsByPsychologistId(this.userId);
      this.appointments = response.data;
    },

    async cancelAppointment(appointmentId){
      await AppointmentApiService.deleteAppointment(appointmentId);
      const response = await AppointmentApiService.getAppointmentsByPsychologistId(this.userId);
      this.appointments = response.data;
      this.dialog = false;
      this.dialogInfo = false;
      alert("Canceled Appointment")
    },
  },
}
</script>


<style scoped>

</style>