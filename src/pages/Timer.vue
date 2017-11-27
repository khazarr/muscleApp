
<template>

<v-ons-page @click="onTap">
    <section class="margin16">


        <v-ons-list>
            <v-ons-list-header>
                RR Timer
            </v-ons-list-header>
        </v-ons-list>
        <v-ons-row>
            <v-ons-col class="timer">00:00</v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col>Current Excercise</v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col>{{workoutSteps[currentStep]}}</v-ons-col>
        </v-ons-row>

        <!-- description of current workout step -->


        <v-ons-row>
            <v-ons-col>Tap to start</v-ons-col>
        </v-ons-row>
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
</style>
