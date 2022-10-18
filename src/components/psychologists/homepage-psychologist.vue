<template>
  <v-container fluid>
  <v-row>
    <v-col cols="2">
      <v-img class="psy" contain :src="loginData.img"></v-img>
      <v-card class="rounded-xl">
        <v-card-title class="mt-4">Welcome: {{loginData.name}}</v-card-title>
      </v-card>
      <v-spacer class="my-5"></v-spacer>
      <template>
        <v-btn block color="primary" rounded @click="openDialog()">New Post</v-btn>
        <v-dialog v-model="dialog" max-width="800px">
          <v-flex class="mx-auto" v-if="formAdd">
            <v-card class="mb-3 pa-3">
              <v-form @submit.prevent="addPublication">
                <v-text-field label="To post" v-model="defaultPublication.title"></v-text-field>
                <v-textarea label="What do you want to publish?" v-model="defaultPublication.description"></v-textarea>
                <v-btn block color=#BBDEFB type="submit" @click="closeDialog()">Add Published</v-btn>
              </v-form>
            </v-card>
          </v-flex>
        </v-dialog>
      </template>
      <v-divider inset vertical class="mx-4"></v-divider>
      <v-sheet elevation="8" class="pa-2" rounded="xl" color=white>
        <v-list shaped >
          <v-list-item v-for="item in items" :key="item.text" @click="redirectTo(item.routeName, userId)">
            <v-list-item-content >
              <v-list-item-title>
                {{item.text}}
                <v-divider></v-divider>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>

      <v-col lg="8">
        <v-carousel height="20vh"  hide-delimiter-background show-arrows-on-hover rounded = "lg">
          <v-carousel-item class="flex xl12" v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="carousel_text text-h5 white--text font-weight-medium">
                  {{ slide }}
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
        <v-divider inset vertical></v-divider>
        <!-- CONTENIDO PARA EDIT PUBLICACION -->
        <v-flex class="mx-auto" v-if="!formEdit">
          <v-card class="mb-3 pa-3">
            <v-form @submit.prevent="editPublication">
              <v-text-field label="To post" v-model="editedPublication.title"></v-text-field>
              <v-textarea label="What do you want to publish?" v-model="editedPublication.description"></v-textarea>
              <v-btn block color="primary" type="submit">Edit Published</v-btn>
            </v-form>
          </v-card>
        </v-flex>

        <v-divider inset vertical></v-divider>

        <v-flex class="mx-auto">
          <v-card class="mb-3" v-for="publication in publications" :key="publication">
              <v-row
                  align="center"
                  class="ml-4 mt-4"
                  no-gutters
              >
                <v-avatar size="40">
                  <img
                      alt="user"
                      :src="publication.psychologist.img"
                  >
                </v-avatar>
                <p class="ml-2 mt-4">{{publication.psychologist.name}}</p>
              </v-row>
            <v-divider></v-divider>
            <v-card-title>{{publication.title}}</v-card-title>
            <v-card-text>
              <p class="black--text">{{publication.description}}</p>
              <v-row class="ml-0">
                <v-chip-group  v-for="tag in tags" :key="tag">
                  <v-chip v-if="tag.publication.id === publication.id" color="primary" outlined>{{tag.text}}</v-chip>
                </v-chip-group>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="white" @click="openDialogTag(publication.id)">Add Tags</v-btn>
              <v-btn color="white" @click="editChanges(publication)">Edit</v-btn>
              <v-btn color="primary" @click="deletePost(publication)">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

      </v-col>

      <v-snackbar v-model="snackbar">
        {{ message }}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>



    <v-col lg="2">
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
              <div>{{ psychology.email }}</div>
            </v-card-text>
            <!-- BOTONES CARDS-->
            <v-card-actions>
              <v-btn color="primary" text @click="psychologistDialog(psychology)">More</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <template>
      <!--DIALOG INFO PSICOLOGO SELECCIONADO-->
      <v-dialog v-model="dialogInfo" width="400" v-if="selectedPsychologist!=null" persistent>
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
                  <v-btn @click.stop="dialogInfo=false">Close</v-btn>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
      <!--Fin del Dialog-->
    </template>

    <template>
      <v-dialog v-model="dialogTag" width="400">
        <v-card  class="mb-3 pa-3">
          <v-form @submit.prevent="addTag">
            <v-text-field label="Add Tag" v-model="defaultTag.text"></v-text-field>
            <v-btn block color=#BBDEFB type="submit" @click="closeDialogTag()">Add Tag</v-btn>
          </v-form>
        </v-card>
      </v-dialog>
    </template>

  </v-row>
  </v-container>
