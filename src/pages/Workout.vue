
<template>

<v-ons-page>
    <section class="margin16">
        <v-ons-list>
            <v-ons-list-header modifier="longdivider">
              {{description.streches}} <br />
            </v-ons-list-header>
            <v-ons-list-item
              modifier="longdivider"
              v-for="excercise in streches"
              :key="excercise.name">
              <div class="center">
                {{excercise.name}}
              </div>
              <div class="right">
                {{excercise.reps}}
              </div>
            </v-ons-list-item>
        </v-ons-list>

        <v-ons-list class="workout-list">
            <v-ons-list-header modifier="longdivider">
               {{description.bodyDrills}} <br />
            </v-ons-list-header>
            <v-ons-list-item
              modifier="longdivider"
              v-for="excercise in bodyDrills"
              :key="excercise.name">
              <div class="center">
                {{excercise.name}}
              </div>
              <div class="right">
                {{excercise.time}}
              </div>
            </v-ons-list-item>
        </v-ons-list>

        <v-ons-list class="workout-list">
            <v-ons-list-header class="list-header" modifier="longdivider">
               {{description.skillWork}} <br />
            </v-ons-list-header>
            <v-ons-list-item
              modifier="longdivider"
              v-for="excercise in skillWork"
              :key="excercise.name">
              <div class="center">
                {{excercise.name}}
              </div>
              <div class="right">
                {{excercise.reps}}
              </div>
            </v-ons-list-item>
        </v-ons-list>

        <v-ons-list class="workout-list">
            <v-ons-list-header class="list-header" modifier="longdivider">
               {{description.strengthWork}} <br />
            </v-ons-list-header>
            <v-ons-list
              modifier="inset"
              v-for="step in strengthWork"
              :key="step.description"
              >
               <v-ons-list-header>{{step.description}}</v-ons-list-header>
               <v-ons-list-item
                modifier="longdivider"
                v-for="excercise in step.excercises"
                :key="excercise.name">
                <div class="center">
                  {{excercise.name}}
                </div>
                <div class="right">
                  {{excercise.reps}}
                </div>
               </v-ons-list-item>
             </v-ons-list>
           </v-ons-list>

    </section>
</v-ons-page>

</template>

<script>

export default {
    data() {
        return {
          currentStep: 0,
          workoutSteps: [
            'dynamic stretches',
            'bodyline drills'
          ],
        }
    },
    methods: {
      onTap () {
        this.currentStep++
      }
    },
    computed: {
      streches () {
        return this.$store.getters.getStretches
      },
      bodyDrills () {
        return this.$store.getters.getBodyDrills
      },
      description () {
        return this.$store.getters.getWorkoutDescriptions
      },
      skillWork () {
        return this.$store.getters.getSkillWork
      },
      strengthWork () {
        return this.$store.getters.getStrengthWork
      }
    },
    created () {
      console.log('haltko')
      console.log(this.$store.getters.getWorkoutDescriptions['bodyDrills'])
    }
};

</script>

<style scoped>

.timer {
    font-size: 100px;
    text-align: center;
}
.margin16 {
  padding: 16px;
}
.right{
  float: right;
}
.workout-list{
  margin-top: 10px;
}
.list-header{
  border-bottom: 1px solid #eceff1;
}
</style>
