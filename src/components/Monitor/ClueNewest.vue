<template>
  <div class="clue_container">
    <div v-for="i in 10" :key="i">
      <p class="clue_content">黄希希:询问路人，老人疑似经过工业园区</p>
      <hr style="color:#b8b8b7">
    </div>
  </div>
</template>

<script>
export default {
  name: "ClueNewest",
  data() {
    return {}
    }
  }
</script>

<style scoped>
.clue_container{
  height:180px;
}
.clue_content {
  font-size: 6px;
}
</style>
