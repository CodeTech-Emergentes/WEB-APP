<template>
  <div style="width: 100%; height: 100%">
    <v-card class="mt-10" style="width:100%">
      <v-divider vertical></v-divider>
      <h2 class="ml-9 mb-5">Appointments</h2>
      <v-row v-for="appointment in appointments" :key="appointment">
        <v-col cols="10">
          <v-card class="mr-8 ml-8" color=#03A9F4>
            <v-card-text class="white--text" style="display: flex">
              <v-col cols="9">
                <h3 class="ml-4">
                  <v-icon color="white">mdi-calendar-range</v-icon>
                  Date Scheduled at: {{ appointment.scheduleDate.slice(0, 19).replace('T', ' ')}}
                </h3>
              </v-col>
              <v-col cols="3">
                <h3 class="ml-4 mr-auto">
                  <v-icon class="ml-auto" color="white">mdi-account</v-icon>
                  Psychologist: {{getPsychologistName(appointment.psychoId)}}</h3>
              </v-col>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="2" class="align-content-center" style="display: grid">
          <v-btn class="mr-6" @click="psychologistDialog(appointment.psychoId, appointment.id)">Details</v-btn>
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
          <v-card-title class="justify-center">{{ selectedAppointment.name }}</v-card-title>
          <v-card-subtitle class="text-center">{{ selectedAppointment.phone }}</v-card-subtitle>
          <v-card-text class="text-justify">{{ selectedAppointment.email }}</v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="joinMeet">Join</v-btn>
            <v-btn @click="openReScheduleDialog(psychoId)">ReSchedule</v-btn>
            <v-btn @click="openCancelDialog()">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--Fin del Dialog-->
    </template>

    <template>
      <!--DIALOG CANCEL APPOINTMENT-->
      <v-dialog v-model="dialog" width="440">
        <v-card>
          <v-card-title class="justify-center">Do you want to cancel your appointment ?</v-card-title>
          <v-card-actions class="justify-center">
            <v-btn @click="cancelAppointment(appointmentId)">Yes</v-btn>
            <v-btn @click.stop="dialog=false">No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--Fin del Dialog-->
    </template>

    <template>
      <!--DIALOG RESCHEDULE-->
      <v-dialog v-model="dialogReSchedule" width="400" persistent>
        <v-card>
          <v-card-title class="justify-center">Elige un horario a tu preferencia</v-card-title>
          <v-card-subtitle class="text-center">Horarios disponibles</v-card-subtitle>
          <v-divider></v-divider>
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
                  outlined dense color="blue"
                  v-model="dateApp"
                  required
                  label="Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  @input="$v.dateApp.$touch()"
                  @blur="$v.dateApp.$touch()"
                  class="mr-4 ml-5"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="dateApp"
                :active-picker.sync="activePicker"
                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                min="2021-01-01"
                @change="save"
                class="mr-4 ml-5"
            ></v-date-picker>
          </v-menu>
          <v-row>
            <v-col cols="12" sm="6">
              <v-card class="ml-5" elevation="5">
                <v-card-subtitle class="text-center">Morning</v-card-subtitle>
                <v-chip-group active-class="primary--text" column class="ml-7">
                  <div v-for="schedule in schedules" :key="schedule" @click="scheduleDialog(schedule.time)">
                    <v-chip v-if="schedule.id < 6" >
                      {{ schedule.time }}
                    </v-chip>
                  </div>
                </v-chip-group>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card class="mr-5" elevation="5">
                <v-card-subtitle class="text-center">Evening</v-card-subtitle>
                <v-chip-group  active-class="primary--text" column class="ml-7">
                  <div v-for="schedule in schedules" :key="schedule" class="align-center" @click="scheduleDialog(schedule.time)">
                    <v-chip  v-if="schedule.id >= 6">
                      {{ schedule.time }}
                    </v-chip>
                  </div>
                </v-chip-group>
              </v-card>
            </v-col>
          </v-row>
          <v-card-actions class="justify-end">
            <v-btn @click.stop="dialogReSchedule=false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--Fin del Dialog-->
      <v-dialog v-model="dialogSelected" width="400">
        <v-card>
          <v-card-title class="justify-center">Detalles de tu cita</v-card-title>
          <v-card-subtitle class="text-left text-subtitle-1 text--primary text-uppercase font-weight-bold">Horario: {{dateApp + scheduleDate}}</v-card-subtitle>
          <v-card-actions>
            <v-btn block color="primary" rounded @click="reSchedule(dateApp,scheduleDate)">ReSchedule</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

  </div>
