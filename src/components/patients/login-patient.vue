<template>
    <v-row align="center" justify="center" >
      <v-col>
        <v-card class="elevation-6 mt-10">
              <v-row>
                <v-col cols="12" md="6">
                  <v-img width="100%" src="https://static.vecteezy.com/system/resources/previews/002/610/660/non_2x/woman-consulting-psychologist-vector.jpg"></v-img>
                </v-col>

                <v-col cols="12" md="6" align="center">
                  <v-card-text class="mt-6">
                    <h1 class="text-center ma-1 mb-5">Bienvenido a PsychoHelp</h1>
                    <h3 class="text-center  grey--text ">
                      Inicia sesión para continuar
                    </h3>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">

                        <v-form>
                          <v-text-field
                              outlined dense color="blue"
                              class="mt-16"
                              v-model="email"
                              :rules="[rules.required, rules.email]"
                              label="E-mail">
                          </v-text-field>

                          <v-text-field
                              outlined dense color="blue"
                              v-model="password"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[rules.required, rules.min]"
                              :type="show1 ? 'text' : 'password'"
                              name="input-10-1"
                              label="Password"
                              hint="At least 8 characters"
                              counter
                              @click:append="show1 = !show1"
                          ></v-text-field>

                        </v-form>

                        <v-col align="center">
                          <span class="caption blue--text">Forgot password</span>
                        </v-col>
                        <v-btn color="blue" dark block tile class="mb-3" @click="validateLogin()">Log in</v-btn>
                        <v-divider inset></v-divider>
                        <v-btn class="ma-1" color="blue" plain to="/register_patient">
                        Sign up
                        </v-btn>
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
import PatientApiService from "../../core/services/patient-api-service"

export default {
  name: "login-patient",
  data: () => ({
    patients: [],
    loginData: [],
    show1: false,
    email: '',
    password: '',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
    }
  }),
  async created() {
    try {
      const response = await PatientApiService.getAll();
      this.patients = response.data;
    }
    catch (e)
    {
      console.error(e);
    }
  },
  methods: {

    async validateLogin() {
      try {
        const response2 = await PatientApiService.findByEmail(this.email);
        this.loginData = response2.data;
        console.log(this.loginData);
        if (this.password === this.loginData.password) {
          await this.$router.push({name: 'home-patient', params: {id: this.loginData.id}})
        } else {
          console.log(this.loginData.email)
          alert("Incorrect Password")
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
<style scoped>

</style>