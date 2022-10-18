<template>
  <v-app>
    <AppBarPsycho v-if="usertype === 1"></AppBarPsycho>
    <AppBarPatient v-else-if="usertype === 2" ></AppBarPatient>
    <AppBar v-else></AppBar>
    <v-main class="grey lighten-3">
      <v-container fluid>
        <router-view/>
      </v-container>
<!--      <h1>{{this.$route.name}}</h1>-->
<!--      <h1>{{this.rutas}}</h1>-->
<!--      <h1>{{this.usertype}}</h1>-->
    </v-main>
  </v-app>
</template>

<script>

import AppBarPsycho from './components/navigation-bar/appbar-psycho'
import AppBar from "./components/navigation-bar/app-bar";
import AppBarPatient from "./components/navigation-bar/appbar-patient";

export default {
  components: {
    AppBarPatient,
    AppBar,
    AppBarPsycho
  },
  data: () => ({
    usertype: 0,
    rutas: ""
  }),

  beforeUpdate: function () {
    this.verifyUserType()
  },

  created () {
    this.verifyUserType()
  },

  methods: {
    verifyUserType() {
      if (this.$route.name === 'psychologist-login' || this.$route.name === 'Login-Patient' || this.$route.name === 'psychologist-register' || this.$route.name === 'Sign-up-Patient') {
        this.usertype = 0
      } else
      {
        this.rutas = this.$route.name
        if (this.rutas.includes('psycho')=== true){
          this.usertype = 1
        }
        if (this.rutas.includes('patient')=== true){
          this.usertype = 2
        }
      }
    }
  }
}
</script>
