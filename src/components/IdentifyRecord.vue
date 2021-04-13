<template>
  <div class="identify_container">
    <el-row>
      <el-col :span="12">
        <h1>志愿者上传照片集</h1>
        <el-carousel class="block">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
            <el-image
              style="height:320px;width:500px"
              :src="url"
              :fit="fit">
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="12">
        <h1>当前走失老人照片集</h1>
        <el-carousel class="block">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
            <el-image
              style="height:320px;width:500px"
              :src="url2"
              :fit="fit">
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
name: "IdentifyRecord",
  data() {
  return {
    url: "http://47.106.239.161:5000/files/download?filename=fd2bf673a8a0de912de47a22863e1391.jfif&onlineOpen=true",
    url2: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
  }
  }
}
</script>

<style scoped>
.identify_container{
  padding: 15px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 100%;
  margin: 0;
}
.block{
  padding: 10px;
  height:100%;
  /*border: 1px solid;*/
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