</template>

<script>

import PublicationsApiService from "../../core/services/publications-api-service"
import PsychologistsApiService from "../../core/services/psychologists-api.service"

export default {
  name: "homepage-psychologist",
  data: () => ({
    items: [
      {text: 'Patients', routeName:'dashboard_psycho'},
      {text:'Help Center', routeName:'centro de ayuda'},
      {text:'Guide', routeName:'video-call'}
    ],
    colors: [
      '#03A9F4',
      '#03A9F4',
    ],
    slides: [
      'Up to 20% discount on the dating package !!!',
      'Schedule with our new psychologists!'
    ],
    publications: [],
    psychologists: [],
    loginData: [],
    tags: [],
    snackbar: false,
    message: '',
    formAdd: true,
    formEdit: true,
    dialog: false,
    dialogInfo: false,
    dialogTag: false,
    selectedPsychologist: null,

    date: new Date().toISOString(),

    editedIndex: 0,
    deletedIndex: 0,
    userId: "",
    editedPublication:{
      id: 0,
      title: "",
      description: "",
      img: "",
      createdAt: "",
      psychologistId: 0
    },
    defaultPublication: {
      id: 0,
      title: "",
      description: "",
      img: "",
      createdAt: "",
      psychologistId: 0
    },
    defaultTag: {
      text: "",
      publicationId: 0
    }

  }),


  created() {
    this.userId = this.$route.params.id;
    this.retrievePublications();
    this.retrievePsychologists();
  },


  methods: {

     retrievePublications(){
      PublicationsApiService.getByPsychologistId(this.userId)
       .then(response => {
         this.publications = response.data;
         console.log(response.data);
       })
       .catch(e=>{
        console.log(e);
       });

       PublicationsApiService.getTags()
           .then(response => {
             this.tags = response.data;
             console.log(response.data);
           })
           .catch(e=>{
             console.log(e);
           });
    },

    retrievePsychologists(){
      PsychologistsApiService.getAll()
          .then(response => {
            this.psychologists = response.data;
            console.log(response.data);
          })
          .catch(e=>{
            console.log(e);
          });

      PsychologistsApiService.getById(this.userId)
          .then(response => {
            this.loginData = response.data;
            console.log(response.data);
          })
          .catch(e=>{
            console.log(e);
          });

    },


    async addPublication(){
      if(this.defaultPublication.title === '' || this.defaultPublication.description === '') {
        this.snackbar = true
        this.message = 'Llena todos los campos'
      }
      else {
        this.defaultPublication.createdAt = this.date
        this.defaultPublication.img = "https://www.dzoom.org.es/wp-content/uploads/2017/07/seebensee-2384369-810x540.jpg"
        this.defaultPublication.psychologistId = this.userId
        await PublicationsApiService.create(this.defaultPublication)
        // this.publications.push(this.defaultPublication)

        const response = await PublicationsApiService.getByPsychologistId(this.userId)
        console.log(this.userId);


        this.publications = response.data;
        //this.$forceUpdate();
       // this.retrievePublications()
        //this.closeDialog();
        //this.snackbar = true;
        //this.message = 'Added post';
      }

    },

    openDialog(){
       this.dialog = true;
    },

    closeDialog(){
      this.dialog = false;
    },

   openDialogTag(publicationId){
      this.dialogTag = true;
      this.defaultTag.publicationId = publicationId;
    },

    closeDialogTag(){
      this.dialogTag = false;
    },

    async addTag(){
      await PublicationsApiService.createTag(this.defaultTag);
      const response = await PublicationsApiService.getTags();
      this.tags = response.data;
    },

    editChanges(item){
      this.formEdit = false;
      this.editedIndex = this.publications.indexOf(item);
      this.editedPublication = Object.assign({}, item);
    },

    editPublication(){
      this.formEdit = true;
      Object.assign(this.publications[this.editedIndex], this.editedPublication);
      PublicationsApiService.update(this.editedPublication.id, this.editedPublication);
      this.snackbar = true;
      this.message = 'Post edited successfully';
    },

    deletePost(item) {
      this.deletedIndex = this.publications.indexOf(item);
      PublicationsApiService.delete(item.id);
      this.publications.splice(this.deletedIndex, 1);
    },

    psychologistDialog(psychologist){
      console.log('psychologistDialog psychologist:', psychologist);
      this.selectedPsychologist = psychologist;
      this.dialogInfo = true;
    },

    redirectTo(router, id) {
      this.$router.push({name: router, params:{id: id}})
    }

  }
}
</script>

<style scoped>
.psy {
  border-radius: 10%;
}



</style>