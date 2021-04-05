<template>
  <div>
    <el-row class="nav">
      <el-col :span="22" style="margin-top: 20px">
        <div class="activity" v-for="item in actionList" :key="item.id">
          <div class="img">
            <a @click="jump(item)">
              <img src="../assets/logo.jpg" style="height: 100%; width: 100%" />
            </a>
          </div>
          <div class="activity_head">
            <h3>{{ item.name }}</h3>
            <p>指挥员: {{ item.commander.name }}</p>
            <p>创建时间: {{ item.createTime }}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      actionList: [],
      queryInfo: {
        currentPage: 1,
        pageSize: 100,
      },
    };
  },
  methods: {
    async getActionList() {
      const { data: res } = await this.$http.get(
        "command/action/",
        this.queryInfo
      );
      if (res.code === 200) this.actionList = res.data;
      console.log(res.data);
    },
    jump(item) {
      console.log(this.$route.query.commanderId);

      console.log("mmm", item.lostId);
      this.$router.push({
        path: "/elderMsg",
        query: {
          lostId: item.lostId,
          commanderId: this.$route.query.commanderId,
          id: item.id
        },
      });
    },
  },
  created() {
    console.log(this.$route.query.commanderId);

    this.getActionList();
  },
};
</script>
<style lang="less" scoped>
.activity {
  height: 300px;
  width: 200px;
  margin: 10px;
  float: left;
  background: #f3f3f3;
}
.img {
  height: 150px;
  width: 200px;
}
//.activity_head {
//  text-align: center;
//}
</style>
