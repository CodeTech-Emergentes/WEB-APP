<template>
  <div>
    <v-app-bar app color=#03A9F4>
      <!--Drawer Icon-->
      <v-app-bar-nav-icon align="right" @click.stop="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      <h1 class="text-sm-h4 text-md-h4 text-lg-h5 font-weight-medium white--text ml-3" >NUTRIX</h1>
      <v-spacer></v-spacer>
    </v-app-bar>
    <!--Drawer despegable-->
    <v-navigation-drawer v-model="drawer" absolute temporary >
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">User</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset vertical></v-divider>

          <v-list-item v-for="item in items" :key="item">

            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="redirectTo(item.routeName)">
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
  name: "AppBar-nutritionist",
  data: () => ({
    links: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ],
    items: [
      {text:'Home', icon:'mdi-home', routeName:'home-nutritionist'},
      {text:'My Profile', icon:'mdi-account', routeName:'nutritionist-profile'},
      {text:'Appointment', icon:'mdi-calendar-range', routeName:'nutritionist-appointments'},
      {text:'Logout', icon:'mdi-logout', routeName:'nutritionist-login'},
    ],
    profile: [],
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
    }
  },
  methods: {
    redirectTo(router) {
      if(router ===     'nutritionist-login') {
        localStorage.removeItem("nutritionist")
        this.$router.push({name: router})
      } else {
        this.$router.push({name: router})
      }
    },

    redirectHome(id) {
      this.$router.push({name: 'home-nutritionist' , params:{id: id}})
    }
  }
}
</script>