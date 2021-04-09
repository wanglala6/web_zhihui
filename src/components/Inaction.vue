<template>
  <div>
    <el-row class="nav">
      <el-col :span="24">
        <ActionCard v-for="item in actionList" v-bind:key="item.id" v-bind:action="item"></ActionCard>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ActionCard from "@/components/ActionCard";
export default {
  components: { ActionCard },
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
</style>
