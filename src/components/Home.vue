<template>
  <div style="height: 100%">
    <el-container class="home_container">
      <!-- 头部区 -->
      <el-header>
        <div style="width: 55px; height: 55px; border-radius: 50%">
          <img
            src="../assets/imgs/logo2.png"
            style="height: 100%; width: 100%; border-radius: 50%"
          />
        </div>
        <div class="font">归家行动指挥中心</div>
        <div>
          <div id="he-plugin-simple" class="weather"></div>
          <el-dropdown
            class="notify"
            @mouseenter.native="pullMsg"
            @command="goto_notice_detail"
          >
            <el-badge
              :value="icon_value"
              class="notify-icon"
              :hidden="isHidden"
            >
              <div class="el-icon-message-solid"></div>
            </el-badge>
            <el-dropdown-menu
              slot="dropdown"
              class="notify-dropdown"
              placement="bottom-start"
            >
              <el-dropdown-item class="notify-title">我的消息</el-dropdown-item>
              <el-dropdown-item class="notify-without" v-if="hasMsg === false"
                >暂无信息</el-dropdown-item
              >
              <div v-if="hasMsg">
                <el-dropdown-item
                  class="notify-item"
                  v-for="notice in notices"
                  :key="notice.index"
                  :command="notice.type"
                >
                  <el-avatar
                    shape="square"
                    :size="50"
                    :src="notice.volunteer.avatar"
                  ></el-avatar>
                  <div class="notify-item-body">
                    <div class="notify-item-name">
                      {{ notice.volunteer.name }}
                    </div>
                    <div class="notify-item-msg">{{ notice.msg }}</div>
                  </div>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="info" @click="logout">退出</el-button>
        </div>
      </el-header>
      <!-- 主体区 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="iscollapse ? '64px' : '200px'">
          <div class="toggle_button" @click="togglecollapse">|||</div>
          <el-menu
            background-color="#ececec"
            text-color="#000"
            active-text-color="#409EFF"
            :collapse="iscollapse"
            :collapse-transition="false"
            :unique-opened="true"
            :router="true"
            default-active="/elderMsg"
          >
            <!-- 一级菜单模板任务管理 -->
            <el-submenu index="2">
              <template slot="title">
                <div
                  data-step="1"
                  data-intro="点击行动管理，对任务状态进行更新，查询志愿者相关状态，为志愿者分配队伍，查看项目进展动态"
                >
                  <!-- 图标 -->
                  <i class="el-icon-edit"></i>
                  <!-- 文本 -->
                  <span>行动管理</span>
                </div>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                index="/actionManage"
                :route="{
                  path: '/actionManage',
                  query: { id: id, lostId: lostId },
                }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-coordinate"></i>
                  <!-- 文本 -->
                  <span>状态管理</span>
                </template>
              </el-menu-item>
              <el-menu-item
                index="/volManage"
                :route="{
                  path: '/volManage',
                  query: { id: id, lostId: lostId },
                }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-mobile"></i>
                  <!-- 文本 -->
                  <span>行动管理</span>
                </template>
              </el-menu-item>
              <el-menu-item
                index="/actionRecord"
                :route="{
                  path: '/actionRecord',
                  query: { id: id, lostId: lostId },
                }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-s-flag"></i>
                  <!-- 文本 -->
                  <span>流程记录</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <!-- 一级菜单 -->
            <el-submenu index="1">
              <!-- 一级菜单模板数据查询 -->
              <template slot="title">
                <div
                  data-step="2"
                  data-intro="点击数据查询，查询老人信息,志愿者信息及地图查询"
                >
                  <!-- 图标 -->
                  <i class="el-icon-search"></i>
                  <!-- 文本 -->
                  <span>数据查询</span>
                </div>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                index="/elderMsg"
                :route="{
                  path: '/elderMsg',
                  query: { id: id, lostId: lostId },
                }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-user"></i>
                  <!-- 文本 -->
                  <span>老人信息</span>
                </template>
              </el-menu-item>
              <el-menu-item
                index="/valSearch"
                :route="{
                  path: '/valSearch',
                  query: { id: id, lostId: lostId },
                }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-view"></i>
                  <!-- 文本 -->
                  <span>志愿者查询</span>
                </template>
              </el-menu-item>
              <el-menu-item
                index="/mapSearch"
                :route="{
                  path: '/mapSearch',
                  query: { id: id, lostId: lostId },
                }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-map-location"></i>
                  <!-- 文本 -->
                  <span>地图查询</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <!-- 一级菜单模板监控模块 -->
            <el-submenu index="3">
              <template slot="title">
                 <div
                  data-step="3"
                  data-intro="点击监控模块，查看报备线索甄别记录"
                >
                <!-- 图标 -->
                <i class="el-icon-data-line"></i>
                <!-- 文本 -->
                <!--跳转到监控模块-->
                <span>监控模块</span>
                 </div>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                index="/mainMonitor"
                :route="{
                  path: '/mainMonitor',
                  query: { id: id, lostId: lostId },
                }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-mobile"></i>
                  <!-- 文本 -->
                  <span>监控界面</span>
                </template>
              </el-menu-item>
              <!-- 二级菜单 -->

              <el-menu-item
                index="/post"
                :route="{ path: '/post', query: { id: id, lostId: lostId } }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-mobile"></i>
                  <!-- 文本 -->
                  <span>出发报备</span>
                </template>
              </el-menu-item>
              <!-- 二级菜单 -->
              <el-menu-item
                index="/clue"
                :route="{ path: '/clue', query: { id: id, lostId: lostId } }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-user"></i>
                  <!-- 文本 -->
                  <span>线索记录</span>
                </template>
              </el-menu-item>
              <el-menu-item
                index="/identifyRecord"
                :route="{
                  path: '/identifyRecord',
                  query: { id: id, lostId: lostId },
                }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-user"></i>
                  <!-- 文本 -->
                  <span>甄别记录</span>
                </template>
              </el-menu-item>
              <el-menu-item
                index="/randomReport"
                :route="{
                  path: '/randomReport',
                  query: { id: id, lostId: lostId },
                }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-user"></i>
                  <!-- 文本 -->
                  <span>报备记录</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <!-- 一级菜单模板消息通知 -->

            <el-submenu index="4" router>
              <!-- 一级菜单模板qu -->
              <template slot="title">
                 <div
                  data-step="4"
                  data-intro="点击消息通知，查看消息"
                >
                <!-- 图标 -->
                <i class="el-icon-chat-dot-square"></i>
                <!-- 文本 -->
                <span>消息通知</span>
                 </div>
              </template>

              <el-menu-item
                index="/newsEdit"
                :route="{
                  path: '/newsEdit',
                  query: { id: this.id, lostId: lostId },
                }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-edit-outline"></i>
                  <!-- 文本 -->
                  <span>发送消息</span>
                </template>
              </el-menu-item>

              <!-- 二级菜单 -->
              <el-menu-item
                index="/news"
                :route="{
                  path: '/news',
                  query: { id: this.id, lostId: lostId },
                }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-pie-chart"></i>
                  <!-- 文本 -->
                  <span>我的消息</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧主体区 -->
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!--    <div class="alarm_box"-->
    <!--      :visible.sync="alarmVisible">-->
    <!--      <img src="../assets/alarm.svg" class="alarm_style">-->
    <!--      <p style="color:#fff;text-align:center;font-size:25px;">警报：志愿者hxx上传的甄别照片相似度达90%</p>-->
    <!--    </div>-->
    <alarm
      :isHide="isHide"
      :volunteer="volunteer"
      :similarity="similarity"
      @close="close"
    ></alarm>
  </div>
