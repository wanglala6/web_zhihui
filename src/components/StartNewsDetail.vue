<template>
  <div>
    <p>报备人</p>
    <p>行动名称</p>
    <p>出发时间</p>
    <p>出动地点</p>
    <p>交通方式</p>
    <p>携带装备</p>
  </div>
</template>

<script>
export default {
  name: "StartNewsDetail",
  data() {
    return {
      noticeID: {}
    }
  },
  methods: {
    async getMsg() {
      const { data: res } = await this.$http.get("/command/start_report/" + this.noticeID)
      console.log(res)
    },
  },
  created() {
    // this.noticeID = this.$route.query.id
    // this.getMsg()
  }
}
</script>

<style scoped>

</style>
