<template>
  <div>
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="6" md="8">
            <v-card elevation="10">
              <v-card-title class="ml-5" style="font-size:2em">Detalles de tu Cita</v-card-title>
              <v-row class="mb-2">
                <v-col cols="12" md="9">
                  <v-card-title class="ml-10 mr-10 mb-2">TERAPEUTA</v-card-title>
                  <v-card-subtitle class="ml-10" style="font-size:18px">{{psychologists.name}}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">NOMBRE DEL PACIENTE</v-card-title>
                  <v-card-subtitle class="ml-10" style="font-size:18px">{{loginData.firstName +" "+ loginData.lastName}}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">HORARIO</v-card-title>
                  <v-card-subtitle class="ml-10" style="font-size:18px">{{schedules.time}}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">PHONE</v-card-title>
                  <v-card-subtitle class="ml-10" style="font-size:18px">{{loginData.phone}}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">E-MAIL</v-card-title>
                  <v-card-subtitle class="ml-10" style="font-size:18px">{{loginData.email}}</v-card-subtitle>
                  <v-card-actions>
                    <v-row>
                      <v-col>
                        <stripe-checkout
                            ref="checkoutRef"
                            mode="payment"
                            :pk="publishableKey"
                            :line-items="lineItems"
                            :success-url="successURL"
                            :cancel-url="cancelURL"
                            @loading="v => loading = v"
                        />
                        <v-btn class="text-lg-overline ml-10" align="center" color="#BBDEFB" elevation="2" @click="submit"> Pay now! </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

  </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import PatientApiService from "../../core/services/patient-api-service";
import PsychologistsApiService from "../../core/services/psychologists-api.service";
export default {
  name: "payment",
  components: {
    StripeCheckout,
  },
  data () {
    this.publishableKey = 'pk_test_51Jr9EdFDbJHLEOuuKrrVxAmdDsc1uJPXL2WGeofMmTGcaX8VNFrZFAzZgZiGjJ7g0iyYiVuM6bXcscbCqYTfW06A00dBxdQn3F';
    return {
      loading: false,
      lineItems: [
        {
          price: 'price_1Jr9VMFDbJHLEOuuuz8xBHfH', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: 'http://localhost:8080/',
      cancelURL: 'http://localhost:8080/',

      psychologists: [],
      loginData: [],
      schedules: [],
      userId: 0,
      psychoId: 0,
      scheduleId: 0,
    };
  },

  async created() {
    this.userId = this.$route.params.id;
    this.psychoId = this.$route.params.idPsycho;
    this.scheduleId = this.$route.params.idSchedule;
    console.log(this.userId);
    console.log(this.psychoId);
    console.log(this.scheduleId);
    try {
      const response = await PatientApiService.getById(this.userId);
      const response2 = await PsychologistsApiService.getById(this.psychoId);
      const response3 = await PsychologistsApiService.getByIdSchedule(this.scheduleId);
      this.loginData = response.data;
      this.psychologists = response2.data;
      this.schedules = response3.data;
    } catch (e)
    {
      console.error(e);
    }
  },

  methods: {
    submit () {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },

  },
};
</script>