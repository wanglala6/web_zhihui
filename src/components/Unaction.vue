<template>
  <div>
    <div class="action-list" data-step="4" data-intro="点击活动 选择发送区域">
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
// 导出组件数据
import introJs from "intro.js";
import "intro.js/introjs.css";
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
    guide3() {
      introJs()
        .setOptions({
          nextLabel: "下一个", // 下一个按钮文字
          prevLabel: "上一个", // 上一个按钮文字
          skipLabel: "跳过", // 跳过按钮文字
          doneLabel: "立即体验", // 完成按钮文字
          hidePrev: true, // 在第一步中是否隐藏上一个按钮
          hideNext: true, // 在最后一步中是否隐藏下一个按钮
          exitOnOverlayClick: false, // 点击叠加层时是否退出介绍
          showStepNumbers: false, // 是否显示红色圆圈的步骤编号
          disableInteraction: true, // 是否禁用与突出显示的框内的元素的交互，就是禁止点击
          showBullets: false, // 是否显示面板指示点
        })
        .start();
    },
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
  mounted() {
    if (window.new3 === "") {
      this.guide3();
      window.new3 = "3";
    }
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
