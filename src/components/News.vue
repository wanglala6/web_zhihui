<template>
  <div>
    <!-- 类型选择框 -->
    <div class="down_menu">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ type }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="notice">通知</el-dropdown-item>
          <el-dropdown-item command="clue">线索</el-dropdown-item>
          <el-dropdown-item command="random_report">消息</el-dropdown-item>
          <el-dropdown-item command="start_report">出发报备</el-dropdown-item>
          <el-dropdown-item command="identify">甄别记录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 消息卡片 -->
    <div class="block">
      <div v-if="notice_list.length == 0" class="block-noData">暂无数据哦~</div>
      <el-timeline>
        <el-timeline-item
          :timestamp="item.createTime"
          placement="top"
          v-for="item in notice_list"
          v-bind:key="item.id"
        >
          <el-card>
            <div class="notice">
              <el-avatar
                class="notice-left"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              ></el-avatar>
              <div class="notice-right">
                <div class="notice-right-top">{{ item.name }}</div>
                <div class="notice-right-down">{{ item.msg }}</div>
              </div>
              <div class="see-detail-right">
                <el-link type="primary" @click="seeDetail(item)"
                  >查看详情</el-link>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <el-dialog title="通知详情" :visible.sync="see_notice" width="500px">
      <p>{{ this.notice_msg.msg }}</p>
      <p></p>
      <div style="position: absolute; right: 10px">
        <p>{{ this.notice_msg.time }}</p>
      </div>
      <p></p>
    </el-dialog>
    <el-dialog
      title="线索详情"
      :visible.sync="see_clue"
      width="700px"
    >
      <p>{{this.clue_msg.msg}}</p>
      <p></p>
      <div class="demo-image__preview" v-for="img in clue_msg.imgs" :key="img.id">
        <el-image
          style="width: 100px; height: 100px"
          :src="img"
          :preview-src-list="clue_msg.imgs"
          z-index = "99999999999"
        >
        </el-image>
      </div>
      <div style="position:absolute;right:10px;">
        <p>{{this.clue_msg.time}}</p>
      </div>
      <p> </p>
    </el-dialog>
    <el-dialog
      title="人脸识别详情"
      :visible.sync="see_identify"
      width="700px"
    >
      <p class="pen">{{identify_msg.volunteerName}}：</p>
      <p class="default">{{identify_msg.msg}}</p>
      <p>提交的用于识别的图片：</p>
      <div class="demo-image__preview" @click="not_see_identify"
          >
        <el-image
          style="width: 100px; height: 100px"
          :src="identify_msg.url"
          :preview-src-list="identify_msg.srcList">
        </el-image>
      </div>
    </el-dialog>
    <el-dialog
      title="随机报备详情"
      :visible.sync="see_random_report"
      width="700px"
    >
      <span>{{random_report_msg.msg}}</span>
      <div class="demo-image__preview" v-for="img in random_report_msg.imgs" :key="img.id">
        <el-image
          style="width: 100px; height: 100px"
          :src="img"
          :preview-src-list="random_report_msg.imgs"
          z-index = "99999999999"
        >
        </el-image>
      </div>
      <div style="position:absolute;right:10px;">
        <p>{{this.random_report_msg.time}}</p>
      </div>
    </el-dialog>
    <el-dialog
      title="开始报备"
      :visible.sync="see_start_report"
      width="700px"
    >
    <div>
      <span>姓名： {{start_report_msg.name}}</span>
      <el-divider></el-divider>
      <span>手机： {{start_report_msg.telephone}}</span>
      <el-divider></el-divider>
      <span>装备： {{start_report_msg.equipment}}</span>
      <el-divider></el-divider>
      <span>交通工具： {{start_report_msg.transport}}</span>
      <el-divider></el-divider>
      <div style="position:absolute;right:10px;">
        <p>{{this.start_report_msg.time}}</p>
      </div>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import { devServer } from "../../vue.config"

