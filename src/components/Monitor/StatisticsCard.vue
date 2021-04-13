<template>
  <div class="statistics_container">
    <div class="statistics_box" v-for=" item in status_val" v-bind:key="item.index">
      <div class="status_label">{{item.title}}</div>
      <div>{{item.value}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatisticsCard",
  data() {
    return {
      status_val: [
        { title: "行动状态", value: "进行中" },
        { title: "参与人数", value: "9" },
        { title: "行动时长", value: "16h" },
        { title: "线索总数", value: "13" },
        { title: "消息总数", value: "11" },
        { title: "甄别总数", value: "10" },
      ]
    }
  },
}
</script>

<style scoped>
.statistics_container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}

.statistics_box {
  padding: 25px 0px 0px 0px;
  text-align: center;
  height: 80px;
  width: 100px;
}

.status_label {
  color: #adc0d2;
}
</style>
