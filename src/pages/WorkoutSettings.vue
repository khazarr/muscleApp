
<template>

<v-ons-page>
  <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <section class="margin16">
      <v-ons-row>
          <v-ons-col>Select break time</v-ons-col>
      </v-ons-row>
      <v-ons-select style="width: 100%"
           v-model="selectedBreakTime"
           v-on:change="onChange"
         >
         <option
          v-for="time in breakTimes"
          :value="time.totalSec">
           {{time.min}} : {{time.sec}}
         </option>
       </v-ons-select>
    </section>

    <!-- https://github.com/phoenixwong/vue2-timepicker -->
</v-ons-page>

</template>

<script>

export default {
  data () {
    return {
      selectedBreakTime: ''
    }
  },
  computed: {
    breakTimes () {
      return this.$store.getters.getBreakTimes.map(time => {
        return this.secondsToMinAndSeconds(time)
      })
    }
  },
  mounted () {
    this.selectedBreakTime = this.$store.getters.getUserBreakTime
  },
  methods: {
    secondsToMinAndSeconds (input) {
      let min = Math.floor(input/60)
      let sec = input % 60
      min = min < 10 ? '0' + min : '' + min
      sec = sec < 10 ? '0' + sec : '' + sec

      // return [min,sec,input]
      return {
        min: min,
        sec: sec,
        totalSec: input
      }
    },
    onChange () {
      console.log(this.selectedBreakTime)
      this.$store.commit('setUserBreakTime', this.selectedBreakTime)
    }
  }
};

</script>

<style scoped>

.margin16 {
  padding: 16px;
}
</style>
