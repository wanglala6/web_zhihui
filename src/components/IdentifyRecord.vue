<template>
  <div class="identify_container">
    <h1>志愿者上传照片集</h1>
    <el-row>
      <el-col :span="4" v-for="item in result" :key="item">
        <div class="img_card">
            <el-image
              :src="item.img"
              :fit="fit"
              style="height: 150px;">
            </el-image>
          <p>相似度：{{item.similarity}}</p>
          <p>上传者：{{item.name}}</p>
        </div>
<!--        <el-carousel class="block">-->
<!--          <el-carousel-item v-for="item in 4" :key="item">-->
<!--            <h3 class="small">{{ item }}</h3>-->
<!--            <el-image-->
<!--              style="height:320px;width:500px"-->
<!--              :src="url"-->
<!--              :fit="fit">-->
<!--            </el-image>-->
<!--          </el-carousel-item>-->
<!--        </el-carousel>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { devServer } from "../../vue.config";

export default {
name: "IdentifyRecord",
  data() {
  return {
    url: "http://47.106.239.161:5000/files/download?filename=fd2bf673a8a0de912de47a22863e1391.jfif&onlineOpen=true",
    url2: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
    actionId: "",
    result: []
  }
  },
  methods: {
    async getIdentifyImgs() {
      const { data: res } = await this.$http.get(
        "/phone/identify/by-action/" + this.actionId
      );
      var _this = this
      console.log("获取人脸识别记录成功!");
      console.log(res);
      var list = {};
      res.data.forEach((element) => {
        console.log(element)
        list = {}
        list = {
          img: (devServer.proxy["/"].target + "/files/download?filename=" + element.imgUrl),
          name: element.volunteer.name,
          similarity: element.similarity + "%"
        }
        _this.result.push(list);
      });
    },
  },
  created() {
    this.actionId = this.$route.query.actionId
    this.getIdentifyImgs()
  }
}
</script>

<style scoped>
.img_card {
  border: 1px solid #dedede;
  text-align: center;
  margin: 10px;
  font-size: 8px;
}
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
