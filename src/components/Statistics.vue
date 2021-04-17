<template>
  <div class="bgc2">
    <!-- <el-row class="bgchead">
      <el-col class="headtitle" :span="20">大数据监控平台</el-col>
      <el-col class="datetime" :span="4">{{ systemDateTime }}</el-col>
    </el-row> -->
    <header class="screen-header">
      <span class="logo" @click="goba">{{ back }}返回 </span>
      <span class="title">电商平台实时监控系统</span>
      <div class="title-right">
        <div class="datetime">{{ systemDateTime }}</div>
      </div>
    </header>
    <el-row class="gailan">
      <!-- 概览区域 -->
      <el-col :span="6">
        <div class="left">
          <ActionNumber></ActionNumber>
        </div>
        <div class="left">
          <range></range>
        </div>

        <!-- <el-row class="overview">
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
        </el-row> -->
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
</template>
<script>
import VolChart from "@/components/VolChart";
import Success from "@/components/Success";
import Location from "@/components/Location";
import Range from "@/components/Range";
import ActionNumber from "@/components/ActionNumber";
export default {
  components: {
    VolChart,
    Success,
    Location,
    Range,
    ActionNumber,
  },
  data() {
    return {
      back: "<-",
      act_count: [],

      // 当前的系统时间
      systemDateTime: null,
      // 用于保存当前系统日期的定时器id
      timerID: null,
    };
  },
  created() {
    this.currentTime();
    this.commanderId = this.$route.query.commanderId;
  },
  // 此时页面上元素已经渲染完毕了
  mounted() {},
  destroyed() {
    clearInterval(this.timerID);
  },
  methods: {
    goba() {
      this.$router.push({
        path: "/inAction",
        query: {
          commanderId: this.commanderId,
        },
      });
    },
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
.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  background: url(../assets/imgs/header_border_dark.png) no-repeat;
  background-size: 100%;
  > div {
    img {
      width: 100%;
    }
  }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }
  .title-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
  }
  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-80%);
    a {
      text-decoration: none;
    }
  }
}
.el-row,
.el-col {
  height: 100%;
}
.main {
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
h4 {
  font-weight: normal;
}
h3 {
  font-size: 20px;
  font-weight: 400;
}
.bgc2 {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: url(../assets/imgs/bg.jpg) !important;
  background-size: 100% 100%;

  color: white;
  padding: 10px;
}
.gailan {
  height: 100%;
}
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

.gailan {
}
.right {
  box-sizing: border-box;
}
.left {
}
</style>
