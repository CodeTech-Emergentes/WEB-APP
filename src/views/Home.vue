<template>
  <div class="justify-center">
    <v-row>
      <v-col cols="12" sm="6">
        <v-card  class="mx-auto" max-width="400">
          <v-img class="align-end" height="200px" contain src="https://img.freepik.com/premium-vector/nutritionist-she-smiled-brightly-has-shown-healthy-fruits-vegetables-concept-health-care-diet_610956-55.jpg?w=2000">
          </v-img>
          <v-card-title class="justify-center">Nutritionist</v-card-title>
          <v-card-text class="text--primary">
            Join the leading online therapy platform and help thousands of people take care of their diet to improve their health and create diets and nutritional plans adapted to their needs.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn rounded color="primary" dark plain to="/login_nutritionist" >
              log in
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card  class="mx-auto" max-width="400">
          <v-img class="align-end" height="200px" src="https://static.vecteezy.com/system/resources/previews/000/608/116/non_2x/vector-medical-concept-with-doctor-and-patients-in-flat-cartoon-at-hospital-hall.jpg">
          </v-img>
          <v-card-title class="justify-center">Patient</v-card-title>
          <v-card-text class="text--primary">
            Nutritionist is ideal when we have experienced unresolved trauma, are in discomfort, have a lack of control over our life or our emotions, or simply want to improve and develop fully.          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn rounded color="primary" dark plain to="/login_patient" >
              log in
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>


<script>


export default {
  name: 'Home',
}
</script>