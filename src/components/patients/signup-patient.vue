<template>
  <v-row align="center" justify="center" >
    <v-col>
      <v-card class="elevation-6 mt-5">
        <v-row>
          <v-col cols="12" md="6">
            <v-img width="100%" src="https://static.vecteezy.com/system/resources/previews/002/610/660/non_2x/woman-consulting-psychologist-vector.jpg"></v-img>
          </v-col>

          <v-col cols="12" md="6" align="center">
            <v-card-text class="mt-6">
              <h1 class="text-center ma-1 mb-5">Bienvenido a PsychoHelp</h1>
              <h3 class="text-center  grey--text ">
                Llena tus datos para continuar
              </h3>
              <v-row align="center" justify="center">
                <v-col cols="12" sm="8">
                  <v-form>
                    <v-text-field
                        outlined dense color="blue"
                        class="mt-16"
                        v-model="firstName"
                        :error-messages="firstNameErrors"
                        :counter="30"
                        label="firstName"
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
                        label="lastName"
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
                        v-model="password"
                        :error-messages="passwordErrors"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        label="Password"
                        prepend-icon="mdi-form-textbox-password"
                        required
                        counter
                        hint="At least 8 characters"
                        @click:append="show1 = !show1"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
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
                        min-width="auto"
                    >
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
                          :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save"
                      ></v-date-picker>
                    </v-menu>
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
                    <v-checkbox
                        outlined dense color="blue"
                        v-model="checkbox"
                        :error-messages="checkboxErrors"
                        label="Do you agree?"
                        required
                        @change="$v.checkbox.$touch()"
                        @blur="$v.checkbox.$touch()"
                    ></v-checkbox>
                    <v-btn class="mr-4" @click="clear">
                      Clear
                    </v-btn>
                    <v-btn v-on:click="register()">
                      Register
                    </v-btn>
                  </v-form>
                </v-col>
              </v-row>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
import { validationMixin } from 'vuelidate'
import {required, maxLength, minLength, email} from 'vuelidate/lib/validators'
import PatientApiService from "../../core/services/patient-api-service"

export default {
  name: "signup-patient",
  mixins: [validationMixin],
  validations: {
    firstName: { required, maxLength: maxLength(30) },
    lastName: { required, maxLength: maxLength(30) },
    phone: { required, maxLength: maxLength(9) },
    password: { required, minLength: minLength(8) },
    email: { required, email },
    state: { required },
    gender: { required },
    date: { required },
    checkbox: {
      checked (val) {
        return val
      },
    },
  },

  data: () => ({
    patients: [],
    show1: false,
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    state: null,
    gender: null,
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
    checkbox: false,
    activePicker: null,
    date: null,
    menu: false,
  }),

  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },

  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    stateErrors () {
      const errors = []
      if (!this.$v.state.$dirty) return errors
      !this.$v.state.required && errors.push('Item is required')
      return errors
    },
    genderErrors () {
      const errors = []
      if (!this.$v.gender.$dirty) return errors
      !this.$v.gender.required && errors.push('Item is required')
      return errors
    },
    dateErrors () {
      const errors = []
      if (!this.$v.date.$dirty) return errors
      !this.$v.date.required && errors.push('Birthday date is required')
      return errors
    },
    firstNameErrors () {
      const errors = []
      if (!this.$v.firstName.$dirty) return errors
      !this.$v.firstName.maxLength && errors.push('Name must be at most 30 characters long')
      !this.$v.firstName.required && errors.push('Name is required.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must be at least 8 characters')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.lastName.$dirty) return errors
      !this.$v.lastName.maxLength && errors.push('lastName must be at most 30 characters long')
      !this.$v.lastName.required && errors.push('lastName is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.maxLength && errors.push('Phone number must be at most 9 digit')
      !this.$v.phone.required && errors.push('Phone number is required.')
      return errors
    },
  },

  methods: {
    retrievePatient() {
      PatientApiService.getAll()
          .then(response => {
            this.patients = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    register () {
      this.patients=({
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        state: this.state,
        phone: this.phone,
        date: this.date,
        gender: this.gender,
        img: "https://www.logolynx.com/images/logolynx/4b/4beebce89d681837ba2f4105ce43afac.png"
      })
      this.firstName= ''
      this.lastName=''
      this.email=''
      this.password=''
      this.state=''
      this.phone=''
      this.date=''
      this.gender=''
      PatientApiService.create(this.patients)
      console.log(this.data)
      alert("Success Register")
      this.$router.push({name: 'Login-Patient'});
    },

    submit () {
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.phone=''
      this.password=''
      this.state = null
      this.gender = null
      this.date = null
      this.checkbox = false
    },
    save (date) {
      this.$refs.menu.save(date)
    },
  },

  mounted() {
    this.retrievePatient();
  }
}
</script>

<style scoped>

</style>


