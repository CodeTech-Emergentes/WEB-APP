<template>
    <v-row>
      <v-col cols="5" class="firstCol hidden-sm-and-down" align-self="center">
        <v-img class="img ml-5 mt-16" max-height="300" max-width="800" src="https://www.enseignemoi-files.com/site/view/images/dyn-cache/pages/image/img/12/20/1427215436_122008_1200x667x0.jpg?v=2018021301"></v-img>
      </v-col>
      <v-col class="pr-lg-10" lg="7" xs="12">
        <v-divider inset vertical></v-divider>
        <h1 class="mt-lg-15">¡Bienvenido!</h1>
        <h3 class="mb-2">Ingresa tu correo y contraseña</h3>
        <v-sheet rounded color=#03A9F4>
          <v-form>
            <v-divider inset vertical></v-divider>
            <v-text-field solo class="mt-5 ml-10 mr-10" v-model="email" label="email"
                          :rules="[rules.required, rules.email]"></v-text-field>
            <v-text-field maxlength="20" solo class="mt-5 ml-10 mr-10" v-model="password" @click:append="show1 = !show1"
                          :type="show ? 'text' : 'password'" label="password" :rules="[rules.required]"></v-text-field>
            <v-row justify="center">
              <v-btn depressed class="mb-3 mt-3" @click="validateLogin()"> Login </v-btn>
            </v-row>
            <v-row justify="center">
              <h4 class="mb-5">¿Olvidaste tu contraseña?</h4>
            </v-row>
            <v-divider inset></v-divider>
            <v-row justify="center">
              <v-btn class="mt-3" color="white" plain to="/register_psycho">
                Sign up
              </v-btn>
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
</template>

<script>
import PsychologistsApiService from "../../core/services/psychologists-api.service";

export default {
  name: "login-psychologist",
  data: () => ({
    psychologists: [],
    loginData: [],
    email: "",
    password: "",
    show:false,
    rules: {
      required: value => !!value || 'Required.',
      counter: value => value.length <= 20 || 'Max 20 characters',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
    }
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
  methods: {
    async validateLogin() {
      try {
        const response2 = await PsychologistsApiService.findByEmail(this.email);
        this.loginData = response2.data;
        console.log(this.loginData);
        if (this.password === this.loginData.password) {
          await this.$router.push({name: 'home-psycho', params: {id: this.loginData.id}})
        }else {
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
.img {
  border-radius: 2%;
}
</style>