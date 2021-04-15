<template>
  <div class="imgList">
    <div class="imgList-item" :class="{'imgList-item-active': record.similarity>80}" v-for="record in result" :key="record.id">
      <span style="font-size: 4px">相似度：{{record.similarity}}%</span>
      <img
        :src="record.img"
        class="imgList-item-image"
      />
    </div>
  </div>
</template>

<script>
import { devServer } from "../../../vue.config";

export default {
  name: "RecognizedImgs",
  data() {
    return {
      currentDate: new Date(),
      result: [],
    };
  },
  methods: {
    getIdentifyImgs() {
      var _this = this;

      this.$http
        .get("/phone/identify/by-action/" + this.$route.query.id)
        .then((res) => {
          console.log("获取人脸识别记录成功!");
          console.log(res);
          var list = {};
          res.data.data.forEach((element) => {
            console.log(element);
            list = {};
            list = {
              img:
                devServer.proxy["/"].target +
                "/files/download?filename=" +
                element.imgUrl,
              name: element.volunteer.name,
              similarity: Math.ceil(element.similarity),
            };
            _this.result.push(list);
          });
        });
    },
  },
  created() {
    this.getIdentifyImgs()
  }
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
  height: 300px;
  overflow: auto;
}
.imgList::-webkit-scrollbar {
  width: 0;
  height:0;
  background-color: #f5f5f5;
}
.imgList::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f5f5f5;
}
.imgList-item {
  padding-left: 8px;
  margin: 3px;
  width: 106px;
  height: 120px;
  text-align: center;
  /* margin: 3px; */
  color: white;
  border-radius: 2px;
  background-color: #F56C6C;
}

.imgList-item-active {
  background-color: #5CB87A;
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
