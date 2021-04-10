<template>
  <div class="container">
    <div class="lost">
      <el-row>
        <el-col :span="4" :offset="1">
          <el-avatar
            shape="square"
            :size="150"
            fit="fit"
            :src="older.avatar"
          ></el-avatar>
        </el-col>
        <el-col :span="18" :offset="1" style="padding-right: 40px;">
          <div class="lost-name">
            {{ older.name }}
          </div>
          <div class="lost-info">
            <div class="lost-info-item">
              <div class="lost-info-itemLabel">性别</div>
              <div class="lost-info-itemValue">{{ older.gender }}</div>
            </div>

            <div class="lost-info-item">
              <div class="lost-info-itemLabel">年龄</div>
              <div class="lost-info-itemValue">{{ older.age }}</div>
            </div>

            <div class="lost-info-item">
              <div class="lost-info-itemLabel">外貌特征</div>
              <div class="lost-info-itemValue">{{ older.feature }}</div>
            </div>

            <div class="lost-info-item">
              <div class="lost-info-itemLabel">病历</div>
              <div class="lost-info-itemValue">{{ older.disease }}</div>
            </div>

            <div class="lost-info-item">
              <div class="lost-info-itemLabel">走失地点</div>
              <div class="lost-info-itemValue">{{ older.lastPlace }}</div>
            </div>

            <div class="lost-info-item">
              <div class="lost-info-itemLabel">走失时间段</div>
              <div class="lost-info-itemValue">
                {{ older.lostTimeBegin }} ~ {{ older.lostTimeEnd }}
              </div>
            </div>

            <div class="lost-info-item">
              <div class="lost-info-itemLabel">家人联系电话</div>
              <div class="lost-info-itemValue">
                {{ older.familyTelephone }}
              </div>
            </div>

            <div class="lost-info-item">
              <div class="lost-info-itemLabel">走失者图片</div>
              <div class="lost-info-itemValue">
                <el-avatar
                  shape="square"
                  :size="100"
                  :src="url"
                  v-for="url in pictures"
                  v-bind:key="url"
                  style="margin-right:10px"
                ></el-avatar>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ElderMsg",
  data() {
    return {
      id: "",
      pictures: [],
      activeNames: ["1"],
      older: {},
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    // 老人信息
    async getold() {
      console.log("获取老人信息");
      this.lostId = this.$route.query.lostId;
      let res = await this.$http.get("/command/lost/" + this.lostId);
      console.log(res.data.data);
      this.older = res.data.data;
      // 获取人脸图片
      console.log("获取人脸图片");
      res = await this.$http.get("/face/lost/" + this.lostId);
      console.log(res);
      res.data.data.forEach((element) => {
        this.pictures.push(element.faceImg);
      });
    },
  },
  mounted() {
    console.log(this.$route.query.lostId);
    this.getold();
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
}

.lost {
  width: 80%;
  background-color: #fff;
  height: 100%;
  margin: 20px auto;
  border-radius: 5px;
  box-shadow: 1px 1px 2px #ededed;
  padding-top: 20px;
}

.lost-name {
  font-weight: bold;
  font-size: 26px;
}

.lost-info {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
}

.lost-info-item {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #ebebeb;
  padding: 30px 0;
}

.lost-info-itemLabel {
  font-weight: bold;
  font-size: 15px;
  width: 100px;
  margin-right: 40px;
}
</style>