export default {
  data() {
    return {
      type: "甄别记录",
      message: [],
      notice_list: [],
      actionId: "",
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
    not_see_identify() {
      this.see_identify = false;
    },
    seeDetail(item) {
      if (this.type === "通知") {
        this.see_notice_detail(item);
      } else if (this.type === "线索") {
        this.see_clue_detail(item);
      } else if (this.type === "甄别记录") {
        this.see_identify_detail(item);
      } else if (this.type === "消息") {
        this.see_random_report_detail(item);
      } else if (this.type === "出发报备") {
        this.see_start_report_detail(item);
      }
  },
  see_notice_detail(item) {
    this.see_notice = true
    this.notice_msg.msg = item.msg
    this.notice_msg.time = item.createTime
    console.log(this.notice_msg.msg)
    console.log(this.notice_msg.time = item.createTime)
    console.log(item)
  },
  see_clue_detail(item) {
      this.see_clue = true
      this.clue_msg.msg = item.content.content
      this.clue_msg.time = item.createTime
      this.clue_msg.imgs = []
      var _this = this
      item.content.imgs.forEach((element) => {
        _this.clue_msg.imgs.push(devServer.proxy["/"].target + element)
      })
    console.log(this.clue_msg.imgs)
  },
  see_identify_detail(item) {
    this.see_identify = true
    console.log(item)
    this.identify_msg.url = devServer.proxy["/"].target + "/files/download?filename=" + item.imgUrl
    this.identify_msg.srcList = [this.identify_msg.url, this.identify_msg.url]
    this.identify_msg.volunteerName = item.volunteerName
    this.identify_msg.msg = item.msg
    this.identify_msg.time = item.createTime
  },
  see_random_report_detail(item) {
    this.see_random_report = true
    this.random_report_msg.msg = item.content.content
    this.random_report_msg.time = item.createTime
    this.random_report_msg.imgs = []
    var _this = this
    item.content.imgs.forEach((element) => {
      _this.random_report_msg.imgs.push(devServer.proxy["/"].target + element)
    })
  },
  see_start_report_detail(item) {
    this.see_start_report = true
    this.start_report_msg.name = item.name
    this.start_report_msg.telephone = item.volunteer.telephone
    this.start_report_msg.equipment = item.equipment
    this.start_report_msg.transport = item.transportMode
    this.start_report_msg.time = item.createTime
    console.log(item)
  },
  // 处理下拉菜单事件
  handleCommand(command) {
    if (command === "notice") {
      this.getNotice();
      this.type = "通知";
    } else if (command === "clue") {
      this.getClue();
      this.type = "线索";
    } else if (command === "identify") {
      this.getIdentifyData();
      this.type = "甄别记录";
    } else if (command === "random_report") {
      this.getMsg();
      this.type = "消息";
    } else if (command === "start_report") {
      this.getStartReport();
      this.type = "出发报备";
    }
  },
  // 获取人脸识别数据
  async getIdentifyData() {
    const { data: res } = await this.$http.get(
      "/phone/identify/by-action/" + this.actionId
    );
    console.log("获取人脸识别记录成功!");
    console.log(res);
    var list = [];
    res.data.forEach((element) => {
      if (element.similarity !== 0) {
        element.msg =
          "进行了一次在线识别，成功匹配，准确度为" +
          element.similarity +
          "%";
      } else {
        element.msg = "进行了一次在线识别，未找到匹配人脸";
      }
      element.name = element.volunteer.name;
      list.push(element);
    });
    this.notice_list = list;
  },
  // 获取通知数据
  getNotice() {
    var _this = this;
    this.$http
      .get("/command/notice/by-action/" + this.actionId)
      .then((res) => {
        console.log("获取通知成功!");
        console.log(res);
        const list = [];
        res.data.data.forEach((element) => {
          console.log(element);
          if (element.type === "0") {
            const tmp = element;
            tmp.msg =
              "有走失者出现!已走失" +
              element.content.lostHours +
              "小时, 最后走失地点为: " +
              element.content.lostPlace +
              ", 请尽快出动!";
            tmp.name = "指挥端";
            list.push(tmp);
          } else {
            const tmp = element;
            tmp.msg = element.content.content;
            tmp.name = "指挥端";
            list.push(tmp);
          }
        });
        _this.notice_list = list;
      })
      .catch((err) => {
        console.log("获取通知失败!");
        console.log(err);
      });
  },
  // 获取线索
  getClue() {
    var _this = this;
    this.$http
      .get("/phone/clue/by-action/" + this.actionId)
      .then((res) => {
        console.log("获取线索成功!");
        console.log(res);
        const list = [];
        res.data.data.forEach((element) => {
          const tmp = element;
          tmp.msg = element.content.content;
          tmp.name = element.volunteer.name;
          list.push(tmp);
        });
        _this.notice_list = list;
      })
      .catch((err) => {
        console.log("获取线索失败!");
        console.log(err);
      });
  },
  // 获取消息
  getMsg() {
    var _this = this;
    this.$http
      .get("/command/random_report/msg/by-action/" + this.actionId)
      .then((res) => {
        console.log("获取消息成功!");
        console.log(res);
        const list = [];
        res.data.data.forEach((element) => {
          const tmp = element;
          tmp.msg = element.content.content;
          tmp.name = element.volunteer.name;
          list.push(tmp);
        });
        _this.notice_list = list;
      })
      .catch((err) => {
        console.log("获取消息失败!");
        console.log(err);
      });
  },
  // 获取出发报备
  getStartReport() {
    var _this = this;
    this.$http
      .get("/command/start_report/by-action/" + this.actionId)
      .then((res) => {
        console.log("获取出发报备成功!");
        console.log(res);
        const list = [];
        res.data.data.forEach((element) => {
          const tmp = element;
          tmp.msg = "确定出动! 交通方式: " + element.transportMode;
          tmp.name = element.volunteer.name;
          list.push(tmp);
        });
        _this.notice_list = list;
      })
      .catch((err) => {
        console.log("获取出发报备失败!");
        console.log(err);
      });
  },
},
  created() {
    this.actionId = this.$route.query.actionId;
    this.getIdentifyData();
  }
  }

</script>

<style scoped>
.block {
  margin-top: 20px;
}

.block-noData {
  text-align: center;
  color: #c3ccc7;
}

.notice {
  display: flex;
}

.notice-right {
  margin-left: 10px;
}

.notice-right-top {
  height: 15px;
  font-size: small;
  color: #b8b8b7;
  line-height: 20px;
}

.notice-right-down {
  height: 20px;
  font-weight: bold;
  line-height: 30px;
}

.down_menu {
  position: absolute;
  right: 3%;
  top: 10%;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.see-detail-right {
  position: absolute;
  right: 20px;
}
.pen{
  color:#99a9bf;
  font-size:10px;
}
.default{
  color:black;
  font-size:18px;
}
</style>
