<template>
  <div class="main-container">
    <div class="row">
      <div class="top-left">
        <div class="msg-box">
          <MsgBox></MsgBox>
        </div>
        <div class="left_bottom">
          <VaryMsgTabs></VaryMsgTabs>
        </div>
      </div>
      <div class="top-right">
        <VolPositionMap :height="mapHeight"></VolPositionMap>
        <div class="btn-list">
          <!-- 最相似图片 -->
          <el-popover
            placement="left"
            width="200"
            trigger="click"
            :offset="-100"
          >
            <!--            <div class="donutChartWrapper">-->
            <!--              <div class="donutChart">-->
            <!--                <DonutChart gaugeData="gaugeData"></DonutChart>-->
            <!--              </div>-->
            <!--            </div>-->
            <div class="com_img box_style">
              <div v-if="maxSimilarityImg !== ''">
                <div class="image-top">相似度:{{ maxSimilarity }}%</div>
                <el-image
                  :src="maxSimilarityImg"
                  fit="fit"
                  class="image"
                ></el-image>
              </div>
              <div v-if="maxSimilarityImg === ''" class="without-identify">
                暂无识别记录
              </div>
            </div>
            <MapBtn
              value="相似度最高图片"
              iconClass="el-icon-picture"
              class="map-btn"
              slot="reference"
            ></MapBtn>
          </el-popover>
          <el-popover
            placement="left"
            width="250"
            trigger="click"
            :offset="-50"
          >
            <RecognizedImgs class="imgs"></RecognizedImgs>
            <MapBtn
              value="人脸识别记录"
              iconClass="el-icon-camera"
              slot="reference"
            ></MapBtn>
          </el-popover>

          <el-popover placement="left" width="200" trigger="click">
            <StatisticsCard></StatisticsCard>
            <MapBtn
              value="行动状态"
              iconClass="el-icon-tickets"
              slot="reference"
            ></MapBtn>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Map from "@/components/Map";
import RecognizedImgs from "@/components/Monitor/RecognizedImgs";
import MsgBox from "@/components/Monitor/MsgBox";
// import DonutChart from "@/components/Monitor/DonutChart";
import VaryMsgTabs from "@/components/Monitor/VaryMsgTabs";
import MapBtn from "@/components/Monitor/MapBtn";
import StatisticsCard from "@/components/Monitor/StatisticsCard";
import VolPositionMap from "@/components/VolPositionMap";
import { devServer } from "../../../vue.config";

export default {
  name: "MainMonitor",
  components: {
    VaryMsgTabs,
    VolPositionMap,
    RecognizedImgs,
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
      maxSimilarityImg: "",
      maxSimilarity: 0,
      mapHeight: document.body.clientHeight - 60 + "px",
    };
  },
  methods: {
    getMaxSimilarityImg() {
      var _this = this;
      console.log("获取最高相似度记录");
      this.$http
        .get("/command/identify/highest-score/" + this.$route.query.id)
        .then((res) => {
          console.log(res);
          _this.maxSimilarityImg =
            devServer.proxy["/"].target +
            "/files/download?filename=" +
            res.data.data.imgUrl;
          _this.maxSimilarity = Math.ceil(res.data.data.similarity);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getMaxSimilarityImg();
  },
  mounted() {
  },
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
  padding-bottom: 10px;
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
.left_bottom {
  height: 40%;
}
.imgs {
}

.without-identify {
  text-align: center;
  line-height: 210px;
  color: #909399;
}
</style>
