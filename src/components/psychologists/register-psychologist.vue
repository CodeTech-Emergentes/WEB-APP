<template>
  <v-row class="rowT">
    <v-col cols="5" class="firstCol hidden-sm-and-down" align-self="center">
      <v-img class="img ml-5 mt-10" max-height="500" max-width="800" src="https://cdn.discordapp.com/attachments/839568290078392383/898701933408313375/unknown.png"></v-img>
    </v-col>
    <v-col class="pr-lg-10 mb-5" lg="7" xs="12">
      <v-divider inset vertical></v-divider>
      <h2 class="mt-lg-8">¡Comienza Aquí!</h2>
      <v-row justify="end" class="mr-2">
        <v-btn plain outline to="/login_psycho">¿Ya eres parte de nuestro equipo? Ingresa Aquí</v-btn>
      </v-row>
      <v-divider inset vertical></v-divider>
      <form>
        <v-sheet rounded color=#03A9F4>
          <v-divider inset vertical></v-divider>
          <v-text-field background-color="white" outlined dense color="black" class="mt-5 ml-10 mr-10" v-model="name" label="Nombres completos"
                        required :error-messages="nameErrors"
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()"></v-text-field>
          <v-text-field background-color="white" outlined dense color="black"  class="mt-5 ml-10 mr-10" v-model="dni" label="DNI"
                        required :error-messages="dniErrors"
                        @input="$v.dni.$touch()"
                        @blur="$v.dni.$touch()"></v-text-field>
          <v-text-field background-color="white" outlined dense color="black" class="mt-5 ml-10 mr-10" v-model="phone" label="Celular"
                        required :error-messages="phoneErrors"
                        @input="$v.phone.$touch()"
                        @blur="$v.phone.$touch()"></v-text-field>
          <v-text-field background-color="white" outlined dense color="black" class="mt-5 ml-10 mr-10" v-model="email" label="Correo electrónico"
                        required :error-messages="emailErrors"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"></v-text-field>
          <v-text-field background-color="white" outlined dense color="black" class="mt-5 ml-10 mr-10" v-model="cmp" label="CMP"
                        required :error-messages="cmpErrors"
                        @input="$v.cmp.$touch()"
                        @blur="$v.cmp.$touch()"></v-text-field>
          <v-text-field background-color="white" outlined dense color="black" class="mt-5 ml-10 mr-10" v-model="password" label="Password"
                        required :error-messages="passwordErrors"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"></v-text-field>
          <v-select background-color="white" outlined dense color="black" class="mt-5 ml-10 mr-10"
              v-model="genre"
              :items="genreItems"
              :error-messages="selectErrors"
              label="Genre"
              required
              @change="$v.genre.$touch()"
              @blur="$v.genre.$touch()"
          ></v-select>
          <v-row justify="center">
            <v-btn depressed class="mb-3 mt-3" @click="register()" > Register </v-btn>
          </v-row>
          <v-row justify="center">
            <h4 class="mb-5">¿Olvidaste tu contraseña?</h4>
          </v-row>
        </v-sheet>
      </form>
    </v-col>
  </v-row>
</template>

<script>

import PsychologistsApiService from "../../core/services/psychologists-api.service"
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, minLength, numeric } from 'vuelidate/lib/validators'

export default {
  name: "register-psychologist",
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(50) },
    email: { required, email },
    dni: { required, maxLength: maxLength(8), numeric },
    phone: { required, maxLength: maxLength(9), minLength: minLength(9), numeric },
    cmp: { required, maxLength: maxLength(10), numeric },
    password: { required, maxLength: maxLength(20), minLength: minLength(8) },
    genre: { required },
  },
  data: () => ({

    id: 0,
    name: "",
    dni: "",
    age: "",
    email: "",
    phone: "",
    cmp: "",
    specialization: "",
    formation: "",
    about: "",
    active: false,
    new: false,
    password:"",
    genre : "",
    sessionType:"",
    genreItems: [
      'Male',
      'Female',
      'Others',
    ],
  }),
  async created() {
    try {
      const response = await PsychologistsApiService.getAll();
      this.psychologists = response.data;
    }
    catch (e)
    {
      console.error(e);
    }
  },

  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    dniErrors () {
      const errors = []
      if (!this.$v.dni.$dirty) return errors
      !this.$v.dni.required && errors.push('Dni is required')
      !this.$v.dni.maxLength && errors.push('Name must be at most 8 characters long')
      !this.$v.dni.numeric && errors.push('Only numbers')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.required && errors.push('Phone is required')
      !this.$v.phone.numeric && errors.push('Only numbers')
      !this.$v.phone.maxLength && errors.push('Name must be at most 9 characters long')
      !this.$v.phone.minLength && errors.push('Name must be at least 9 characters long')
      return errors
    },
    cmpErrors () {
      const errors = []
      if (!this.$v.cmp.$dirty) return errors
      !this.$v.cmp.required && errors.push('Cmp is required')
      !this.$v.cmp.numeric && errors.push('Only numbers')
      !this.$v.cmp.maxLength && errors.push('Name must be at 10 characters long')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      !this.$v.password.maxLength && errors.push('Name must be at most 20 characters long')
      !this.$v.password.minLength && errors.push('Name must be at least 8 characters long')
      return errors
    },
    selectErrors () {
      const errors = []
      if (!this.$v.genre.$dirty) return errors
      !this.$v.genre.required && errors.push('Item is required')
      return errors
    },
  },

  methods: {
    register() {
      if (this.$v.$invalid){
        alert("Ingrese los datos correctamente")
        this.$v.$touch()
        this.$v.$reset()
      } else {
        let psychologistObject = {
          id : this.id,
          name: this.name,
          dni: this.dni,
          age: "age",
          email: this.email,
          phone: this.phone,
          cmp: this.cmp,
          specialization: "specialization",
          formation: "formation",
          about: "about",
          active: this.active,
          img: "imagenurl",
          new: this.new,
          sessionType: "tgrue",
          password: this.password,
          genre : this.genre,}
        PsychologistsApiService.create(psychologistObject)
        alert("Registrado correctamente")
        this.$router.push({name: 'psychologist-login'})
      }
    }
  }
}
</script>

<style scoped>

.rowT {
  background-color: white;
}
</style>