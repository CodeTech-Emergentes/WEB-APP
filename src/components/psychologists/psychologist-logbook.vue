<template>
  <div class="fullClass">
    <v-sheet class="mt-4 ml-7 mr-7 fullClass" color=#03A9F4 rounded>
      <v-row>
        <v-col cols="2">
          <v-card rounded class="ml-4" color=8BC6CD>
            <h2 class="Center">{{patientData.firstName}}</h2>
          </v-card>
          <img alt="profileImage" class="mt-2 ml-4" width="95%" height="135vw" :src="patientData.img">
        </v-col>
        <v-col cols="10">
          <v-sheet rounded class="mr-4">
            <h2 class="ml-4 font-weight-regular">Identification Data</h2>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="6">
                <h4 class="ml-4 mt-3">Name: {{patientData.firstName + " " + patientData.lastName}}</h4>
                <h4 class="ml-4 mt-2">Age: {{dateNow()}}</h4>
                <h4 class="ml-4 mt-2">Birth Date: {{birthDatePatient()}}</h4>
                <h4 class="ml-4 mt-2">Marital Status: {{patientData.state}}</h4>
              </v-col>
              <v-col cols="6">
                <h4 class="ml-4 mt-3">Email: {{patientData.email}}</h4>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card rounded class="ml-7 mr-7 mb-5">
            <v-row>
              <v-col cols="3">
                <h1  class="font-weight-regular Center mb-3">Appointments</h1>
                <div>
                  <v-card height="5vh" v-for="appointment in appointments" :key="appointment"
                          hover class="mr-auto ml-auto mb-5 cardCenter" color=#03A9F4  width="50%" rounded>
                    <h3 @click="retrieveAppointmentInfo(appointment.id)" class="Center white--text">{{dateSplitter(appointment.scheduleDate)}}</h3>
                  </v-card>
                </div>
              </v-col>
              <v-col cols="9">
                  <v-card class="mr-8 mt-5" color=#03A9F4>
                    <v-divider inset vertical></v-divider>
                    <h3 class="ml-5 font-weight-regular white--text">{{dateSplitter(dateAppointment)}}</h3>

                    <v-card class="ml-5 mr-5 mb-8 mt-8">
                      <v-row>
                        <v-col cols="3">
                          <h4 class="ml-8 font-weight-regular">Reason for consultation :</h4>
                        </v-col>
                        <v-col cols="9">
                          <h4 class="ml-5 font-weight-regular">{{motive}}</h4>
                        </v-col>
                      </v-row>
                    </v-card>

                    <v-card class="ml-5 mr-5 mb-8">
                      <v-row>
                        <v-col cols="3">
                          <h4 class="ml-8 font-weight-regular">Personal History: </h4>
                        </v-col>
                        <v-col cols="9">
                          <h4 class="ml-5 font-weight-regular">{{personalHistory}}</h4>
                        </v-col>
                      </v-row>
                    </v-card>

                    <v-card class="ml-5 mr-5 mb-8">
                      <v-row>
                        <v-col cols="3">
                          <h4 class="ml-8 font-weight-regular">Test Performed: </h4>
                        </v-col>
                        <v-col cols="9">
                          <h4 class="ml-5 font-weight-regular">{{testRealized}}</h4>
                        </v-col>
                      </v-row>
                    </v-card>

                    <v-card class="ml-5 mr-5 mb-5">
                      <v-row>
                        <v-col cols="3">
                          <h4 class="ml-8 font-weight-regular">Treatment: </h4>
                        </v-col>
                        <v-col cols="9">
                          <h4 class="ml-5 font-weight-regular">{{treatment}}</h4>
                        </v-col>
                      </v-row>
                    </v-card>

                    <v-divider inset vertical></v-divider>
                  </v-card>
              </v-col>
            </v-row>
            <v-col class="End">
              <v-btn color=#03A9F4 class="mr-5 btnCol white--text" @click="editDialog(dataAppointment)"> Edit </v-btn>
            </v-col>

            <template>
              <!--DIALOG INFO Psychologist selected-->
              <v-dialog v-model="dialog" width="600" v-if="actualSession!=null" persistent>
                <v-card color=#03A9F4>
                  <v-form>
                    <v-card-title class="justify-start">
                      <span class="ml-5 white--text">Observations</span>
                      <v-spacer></v-spacer>
                      <v-menu bottom left>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn color="white" class="mr-5" @click="cancelDialog()" icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </template>
                      </v-menu>
                    </v-card-title>
                    <v-card elevation="0" class="mr-5 ml-5">
                      <v-divider inset vertical></v-divider>
                      <v-text-field clearable class="ml-10 mr-10" v-model="motiveForm" label="Consultation Reason"></v-text-field>
                      <v-text-field clearable class="mt-5 ml-10 mr-10" v-model="personalHistoryForm" label="Personal History"></v-text-field>
                      <v-text-field clearable class="mt-5 ml-10 mr-10" v-model="testRealizedForm" label="Test Performed"></v-text-field>
                      <v-text-field clearable class="mt-5 ml-10 mr-10" v-model="treatmentForm" label="Personal History"></v-text-field>
                    </v-card>
                  </v-form>
                  <v-card-actions class="mt-2 justify-end">
                    <v-btn @click="editDialog()">Cancel</v-btn>
                    <v-btn class="mr-5" @click="saveDialog()">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!--Fin del Dialog-->
            </template>

          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import AppointmentApiService from "../../core/services/appointments-api.service"
