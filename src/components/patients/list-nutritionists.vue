<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-sheet rounded="lg">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12 sm12>
                <v-card>
                  <v-card-title class="text-lg-subtitle-2">Do you already have a nutritionist? Look it up by their name.</v-card-title>
                  <v-card-actions>
                    <v-text-field v-model="search" label="Search Name" outlined v-on:input="getNutritionistByName()"></v-text-field>
                  </v-card-actions>
                  <v-card-title>Filter by</v-card-title>
                  <v-divider></v-divider>
                  <v-card-title class="text-lg-subtitle-1">Genre</v-card-title>
                  <v-card-text>
                    <v-radio-group v-model="genre">
                      <v-radio label="Male" value="Male" v-on:click="getNutritionistsByFilter(genre, sessionType)"></v-radio>
                      <v-radio label="Female" value="Female" v-on:click="getNutritionistsByFilter(genre, sessionType)"></v-radio>
                    </v-radio-group>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-title class="text-lg-subtitle-1">Session Type</v-card-title>
                  <v-card-text>
                  <v-radio-group v-model="sessionType">
                    <v-radio label="Individual" value="Individual" v-on:click="getNutritionistsByFilter(genre, sessionType)"></v-radio>
                    <v-radio label="Couple" value="Couple" v-on:click="getNutritionistsByFilter(genre, sessionType)"></v-radio>
                  </v-radio-group>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                  <v-btn class="mr-4" @click="clear()" block>Clear</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-sheet>
      </v-col>
      <!--LISTA DE NUTRICIONISTAS-->
      <v-col>
        <v-sheet rounded="lg">
      <v-container>
        <v-row>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex v-for="nutritionist in nutritionists" :key="nutritionist.id" xs12 sm4>
                <v-card min-height="350" class="mx-auto">
                  <v-col align="center">
                    <v-avatar width="100" height="100">
                      <v-img :src="nutritionist.image"></v-img>
                    </v-avatar>
                  </v-col>
                  <v-card-title class="justify-center font-weight-bold text-lg-h6">{{nutritionist.name}}</v-card-title>
                  <v-card-subtitle class="text-center">{{nutritionist.email}}</v-card-subtitle>
                  <v-card-actions>
                    <v-container>
                      <v-row dense>
                        <v-col align="center">
                          <v-btn class="text-lg-overline mb-5" outlined @click="nutritionistDialog(nutritionist)">Profile</v-btn>
                        </v-col>
                        <v-col align="center">
                          <v-btn @click="appointmentDialog(nutritionist)">Schedule Appointment</v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-row>
      </v-container>
        </v-sheet>
      </v-col>
    </v-row>
    <template>
      <!--DIALOG INFO NUTRICIONISTA SELECCIONADO-->
      <v-dialog v-model="dialog" width="600" v-if="selectedNutritionist!=null" persistent>
        <v-card>
          <v-col align="center">
            <v-avatar width="100" height="100">
              <v-img :src="selectedNutritionist.img"></v-img>
            </v-avatar>
          </v-col>
          <v-card-title class="justify-center">{{ selectedNutritionist.name }}</v-card-title>
          <v-card-subtitle class="text-center">CMP: {{ selectedNutritionist.cmp}}</v-card-subtitle>
          <v-card-text class="text-justify">{{ selectedNutritionist.about }}</v-card-text>
          <v-container>
            <v-layout>
              <v-flex>
                <v-card>
                  <v-card-title class="blue--text text--darken-2">Specialization</v-card-title>
                  <v-card-text>
                   {{ selectedNutritionist.specialization }}
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container>
            <v-layout>
              <v-flex>
                <v-card>
                  <v-card-title class="blue--text text--darken-2">Academic Background</v-card-title>
                  <v-card-text>
                    {{selectedNutritionist.formation}}
                  </v-card-text>
                </v-card>
                <v-flex class="mt-2 text-end">
                <v-btn @click.stop="dialog=false">Close</v-btn>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
      <!--Fin del Dialog-->
    </template>
    <template>
      <v-dialog v-model="dialogAppointment" v-if="selectedAppointment!=null" width="400" persistent >
        <v-card>
          <v-card-title class="justify-center">Elige un horario a tu preferencia</v-card-title>
          <v-card-subtitle class="text-center">Horarios disponibles</v-card-subtitle>
          <v-card-title>{{selectedAppointment.name}}</v-card-title>
          <v-divider></v-divider>
          <v-container>
            <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="dateApp"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    outlined dense color="blue"
                    v-model="dateApp"
                    :error-messages="dateAppErrors"
                    required
                    label="Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    @input="$v.dateApp.$touch()"
                    @blur="$v.dateApp.$touch()"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="dateApp"
                  :active-picker.sync="activePicker"
                  :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save"
              ></v-date-picker>
            </v-menu>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-card elevation="5">
                  <v-card-subtitle class="text-center">Turno mañana</v-card-subtitle>
                  <v-chip-group active-class="primary--text" column class="ml-7">
                    <div v-for="schedule in schedules" :key="schedule" >
                      <v-chip v-if="schedule.id < 6" @click="scheduleDialog(schedule)">
                        {{ schedule.time }}
                      </v-chip>
                    </div>
                  </v-chip-group>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card elevation="5">
                  <v-card-subtitle class="text-center">Turno Tarde</v-card-subtitle>
                  <v-chip-group  active-class="primary--text" column class="ml-7">
                    <div v-for="schedule in schedules" :key="schedule" class="align-center" >
                      <v-chip  v-if="schedule.id >= 6" @click="scheduleDialog(schedule)">
                        {{ schedule.time }}
                      </v-chip>
                    </div>
                  </v-chip-group>
                </v-card>
              </v-col>
            </v-row>
            <v-flex class="mt-2 text-end">
              <v-btn @click.stop="dialogAppointment=false">Cancelar</v-btn>
            </v-flex>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogSelected" v-if="selectedSchedule!=null" width="500">
        <v-card>
          <v-card-title class="justify-center">Detalles de tu cita</v-card-title>
          <v-card-subtitle class="text-left text-subtitle-1 text--primary text-uppercase font-weight-bold mt-2">Nutricionista: {{selectedAppointment.name}}</v-card-subtitle>
          <v-card-subtitle class="text-left text-subtitle-1 text--primary text-uppercase font-weight-bold">Horario: {{selectedSchedule.time}}</v-card-subtitle>
          <v-card-subtitle class="text-left text-subtitle-1 text--primary text-uppercase font-weight-bold">Paciente: {{loginData.firstName + " " + loginData.lastName}}</v-card-subtitle>
          <v-card-subtitle class="text-left text-subtitle-1 text--primary text-uppercase font-weight-bold">Teléfono: {{loginData.phone}}</v-card-subtitle>
          <v-card-subtitle class="text-left text-subtitle-1 text--primary text-uppercase font-weight-bold">E-mail: {{loginData.email}}</v-card-subtitle>
          <v-card-actions>
            <v-btn block color="primary" rounded @click="openPaymentDialog(dateApp, selectedSchedule.time, selectedAppointment.id, loginData.id)">Agendar cita</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <template>
      <!--DIALOG INFO NUTRICIONISTA SELECCIONADO-->
      <v-dialog v-model="dialogPayment" width="400px">
        <v-card>
          <v-card-actions class="justify-end">
            <v-icon @click="closePaymentDialog">mdi-close</v-icon>
          </v-card-actions>
          <div>
            <label class="mb-4 mr-4 ml-4">Credit Card</label>
            <stripe-element-card class="mr-4 ml-4"></stripe-element-card>
          </div>
          <v-card-actions class="justify-center">
            <v-btn @click="handleSubmit(loginData.id, selectedAppointment.id, dateApp, selectedSchedule.time)">Pay</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--Fin del Dialog-->
    </template>
  </v-container>
