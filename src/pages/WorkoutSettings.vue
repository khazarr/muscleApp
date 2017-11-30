
<template>

<v-ons-page>
  <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <section class="margin16">
      Super ustawionka
    </section>
    <VueTimepicker></VueTimepicker>
    <!-- https://github.com/phoenixwong/vue2-timepicker -->
</v-ons-page>

</template>

<script>
import VueTimepicker from 'vue2-timepicker'
export default {
   components: { VueTimepicker }
};

</script>

<style scoped>

.margin16 {
  padding: 16px;
}
</style>
