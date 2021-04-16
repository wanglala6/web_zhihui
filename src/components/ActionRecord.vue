<template>
  <div class="container">
    <div class="radio">
      排序：
      <el-radio-group v-model="reverse">
        <el-radio :label="true">倒序</el-radio>
        <el-radio :label="false">正序</el-radio>
      </el-radio-group>
    </div>

    <el-timeline :reverse="reverse">
      <el-timeline-item
        :timestamp="notice.createTime"
        placement="top"
        v-for="notice in notices"
        :key="notice.index"
      >
        <el-card>
          <div class="flex">
            <h4>{{ notice.msg }}</h4>
            <el-link type="primary" @click="seeDetail(notice)"
              >查看详情
            </el-link>
          </div>
          <p
            v-if="
              notice.msgType !== 'notice' &&
              notice.msgType !== 'createAction' &&
              notice.msgType != 'createLost'
            "
          >
            {{ notice.volunteer.name }} 提交于 2018/4/12 20:46
          </p>
          <p v-if="notice.msgType === 'notice'">
            指挥端 提交于 2018/4/12 20:46
          </p>
          <p v-if="notice.msgType === 'createAction'">
            {{ notice.commander.name }} 提交于 2018/4/12 20:46
          </p>
          <p v-if="notice.msgType === 'createLost'">
            走失者家属 提交于 2018/4/12 20:46
          </p>
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <el-dialog title="通知详情" :visible.sync="see_notice" width="500px">
      <p>{{ this.notice_msg.msg }}</p>
      <p></p>
      <div style="position: absolute; right: 10px">
        <p>{{ this.notice_msg.time }}</p>
      </div>
      <p></p>
    </el-dialog>
    <el-dialog title="线索详情" :visible.sync="see_clue" width="700px">
      <p>{{ this.clue_msg.msg }}</p>
      <p></p>
      <div class="clue-img-list">
        <div
          class="demo-image__preview"
          v-for="img in clue_msg.imgs"
          :key="img.id"
        >
          <el-image
            style="
              width: 200px;
              height: 200px;
              border-radius: 5px;
              margin-right: 10px;
            "
            :src="img"
            :preview-src-list="clue_msg.imgs"
            z-index="9999"
          >
          </el-image>
        </div>
      </div>
      <div style="position: absolute; right: 10px">
        <p>{{ this.clue_msg.time }}</p>
      </div>
      <p></p>
    </el-dialog>
    <el-dialog title="人脸识别详情" :visible.sync="see_identify" width="700px">
      <p class="pen">{{ identify_msg.volunteerName }}：</p>
      <p class="default">{{ identify_msg.msg }}</p>
      <p>提交的用于识别的图片：</p>
      <div class="demo-image__preview" @click="not_see_identify">
        <el-image
          style="width: 100px; height: 100px"
          :src="identify_msg.url"
          :preview-src-list="identify_msg.srcList"
        >
        </el-image>
      </div>
    </el-dialog>
    <el-dialog
      title="随机报备详情"
      :visible.sync="see_random_report"
      width="700px"
    >
      <span>{{ random_report_msg.msg }}</span>
      <div
        class="demo-image__preview"
        v-for="img in random_report_msg.imgs"
        :key="img.id"
      >
        <el-image
          style="width: 100px; height: 100px"
          :src="img"
          :preview-src-list="random_report_msg.imgs"
          z-index="9999"
        >
        </el-image>
      </div>
      <div style="position: absolute; right: 10px">
        <p>{{ this.random_report_msg.time }}</p>
      </div>
    </el-dialog>
    <el-dialog title="开始报备" :visible.sync="see_start_report" width="700px">
      <div>
        <span>姓名： {{ start_report_msg.name }}</span>
        <el-divider></el-divider>
        <span>手机： {{ start_report_msg.telephone }}</span>
        <el-divider></el-divider>
        <span>装备： {{ start_report_msg.equipment }}</span>
        <el-divider></el-divider>
        <span>交通工具： {{ start_report_msg.transport }}</span>
        <el-divider></el-divider>
        <div style="position: absolute; right: 10px">
          <p>{{ this.start_report_msg.time }}</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { devServer } from "../../vue.config";

