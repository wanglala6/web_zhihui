<template>
<!--  <div>-->
    <!--    <el-row>-->
    <!--      <el-card :body-style="{ padding: '13px' }">-->
    <!--      <el-col :span="3" v-for="i in 8" :key="i" style="background-color:red;opacity:0.8;">-->
    <!--          <span style="font-size:4px;">相似度：20%</span>-->
    <!--          <img src="http://47.106.239.161:5000/files/download?filename=fd2bf673a8a0de912de47a22863e1391.jfif&onlineOpen=true" class="image">-->
    <!--&lt;!&ndash;          <div style="padding: 0px;">&ndash;&gt;-->
    <!--&lt;!&ndash;            <div class="bottom clearfix">&ndash;&gt;-->
    <!--&lt;!&ndash;              <time class="time">2021-4-9 16：29</time>&ndash;&gt;-->
    <!--&lt;!&ndash;            </div>&ndash;&gt;-->
    <!--&lt;!&ndash;          </div>&ndash;&gt;-->
    <!--      </el-col>-->
    <!--      </el-card>-->
    <!--    </el-row>-->
    <div class="imgList">
      <div class="imgList-item imgList-item-active" v-for="i in 8" :key="i">
        <span style="font-size:4px;">相似度：20%</span>
        <img
          src="http://47.106.239.161:5000/files/download?filename=fd2bf673a8a0de912de47a22863e1391.jfif&onlineOpen=true"
          class="imgList-item-image">
      </div>
      <div class="PageTurner">
        <i class="el-icon-arrow-up" @click="turn_up"></i>
        <div style="height:65px;">
          <p style="line-height:65px;font-size:9px;">1/6</p>
        </div>
        <i class="el-icon-arrow-down" @click="turn_down"></i>
      </div>
    </div>
<!--  </div>-->
</template>

<script>
export default {
  name: "RecognizedImgs",
  data() {
    return {
      currentDate: new Date()
    };
  },
  methods: {
    turn_up: {
    },
    turn_down: {
    },
  }
}
</script>

<style scoped>
.PageTurner{
  margin-left: 4px;
  text-align: center;
}
.image {
  height: 120px;
}

.time {
  font-size: 4px;
  color: #999;
}

.bottom {
  /*margin-top: 13px;*/
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.imgList {
  display: flex;
  flex-direction: row;
  width:100%;
  margin-left: 5px;
}

.imgList-item {
  width: 106px;
  height: 120px;
  text-align: center;
  margin: 3px;
  color: white;
  border-radius: 2px;
}

.imgList-item-active {
  background-color: #5f73c1;
}

.imgList-item-image {
  width: 100px;
  display: block;
  padding-left: 3px;
  padding-right: 3px;
  padding-top: 5px;
  margin-bottom: 3px;
  height: 90px;
}
</style>
