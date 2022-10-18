<template>
  <v-row>
    <v-card class="ml-10 mr-10 mt-10 elevation-6 Card" >
      <v-row>
        <v-col cols="7">
          <h1 class="mt-10 ml-10">{{this.publicationData.title}}</h1>
          <h3 class="mt-10 ml-10">{{this.publicationData.description}}</h3>
          <v-divider inset vertical></v-divider>
          <h4  class="ml-10 mt-8">Autor: {{this.publicationData.psychologist.name}}</h4>
          <h4 class="ml-10 mt-6">Fecha de Publicación: {{ this.publicationData.createdAt.slice(0, 10).replace('T', ' ') }}</h4>
          <p class="ml-10 mt-10">{{this.publicationData.content}}</p>
        </v-col>
        <v-col cols="3">
          <v-divider inset vertical></v-divider>
          <img class="ml-16 pt-5 pb-10 mr-10" width="100%" height="100%" :src="publicationData.img">
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
import PublicationsApiService from "../../core/services/publications-api-service";

export default {
  name: "patient-publication",
  data: () => ({
    publicationId: 0,
    publicationData: [],
  }),

  async created() {
    this.publicationId = this.$route.params.id;
    try {
      const response = await PublicationsApiService.getById(this.publicationId);
      this.publicationData = response.data;
      console.log(this.publicationData.id)
    }
    catch (e)
    {
      console.error(e);
    }
  }
}
</script>


<style scoped>

.Card{
  height: 100%;
  width: 100%;
}
</style>