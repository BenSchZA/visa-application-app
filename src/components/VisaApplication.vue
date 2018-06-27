<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3 my-3>
        <v-card>
          <v-card-title class="headline">
            Visa Application
          </v-card-title>
          <v-card-title v-if="$store.state.contractAddress">
            Contract Address: {{$store.state.contractAddress}}
          </v-card-title>
          <v-card-media src="http://www.cousineisland.com/wp-content/uploads/2018/01/cousine-island-2-home.jpg" height="200px">
          </v-card-media>
          <v-stepper v-model="$store.state.applicationProcess">
            <v-stepper-header>
              <v-stepper-step :complete="$store.state.applicationProcess > 1" step="1">Enter personal details</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="$store.state.applicationProcess > 2" step="2">Supply travel plans</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">Submit visa application</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">

                <v-form ref="personalDetailsForm" v-model="personalDetailsValid" lazy-validation>
                  <v-text-field
                    name="name"
                    v-model="name"
                    :rules="nameRules"
                    label="Name"
                    required
                    :disabled="$store.state.inTransaction"
                  ></v-text-field>
                  <v-text-field
                    name="id"
                    v-model="id"
                    :rules="idRules"
                    label="ID"
                    required
                    :disabled="$store.state.inTransaction"
                  ></v-text-field>
                  <v-menu
                    ref="bdMenu"
                    :close-on-content-click="false"
                    v-model="bdMenu"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="birthDate"
                      label="Birthday date"
                      prepend-icon="event"
                      :rules="birthDateRules"
                      readonly
                      required
                      :disabled="$store.state.inTransaction"
                    ></v-text-field>
                    <v-date-picker
                      ref="picker"
                      v-model="birthDate"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1900-01-01"
                      @change="saveBd"
                    ></v-date-picker>
                  </v-menu>
                </v-form>

                <v-btn :disabled="!personalDetailsValid" color="primary" @click.native="submitPersonalDetails">Continue</v-btn>
                <v-btn @click="cancelPersonalDetails">Cancel</v-btn>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-form ref="travelDetailsForm" v-model="travelDetailsValid" lazy-validation>
                  <v-text-field
                    name="name"
                    prepend-icon="local_airport"
                    v-model="destination"
                    :rules="destinationRules"
                    label="Destination"
                    required
                    :disabled="$store.state.inTransaction"
                  ></v-text-field>
                  <v-menu
                    ref="arrMenu"
                    :close-on-content-click="false"
                    v-model="arrMenu"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="arrivalDate"
                      label="Arrival date"
                      prepend-icon="event"
                      :rules="arrivalDateRules"
                      readonly
                      required
                      :disabled="$store.state.inTransaction"
                    ></v-text-field>
                    <v-date-picker
                      ref="arrivalDatePicker"
                      v-model="arrivalDate"
                      :min="new Date().toISOString().split('T')[0]"
                      @change="saveArr"
                    ></v-date-picker>
                  </v-menu>
                  <v-menu
                    ref="depMenu"
                    :close-on-content-click="false"
                    v-model="depMenu"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="departureDate"
                      label="Departure date"
                      prepend-icon="event"
                      :rules="departureDateRules"
                      readonly
                      required
                      :disabled="$store.state.inTransaction"
                    ></v-text-field>
                    <v-date-picker
                      ref="departureDatePicker"
                      v-model="departureDate"
                      :min="new Date().toISOString().split('T')[0]"
                      @change="saveDep"
                    ></v-date-picker>
                  </v-menu>
                </v-form>

                <v-btn :disabled="!travelDetailsValid" color="primary" @click.native="submitTravelDetails">Continue</v-btn>
                <v-btn @click="cancelTravelDetails" flat>Cancel</v-btn>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click.native="submitApplication">Submit</v-btn>
                <v-btn flat @click="cancelApplication">Cancel</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="$store.state.metaMaskDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <div class="headline">We use MetaMask to sign our contracts</div>
          <span>Please install the <a href="https://metamask.io/">MetaMask plugin</a> to continue.</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="$store.commit('closeMetaMaskDialog')">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      :bottom="true"
      :multi-line="false"
      :vertical="false"
      v-model="$store.state.snackbar"
    >
      {{ $store.state.snackbarText }}
      <v-btn flat color="primary" @click.native="$store.commit('hideSnackbar')">{{ $store.state.snackbarAction }}</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import Contract from '../contract/contract'

  export default {
    name: "VisaApplication",
    watch: {
      bdMenu(val) {
        val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      depMenu(val) {
        val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      arrMenu(val) {
        val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    data () {
      return {
        showSnackbar: false,
        el: 0,
        bdMenu: false,
        depMenu: false,
        arrMenu: false,
        personalDetailsValid: false,
        travelDetailsValid: false,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 20) || 'Name must be less than 20 characters'
        ],
        id: '',
        idRules: [
          v => !!v || 'ID is required',
          v => /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/.test(v) || 'Must be valid South African ID number'
        ],
        birthDate: null,
        birthDateRules: [
          v => !!v || 'Birth date is required',
          v => !isNaN(Date.parse(v)) || 'Invalid birth date'
        ],
        destination: '',
        destinationRules: [],
        arrivalDate: null,
        arrivalDateRules: [
          v => !!v || 'Arrival date is required',
          v => !isNaN(Date.parse(v)) || 'Invalid arrival date',
          v => !this.departureDate || Date.parse(v) < Date.parse(this.departureDate)
        ],
        departureDate: null,
        departureDateRules: [
          v => !!v || 'Departure date is required',
          v => !isNaN(Date.parse(v)) || 'Invalid departure date',
          v => !this.arrivalDate || Date.parse(this.arrivalDate) < Date.parse(v),
        ],
      }
    },
    methods: {
      saveBd(date) {
        this.$refs.bdMenu.save(date)
      },
      saveArr(date) {
        this.$refs.arrMenu.save(date)
      },
      saveDep(date) {
        this.$refs.depMenu.save(date)
      },
      submitPersonalDetails() {
        if (!this.$store.getters.web3) {
          this.$store.commit('openMetaMaskDialog');
          return
        }

        if (this.$refs.personalDetailsForm.validate()) {
          let _id = Number(this.id);
          let _birthDate = new Date(`${this.birthDate}Z`).getTime();

          let contract = new Contract(this.name, _id, _birthDate);
          this.$store.commit('setContract', contract);
        }
      },
      cancelPersonalDetails() {
        this.$refs.personalDetailsForm.reset()
      },
      submitTravelDetails() {
        if (!this.$store.getters.web3) {
          this.$store.commit('openMetaMaskDialog');
          return
        }

        if (this.$refs.travelDetailsForm.validate()) {
          let _arrivalDate = new Date(`${this.arrivalDate}Z`).getTime();
          let _departureDate = new Date(`${this.departureDate}Z`).getTime();

          this.$store.state.contract.apply(this.destination, _arrivalDate, _departureDate);
        }
      },
      cancelTravelDetails() {

      },
      submitApplication() {
        if (!this.$store.getters.web3) {
          this.$store.commit('openMetaMaskDialog');
          return
        }
        this.$store.state.contract.submit();
      },
      cancelApplication() {

      }
    }
  }
</script>

<style scoped>

</style>