</template>

<script>

import AppointmentApiService from '../../core/services/appointments-api.service'
import PsychologistApiService from '../../core/services/psychologists-api.service'
import PsychologistsApiService from "../../core/services/psychologists-api.service";

export default {
  name: "appointments-patient",
  data: () => ({
    scheduleDate: '',
    menu: false,
    psychoId: "",
    schedules: [],
    dialogReSchedule: false,
    appointments: [],
    psychologists: [],
    userId: "",
    dialogInfo: false,
    dialog: false,
    dialogSelected: false,
    selectedAppointment: null,
    deleteAppointment: null,
    appointmentId: 0,
    activePicker: null,
    dateApp: null,
  }),

  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },

  async created() {
    this.userId = this.$route.params.id;
    const responsePsychologist = await PsychologistApiService.getAll();
    this.psychologists = responsePsychologist.data;
    await this.retrieveAppointments();
    console.log(this.dialogInfo)
  },

  methods: {
    scheduleDialog(scheduledATE){
      this.scheduleDate = scheduledATE;
      this.dialogSelected = true;
    },

    save (date) {
      this.$refs.menu.save(date)
    },

    async reSchedule(dateTime, dateHour) {
      let dateToIso = new Date(dateTime + " " + dateHour);
      const response = await AppointmentApiService.getAppointmentId(this.appointmentId);
      let dataAppointment = response.data;
      console.log(dataAppointment, dateToIso)
      let newDate = {
        psychoNotes: dataAppointment.psychoNotes,
        scheduleDate: dateToIso.toISOString(),
        createdAt: dataAppointment.createdAt,
        motive: dataAppointment.motive,
        personalHistory: dataAppointment.personalHistory,
        testRealized: dataAppointment.testRealized,
        treatment: dataAppointment.treatment,
      };
      await AppointmentApiService.updateAppointment(dataAppointment.id, newDate);
      await this.retrieveAppointments();
      this.dialogSelected = false;
    },

    getPsychologistName(id) {
      return this.psychologists.find(psychologists => psychologists.id === id).name;
    },

    openReScheduleDialog(appointmentId) {
      this.retrievePsychoSchedules(appointmentId);
      this.dialogReSchedule = true;
    },

    retrievePsychoSchedules(id) {
      PsychologistsApiService.getScheduleFromPsycho(id)
          .then(response => {
            this.schedules = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    async psychologistDialog(psychoId, idAppointment){
      this.appointmentId = idAppointment;
      this.psychoId = psychoId;
      const response = await PsychologistApiService.getById(psychoId);
      this.selectedAppointment = response.data;
      this.dialogInfo = true;
    },

    openCancelDialog(){
      this.dialog = true;
    },

    closeDialog(){
      this.dialogInfo = false;
    },

    async retrieveAppointments(){
      const response = await AppointmentApiService.getAppointmentsByPatientId(this.userId);
      this.appointments = response.data;
    },

    async cancelAppointment(appointmentId){
      await AppointmentApiService.deleteAppointment(appointmentId);
      const response = await AppointmentApiService.getAppointmentsByPatientId(this.userId);
      this.appointments = response.data;
      this.dialog = false;
      this.dialogInfo = false;
      alert("Canceled Appointment")
    },

    async joinMeet() {
      const response = await AppointmentApiService.getAppointmentId(this.appointmentId);
      const appointment = response.data;
      if(appointment.psychoNotes === "No Url Yet")
      {
        alert("An url is not set yet")
      }
      else
      {
        window.open(appointment.psychoNotes);
      }
    }
  },
}
</script>


<style scoped>

</style>