import PatientApiService from "../../core/services/patient-api-service"

export default {
  name: "psychologist-logbook",
  data: () => ({
    appointments: [],
    patientData: [],
    motive: "",
    motiveForm: "",
    personalHistory: "",
    personalHistoryForm: "",
    testRealized: "",
    selectedAppointment: null,
    testRealizedForm: "",
    dateAppointment: "",
    treatment: "",
    treatmentForm: "",
    scheduleDate: "",
    patientId: 0,
    psychologistId: 0,
    actualSession: null,
    dialog: false,
    dataAppointment: {}
  }),

  async created() {
    this.patientId = this.$route.params.patient_id;
    this.psychologistId = this.$route.params.psycho_id;
    try {
      const responseAppointment = await AppointmentApiService.getAppointmentByPatientIdAndPsychologistId(this.patientId, this.psychologistId);
      const responsePatient = await PatientApiService.getById(this.patientId);
      this.appointments = responseAppointment.data;
      this.patientData = responsePatient.data;
    }
    catch (e)
    {
      console.error(e);
    }
  },

  methods: {
    async retrieveAppointmentInfo(appointmentId) {
      const appointmentSelected = await AppointmentApiService.getAppointmentId(appointmentId);
      this.dataAppointment = appointmentSelected.data;
      this.motive = this.dataAppointment.motive;
      this.personalHistory = this.dataAppointment.personalHistory;
      this.testRealized = this.dataAppointment.testRealized;
      this.treatment = this.dataAppointment.treatment;
      this.dateAppointment = this.dataAppointment.scheduleDate;
    },

    dateNow() {
      let rightNow = new Date();
      let date = rightNow.toISOString().slice(0,4);
      return date - this.patientData.date.slice(0,4);
    },

    birthDatePatient() {
      let date = this.patientData.date;
      return date.slice(0,10);
    },

    dateSplitter(dateSplit) {
      return dateSplit.slice(0,10);
    },

    editDialog(session){
      this.actualSession = session;
      this.motiveForm = this.motive;
      this.personalHistoryForm = this.personalHistory;
      this.testRealizedForm = this.testRealized;
      this.treatmentForm = this.treatment;
      this.dialog = true;
    },

    cancelDialog() {
      this.dialog = false;
    },

    saveDialog() {
      this.motive = this.motiveForm;
      this.personalHistory = this.personalHistoryForm;
      this.testRealized = this.testRealizedForm;
      this.treatment = this.treatmentForm;
      let requestAppointment = {
        id:this.dataAppointment.id,
        scheduleDate: this.dataAppointment.scheduleDate,
        motive: this.motiveForm,
        personalHistory: this.personalHistoryForm,
        testRealized: this.testRealizedForm,
        psychoNotes: "Notes",
        treatment: this.treatmentForm}
      AppointmentApiService.updateAppointment(this.dataAppointment.id, requestAppointment);
      this.dialog = false;
    }
  }
}
</script>

<style scoped>

.fullClass {
  height: 100%;
}

img {
  border-radius: 2%;
}

.Center {
  justify-items: center;
  display: grid;
}

.End {
  justify-items: end;
  display: grid;
}

.cardCenter {
  display: grid;
  align-content: center;
}

.btnCol {
  font-palette: light;
}

</style>