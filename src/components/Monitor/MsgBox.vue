<template>
  <div>
    <el-card :body-style="{ padding: '1px' }" class="img">
      <img style="width:100px;height:100px;" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
    </el-card>
    <div class="msg">
      <p>姓名：李四</p>
      <p>性别：男</p>
      <p>走失地点：</p>
      <p>家属联系电话：</p>
    </div>
  </div>
</template>

<script>
export default {
name: "Msg"
}
</script>

<style scoped>
.img{
  height: 100px;
  width: 100px;
  border-radius:50%;
  margin: 0 auto;
}
.msg{
  padding-left: 30px;
}
</style>
