<template>
  <v-container fluid>
  <v-row>
    <v-col lg="2" v-if="$vuetify.breakpoint.mdAndDown===!true" >
      <v-img class="pat" contain :src="loginData.img"></v-img>
      <v-card class="rounded-xl">
        <v-card-title class="mt-4">Welcome: {{loginData.firstName}} {{loginData.lastName}}</v-card-title>
      </v-card>
      <v-divider inset vertical></v-divider>
      <v-card elevation="8" class="pa-1" rounded="xl" color=white>
        <v-list>
          <v-list-item v-for="item in items" :key="item">
            <v-list-item-content @click="redirectTo(item.routeName, userId)">
              {{item.text}}
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>

    <v-col justify="center" sm="12" md="10" lg="8">
      <v-carousel height="20vh"  hide-delimiter-background show-arrows-on-hover rounded = "lg">
        <v-carousel-item class="flex xl12" v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class= " carousel_text text-lg-h5 text-sm-h6 font-weight-medium">
                {{ slide }}
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <v-divider inset vertical></v-divider>

      <!-- PUBLICATIONS !-->

            <v-row v-for="publication in publications" :key="publication.id" class="py-4 mr-2">
              <v-card  min-width="50vh" rounded="lg" hover @click="redirectToPublication(publication.id)" >
                <v-row>
                  <v-col cols="12" md="4">
                      <v-img class="mt-4 ml-3" flat height="100%" :src="publication.img"
                             :aspect-ratio="16 / 9"
                             max-height="90%"
                      ></v-img>
                  </v-col>
                  <v-col class="ml-4">
                    <div>
                      <v-card-title class="text-lg-h5 font-weight-bold pt-3 mb-1">
                        {{publication.title}}
                      </v-card-title>
                      <v-card-subtitle>
                        <v-avatar color="primary" size="20" class="mr-2">
                          <v-icon dark size="18">mdi-feather</v-icon>
                        </v-avatar>
                        {{publication.psychologist.name}}
                      </v-card-subtitle>
                      <v-card-text class="text-h6 font-weight-regular pt-3 text--secondary">
                        {{publication.description}}
                      </v-card-text>
                      <div class="d-flex align-center ml-4">
                        <v-chip-group  v-for="tag in tags" :key="tag">
                          <v-chip v-if="tag.publication.id === publication.id" color="primary" outlined>{{tag.text}}</v-chip>
                        </v-chip-group>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-row>
    </v-col>
    <v-col sm="" lg="2">
      <!--CARDS PSICÓLOGOS-->
      <v-row>
        <v-card max-width="220" class="mx-auto">
          <v-card-title class=" text-subtitle-1 text--primary text-uppercase font-weight-bold">
            New psychologists
          </v-card-title>
        </v-card>
        <v-col  sm="4" md="2" lg="12" v-for="psychology in psychologists" :key="psychology">
          <v-card max-height="300" max-width="200" class="mx-auto mb-5" >
            <v-img aspect-ratio="14:9" height="150" width="200" class="white--text align-end" :src="psychology.img">
            </v-img>
            <v-card-subtitle class="pb-0">
              {{psychology.name}}
            </v-card-subtitle>
            <v-card-text class="text--primary">
              <div>{{ psychology.email}}</div>
            </v-card-text>
            <!-- BOTONES CARDS-->
            <v-card-actions>
              <v-btn color="primary" text @click="psychologistDialog(psychology)">More</v-btn>
              <v-btn color="primary" text :to="{name: 'dashboard_patient'}" >Schedule</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

  <template>
    <!--DIALOG INFO PSICOLOGO SELECCIONADO-->
    <v-dialog v-model="dialog" width="400" v-if="selectedPsychologist!=null" persistent>
      <v-card>
        <v-col align="center">
          <v-avatar width="100" height="100">
            <v-img :src="selectedPsychologist.img"></v-img>
          </v-avatar>
        </v-col>
        <v-card-title class="justify-center">{{ selectedPsychologist.name }}</v-card-title>
        <v-card-subtitle class="text-center">CMP: {{ selectedPsychologist.cmp }}</v-card-subtitle>
        <v-card-text class="text-justify">{{ selectedPsychologist.about }}</v-card-text>
        <v-container>
          <v-layout>
            <v-flex>
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

  </v-container>
</template>

<script>

import PublicationsApiService from "../../core/services/publications-api-service"
import PsychologistsApiService from "../../core/services/psychologists-api.service"
import PatientApiService from "../../core/services/patient-api-service"

export default {
  name: "homepage",
  data: () => ({

    publications: [],
    psychologists: [],
    loginData: [],
    tags: [],
    userId: 0,
    dialog: false,
    selectedPsychologist: null,
    colors: [
      '#03A9F4',
      '#03A9F4',
    ],
    slides: [
        'Up to 20% discount on the dating package !!!',
        'Schedule with our new psychologists!'
    ],
    buttons: [
        'Agenda aquí',
    ],
    items: [
      {text: 'Psychologists', routeName: 'dashboard_patient'},
      {text: 'Help Center', route: '/centro de ayuda'},
      {text: 'Guide', route: '/guia'}
    ],
    specialties: [
        'Terapias de pareja',
        'Autoestima',
        'Ansiedad'
    ]

  }),
  async created() {
    this.userId = this.$route.params.id;
    try {
      const response = await PublicationsApiService.getAll();
      const response2 = await PsychologistsApiService.getAll();
      const response3 = await PublicationsApiService.getTags();
      const response4 = await PatientApiService.getById(this.userId);
      this.publications = response.data;
      this.psychologists = response2.data;
      this.tags = response3.data;
      console.log(this.tags);
      this.loginData = response4.data;
    }
    catch (e)
    {
      console.error(e);
    }
  },

  methods:{
    redirectToPublication(publicationId) {
      this.$router.push({name:'patient-publication', params:{id: publicationId}})
    },

    retrieveTags() {
      return PublicationsApiService.getTags();
    },

    psychologistDialog(psychologist){
      console.log('psychologistDialog psychologist:', psychologist);
      this.selectedPsychologist = psychologist;
      this.dialog = true;
    },

    redirectTo(router, id) {
      this.$router.push({name: router, params:{id: id}})
    }
  }
}
</script>

<style scoped>
.pat {
  border-radius: 10%;
}

.carousel_text {
  color: white;

}

</style>