<template>
  <div class="notfound_container">
    <div class="main_box">
      <div class="img_border">
        <img src="http://47.106.239.161:5000/files/download?filename=fd2bf673a8a0de912de47a22863e1391.jfif&onlineOpen=true" class="loss_image">
      </div>
      <div class="top_box">
        <div class="label_404"><h1>404</h1></div>
        <div class="label_right">
          <p>您的页面找不到了</p>
          <p>他也找不到他的家人了！</p>
        </div>
      </div>
      <div class="down_box">
          <p>姓名：<b>奥巴马</b></p>
          <p>性别：<b>男</b></p>
          <p>年龄：<b>78</b></p>
          <p>走失时间：<b>2021年1月2日</b></p>
          <p>走失地点：<b>XX省XX市</b></p>
          <p>家人联系电话：<b>8208820</b></p>
          <p>失踪人特征描述：<b>大花袄子，患阿兹海默症</b></p>
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
export default {
  name: "NotFound",
  methods: {
    goto_home_page() {
      this.$router.push("/login")
    }
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
  height: 230px;
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
