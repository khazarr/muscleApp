
<template>

<v-ons-page>
    <section class="margin16">
        <v-ons-list v-if="currentStep == 0">
            <v-ons-list-header modifier="longdivider">
              Dynamic Stretches to get the joints nice and loose <br />
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

        <v-ons-list class="workout-list" v-if="currentStep == 0">
            <v-ons-list-header modifier="longdivider">
              Bodyline Drills to fire up your core and reinforce proper positions. <br />
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
      }
    },
    created () {
      console.log('haltko')
      console.log(this.$store.getters.getStretches)
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
</style>
