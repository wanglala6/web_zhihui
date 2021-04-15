<template>
  <div>
    <div class="action-list">
      <ActionCard
        v-for="action in unactionList"
        :key="action.id"
        :action="action"
        v-on:flush="getunactionlist"
      ></ActionCard>
    </div>
  </div>
</template>
<script>
import ActionCard from "@/components/ActionCard";
export default {
  components: {
    ActionCard,
  },
  data() {
    return {
      diaedit: false,
      form: {
        name: "",
      },
      queryInfo: {
        status: 0,
        pageSize: 9999,
        currentPage: 1,
        commanderId: this.$route.query.commanderId,
      },
      action: {},
      unactionList: [],
    };
  },
  props: {
    // eslint-disable-next-line vue/no-dupe-keys
    value: Boolean,
    // eslint-disable-next-line vue/no-dupe-keys
    mapHeight: {
      type: Number,
      default: 500,
    },
  },
  methods: {
    getunactionlist() {
      this.$http({
        method: "get",
        url: "/command/action/search-like",
        params: this.queryInfo,
      }).then((res) => {
        console.log(res);
        this.unactionList = res.data.data;
      });
    },
  },
  created() {
    this.getunactionlist();
  },
};
</script>
<style lang="less" scoped>
.action-list {
  display: flex;
  flex-wrap: wrap;
}

.activity {
  padding: 20px;
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
.del_btn {
  display: none;
}
.edltbtn {
  display: none;
}
.activity:hover .del_btn {
  display: inline-block;
}
.activity:hover .edltbtn {
  display: inline-block;
}
</style>
