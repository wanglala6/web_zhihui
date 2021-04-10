<template>
  <div class="main-container">
    <div>
      <el-row>
        <el-col :span="4" class="top-left">
            <div style="height:255px;margin-bottom:5px;" class="box_style">
              <MsgBox></MsgBox>
            </div>
          <div class="donutChartWrapper">
            <div class="donutChart">
              <DonutChart gaugeData="gaugeData"></DonutChart>
            </div>
          </div>
          <div class="com_img box_style">
            <div class="image-top" >最高相似度</div>
            <el-image src="http://47.106.239.161:5000/files/download?filename=fd2bf673a8a0de912de47a22863e1391.jfif&onlineOpen=true" :fit="fit" class="image"></el-image>
          </div>
        </el-col>
          <el-col :span="9" class="top-center">
            <div style="height:260px;margin-bottom:5px;" class="box_style">
              <VaryMsgTabs></VaryMsgTabs>
            </div>
            <div style="height:210px;" class="box_style">
              <StatisticsCard></StatisticsCard>
            </div>
          </el-col>
        <el-col :span="10" class="top-right box_style">
          <div>
            <Map></Map>
          </div>
        </el-col>
      </el-row>
      <el-row>
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
      </el-row>
      <VaryMsgTabs></VaryMsgTabs>
    </div>
<!--    <div class="container-top">-->
<!--      <div class="map">-->
<!--        <Map></Map>-->
<!--      </div>-->
<!--      <div class="imgs">-->
<!--        <RecognizedImgs></RecognizedImgs>-->
<!--      </div>-->
<!--    </div>-->
<!--      <div class="table">-->
<!--        <CountTable></CountTable>-->
<!--      </div>-->
  </div>
</template>

<script>
import Map from "@/components/Map";
import RecognizedImgs from "@/components/Monitor/RecognizedImgs";
// import VolStatusTb from "@/components/Monitor/VolStatusTb"
// import CountTable from "@/components/Monitor/CountTable"
import MsgBox from "@/components/Monitor/MsgBox"
import DonutChart from "@/components/Monitor/DonutChart";
import VaryMsgTabs from "@/components/Monitor/VaryMsgTabs";
import StatisticsCard from "@/components/Monitor/StatisticsCard";
export default {
  name: "MainMonitor",
  components: { StatisticsCard, VaryMsgTabs, DonutChart, RecognizedImgs, Map, MsgBox },
  data() {
    return {
      gaugeData: {
        gaugePercent: 0.7,
        guageColor: "#878787",
        gaugeTitle: "相似度"
      }
    }
  },
  methods: {
    },
}
</script>

<style scoped>
.donutChartWrapper {
  position:relative;
  width: 100%;
}

.donutChart{
  position: absolute;
  z-index: 999;
  opacity: 0.7;
}
.box_style{
  border-radius:5px;
  background-color:white;
  box-shadow: 3px 2px 4px #dcdfe6;
  border: 1px solid #DCDFE6;
}
.image-top{
  margin: 3px 0 6px 0;
  height:16px;
  text-align: center;
  font-size:16px;
  color: #2b4b6b;
}

.com_img{
  height:210px;
}

.similarity{
  height:35px;
  width:100%;
  font-size: 8px;
  color:white;
  line-height: 30px;
  opacity:0.8;
  margin-top:5px;
  text-align: center;
  border-radius: 3px;
}
.image{
  height:190px;
  border-radius: 0 0 5px 5px;
}
.main-container{
  background-color: #f2f2f2;
  padding:10px;
}
.top-left {
  height: 480px;
  margin-bottom: 5px;
  margin-right: 10px;
}
.top-center {
  height: 480px;
  border-radius:5px;
  margin-right: 10px;
}
.top-right{
  height: 480px;
  padding:2px;
}
.down-left{
  height: 125px;
}
.el-col{
  margin-left: 0px;
}
.container-top {
  float: left;
}
.map{
  /*margin-left: 50px;*/
  height: 300px;
  width: 500px;
  /*border-bottom: 1px solid;*/
}
.table{
  /*margin-left: 550px;*/
  margin-top:0;
  width: 400px;
  height: 400px;
}
.img{
  /*position: absolute;*/
  margin-top:60px;
  height: 210px;
  width: 100%;
}
.table{

}
</style>
