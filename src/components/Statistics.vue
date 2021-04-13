<template>
  <div>
    <div class="bgc2">
      <el-row class="bgchead">
        <span class="headtitle">大数据监控平台</span>
        <span class="datetime">{{ systemDateTime }}</span>
      </el-row>
      <el-row class="gailan">
        <!-- 概览区域 -->
        <el-col :span="6">
          <el-row class="overview">
            <el-col :span="6">
              <h4>未开始行动</h4>
              <span>{{ act_count[0] }}</span>
            </el-col>
            <el-col :span="6">
              <h4>正在行动</h4>
              <span>{{ act_count[1] }}</span>
            </el-col>
            <el-col :span="6">
              <h4>遗留行动</h4>
              <span>{{ act_count[2] }}</span>
            </el-col>
            <el-col :span="6">
              <h4>已完成行动</h4>
              <span>{{ act_count[3] }}</span>
            </el-col>
          </el-row>
          <range></range>
        </el-col>
        <el-col :span="11">
          <location></location>
        </el-col>
        <el-col :span="7" class="right">
          <success></success>
          <vol-chart></vol-chart>
        </el-col>
      </el-row>
    </div>
    <!-- <el-card>
      <div id="main" style="width: 600px; height: 400px"></div>
      <div class="box"></div>
      <div class="m">123</div>
    </el-card> -->
  </div>
</template>
<script>
import VolChart from "@/components/VolChart";
import Success from "@/components/Success";
import Location from "@/components/Location";
import Range from '@/components/Range'
export default {
  components: {
    VolChart,
    Success,
    Location,
    Range
  },
 data() {
    return {
      act_count: [],

      // 当前的系统时间
      systemDateTime: null,
      // 用于保存当前系统日期的定时器id
      timerID: null,
    };
  },
  created() {
    this.$http({
      method: "get",
      url: "/statistic/action-count",
    }).then((res) => {
      console.log(res.data, "行动总数");
      this.act_count = res.data.data;
    });
    this.currentTime();
  },
  // 此时页面上元素已经渲染完毕了
  mounted() {},
  destroyed() {
    clearInterval(this.timerID);
  },
  methods: {
    currentTime() {
      this.systemDateTime = new Date().toLocaleString();

      this.timerID && clearInterval(this.timerID);

      this.timerID = setInterval(() => {
        this.systemDateTime = new Date().toLocaleString();
      }, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
h4 {
  font-weight: normal;
}
h3 {
  font-size: 20px;
  font-weight: 400;
}
.bgc2 {
  width: 100%;
  height: 100%;
  background-size: cover;
  background: url(../assets/imgs/bg.jpg) !important;
  color: white;
padding: 10px;
}
// .box {
//   width: 450px;
//   height: 450px;
//   background-color: pink;
// }
// .m {
//   width: 2.5rem;
//   height: 2.5rem;
// }
@media screen and (max-width: 1024px) {
  html {
    font-size: 42.66px !important;
  }
}
@media screen and (min-width: 1920px) {
  html {
    font-size: 80px !important;
  }
}
.bgchead {
  width: 100%;
  background: url(../assets/imgs/header_border_dark.png) no-repeat;
  background-size: 100%;
  height: 100px;
}
.headtitle {
  display: block;
  text-align: center;
  font-size: 28px;
  vertical-align: middle;
}
.overview {
  width: 100%;
  height: 100%;
  border: 5px solid transparent;
  border-width: 51 38 20 132;
  border-image-source: url(../assets/imgs/border.png);
  border-image-slice: 51 38 20 132;
  background-color: #181725;
  border-color: #2c64a9;
  padding: 5px;
}
.overview h4 {
  text-align: center;
  font-size: 0.35rem;
  color: #fff;
}
.overview span {
  display: block;
  font-size: 0.2rem;
  color: #4c9bfd;
  text-align: center;
}
.piehead {
  margin-bottom: 0;
}
.pie {
  padding: 18px;
}
.chart_box {
  width: 95%;
  height: 150px;
  margin: 0 auto;
}
#chinesechart {
  width: 100%;
  height: 150px;
  margin: 0 auto;
}
.datetime {
  display: block;
  float: right;
}

.gailan{
  margin: 10px;
}
.right{
  box-sizing: border-box;
}
</style>
