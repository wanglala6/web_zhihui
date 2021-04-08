<template>
  <div>
    <el-row class="nav">
      <el-col :span="22" style="margin-top: 20px">
        <div class="activity" v-for="item in actionList" :key="item.id">
          <div class="img">
            <a @click="jump(item)">
              <img :src="item.lost.avatar" style="height: 100%; width: 100%" />
            </a>
          </div>
          <div class="activity_head">
            <div>{{ item.name }}</div>
            <div>指挥员: {{ item.commander.name }}</div>
            <div>走失者：{{ item.lost.name }}</div>
            <span class="time">创建时间: {{ item.createTime }}</span>
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
        status: 1,
        pageSize: 1000,
        currentPage: 1,
        commanderId: this.$route.query.commanderId,
      },
    };
  },
  methods: {
    // 删除行动
    delete(id) {
      this.$http({
        methods: "put",
        url: "/command/action/" + id,
      }).then((res) => {});
    },
    async getActionList() {
      const { data: res } = await this.$http({
        method: "get",
        url: "/command/action/search-like",
        params: this.queryInfo,
      });
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
          id: item.id,
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
  height: 250px;
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
.time {
  color: #999;
  font-size: 12px;
}
</style>
