<template>
  <div class="alarm_box" :class="{hide: isHide}">
    <img src="../assets/alarm.svg" class="alarm_style">
    <p style="color:#fff;text-align:center;font-size:25px;">警报：志愿者{{volunteer.name}}上传的甄别照片相似度达{{similarity}}%</p>
    <p style="color:#fff;text-align:center;font-size:25px;">联系电话:{{volunteer.telephone}}</p>
    <div style="display:flex;justify-content:center;">
      <el-button type="info" @click="close">我知道了</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alarm",
  props: ["isHide", "volunteer", "similarity"],
  methods: {
    close: function() {
      this.$emit("close")
    }
  }
}
</script>

<style scoped>
.alarm_box {
  width: 100%;
  background-color: #000;
  position: absolute;
  top: 0;
  z-index: 100;
  opacity: 0.8;
}

.alarm_style {
  width: 24%;
  margin-left: 38%;
  margin-top: 5%;
}

.hide {
  display: none;
}
</style>