export default {
  name: "ActionRecord",
  data() {
    return {
      reverse: false,
      notices: [],
      see_notice: false,
      see_clue: false,
      see_identify: false,
      see_random_report: false,
      see_start_report: false,
      notice_msg: {},
      clue_msg: {},
      identify_msg: { url: " ", srcList: " " },
      random_report_msg: {},
      start_report_msg: {},
    };
  },
  methods: {
    pullMsg: function (e) {
      console.log(e);
      var _this = this;
      this.$http
        .get("/record/" + this.$route.query.id)
        .then((res) => {
          console.log(res);
          var data = res.data.data;
          var notice = [];
          // 处理老人消息
          var lost = data.action.lost;
          lost.msgType = "createLost";
          lost.msg = "家属提交走失者";
          notice.push(lost);
          // 处理行动开始通知
          var action = data.action;
          action.msgType = "createAction";
          action.msg = "归家行动创建";
          notice.push(action);
          // 处理通知
          data.notice.forEach(function (element) {
            element.msgType = "notice";
            element.index = notice.length;
            element.msg = "指挥端发布了一条通知";
            element.type = "notice";
            notice.push(element);
          });
          // 处理线索
          data.clue.forEach((element) => {
            element.msgType = "clue";
            element.index = notice.length;
            element.msg = "发现了一条线索";
            element.type = "clue";
            notice.push(element);
          });
          // 处理识别记录
          data.identify.forEach((element) => {
            element.msgType = "identify";
            element.index = notice.length;
            element.msg =
              "进行了在线识别,准确率:" + Math.ceil(element.similarity) + "%";
            element.type = "identify";
            notice.push(element);
          });
          // 处理随机报备
          data.randomReport.forEach((element) => {
            if (element.type !== 1) {
              element.msgType = "randomReport";
              element.index = notice.length;
              element.msg = "提交了一条报备信息";
              element.type = "random_report";
              notice.push(element);
            }
          });
          // 处理出发报备记录
          data.startReport.forEach((element) => {
            element.msgType = "startReport";
            element.index = notice.length;
            element.msg = "确定出发,并填写了出发报备表单";
            element.type = "start_report";
            notice.push(element);
          });
          notice.sort(function (a, b) {
            return a.createTime < b.createTime ? -1 : 1;
          });
          _this.notices = notice;
          console.log("获取行程完毕");
          console.log(_this.notices);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    seeDetail(item) {
      console.log("展示详情");
      console.log(item);
      if (item.msgType === "notice") {
        this.see_notice_detail(item);
      } else if (item.msgType === "clue") {
        this.see_clue_detail(item);
      } else if (item.msgType === "identify") {
        this.see_identify_detail(item);
      } else if (item.msgType === "randomReport") {
        this.see_random_report_detail(item);
      } else if (item.msgType === "startReport") {
        this.see_start_report_detail(item);
      } else if (item.msgType === "createAction") {
        this.$router.push({
          path: "/actionManage",
          query: { id: this.$route.query.id, lostId: this.$route.query.lostId },
        });
      } else if (item.msgType === "createLost") {
        this.$router.push({
          path: "/elderMsg",
          query: { id: this.$route.query.id, lostId: this.$route.query.lostId },
        });
      }
    },
    see_notice_detail(item) {
      this.see_notice = true;
      this.notice_msg.msg = item.msg;
      this.notice_msg.time = item.createTime;
      console.log(this.notice_msg.msg);
      console.log((this.notice_msg.time = item.createTime));
      console.log(item);
    },
    see_clue_detail(item) {
      this.see_clue = true;
      this.clue_msg.msg = item.content.content;
      this.clue_msg.time = item.createTime;
      this.clue_msg.imgs = [];
      var _this = this;
      item.content.imgs.forEach((element) => {
        _this.clue_msg.imgs.push(devServer.proxy["/"].target + element);
      });
      console.log(this.clue_msg.imgs);
    },
    see_identify_detail(item) {
      this.see_identify = true;
      console.log(item);
      this.identify_msg.url =
        devServer.proxy["/"].target + "/files/download?filename=" + item.imgUrl;
      this.identify_msg.srcList = [
        this.identify_msg.url,
        this.identify_msg.url,
      ];
      this.identify_msg.volunteerName = item.volunteerName;
      this.identify_msg.msg = item.msg;
      this.identify_msg.time = item.createTime;
    },
    see_random_report_detail(item) {
      this.see_random_report = true;
      this.random_report_msg.msg = item.content.content;
      this.random_report_msg.time = item.createTime;
      this.random_report_msg.imgs = [];
      var _this = this;
      item.content.imgs.forEach((element) => {
        _this.random_report_msg.imgs.push(
          devServer.proxy["/"].target + element
        );
      });
    },
    see_start_report_detail(item) {
      this.see_start_report = true;
      this.start_report_msg.name = item.volunteer.name;
      this.start_report_msg.telephone = item.volunteer.telephone;
      this.start_report_msg.equipment = item.equipment;
      this.start_report_msg.transport = item.transportMode;
      this.start_report_msg.time = item.createTime;
      console.log(item);
    },
    not_see_identify() {
      this.see_identify = false;
    },
  },
  created() {
    this.pullMsg();
  },
};
</script>

<style scoped>
.container {
  width: 90%;
  margin: 50px auto;
  padding: 20px;
  border-radius: 26px;
}

.radio {
  margin-bottom: 30px;
}

.flex {
  display: flex;
  justify-content: space-between;
}
</style>
