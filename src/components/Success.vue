<template>
  <div>
    <div class="order">
      <div class="inner">
        <el-row class="data">
          <el-col class="item" :span="6">
            <span class="font">{{ identify.faceCount }}</span>
            <span>人脸库照片数</span>
          </el-col>
          <el-col class="item" :span="6">
            <span class="font">{{ identify.successCount }}</span>
            <span>识别成功数</span>
          </el-col>
          <el-col class="item" :span="6">
            <span class="font">{{ identify.failureCount }}</span>
            <i class="icon-dot" style="color: #eacf19"></i>
            <span>识别失败数</span>
          </el-col>

          <el-col class="item" :span="6">
            <span class="font">{{ identify.successRate }}</span>
            <span>识别成功率</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      identify: {
        faceCount: "",
        successCount: "",
        failureCount: "",
        successRate: "",
      },
    };
  },
  methods: {
    getdata() {
      this.$http({
        method: "get",
        url: "/statistic/face-count",
      }).then((res) => {
        // console.log(res.data, "成功率");
        if (res.data.code === 200) {
          this.identify = res.data.data;
        } else {
          this.$message(res.message);
        }
      });
    },
  },
  created() {
    setInterval(() => {
      this.getdata();
    }, 2000);
  },
};
</script>

<style lang="less" scoped>
.order {
  width: 100%;
}
.inner {
  border: 15px solid transparent;
  border-width: 51 38 20 132;
  border-image-source: url(../assets/imgs/border.png);
  border-image-slice: 51 38 20 132;
}
.order span {
  color: #4c9bfd;
  font-size: 12px;
}
.font {
  color: #fff !important;
  display: block;
  text-align: center;
}
</style>
