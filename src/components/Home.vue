<template>
  <div style="height: 100%">
    <el-container class="home_container">
      <!-- 头部区 -->
      <el-header>
        <div style="width: 55px; height: 55px; border-radius: 50%">
          <img
            src="../assets/logo.jpg"
            style="height: 100%; width: 100%; border-radius: 50%"
          />
        </div>
         <div class="font">救援队指挥中心</div>
        <div>
          <div id="he-plugin-simple" class="weather"></div>
          <el-dropdown class="notify" @mouseenter.native="pullMsg">
            <el-badge :value="icon_value" class="notify-icon" :hidden="isHidden">
              <div class="el-icon-message-solid"></div>
            </el-badge>
            <el-dropdown-menu
              slot="dropdown"
              class="notify-dropdown"
              placement="bottom-start"
            >
              <el-dropdown-item class="notify-title">我的消息</el-dropdown-item>
              <el-dropdown-item
                class="notify-item"
                v-for="notice in notices"
                :key="notice.index"
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

          <!--          &lt;!&ndash; 侧边栏菜单区 &ndash;&gt; //#333744-->
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
                <!-- 图标 -->
                <i class="el-icon-edit"></i>
                <!-- 文本 -->
                <span>行动管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                index="/actionManage"
                :route="{ path: '/actionManage', query: { id: id, lostId: lostId } }"
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
                :route="{ path: '/volManage', query: { id: id, lostId: lostId } }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-mobile"></i>
                  <!-- 文本 -->
                  <span>行动管理</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <!-- 一级菜单 -->
            <el-submenu index="1">
              <!-- 一级菜单模板数据查询 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-search"></i>
                <!-- 文本 -->
                <span>数据查询</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                index="/elderMsg"
                :route="{ path: '/elderMsg', query: { id: id, lostId: lostId } }"
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
                :route="{ path: '/valSearch', query: { id: id, lostId: lostId } }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-view"></i>
                  <!-- 文本 -->
                  <span>志愿者查询</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/mapSearch" :route="{ path: '/mapSearch', query: { id: id, lostId: lostId } }">
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
                <!-- 图标 -->
                <i class="el-icon-data-line"></i>
                <!-- 文本 -->
                <!--跳转到监控模块-->
                <span>监控模块</span>
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
                :route="{ path: '/clue', query: { actionId: id, lostId: lostId } }"
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
                :route="{ path: '/identifyRecord', query: { actionId: id, lostId: lostId } }"
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
                :route="{ path: '/randomReport', query: { actionId: id, lostId: lostId } }"
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
                <!-- 图标 -->
                <i class="el-icon-chat-dot-square"></i>
                <!-- 文本 -->
                <span>消息通知</span>
              </template>

              <el-menu-item
                index="/newsEdit"
                :route="{ path: '/newsEdit', query: { actionId: this.id, lostId: lostId } }"
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
                :route="{ path: '/news', query: { actionId: this.id, lostId: lostId } }"
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
  </div>
</template>
<script>
import Stomp from "stompjs";
// ---jq:在sysconstant.js配置文件中配置mqtt的服务端地址，账号等信息
import {
  MQTT_SERVICE,
  MQTT_USERNAME,
  MQTT_PASSWORD,
} from "../config/sysconstant.js";

export default {
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
    };
  },
  methods: {
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
    //  获取到通知弹窗需要的相关信息
    async dataProcess() {
      const { data: res } = await this.$http.get(
        "/command/volunteer/" + this.news.volunteerId
      );
      console.log(this.type);
      this.Msg.title = "来自志愿者:" + res.data.name;
      this.Msg.name = res.data.name
      if (this.type === "EMERGENCY_NOTICE") {
        this.Msg.abstract = "紧急通知";
      } else if (this.type === "START_REPORT") {
        this.Msg.abstract = "出发报备";
      } else if (this.type === "RANDOM_REPORT") {
        this.Msg.abstract = "平时报备";
      }
      // this.notices.push(this.Msg)
      this.notify();
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
      console.log("测试")
      console.log(this.icon_value)
      this.icon_value = this.icon_value + 1
      console.log(this.icon_value)
      this.isHidden = false
      this.news = JSON.parse(
        this.evil(decodeURI(frame.body)).replace("/\\", "")
      ).data;
      this.type = JSON.parse(
        this.evil(decodeURI(frame.body)).replace("/\\", "")
      ).type;
      this.dataProcess();
      console.log(this.type);
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
            notice.push(element);
          });
          // 处理识别记录
          data.identify.forEach((element) => {
            element.msgType = "identify";
            element.index = notice.length;
            element.msg =
              "进行了在线识别,准确率:" + Math.ceil(element.similarity) + "%";
            notice.push(element);
          });
          // 处理随机报备
          data.randomReport.forEach((element) => {
            if (element.type !== 1) {
              element.msgType = "randomReport";
              element.index = notice.length;
              element.msg = "提交了一条报备信息";
              notice.push(element);
            }
          });
          // 处理出发报备记录
          data.startReport.forEach((element) => {
            element.msgType = "startReport";
            element.index = notice.length;
            element.msg = "确定出发,并填写了出发报备表单";
            notice.push(element);
          });
          // notice.forEach((ele) => {
          //   console.log(ele.createTime)
          // })
          // notice.sort(this.compare("createTime")).reverse();
          // _this.notices = notice;
          notice.sort(function(a, b) {
            return a.createTime < b.createTime ? 1 : -1
          });
          console.log(_this.notices)
          console.log("测试")
          this.icon_value = 0
          console.log(this.icon_value)
          this.isHidden = true
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
        var t1 = new Date(Date.parse(value1.replace(/-/g, "/")))
        var t2 = new Date(Date.parse(value2.replace(/-/g, "/")))
        return t2.getTime() - t1.getTime()
      };
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
};
</script>
<style lang="less" scoped>
.alarm_box{
  height:100%;
  width:100%;
  background-color:#000;
  position:absolute;
  top:0;
  z-index:100;
  opacity:0.8;
}
.alarm_style{
  width: 24%;
  margin-left: 38%;
  margin-top: 12%;
}
.font{
  position: absolute;
  margin-left: 70px;
  font-size:20px;
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
  width: 300px;
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
.main{
  overflow: hidden  !important;
}
</style>
