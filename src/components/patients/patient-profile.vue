<template>
  <div>
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-card elevation="10" max-height="400" max-width="400">
              <v-img class="user " :src="profileData.img" max-height="400" max-width="400"></v-img>
            </v-card>
            <v-card class="mt-2" elevation="10">
              <v-card-title class="justify-center" style="font-size:2em">{{ profileData.firstName }}
                {{ profileData.lastName }}
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-card elevation="10">
              <v-card-title class="ml-5" style="font-size:2em">User Profile</v-card-title>
              <v-row class="mb-2">
                <v-col cols="12" md="6">
                  <v-card-title class="ml-10 mr-10 mb-2">First Name</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{profileData.firstName }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Last Name</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{profileData.lastName }}</v-card-subtitle>
                  <v-row>
                    <v-col>
                      <v-card-title class="ml-10 mr-10 mb-2">Gender</v-card-title>
                      <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.gender }}</v-card-subtitle>
                    </v-col>
                    <v-divider insert vertical></v-divider>
                    <v-col>
                      <v-card-title class="ml-10 mr-10 mb-2">State</v-card-title>
                      <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.state }}</v-card-subtitle>
                    </v-col>
                  </v-row>
                </v-col>
                <v-divider inset vertical></v-divider>
                <v-col cols="12" md="6">
                  <v-card-title class="ml-10 mr-10 mb-2">E-mail</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:1em">{{ profileData.email }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Birthday Date</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:1em">{{ profileData.date.slice(0, 10).replace('T', ' ')}}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Phone</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.phone }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-card-actions>
                <v-row>
                  <v-btn class="ma-6" color="#BBDEFB" elevation="2" @click="editProfile(profileData)">Edit profile</v-btn>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <template>
      <v-dialog v-model="dialog" persistent max-width="500px" v-if="correct!=null">
        <v-card>
          <v-card-title>
            <span class="text-h5">User Profile</span>
          </v-card-title>
          <v-card-text>

            <v-row align="center" justify="center">
              <v-col cols="12" sm="8">
                <v-form>
                  <v-text-field
                      outlined dense color="blue"
                      class="mt-16"
                      v-model="firstName"
                      :error-messages="firstNameErrors"
                      :counter="30"
                      label="First Name"
                      prepend-icon="mdi-account-details"
                      required
                      @input="$v.firstName.$touch()"
                      @blur="$v.firstName.$touch()"
                  ></v-text-field>
                  <v-text-field
                      outlined dense color="blue"
                      v-model="lastName"
                      :error-messages="lastNameErrors"
                      :counter="30"
                      label="Last Name"
                      prepend-icon="mdi-account-details-outline"
                      required
                      @input="$v.lastName.$touch()"
                      @blur="$v.lastName.$touch()"
                  ></v-text-field>
                  <v-text-field
                      outlined dense color="blue"
                      v-model="email"
                      :error-messages="emailErrors"
                      label="E-mail"
                      prepend-icon="mdi-at"
                      required
                      @input="$v.email.$touch()"
                      @blur="$v.email.$touch()"
                  ></v-text-field>
                  <v-text-field
                      outlined dense color="blue"
                      v-model="img"
                      :error-messages="imgErrors"
                      label="Img"
                      prepend-icon="mdi-at"
                      required
                      @input="$v.img.$touch()"
                      @blur="$v.img.$touch()"
                  ></v-text-field>
                  <v-select
                      outlined dense color="blue"
                      v-model="state"
                      :items="itemsState"
                      :error-messages="stateErrors"
                      label="Marital status"
                      prepend-icon="mdi-list-status"
                      required
                      @change="$v.state.$touch()"
                      @blur="$v.state.$touch()"
                  ></v-select>
                  <v-select
                      outlined dense color="blue"
                      v-model="gender"
                      :items="itemsGender"
                      :error-messages="genderErrors"
                      label="Gender"
                      prepend-icon="mdi-human"
                      required
                      @change="$v.gender.$touch()"
                      @blur="$v.gender.$touch()"
                  ></v-select>
                  <v-text-field
                      outlined dense color="blue"
                      v-model="phone"
                      :error-messages="phoneErrors"
                      :counter="9"
                      label="Phone Number"
                      prepend-icon="mdi-cellphone"
                      required
                      @input="$v.phone.$touch()"
                      @blur="$v.phone.$touch()"
                  ></v-text-field>
                  <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          outlined dense color="blue"
                          v-model="date"
                          :error-messages="dateErrors"
                          required
                          label="Birthday date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          @input="$v.date.$touch()"
                          @blur="$v.date.$touch()"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="date"
                        :active-picker.sync="activePicker"
                        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString()"
                        min="1950-01-01"
                        @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-form>
              </v-col>
            </v-row>
            <small class="ml-3">*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="saveProfile()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import PatientApiService from "../../core/services/patient-api-service"
import {validationMixin} from "vuelidate";
import {email, maxLength, required} from "vuelidate/lib/validators";

export default {
  name: "patient-profile",
  mixins: [validationMixin],
  validations: {
    firstName: { required, maxLength: maxLength(30) },
    lastName: { required, maxLength: maxLength(30) },
    phone: { required, maxLength: maxLength(9) },
    email: { required, email },
    state: { required },
    gender: { required },
    date: { required },
    img: {required}
  },
  data: () => ({
    patients: [],
    profileData: [],
    dataUser: {},
    userId: 0,
    dialog: false,
    correct: null,
    profileIndex: 0,
    editedProfile: {
      firstName:'',
      lastName:'',
      gender: null,
      date: null,
      state: null,
      phone: ''
    },
    itemsState: [
      'Single',
      'Married',
      'Widower',
      'Divorced',
    ],
    itemsGender: [
      'Male',
      'Female',
      'Others',
    ],
    activePicker: null,
    menu: false
  }),

  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },


  computed: {
    firstNameErrors () {
      const errors = []
      if (!this.$v.firstName.$dirty) return errors
      !this.$v.firstName.maxLength && errors.push('Name must be at most 30 characters long')
      !this.$v.firstName.required && errors.push('Name is required.')
      return errors
    },
  },

  async created() {
    this.userId = this.$route.params.id;
    try {
      const response = await PatientApiService.getAll();
      const response2 = await PatientApiService.getById(this.userId);
      this.patients = response.data;
      this.profileData = response2.data;
    } catch (e) {
      console.error(e);
    }

    this.dialog = false;
  },

  methods: {

    editProfile(select){
      this.correct = select;
      this.firstName = this.profileData.firstName;
      this.lastName = this.profileData.lastName;
      this.email = this.profileData.email;
      this.gender = this.profileData.gender;
      this.phone = this.profileData.phone;
      this.state = this.profileData.state;
      this.date = this.profileData.date.slice(0, 10).replace('T', ' ');
      this.img = this.profileData.img;
      this.dialog = true;
    },

    saveProfile() {
     this.profileData.firstName = this.firstName;
     this.profileData.lastName = this.lastName;
     this.profileData.email = this.email;
     this.profileData.gender = this.gender;
     this.profileData.phone = this.phone.toString();
     this.profileData.state = this.state;
     this.profileData.date = this.date;
     this.profileData.img = this.img;
     console.log(this.profileData);
     PatientApiService.update(this.profileData.id, this.profileData);
     this.dialog = false;
    },
    save (date) {
      this.$refs.menu.save(date)
    }

  }
}
</script>

<style scoped>
.dateProfile {
  margin-left: 40px;
}

.user {
  border-radius: 20%;
}
</style>