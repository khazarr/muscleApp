
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
    </section>
    <v-ons-progress-bar :value="20"></v-ons-progress-bar>
    <p>
      <v-ons-progress-bar value="20"></v-ons-progress-bar>
    </p>
</v-ons-page>

</template>

<script>

export default {
    data() {
        return {
          currentStep: 0,
          startedTime: '',
          currentTime: '',
          totalWorkoutTime: '00:00',
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
        // PRZEPISZ TO NA TIMEOUTY
      },
      toReadableTime(milisec) {
        const minutes = Math.floor(milisec / 60000)
        const seconds = ((milisec % 60000) /1000)
        const outSeconds = seconds.toString().split('.')[0]
        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + outSeconds
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
