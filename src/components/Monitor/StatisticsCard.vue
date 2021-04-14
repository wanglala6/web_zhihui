<template>
  <div class="statistics_container">
    <div
      class="statistics_box"
      v-for="item in status_val"
      v-bind:key="item.index"
    >
      <div class="status_label">{{ item.title }}</div>
      <div>{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatisticsCard",
  data() {
    return {
      status_val: [
        { title: "行动状态", value: "查询中" },
        { title: "参与人数", value: "查询中" },
        { title: "行动时长", value: "查询中" },
        { title: "线索总数", value: "查询中" },
        { title: "报备总数", value: "查询中" },
        { title: "甄别总数", value: "查询中" },
      ],
    };
  },
  methods: {
    getStatistics() {
      this.$http
        .get("/command/action/" + this.$route.query.id)
        .then((res) => {
          console.log(res);
          var data = res.data.data;
          // 设置行动状态
          if (data.status === "1") {
            this.status_val[0].value = "进行中";
          } else if (data.status === "2") {
            this.status_val[0].value = "被遗留";
          } else if (data.status === "3") {
            this.status_val[0].value = "已找到";
          }
          this.status_val[2].value = this.get_time_diff(
            new Date(data.createTime)
          );
        })
        .catch((err) => {
          console.log(err);
        });
      // 设置志愿者人数
      this.$http
        .get("/command/action/list-volunteers/" + this.$route.query.id)
        .then((res) => {
          console.log(res);
          this.status_val[1].value = res.data.data.length;
        });
      // 设置统计数据
      this.$http
        .get("/record/" + this.$route.query.id).then(res => {
          console.log(res)
          this.status_val[3].value = res.data.data.clue.length;
          this.status_val[4].value = res.data.data.startReport.length;
          this.status_val[5].value = res.data.data.identify.length;
        })
    },
    // 获取时间差
    get_time_diff(dateBegin) {
      var dateEnd = new Date();
      var dateDiff = dateEnd.getTime() - dateBegin.getTime();
      var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
      var leave1 = dateDiff % (24 * 3600 * 1000);
      var hours = Math.floor(leave1 / (3600 * 1000));
      var leave2 = leave1 % (3600 * 1000);
      var minutes = Math.floor(leave2 / (60 * 1000));
      var leave3 = leave2 % (60 * 1000);
      var seconds = Math.round(leave3 / 1000);
      console.log(
        " 相差 " +
          dayDiff +
          "天 " +
          hours +
          "小时 " +
          minutes +
          " 分钟" +
          seconds +
          " 秒"
      );
      return (
        dayDiff + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒"
      );
    },
  },
  mounted() {
    console.log("挂载");
    this.getStatistics();
  },
};
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
