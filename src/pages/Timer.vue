
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
        <v-ons-button modifier="large" class="button-margin" @click="onNextWorkoutStep">Next workout step</v-ons-button>
        <v-ons-button v-if="!breakStarted" modifier="large" class="button-margin" @click="onBreakStart">Break time!</v-ons-button>
        <v-ons-row>
            <v-ons-col><span v-if="breakStarted" v-html="breakTimeDisplay">00:00</span></v-ons-col>
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
          totalWorkoutInterval: null,
          totalWorkoutStarted: false,
          breakTimeSeconds: 5,
          breakTimeMinutes: 0,
          breakTimeDisplay: '01:00',
          breakStarted: false,
          breakInterval: null,
          workoutStepTimeArray : [{
            timeStampSec: 0,
            stepDurationInSec: 0
          }],
          workoutStepTimeArrayIndex: 1,
          workoutSteps: [
            'dynamic stretches',
            'bodyline drills'
          ],
        }
    },
    methods: {
      onTap () {
        this.currentStep++
        if(!this.totalWorkoutStarted) {
          this.workoutStart()
          this.totalWorkoutStarted = !this.totalWorkoutStarted
        } else {
          // this.workoutStop()
          // this.totalWorkoutStarted = !this.totalWorkoutStarted
        }

        // PRZEPISZ TO NA TIMEOUTY
      },
      onBreakStart () {
        this.breakStarted = true
      },
      onNextWorkoutStep () {
        this.workoutStepTimeArray[this.workoutStepTimeArrayIndex] = {
          timeStampSec: (this.totalWorkoutMinutes * 60) + this.totalWorkoutSeconds,
          stepDurationInSec: (this.totalWorkoutMinutes * 60) + this.totalWorkoutSeconds - this.workoutStepTimeArray[this.workoutStepTimeArrayIndex - 1].timeStampSec
        }
        this.workoutStepTimeArrayIndex++
        console.log(this.workoutStepTimeArray)
        console.log(this.workoutStepTimeArray[this.workoutStepTimeArrayIndex - 1].stepDurationInSec)
      },
      workoutStart () {
        // this.totalWorkoutInterval = setInterval(this.totalWorkoutTimeAdder,1000)
        this.totalWorkoutInterval = setInterval(this.oneSecInterval,1000)
      },
      workoutStop () {
        clearInterval(this.totalWorkoutInterval)
      },
      totalWorkoutTimeAdder () {
        this.totalWorkoutSeconds++
        if ( this.totalWorkoutSeconds >= 60) {
          this.totalWorkoutSeconds = 0
          this.totalWorkoutMinutes++
        }
        this.totalWorkoutTimeDisplay()
      },
      oneSecInterval () {
        if(this.totalWorkoutStarted) {
          this.totalWorkoutTimeAdder()
        }

        if(this.breakStarted) {
          this.breakTimeSubstractor()
        }
      },
      breakTimeSubstractor () {
        this.breakTimeSeconds--
        if (this.breakTimeSeconds === 0 && this.breakTimeMinutes === 0) {
          console.log('break over!')
          this.breakTimeSeconds = 5
          this.breakTimeMinutes = 0
          this.breakStarted = false
        }
        if (this.breakTimeSeconds <= 0) {
          this.breakTimeSeconds = 60
          this.breakTimeMinutes--
        }
        this.breakTimeDisplayer()
      },
      totalWorkoutTimeDisplay () {
        this.totalWorkoutTime =  (this.totalWorkoutMinutes < 10 ? '0' : '') + this.totalWorkoutMinutes + ':' + (this.totalWorkoutSeconds < 10 ? '0' : '') + this.totalWorkoutSeconds
      },
      breakTimeDisplayer () {
        this.breakTimeDisplay = (this.breakTimeMinutes < 10 ? '0' : '') + this.breakTimeMinutes + ':' + (this.breakTimeSeconds < 10 ? '0' : '') + this.breakTimeSeconds
      },
      halkor () {
        console.log('halkor')
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