</template>
<script>
import introJs from "intro.js";
import Stomp from "stompjs";
// ---jq:在sysconstant.js配置文件中配置mqtt的服务端地址，账号等信息
import {
  MQTT_SERVICE,
  MQTT_USERNAME,
  MQTT_PASSWORD,
} from "../config/sysconstant.js";
import Alarm from "../components/Alarm";

export default {
  components: { Alarm },
  data() {
    return {
      isHidden: true,
      icon_value: 0,
      alarmVisible: "false",
      lostId: "",
      id: "",
      iscollapse: false,
      older: {},
      client: Stomp.client(MQTT_SERVICE),
      news: {},
      Msg: {},
      type: "",
      score: 0,
      isHide: true,
      volunteer: undefined,
      similarity: 0,
      // 头部消息图标使用
      notices: [
        {
          index: 0,
          msg: "加载中",
          volunteer: {
            name: "加载中",
          },
        },
      ],
      hasMsg: true,
    };
  },
  methods: {
    guide4() {
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
    close() {
      this.isHide = true;
    },
    logout() {
      // window.sessionStorage.clear();
      this.$router.push({
        path: "/welcome",
        query: { commanderId: this.$route.query.commanderId },
      });
    },
    // jq:点击按钮切换折叠
    togglecollapse() {
      this.iscollapse = !this.iscollapse;
    },
    //  jq:消息弹窗函数
    notify() {
      console.log("显示弹窗");
      var _this = this;
      this.$notify.info({
        title: this.Msg.title,
        message: this.Msg.abstract,
        onClick() {
          console.log(this.type.type);
          if (_this.type === "START_REPORT") {
            _this.toStartDetails();
            // eslint-disable-next-line brace-style
          } //  自定义回调,message为传的参数
          else {
            _this.toUrgentDetails();
          }
        },
      });
    },
    //  实现点击弹窗后跳转到消息详情界面
    toStartDetails() {
      this.$router.push({ path: "/startNewsDetail", query: this.news.id });
    },
    toUrgentDetails() {
      this.$router.push("/urgentNewsDetail");
    },
    //  处理消息队列传来的json字符串
    evil(fn) {
      // 一个变量指向Function，防止有些前端编译工具报错
      var Fn = Function;
      return new Fn("return " + fn)();
    },
    // jq：stomp监听消息队列相关函数
    onConnected: function (frame) {
      var topic = "/queue/" + this.id + "_commander";
      // ---订阅频道
      this.client.subscribe(topic, this.responseCallback, this.onFailed);
    },
    onFailed: function (frame) {
      console.log("Failed: " + frame);
    },
    responseCallback: function (frame) {
      console.log("测试");
      console.log(this.icon_value);
      this.icon_value = this.icon_value + 1;
      console.log(this.icon_value);
      this.isHidden = false;
      this.news = JSON.parse(this.evil(frame.body).replace("/\\", "")).data;
      this.type = JSON.parse(this.evil(frame.body).replace("/\\", "")).type;

      if (this.type === "EMERGENCY_NOTICE") {
        this.volunteer = this.news.volunteer;
        this.similarity = Math.ceil(this.news.score);
        this.isHide = false;
      } else {
        console.log(this.type);
        this.$http
          .get("/command/volunteer/" + this.news.volunteerId)
          .then((res) => {
            console.log(res);
            this.Msg.title = "来自志愿者:" + res.data.data.name;
            console.log(this.Msg.title);
            if (this.type === "EMERGENCY_NOTICE") {
              this.Msg.abstract = "紧急通知";
            } else if (this.type === "START_REPORT") {
              this.Msg.abstract = "出发报备";
            } else if (this.type === "RANDOM_REPORT") {
              this.Msg.abstract = "平时报备";
            }
            // this.notices.push(this.Msg)
            this.notify();
          });
      }

      // ---接收消息
    },
    connect: function () {
      // ---初始化mqtt客户端，并连接mqtt服务
      var headers = {
        login: MQTT_USERNAME,
        passcode: MQTT_PASSWORD,
        // additional header
      };
      this.client.connect(headers, this.onConnected, this.onFailed);
    },
    // 抓取所有消息
    pullMsg: function (e) {
      this.hasMsg = true;
      console.log(e);
      var _this = this;
      this.$http
        .get("/record/" + this.id)
        .then((res) => {
          console.log(res);
          var data = res.data.data;
          var notice = [];
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
          // notice.forEach((ele) => {
          //   console.log(ele.createTime)
          // })
          // notice.sort(this.compare("createTime")).reverse();
          notice.sort(function (a, b) {
            return a.createTime < b.createTime ? 1 : -1;
          });
          if (notice.length === 0) {
            this.hasMsg = false;
            return;
          }
          _this.notices = notice;
          console.log(_this.notices);
          console.log("测试");
          this.icon_value = 0;
          console.log(this.icon_value);
          this.isHidden = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 工具函数，用于排序
    compare: function (property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        var t1 = new Date(Date.parse(value1.replace(/-/g, "/")));
        var t2 = new Date(Date.parse(value2.replace(/-/g, "/")));
        return t2.getTime() - t1.getTime();
      };
    },
    goto_notice_detail(type) {
      console.log(type);
      var id = this.$route.query.id;
      var lostId = this.$route.query.lostId;
      if (type === "clue") {
        this.$router.push({
          path: "/clue",
          query: { id: id, lostId: lostId },
        });
      } else if (type === "identify") {
        this.$router.push({
          path: "/identifyRecord",
          query: { id: id, lostId: lostId },
        });
      } else if (type === "random_report") {
        this.$router.push({
          path: "/randomReport",
          query: { id: id, lostId: lostId },
        });
      } else {
        this.$router.push({
          path: "/post",
          query: { id: id, lostId: lostId },
        });
      }
    },
  },
  created() {
    this.connect();
    this.lostId = this.$route.query.lostId; // 走失者id
    this.id = this.$route.query.id; // 活动id
    this.commanderId = this.$route.query.commanderId;
    console.log(this.commanderId);
    // 链接天气插件
    window.WIDGET = {
      CONFIG: {
        modules: "01234",
        background: "4",
        backgroundColor: "373D41",
        tmpColor: "FFFFFF",
        tmpSize: "16",
        cityColor: "FFFFFF",
        citySize: "16",
        aqiColor: "FFFFFF",
        aqiSize: "16",
        weatherIconSize: "24",
        alertIconSize: "18",
        padding: "10px 10px 10px 10px",
        shadow: "0",
        language: "auto",
        fixed: "false",
        vertical: "top",
        horizontal: "left",
        key: "bb6e2e6313854a9488526b271dff6679",
      },
    };

    const oScript = document.createElement("script");
    oScript.type = "text/javascript";

    oScript.src =
      "https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0";
    document.body.appendChild(oScript);
  },
  mounted() {
    if (window.new4 === "") {
      this.guide4();
      window.new4 = "4";
    }
  },
};
</script>
<style lang="less" scoped>
.link_style {
  position: absolute;
  margin-left: 100px;
}

.alarm_box {
  height: 100%;
  width: 100%;
  background-color: #000;
  position: absolute;
  top: 0;
  z-index: 100;
  opacity: 0.8;
}

.alarm_style {
  width: 24%;
  margin-left: 38%;
  margin-top: 12%;
}

.font {
  position: absolute;
  margin-left: 70px;
  font-size: 20px;
}

.weather {
  z-index: 99999999;
}

.el-menu-item {
  //border-bottom: 0.5px solid #dedede;
}

.el-header {
  opacity: 0.99;
  background-color: #373d41; //#373d41
  border-radius: 1px;
  //流式布局
  display: flex;
  justify-content: space-between; //贴边对齐
  padding-left: 0;
  align-items: center; //垂直居中
  color: #fff;
  font-size: 28px;

  > div {
    display: flex;
    align-items: center;
  }
}

.el-aside {
  background-color: #ececec; //#333744

  .el-menu {
    border-right: none;
  }
}

.el-main {
  margin: 0;
  padding: 0;
  background-color: #f6f6f6;
}

.home_container {
  height: 100%;
}

.toggle_button {
  background-color: #ececec;
  font-size: 10px;
  line-height: 24px;
  color: #b4c7d0;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.turn_a {
  text-decoration: none;
  color: #000;
}

.notify {
  font-size: 22px;
  color: #000;
}

.notify-icon {
  margin: 0 30px 0 20px;
  cursor: pointer;
  color: #fff;
}

.notify-title {
  text-align: center;
  border-bottom: 1px solid #ebebeb;
  width: 270px;
}

.notify-without {
  text-align: center;
  width: 270px;
  height: 200px;
  line-height: 200px;
  color: #909399;
}

.notify-dropdown {
  height: 300px;
  overflow: auto;
}

.notify-dropdown::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #f5f5f5;
}

.notify-dropdown::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f5f5f5;
}

.notify-item {
  width: 270px;
  height: 44px;
  padding: 14px;
  display: flex;
}

.notify-item-body {
  width: 200px;
  height: 44px;
  margin-left: 20px;
}

.notify-item-name {
  font-size: 16px;
  line-height: 20px;
  height: 20px;
}

.notify-item-msg {
  color: #8f99ad;
  font-size: 14px;
}

.main {
  overflow: hidden !important;
}
</style>
