<template>
  <div>
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-card max-height="400" max-width="400" elevation="10">
              <v-img :src="profileData.img" max-height="400" max-width="400"></v-img>
            </v-card>
            <v-card class="mt-2" elevation="10">
              <v-card-title class="justify-center" style="font-size:2em">{{ profileData.name }}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-card elevation="10">
              <v-card-title class="ml-5" style="font-size:2em">Perfil del psicologo</v-card-title>
              <v-row class="mb-2">
                <v-col cols="12" md="6">
                  <v-card-title class="ml-10 mr-10 mb-2">Full name</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.name }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Birthday</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.age }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">DNI</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.dni }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Phone</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.phone }}</v-card-subtitle>
                </v-col>
                <v-divider inset vertical></v-divider>
                <v-col cols="12" md="6">
                  <v-card-title class="ml-10 mr-10 mb-2">E-mail</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.email }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Gender</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.genre }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Session Type</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{profileData.sessionType }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">CMP</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.cmp }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12">
                  <v-card-title class="ml-10 mr-10 mb-2">Specialization</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{profileData.specialization }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12">
                  <v-card-title class="ml-10 mr-10 mb-2">Formation</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{profileData.formation }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12">
                  <v-card-title class="ml-10 mr-10 mb-2">About</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.about }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-card-actions>
                <v-row>
                  <v-btn class="ma-6" color="#BBDEFB" elevation="2" @click="editProfile(profileData)">Editar perfil</v-btn>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <template>
      <v-dialog v-model="dialog" persistent max-width="500px" v-if="correct!=null">
        <v-card>
          <v-card-title>
            <span class="text-h5">Perfil del psicólogo</span>
          </v-card-title>
          <v-card-text>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8">
                <v-form>
                  <v-text-field
                      outlined dense color="blue"
                      class="mt-16"
                      v-model="name"
                      :error-messages="nameErrors"
                      :counter="30"
                      label="Name"
                      prepend-icon="mdi-account-details"
                      required
                      @input="$v.name.$touch()"
                      @blur="$v.name.$touch()"
                  ></v-text-field>
                  <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          outlined dense color="blue"
                          v-model="age"
                          :error-messages="ageErrors"
                          required
                          label="Birthday date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          @input="$v.age.$touch()"
                          @blur="$v.age.$touch()"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="age"
                        :active-picker.sync="activePicker"
                        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                        min="1950-01-01"
                        @change="save"
                    ></v-date-picker>
                  </v-menu>
                  <v-text-field
                      outlined dense color="blue"
                      v-model="dni"
                      :error-messages="dniErrors"
                      :counter="9"
                      label="DNI"
                      prepend-icon="mdi-cellphone"
                      required
                      @input="$v.dni.$touch()"
                      @blur="$v.dni.$touch()"
                  ></v-text-field>
                  <v-text-field
                      outlined dense color="blue"
                      v-model="img"
                      :error-messages="imgErrors"
                      :counter="6"
                      label="CMP Number"
                      prepend-icon="mdi-cellphone"
                      required
                      @input="$v.img.$touch()"
                      @blur="$v.img.$touch()"
                  ></v-text-field>
                  <v-text-field
                      outlined dense color="blue"
                      v-model="email"
                      :error-messages="emailErrors"
                      label="E-mail"
                      prepend-icon="mdi-at"
                      required
                      @input="$v.email.$touch()"
                      @blur="$v.email.$touch()"
                  ></v-text-field>
                  <v-text-field
                      outlined dense color="blue"
                      v-model="phone"
                      :error-messages="phoneErrors"
                      :counter="9"
                      label="Phone Number"
                      prepend-icon="mdi-cellphone"
                      required
                      @input="$v.phone.$touch()"
                      @blur="$v.phone.$touch()"
                  ></v-text-field>
                  <v-text-field
                      outlined dense color="blue"
                      v-model="cmp"
                      :error-messages="cmpErrors"
                      :counter="6"
                      label="CMP Number"
                      prepend-icon="mdi-cellphone"
                      required
                      @input="$v.cmp.$touch()"
                      @blur="$v.cmp.$touch()"
                  ></v-text-field>
                  <v-select
                      outlined dense color="blue"
                      v-model="genre"
                      :items="itemsGenre"
                      :error-messages="genreErrors"
                      label="Genre"
                      prepend-icon="mdi-human"
                      required
                      @change="$v.genre.$touch()"
                      @blur="$v.genre.$touch()"
                  ></v-select>
                  <v-select
                      outlined dense color="blue"
                      v-model="sessionType"
                      :items="itemsSession"
                      :error-messages="sessionErrors"
                      label="Genre"
                      prepend-icon="mdi-human"
                      required
                      @change="$v.sessionType.$touch()"
                      @blur="$v.sessionType.$touch()"
                  ></v-select>
                  <v-textarea
                      outlined dense color="blue"
                      v-model="specialization"
                      :error-messages="specializationErrors"
                      :counter="200"
                      label="Specialization"
                      prepend-icon="mdi-account-details"
                      required
                      @input="$v.specialization.$touch()"
                      @blur="$v.specialization.$touch()"
                  ></v-textarea>
                  <v-textarea
                      outlined dense color="blue"
                      v-model="formation"
                      :error-messages="formationErrors"
                      :counter="200"
                      label="Formation"
                      prepend-icon="mdi-account-details"
                      required
                      @input="$v.formation.$touch()"
                      @blur="$v.formation.$touch()"
                  ></v-textarea>
                  <v-textarea
                      outlined dense color="blue"
                      v-model="about"
                      :error-messages="aboutErrors"
                      :counter="400"
                      label="About"
                      prepend-icon="mdi-account-details"
                      required
                      @input="$v.about.$touch()"
                      @blur="$v.about.$touch()"
                  ></v-textarea>
                </v-form>
              </v-col>
            </v-row>
            <small class="ml-3">*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Cerrar</v-btn>
            <v-btn color="blue darken-1" text @click="saveProfile()">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import PsychologistsApiService from "../../core/services/psychologists-api.service";
