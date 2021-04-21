<template>
  <div class="bgc2">
    <!-- <el-row class="bgchead">
      <el-col class="headtitle" :span="20">大数据监控平台</el-col>
      <el-col class="datetime" :span="4">{{ systemDateTime }}</el-col>
    </el-row> -->
    <header class="screen-header">
      <span class="logo" @click="goba">{{ back }}返回 </span>
      <span class="title">大数据监控平台</span>
      <div class="title-right">
        <div class="datetime">{{ systemDateTime }}</div>
      </div>
    </header>
    <el-row class="gailan">
      <!-- 概览区域 -->
      <el-col :span="6" :class="leftScreenfull">
        <div class="left" :class="{ screenfull: actionNumberScreenfull }">
          <ActionNumber
            @hideOther="hideOther"
            :class="{ screenfull: actionNumberScreenfull }"
          ></ActionNumber>
        </div>
        <div class="left" :class="{ screenfull: rangeScreenfull }">
          <range
            :class="{ screenfull: rangeScreenfull }"
            @hideOther="hideOther"
          ></range>
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
      <el-col :span="11" :class="centerScreenfull">
        <location
          :class="{ screenfull: locationScreenfull }"
          @hideOther="hideOther"
        ></location>
      </el-col>
      <el-col :span="7" class="right" :class="rightScreenfull">
        <success
          :class="{ screenfull: successScreenfull }"
          @hideOther="hideOther"
        ></success>
        <vol-chart
          :class="{
            screenfull: volChartScreenfull,
            nothing: successScreenfull,
          }"
          @hideOther="hideOther"
        ></vol-chart>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import screenfull from "screenfull"; // 引入全屏显示

import VolChart from "@/components/VolChart";
import Success from "@/components/Success";
import Location from "@/components/Location";
import Range from "@/components/Range";
import ActionNumber from "@/components/ActionNumber";
import Stomp from "stompjs";
import {
  MQTT_SERVICE,
  MQTT_USERNAME,
  MQTT_PASSWORD,
} from "../config/sysconstant.js";
// import func from "vue-editor-bridge";

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
      client: Stomp.client(MQTT_SERVICE),
      actionNumberScreenfull: false,
      rangeScreenfull: false,
      locationScreenfull: false,
      volChartScreenfull: false,
      successScreenfull: false,
      isScreenfull: false,
      currentFocus: "1",
    };
  },
  computed: {
    leftScreenfull: function () {
      return {
        screenfull: this.actionNumberScreenfull || this.rangeScreenfull,
        hide: this.successScreenfull || this.volChartScreenfull,
      };
    },
    rightScreenfull: function () {
      return {
        screenfull: this.successScreenfull || this.volChartScreenfull,
      };
    },
    centerScreenfull: function () {
      return {
        screenfull: this.locationScreenfull,
        hide: this.successScreenfull || this.volChartScreenfull,
      };
    },
  },
  created() {
    this.currentTime();
    this.commanderId = this.$route.query.commanderId;
    this.connect();
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
    // hxx：stomp监听消息队列相关函数
    onConnected: function (frame) {
      var topic =
        "/queue/" + this.$route.query.commanderId + "_admin_statistics";
      // ---订阅频道
      this.client.subscribe(topic, this.responseCallback, this.onFailed);
    },
    onFailed: function (frame) {
      console.log("Failed: " + frame);
    },
    responseCallback: function (frame) {
      var commandList = ["1", "2", "3", "4", "5"];
      var moveList = ["left", "right", "up", "down"];
      var data = JSON.parse(frame.body);
      console.log(data);
      var operation = data.operation;
      // 去除所有背景色
      commandList.forEach(function (ele) {
        document.getElementById(ele).style.backgroundColor = "";
      });
      if (commandList.indexOf(operation) !== -1) {
        console.log("commandList");
        const element = document.getElementById(operation);
        // this.hideOther(operation);
        element.click();
      } else if (moveList.indexOf(operation) !== -1) {
        console.log("moveList");
        if (this.currentFocus === "1") {
          if (operation === "right") {
            this.currentFocus = "3";
          } else if (operation === "down") {
            this.currentFocus = "2";
          }
        } else if (this.currentFocus === "2") {
          if (operation === "up") {
            this.currentFocus = "1";
          } else if (operation === "right") {
            this.currentFocus = "3";
          }
        } else if (this.currentFocus === "3") {
          if (operation === "left") {
            this.currentFocus = "1";
          } else if (operation === "right") {
            this.currentFocus = "4";
          }
        } else if (this.currentFocus === "4") {
          if (operation === "left") {
            this.currentFocus = "3";
          } else if (operation === "down") {
            this.currentFocus = "5";
          }
        } else if (this.currentFocus === "5") {
          if (operation === "up") {
            this.currentFocus = "4";
          } else if (operation === "left") {
            this.currentFocus = "3";
          }
        }
        var element = document.getElementById(this.currentFocus);
        element.style.backgroundColor = "#181725";
      } else {
        console.log("actionList");
        if (operation === "cancel" && this.isScreenfull) {
          this.hideOther(this.currentFocus);
        } else if (operation === "confirm" && !this.isScreenfull) {
          this.hideOther(this.currentFocus);
        }
      }
    },
    connect: function () {
      // ---初始化mqtt客户端，并连接mqtt服务
      var headers = {
        login: MQTT_USERNAME,
        passcode: MQTT_PASSWORD,
        // additional header
      };
      this.client.connect(headers, this.onConnected, this.onFailed);
    },
    hideOther(e) {
      console.log(e);
      var chartList = ["1", "2", "3", "4", "5"];
      var element;
      chartList.forEach((elem) => {
        if (!this.isScreenfull) {
          if (elem !== e) {
            element = document.getElementById(elem);
            console.log(element);
            element.style.display = "none";
          }
        } else {
          if (elem !== e) {
            element = document.getElementById(elem);
            console.log(element);
            element.style.display = "";
          }
        }
      });
      if (e === "1") {
        this.actionNumberScreenfull = !this.actionNumberScreenfull;
      } else if (e === "2") {
        this.rangeScreenfull = !this.rangeScreenfull;
      } else if (e === "3") {
        this.locationScreenfull = !this.locationScreenfull;
      } else if (e === "4") {
        this.successScreenfull = !this.successScreenfull;
      } else if (e === "5") {
        this.volChartScreenfull = !this.volChartScreenfull;
      }
      this.isScreenfull = !this.isScreenfull;
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

.screenfull {
  width: 100%;
  height: 100%;
}

.hide {
  display: none;
}

.nothing {
}
</style>
