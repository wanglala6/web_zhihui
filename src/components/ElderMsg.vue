<template>
  <div>
    <h1 style="font-size: 25px">{{ older.name }}</h1>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in pictures" :key="item">
        <el-image
          :src="item"
          style="height: 100%; width: 100%"
          :preview-src-list="pictures"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
    <el-divider></el-divider>
    <p>身份信息</p>
    <el-divider></el-divider>
    <div>
      <p>姓名：{{ older.name }}</p>
      <p>年龄：{{ older.age }}</p>
      <p>性别：男</p>

      <p>身份证号：xxxxxx</p>
    </div>
    <el-divider></el-divider>
    <p>走失地点</p>
    <el-divider></el-divider>
    <div>
      <p>走失时间：{{ older.lostTime }}</p>
      <p>走失地点：{{ older.lastPlace }}</p>
    </div>
    <el-divider></el-divider>
    <p>外貌特征</p>
    <el-divider></el-divider>
    <div>
      <p>外貌特点：xxxxxxxx</p>
      <p>衣着特征：{{ older.feature }}</p>
      <p>行为特征：xxxxxxxx</p>
    </div>
    <el-divider></el-divider>
    <p>备注信息</p>
    <el-divider></el-divider>
    <div>
      <p>患{{ older.disease }}</p>
      <p>曾于xx年走失，在xx地找到</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ElderMsg",
  data() {
    return {
      id: "",
      pictures: [
        "../assets/img/01.jpg",
        "../assets/img/02.jfif",
        "../assets/img/03.jfif",
        "../assets/img/04.jfif",
      ],
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
      this.lostId = this.$route.query.lostId;
      const res = await this.$http.get("/command/lost/all");
      console.log(res.data.data);
      res.data.data.forEach((element) => {
        if (element.id === this.lostId) {
          this.older = element;
          console.log(this.older);
        }
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
.el-carousel__item h3 {
  color: #475669;
  font-size: 24px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-collapse-item {
  font-size: 24px;
}
</style>
