<template>
  <div class="bgc">
    <el-container>
      <el-header>
        <el-row :gutter="100">
          <el-col :span="6">
            <div style="width: 80px; height: 80px; border-radius: 50%">
              <img
                src="../assets/logo.jpg"
                style="height: 100%; width: 100%; border-radius: 50%"
              />
            </div>
          </el-col>
          <el-col :span="8">
            <span class="head"> 蓝天救援队指挥中心</span>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="20">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="正在行动" name="first">
                <div class="activity" v-for="item in activity" :key="item.id">
                  <div class="img">
                    <a @click="jump">
                      <img
                        src="../assets/logo.jpg"
                        style="height: 100%; width: 100%"
                      />
                    </a>
                  </div>
                  <div class="activity_head">
                    <h3>{{ item.head }}</h3>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="已完成行动" name="second"
                >配置管理</el-tab-pane
              >
              <el-tab-pane label="遗留行动" name="third">角色管理</el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="1">
            <el-button type="primary">创建活动</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "second",
      activity: [
        {
          src: "../assets/logo.jpg",
          head: "拯救80岁高龄老人",
        },
        {
          src: "../assets/logo.jpg",
          head: "拯救80岁高龄老人",
        },
        {
          src: "../assets/logo.jpg",
          head: "拯救80岁高龄老人",
        },
        {
          src: "../assets/logo.jpg",
          head: "拯救80岁高龄老人",
        },
        {
          src: "../assets/logo.jpg",
          head: "拯救80岁高龄老人",
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    jump() {
      this.$router.push("/home");
    },
  },
};
</script>
<style lang="less" scoped>
.el-header {
  height: 100px !important;
}
.bgc {
  height: 100%;
  width: 100%;
  background-color: #f6f8fa;
}
.el-container {
  height: 100%;
  margin: 0 220px;
  background-color: #fff;
}
.head {
  line-height: 100px;
  font-size: 25px;
  letter-spacing: 2px;
}
.activity {
  height: 200px;
  width: 200px;
  margin: 10px;
  float: left;
  background: #f3f3f3;
}
.img {
  height: 150px;
  width: 200px;
}
.activity_head {
  text-align: center;
}
</style>
