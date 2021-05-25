<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    window.new1 = "";
    window.new2 = "";
    window.new3 = "";
    window.new4 = "";
  },
};
</script>

<style>
</style>
