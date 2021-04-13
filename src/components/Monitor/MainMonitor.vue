<template>
  <div class="main-container">
    <div class="row">
      <div class="top-left">
        <div style="height: 255px; margin-bottom: 5px" class="msg-box">
          <MsgBox></MsgBox>
        </div>
        <div>
          <VaryMsgTabs></VaryMsgTabs>
        </div>
        <!-- <div class="donutChartWrapper">
            <div class="donutChart">
              <DonutChart gaugeData="gaugeData"></DonutChart>
            </div>
          </div> -->
        <!-- <div class="com_img box_style">
            <div class="image-top">最高相似度</div>
            <el-image
              src="http://47.106.239.161:5000/files/download?filename=fd2bf673a8a0de912de47a22863e1391.jfif&onlineOpen=true"
              :fit="fit"
              class="image"
            ></el-image>
          </div> -->
      </div>
      <div class="top-right">
        <Map></Map>
        <div class="btn-list">
          <!-- 最相似图片 -->
          <el-popover placement="left" width="200" trigger="click" :offset="-100">
            <div class="donutChartWrapper">
              <div class="donutChart">
                <DonutChart gaugeData="gaugeData"></DonutChart>
              </div>
            </div>
            <div class="com_img box_style">
              <div class="image-top">相似度:90%</div>
              <el-image
                src="http://47.106.239.161:5000/files/download?filename=77f334e953c44745e30c008aad7df8b9.jpg&onlineOpen=true"
                :fit="fit"
                class="image"
              ></el-image>
            </div>
            <MapBtn
              value="相似度最高图片"
              iconClass="el-icon-picture"
              :isActive="false"
              class="map-btn"
              slot="reference"
            ></MapBtn>
          </el-popover>

          <el-popover placement="left" width="230" trigger="click" :offset="-50">
            <RecognizedImgs></RecognizedImgs>
            <MapBtn
              value="人脸识别记录"
              iconClass="el-icon-camera"
              :isActive="false"
              slot="reference"
            ></MapBtn>
          </el-popover>

          <el-popover placement="left" width="200" trigger="click">
            <StatisticsCard></StatisticsCard>
            <MapBtn
              value="行动状态"
              iconClass="el-icon-tickets"
              :isActive="false"
              slot="reference"
            ></MapBtn>
          </el-popover>
        </div>
      </div>
      <!-- <el-row>
        <el-col :span="2" class="down-left box_style">
              <div class="similarity" style="background-color:#5f73c1">高相似度</div>
              <div class="similarity" style="background-color:palevioletred">中相似度</div>
              <div class="similarity" style="background-color:green">低相似度</div>
        </el-col>
        <el-col :span="22">
          <div class="down-left box_style">
            <RecognizedImgs></RecognizedImgs>
          </div>
        </el-col>
      </el-row> -->
    </div>
  </div>
</template>

<script>
import Map from "@/components/Map";
import RecognizedImgs from "@/components/Monitor/RecognizedImgs";
// import VolStatusTb from "@/components/Monitor/VolStatusTb"
// import CountTable from "@/components/Monitor/CountTable"
import MsgBox from "@/components/Monitor/MsgBox";
// import DonutChart from "@/components/Monitor/DonutChart";
import VaryMsgTabs from "@/components/Monitor/VaryMsgTabs";
import MapBtn from "@/components/Monitor/MapBtn";
import StatisticsCard from "@/components/Monitor/StatisticsCard";
export default {
  name: "MainMonitor",
  components: {
    VaryMsgTabs,
    // DonutChart,
    RecognizedImgs,
    Map,
    MsgBox,
    MapBtn,
    StatisticsCard,
  },
  data() {
    return {
      gaugeData: {
        gaugePercent: 0.7,
        guageColor: "#878787",
        gaugeTitle: "相似度",
      },
    };
  },
  methods: {},
};
</script>

<style scoped>
.donutChartWrapper {
  position: relative;
  width: 100%;
}

.donutChart {
  position: absolute;
  z-index: 999;
  opacity: 0.7;
}
.msg-box {
  /* border-radius: 26px; */
  background-color: white;
  /* border: 1px solid #dcdfe6; */
  /* box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%); */
  /* background-image: radial-gradient(circle farthest-corner at 5% 95%, #D1D4D8, #CCD4DF, #A5B3C5); */
}

.image-top {
  margin: 3px 0 6px 0;
  height: 16px;
  text-align: center;
  font-size: 16px;
  color: #2b4b6b;
}

.com_img {
  height: 210px;
}

.similarity {
  height: 35px;
  width: 100%;
  font-size: 8px;
  color: white;
  line-height: 30px;
  opacity: 0.8;
  margin-top: 5px;
  text-align: center;
  border-radius: 3px;
}
.image {
  height: 190px;
  border-radius: 0 0 5px 5px;
}
.main-container {
  width: 100%;
  height: 100%;
  /* padding: 10px; */
}
.top-left {
  padding: 15px;
  width: 450px;
}

.top-center {
  height: 480px;
  border-radius: 5px;
  margin-right: 10px;
}
.top-right {
  height: 100%;
  width: 100%;
  position: relative;
}
.down-left {
  height: 125px;
}
.el-col {
  margin-left: 0px;
}
.container-top {
  float: left;
}
.map {
  /*margin-left: 50px;*/
  height: 300px;
  width: 500px;
  /*border-bottom: 1px solid;*/
}
.table {
  /*margin-left: 550px;*/
  margin-top: 0;
  width: 400px;
  height: 400px;
}
.img {
  /*position: absolute;*/
  margin-top: 60px;
  height: 210px;
  width: 100%;
}

.row {
  display: flex;
}

.btn-list {
  position: absolute;
  top: 12%;
  right: 2%;
}
</style>
