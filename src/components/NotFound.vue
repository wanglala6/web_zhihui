<template>
  <div class="notfound_container">
    <div class="main_box">
      <div class="img_border">
        <img :src="result.avatar" class="loss_image">
      </div>
      <div class="top_box">
        <div class="label_404"><h1>404</h1></div>
        <div class="label_right">
          <p>您的页面找不到了</p>
          <p>他也找不到他的家人了！</p>
        </div>
      </div>
      <div class="down_box">
          <p>姓名：<b>{{result.name}}</b></p>
          <p>性别：<b>{{result.gender}}</b></p>
          <p>年龄：<b>{{result.age}}</b></p>
          <p>走失时间：<b>{{result.createTime}}</b></p>
          <p>走失地点：<b>{{result.lastPlace}}</b></p>
          <p>家人联系电话：<b>{{result.telephone}}</b></p>
          <p>失踪人特征描述：<b>{{result.feature}},{{result.disease}}</b></p>
      </div>
      <div class="bottom_box">
        <div class="see_details">
          <span @click="goto_home_page"> 返回首页</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { devServer } from "../../vue.config";

export default {
  name: "NotFound",
  data() {
    return {
      result: "",
    }
  },
  methods: {
    goto_home_page() {
      this.$router.push("/login")
    },
    async getMsg() {
      const res = await this.$http.get("/command/lost/random");
      console.log(res.data.data);
      this.result = res.data.data
      this.result.avatar = devServer.proxy["/"].target + res.data.data.avatar
    }
  },
  created() {
    this.getMsg()
  }
}
</script>

<style scoped>
.see_details{
  padding:10px;
}
.img_border{
}
.loss_image{
  padding: 2px;
  margin: 18px;
  position: absolute;
  height: 205px;
  border-radius: 2px;
  border: 1px solid #e6e9e5;
}
.label_right{
  margin-top:20px;
  margin-left: 320px;
  text-align: justify;
  word-break: break-all;
  font-size:10px;
}
.label_404{
  position: fixed;
  margin-left: 250px;
}
.notfound_container{
  padding: 20px;
}
.main_box{
  height: 300px;
  width: 500px;
  border-radius: 2px;
  border: 1px solid #e6e9e5;
  margin-left:30%;
  margin-top: 10%;
}
.top_box{
  height:70px;
  border-radius: 2px 2px 0 0;
  border: 1px solid #e6e9e5;
}
.down_box{
  margin-left:250px;
  font-size:10px;
}
.bottom_box{
  height:40px;
  width:500px;
  text-align: right;
  border-radius: 0 0 2px 2px;
  border-top: 1px solid #e6e9e5;
  font-size: 8px;
}
</style>
