<template>
  <div>
    <v-app-bar app color=#03A9F4>
      <!--Drawer Icon-->
      <v-app-bar-nav-icon align="right" @click.stop="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      <h1 class="text-sm-h4 text-md-h4 text-lg-h5 font-weight-medium white--text ml-3" >PSYCHOHELP</h1>
      <v-container class="py-0 fill-height">
        <v-spacer></v-spacer>
      </v-container>
    </v-app-bar>

    <!--Drawer despegable-->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">User</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset vertical></v-divider>

          <v-list-item v-for="item in items" :key="item">

            <v-list-item-icon >
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="redirectTo(item.routeName, userId)">
              {{ item.text }}
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "AppBar-Patient",
  data: () => ({
    links: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ],
    items: [
      {text:'Home', icon:'mdi-home', routeName:'home-patient'},
      {text:'My Profile', icon:'mdi-account', routeName:'patient-profile'},
      {text:'Appointment', icon:'mdi-calendar-range', routeName:'patient-appointments'},
      {text:'Logout', icon:'mdi-logout', routeName:'Login-Patient'},
    ],
    drawer: false,
    group: null,
    userId: 0,
  }),
  beforeUpdate() {
    this.userId = this.$route.params.id;
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
  methods: {
    redirectTo(router, id) {
      this.$router.push({name: router, params:{id: id}})
    }
  }
}
</script>
