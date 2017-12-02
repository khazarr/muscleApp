
<template>

<v-ons-page @click="onTap">
    <section class="margin16">


        <!-- STILL TO DO
        <v-ons-col>Current Excercise</v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col>{{workoutSteps[currentStep]}}</v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col>Tap to start</v-ons-col>
        </v-ons-row> -->
<!--
        <v-ons-progress-bar :value="20"></v-ons-progress-bar>
        <v-ons-button modifier="large" class="button-margin" @click="onNextWorkoutStep">Next workout step</v-ons-button> -->

        <div class="tap-to-start" v-if="firstTimeInteracting">
          Tap anywhere to start
        </div>


        <v-ons-button v-if="!breakStarted && totalWorkoutStarted" modifier="large" class="button-margin break-btn" @click="onBreakStart">Break time!</v-ons-button>


        <div v-if="breakEnded">
          <v-ons-list-header class="keep-going">Keep it!</v-ons-list-header>
        </div>

        <div v-if="breakStarted">
          <v-ons-list-header class="keep-going">Wait for it</v-ons-list-header>
        </div>


        <div class="break-display" v-if="breakStarted || breakEnded">
          <div v-if="breakTimeMinutes > 0">
            <span v-if="breakTimeMinutes < 10">0</span><span v-html="breakTimeMinutes"></span>
          </div>
          <div>
            <span v-if="breakTimeSeconds < 10">0</span><span v-html="breakTimeSeconds"></span>
          </div>
        </div>


            <v-ons-col><span class="break-counter" v-if="false" v-html="breakTimeDisplay">00:00</span></v-ons-col>





    </section>
    <section class="margin16">
      <v-ons-list modifier="inset">
        <v-ons-list-item modifier="longdivider">
          <div class="center">
            Total workout time
          </div>
            <div class="right" v-html="totalWorkoutTime">00:00</div>
          </v-ons-list-item>
        <v-ons-list-item modifier="longdivider">
          <div class="center">
            break
          </div>
          <div class="right">
            <v-ons-button @click="addTenSecToBreak" class="break-control-btn">+10s </v-ons-button>
            <v-ons-button @click="onBreakResetBtn" class="break-control-btn">↻ </v-ons-button>
            <v-ons-button @click="onBreakStopBtn" class="break-control-btn">◾ </v-ons-button>
          </div>

          </v-ons-list-item>
        <v-ons-list-item modifier="longdivider" v-if="!firstTimeInteracting">
          <div class="center">
            workout
          </div>
          <div class="right">
            <v-ons-button v-if="!totalWorkoutStarted " @click="onWorkoutStartBtn" class="break-control-btn">▶</v-ons-button>
            <v-ons-button v-if="totalWorkoutStarted" @click="onWorkoutStopBtn" class="break-control-btn">▮▮</v-ons-button>
            <v-ons-button  @click="onWorkoutResetBtn" class="break-control-btn">↻ </v-ons-button>
          </div>
          </v-ons-list-item>
      </v-ons-list>
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
          breakTimeSeconds: 11,
          breakTimeMinutes: 0,
          breakTimeDisplay: '01:00',
          breakStarted: false,
          breakEnded: false,
          breakInterval: null,
          firstTimeInteracting: true,
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
    computed: {
      userBreakTime () {
        return this.$store.getters.getUserBreakTime
      }
    },
    mounted () {
      let min,sec
      [min,sec] = this.secondsToMinAndSeconds(this.userBreakTime)
      this.breakTimeSeconds = sec
      this.breakTimeMinutes = min
    },
    methods: {
      onTap () {
        if(this.firstTimeInteracting) {
          this.workoutStart()
          this.totalWorkoutStarted = !this.totalWorkoutStarted
          this.firstTimeInteracting = false
        }
      },
      onBreakStart () {
        let min,sec
        [min,sec] = this.secondsToMinAndSeconds(this.userBreakTime)
        this.breakTimeSeconds = sec
        this.breakTimeMinutes = min
        this.breakStarted = true
        this.breakEnded = false
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

        if(this.breakEnded) {
          this.breakTimeAdder()
        }

      },
      breakTimeSubstractor () {
        this.breakTimeSeconds--
        if (this.breakTimeSeconds === 0 && this.breakTimeMinutes === 0) {
          console.log('break over!')

          this.breakStarted = false
          this.breakEnded = true
        }
        if (this.breakTimeSeconds <= 0) {
          this.breakTimeSeconds = 60
          this.breakTimeMinutes--
        }
        this.breakTimeDisplayer()
      },
      breakTimeAdder () {
          this.breakTimeSeconds++
          if (this.breakTimeSeconds >= 60) {
            this.breakTimeSeconds = 0
            this.breakTimeMinutes++
          }
      },
      totalWorkoutTimeDisplay () {
        this.totalWorkoutTime =  (this.totalWorkoutMinutes < 10 ? '0' : '') + this.totalWorkoutMinutes + ':' + (this.totalWorkoutSeconds < 10 ? '0' : '') + this.totalWorkoutSeconds
      },
      breakTimeDisplayer () {
        this.breakTimeDisplay = (this.breakTimeMinutes < 10 ? '0' : '') + this.breakTimeMinutes + ':' + (this.breakTimeSeconds < 10 ? '0' : '') + this.breakTimeSeconds
      },
      secondsToMinAndSeconds (input) {
        const min = Math.floor(input/60)
        const sec = input % 60
        return [min,sec]
      },
      addTenSecToBreak () {
        this.breakTimeSeconds += 10
      },
      onWorkoutStartBtn () {
        this.workoutStart()
        this.totalWorkoutStarted = true
      },
      onWorkoutStopBtn () {
        console.log('stop btn')
        console.log(this.totalWorkoutInterval)
        clearInterval(this.totalWorkoutInterval)
        console.log(this.totalWorkoutInterval)
        this.workoutStop()
        this.totalWorkoutStarted = false
      },
      onWorkoutResetBtn () {
        this.workoutStop()
        this.totalWorkoutTime = '00:00'
        this.totalWorkoutSeconds = 0
        this.totalWorkoutMinutes = 0
        this.totalWorkoutStarted = false
      },
      onBreakStopBtn () {
        this.breakTimeSeconds = 0
        this.breakTimeMinutes = 0
        this.breakStarted = false
        this.breakEnded = true
      },
      onBreakResetBtn () {
        this.onBreakStart()
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

.break-btn {
  background: #003366;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 25px;
  margin-bottom: 10px;
}

.break-display {
  text-align: center;
  font-size: 245px;
  line-height: 0.8;
}

.keep-going{
  font-size: 29px;
  font-weight: 800;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.tap-to-start{
  text-align: center;
  font-size: 30px;
  margin-top: 30px;

}

.break-control-btn{
  background: #004c99;
  padding: 0px 22px;
  margin: 0px 2px;
}
</style>
