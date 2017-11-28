
<template>

<v-ons-page @click="onTap">
    <section class="margin16">

            <v-ons-col>Current Excercise</v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col>{{workoutSteps[currentStep]}}</v-ons-col>
        </v-ons-row>

        <v-ons-row>
            <v-ons-col>Tap to start</v-ons-col>
        </v-ons-row>

        <v-ons-progress-bar :value="20"></v-ons-progress-bar>
        <v-ons-row>
            <v-ons-col>Total workout time <span v-html="totalWorkoutTime">00:00</span></v-ons-col>
        </v-ons-row>
    </section>


</v-ons-page>

</template>

<script>

export default {
    data() {
        return {
          currentStep: 0,
          totalWorkoutTime: '00:00',
          totalWorkoutSeconds: 0,
          totalWorkoutMinutes: 0,
          totalWorkoutTimeout: null,
          workoutSteps: [
            'dynamic stretches',
            'bodyline drills'
          ],
        }
    },
    methods: {
      onTap () {
        this.currentStep++
        this.workoutStart()
        // PRZEPISZ TO NA TIMEOUTY
      },
      toReadableTime(milisec) {
        const minutes = Math.floor(milisec / 60000)
        const seconds = ((milisec % 60000) /1000)
        const outSeconds = seconds.toString().split('.')[0]
        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + outSeconds
      },
      workoutStart () {
        this.totalWorkoutTimeout = setInterval(this.totalWorkoutTimeAdder,1000)
      },
      totalWorkoutTimeAdder () {
        this.totalWorkoutSeconds++
        if ( this.totalWorkoutSeconds >= 60) {
          this.totalWorkoutSeconds = 0
          this.totalWorkoutMinutes++
        }
        this.totalWorkoutTimeDisplay()
        console.log('halko')
      },
      totalWorkoutTimeDisplay () {
        this.totalWorkoutTime =  (this.totalWorkoutMinutes < 10 ? '0' : '') + this.totalWorkoutMinutes + ':' + (this.totalWorkoutSeconds < 10 ? '0' : '') + this.totalWorkoutSeconds
        // this.totalWorkoutTime = (this.totalWorkoutMinutes < 10 ? '0' : '') +  this.totalWorkoutMinutes + ':' (this.totalWorkoutSeconds < 10 ? '0' : '') + this.totalWorkoutSeconds
      }
    }
};

</script>

<style scoped>

.timer {
    font-size: 80px;
    text-align: center;
}
.margin16 {
  padding: 16px;
}
</style>
