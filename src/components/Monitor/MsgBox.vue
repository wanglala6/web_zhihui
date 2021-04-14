<template>
  <div>
    <!-- 头像 -->
    <el-row class="header">
      <el-col :span="12" :offset="6">
        <div :body-style="{ padding: '1px' }" class="img">
          <img
            style="width: 80px; height: 80px; border-radius: 50%"
            :src="older.avatar"
            class="image"
          />
        </div>
      </el-col>
      <el-col :span="6" class="header-tag">
        <el-tag type="danger" size="small">{{older.lostLevel}}</el-tag>
      </el-col>
    </el-row>
    <!-- 特征 -->
    <el-row>
      <el-col :span="24">
        <div class="msg">
          {{older.feature}}
        </div>
      </el-col>
    </el-row>
    <!-- 额外信息 -->
    <el-row class="bottom">
      <div class="bottom-name">
        <span class="el-icon-user-solid bottom-name-icon"></span>
        <div class="bottom-name-value">{{older.name}}</div>
      </div>
      <div class="bottom-name">
        <span class="el-icon-date bottom-name-icon"></span>
        <div class="bottom-name-value">{{older.age}}岁</div>
      </div>
      <div class="bottom-name">
        <span class="el-icon-phone bottom-name-icon"></span>
        <div class="bottom-name-value">{{older.familyTelephone}}</div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Msg",
  data() {
    return {
      older: {}
    }
  },
  methods: {
    // 老人信息
    async getold() {
      console.log("获取老人信息");
      this.lostId = this.$route.query.lostId;
      const res = await this.$http.get("/command/lost/" + this.lostId);
      console.log(res.data.data);
      this.older = res.data.data;
      var level = parseInt(this.older.lostLevel / 3)
      if (level === 0) {
        this.older.lostLevel = "低危"
      } else if (level === 1) {
        this.older.lostLevel = "中危"
      } else if (level === 2 || level === 3) {
        this.older.lostLevel = "高危"
      }
    },
  },
  created() {
    this.getold();
  },
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
  margin: 20px;
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