import {validationMixin} from "vuelidate";
import {email, maxLength, required} from "vuelidate/lib/validators";

export default {
  name: "psychologist-profile",
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(50)},
    age: { required },
    email: { required, email },
    phone: { required, maxLength: maxLength(9) },
    dni: { required, maxLength: maxLength(8) },
    genre: { required },
    sessionType: { required },
    specialization: { required },
    formation: { required },
    about: { required },
    cmp: { required, maxLength: maxLength(8) },
    img: {required},
  },
  data: () => ({
    psychologists: [],
    profileData: [],
    dataUser: {},
    userId: 0,
    dialog: false,
    correct: null,
    date: null,
    age: null,
    activePicker: null,
    menu: false,
    itemsGenre: [
      'Male',
      'Female',
      'Others',
    ],
    itemsSession: [
     'Individual',
     'Couple',
    ]
  }),

  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },

  async created() {
    this.userId = this.$route.params.id;
    try {
      const response = await PsychologistsApiService.getAll();
      const response2 = await PsychologistsApiService.getById(this.userId);
      this.psychologists = response.data;
      this.profileData = response2.data;
    } catch (e) {
      console.error(e);
    }

    this.dialog = false;
  },

  methods: {
    editProfile(select){
      this.correct = select;
      this.name = this.profileData.name;
      this.age = this.profileData.age;
      this.email = this.profileData.email;
      this.phone = this.profileData.phone;
      this.dni = this.profileData.dni;
      this.genre = this.profileData.genre;
      this.sessionType = this.profileData.sessionType;
      this.specialization = this.profileData.specialization;
      this.formation = this.profileData.formation;
      this.about = this.profileData.about;
      this.cmp = this.profileData.cmp;
      this.img = this.profileData.img;
      this.dialog = true;
    },

    saveProfile() {
      this.profileData.name = this.name;
      this.profileData.email = this.email;
      this.profileData.age = this.age;
      this.profileData.phone = this.phone;
      this.profileData.dni = this.dni;
      this.profileData.genre = this.genre;
      this.profileData.sessionType = this.sessionType;
      this.profileData.specialization = this.specialization;
      this.profileData.formation = this.formation;
      this.profileData.about = this.about;
      this.profileData.cmp = this.cmp;
      this.profileData.img = this.img;
      PsychologistsApiService.update(this.profileData.id, this.profileData);
      this.dialog = false;
    },

    save (date) {
      this.$refs.menu.save(date)
    }
  }
}
</script>

<style scoped>
.dateProfile {
  margin-left: 40px;
}
</style>