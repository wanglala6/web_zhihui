<template>
  <div>
    <!-- 头像 -->
    <el-row class="header">
      <el-col :span="12" :offset="6">
        <div :body-style="{ padding: '1px' }" class="img">
          <img
            style="width: 80px; height: 80px; border-radius: 50%"
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
        </div>
      </el-col>
      <el-col :span="6" class="header-tag">
        <el-tag type="danger" size="small">一级</el-tag>
      </el-col>
    </el-row>
    <!-- 特征 -->
    <el-row>
      <el-col :span="24">
        <div class="msg">
          灰色帽子，黑色上衣,平常看起来呆呆的，走路有点跛脚。
        </div>
      </el-col>
    </el-row>
    <!-- 额外信息 -->
    <el-row class="bottom">
      <div class="bottom-name">
        <span class="el-icon-user-solid bottom-name-icon"></span>
        <div class="bottom-name-value">香菱</div>
      </div>
      <div  class="bottom-name">
        <span class="el-icon-date bottom-name-icon"></span>
        <div class="bottom-name-value">78岁</div>
      </div>
      <div class="bottom-name">
        <span class="el-icon-phone bottom-name-icon"></span>
        <div class="bottom-name-value">17762474097</div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Msg",
};
</script>

<style scoped>
.header {
  padding: 10px;
  height: 20px;
}

.header-tag {
  margin-top: 30px;
}

.img {
  height: 80px;
  width: 80px;
  margin: 0px auto;
  padding-top: 10px;
}

.msg {
  padding: 20px;
  text-align: center;
  font-size: 15px;
}

.bottom {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 26px;
  background-color: rgba(131, 169, 164, 0.1);
  display: flex;
  justify-content: space-between;
}

.bottom-name {
  display: flex;
  padding: 10px;
}

.bottom-name-label {
  font-size: 14px;
  font-weight: normal;
  color: rgba(40, 41, 44, 0.65);
}

.bottom-name-value {
  font-weight: normal;
  font-size: 14px;
  color: rgba(40, 41, 44, 0.8);
  padding-left: 5px;
}

.bottom-name-icon {
  line-height: 20px;
}
</style>
