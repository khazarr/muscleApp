<template>
  <v-ons-page>

    <div class="logo-parent">
      <img src="../assets/icon.png" class="logo">
    </div>
    <div class="center">
      <div class="header">
        MuscleApp
      </div>
      <div class="subheader">
        Recommended Routine enchancer
      </div>
    </div>

    <v-ons-card v-for="page of pages" :key="page.label"
      @click="push(page.component, page.label)"
    >
      <div class="title">{{ page.label }}</div>
      <div class="content">{{ page.desc }}</div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
// import PullHook from './PullHook.vue';
// import Dialogs from './Dialogs.vue';
// import Buttons from './Buttons.vue';
// import Carousel from './Carousel.vue';
// import InfiniteScroll from './InfiniteScroll.vue';
// import Progress from './Progress.vue';
import WorkoutSettings from './WorkoutSettings.vue';

export default {
  data () {
    return {
      pages: [
        {
          component: WorkoutSettings,
          label: 'Settings',
          desc: 'Adjust parameters of workout.'
        }
      ]
    };
  },

  methods: {
    push(page, key) {
      this.$store.commit('navigator/push', {
        extends: page,
        data() {
          return {
            toolbarInfo: {
              backLabel: 'Home',
              title: key
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.intro {
  text-align: left;
  padding: 0 22px;
  margin-top: 20px;
  font-size: 14px;
  line-height: 1.4;
  color: rgba(0, 0, 0, .54);
}

ons-card {
  cursor: pointer;
  color: #333;
}

.card__title, .card--material__title {
  font-size: 20px;
}

.logo {
  max-width: 200px;
}
.logo-parent {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.center{
  text-align: center;
}
.header{
  font-size: 25px;
}
.subheader{
  margin-bottom: 20px;
}
</style>
