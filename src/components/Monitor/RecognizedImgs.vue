<template>
  <div class="imgList">
    <div
      class="imgList-item imgList-item-active"
      v-for="i in 4"
      :key="i"
    >
      <span style="font-size: 4px">相似度：20%</span>
      <img
        src="http://47.106.239.161:5000/files/download?filename=fd2bf673a8a0de912de47a22863e1391.jfif&onlineOpen=true"
        class="imgList-item-image"
      />
    </div>
    <el-pagination class="PageTurner" small layout="prev, pager, next" :total="50">
    </el-pagination>
    <!-- <div class="PageTurner">
      <i class="el-icon-arrow-left" @click="turn_up"></i>
      1 / 6
      <i class="el-icon-arrow-right" @click="turn_down"></i>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "RecognizedImgs",
  data() {
    return {
      currentDate: new Date(),
    };
  },
  methods: {
    turn_up: {},
    turn_down: {},
  },
};
</script>

<style scoped>
.PageTurner {
  text-align: center;
  width: 100%;
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
  clear: both;
}

.imgList {
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
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
