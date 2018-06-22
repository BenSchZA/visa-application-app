<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3 my-3>
        <v-card>
          <v-card-title class="headline">
            Visa Application
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

                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    name="name"
                    v-model="name"
                    :rules="nameRules"
                    label="Name"
                    required
                  ></v-text-field>
                  <v-text-field
                    name="id"
                    v-model="id"
                    :rules="idRules"
                    label="ID"
                    required
                  ></v-text-field>
                  <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    v-model="menu"
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
                    ></v-text-field>
                    <v-date-picker
                      ref="picker"
                      v-model="birthDate"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-form>

                <v-btn :disabled="!valid" color="primary" @click.native="submitPersonalDetails">Continue</v-btn>
                <v-btn @click="cancelPersonalDetails">Cancel</v-btn>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click.native="$store.commit('setApplicationProcess', 3)">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click.native="">Submit</v-btn>
                <v-btn flat @click="()=>{this.$router.go()}">Cancel</v-btn>
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
          <v-btn color="primary" flat @click.stop="$store.state.commit('closeMetaMaskDialog')">Close</v-btn>
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
      menu(val) {
        val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    data () {
      return {
        showSnackbar: false,
        el: 0,
        menu: false,
        valid: true,
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
        ]
      }
    },
    methods: {
      submitPersonalDetails() {
        if (this.$refs.form.validate()) {
          let _id = Number(this.id);
          let _birthDate = new Date(`${this.birthDate}Z`).getTime();

          // let contract = new Contract(this.name, _id, _birthDate);
          // console.log(contract.methods);
          this.$store.commit('setApplicationProcess', 2)
        }
      },
      cancelPersonalDetails() {
        this.$refs.form.reset()
      },
      save(date) {
        this.$refs.menu.save(date)
      }
    }
  }
</script>

<style scoped>

</style>