</template>

<script>
import NutritionistsApiService from "../../core/services/nutritionists-api.service"
import { validationMixin } from 'vuelidate'
import PatientApiService from "../../core/services/patient-api-service";
import AppointmentAppointmentService from '../../core/services/appointments-api.service'
import { StripeElementCard} from "@vue-stripe/vue-stripe";
import {loadStripe} from "@stripe/stripe-js";
export default {
  name: "list-nutritionists",
  components: {
    StripeElementCard,
  },
  mixins: [validationMixin],
  data () {
    return {
      nutritionists: [],
      schedules: [],
      loginData: [],
      dataLocal: {},
      userId: 0,
      scheduleId: 0,
      dialog: false,
      toggle_exclusive: undefined,
      dialogAppointment: false,
      dialogSelected: false,
      selectedNutritionist: null,
      selectedAppointment: null,
      selectedSchedule: null,
      dialogPayment: false,
      selected: [],
      genre: null,
      sessionType: null,
      search: "",
      activePicker: null,
      dateApp: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      stripe: null,
      elements: null,
      Key:'pk_test_51JxFdHE3DueU8pu3V9DMyx0VUOZEFxUGMEjGqsPakEilVuRQQ8FH8wYUb8Valy6DQr4ykdCXhZnuAvLM7UFJZmGt00g9v8mDwj',
    };
  },

  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },

  async created() {
    //this.userId = this.$route.params.id;
    this.dataLocal = JSON.parse(localStorage.getItem("patient"));
    this.userId = this.dataLocal.id;
    try { 
      const response = await PatientApiService.getById(this.userId);
      this.loginData = response.data;
    }
    catch (e)
    {
      console.error(e);
    }

    this.retrieveNutritionists();
    this.dialog = false;
    this.dialogAppointment = false;
    this.dialogSelected = false;
  },

  methods:{

    async programme(id, idNutritionist, idSchedule) {
      try {
        await this.$router.push({name: 'checkout', params: {id: id, idNutritionist: idNutritionist, idSchedule: idSchedule}})
      } catch (e)
      {
        console.error(e)
      }
    },

    retrieveNutritionists(){
      NutritionistsApiService.getAll()
      .then(response => {
        this.nutritionists = response.data;
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    },

    retrieveNutritionistSchedules(id) {
      NutritionistsApiService.getScheduleFromNutritionist(id)
          .then(response => {
            this.schedules = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    nutritionistDialog(nutritionist){
      console.log('nutritionistDialog nutritionist:', nutritionist);
      this.selectedNutritionist = nutritionist;
      this.dialog = true;
    },

    appointmentDialog(nutritionist){
      this.selectedAppointment = nutritionist;
      this.retrieveNutritionistSchedules(this.selectedAppointment.id);
      this.dialogAppointment = true;
    },

    scheduleDialog(schedule){
      this.selectedSchedule = schedule;
      this.dialogSelected = true;
    },

    getNutritionistsByFilter(genre, sessionType){
      if(genre!=null && sessionType===null) {
        NutritionistsApiService.findByGenre(genre)
            .then(response => {
              this.nutritionists = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
      }
      if(genre===null && sessionType!=null){
        NutritionistsApiService.findBySessionType(sessionType)
            .then(response => {
              this.nutritionists = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
      }
      if(genre!=null && sessionType!=null){
        NutritionistsApiService.findByGenreAndSessionType(genre,sessionType)
            .then(response => {
              this.nutritionists = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
      }
    },

    getNutritionistByName(){
      if(this.search === "" || this.search === null)
        this.retrieveNutritionists();
      else {
        NutritionistsApiService.findByName(this.search)
            .then(response => {
              this.nutritionists = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
      }
    },

    save (date) {
      this.$refs.menu.save(date)
    },

    clear () {
      this.retrieveNutritionists();
      this.genre=null;
      this.sessionType=null;
    },

    //CHECKOUT

    async openPaymentDialog() {
      let createdAt = new Date().toISOString();
      console.log(createdAt);
      this.dialogPayment = true;
      const ELEMENT_TYPE = "card";
      this.stripe = await loadStripe(this.Key);
      this.elements = this.stripe.elements();
      const element =this.elements.create(ELEMENT_TYPE,{hidePostalCode: true});
      element.mount("#stripe-element-mount-point");

    },

    closePaymentDialog() {
      this.dialogPayment = false;
    },

    async handleSubmit(patientId, nutritionistId, dateTime, dateHour) {
      let dateToIso = new Date(dateTime + " " + dateHour);
      let createdAt = new Date().toISOString();
      console.log(dateToIso.toISOString());
      let newAppointment = {
        patientId: patientId,
        nutritionistId: nutritionistId,
        nutritionistNotes: "Notes",
        scheduleDate: dateToIso,
        createdAt: createdAt,
        motive: "Motive",
        personalHistory: "Personal History",
        testRealized: "Test Realized",
        treatment: "Treatment",
      };
      await AppointmentAppointmentService.createAppointment(newAppointment);
      const cardElement = this.elements.getElement("card");
      try {
        const response = await fetch("https://stripe-psychohelp.mybluemix.net/stripe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ amount: 5000 })
        });
        const { secret } = await response.json();
        console.log("secret", secret);
        const paymentMethodReq = await this.stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });
        console.log("error?", paymentMethodReq);
        const { error } = await this.stripe.confirmCardPayment(secret, {
          payment_method: paymentMethodReq.paymentMethod.id
        });
        console.log("error?", error);
        // await this.$router.push({name: 'home'});
      } catch (error) {
        console.log("error", error);
      }
      await this.$router.push({name: 'home-patient', params: {id: this.loginData.id}});
    },

  }


}
</script>

<style scoped>

</style>