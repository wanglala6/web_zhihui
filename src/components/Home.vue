<template>
  <div style="height: 100%">
    <el-container class="home_container">
      <!-- 头部区 -->
      <el-header>
        <div style="width: 70px; height: 70px; border-radius: 50%">
          <img
            src="../assets/logo.jpg"
            style="height: 100%; width: 100%; border-radius: 50%"
          />
        </div>
        <!-- <span>指挥端</span> -->
        <div>
          <div id="he-plugin-simple" class="weather"></div>
          <el-dropdown class="notify">
            <el-badge :value="1" class="notify-icon">
              <div class="el-icon-message-solid"></div>
            </el-badge>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="notify-title">我的消息</el-dropdown-item>
              <el-dropdown-item class="notify-item">
                <el-avatar
                  shape="square"
                  :size="50"
                  :src="squareUrl"
                ></el-avatar>
                <div class="notify-item-body">
                  <div class="notify-item-name">黄希希</div>
                  <div class="notify-item-msg">发现了一条线索</div>
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
              <el-menu-item index="/actionManage">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-coordinate"></i>
                  <!-- 文本 -->
                  <span>状态管理</span>
                </template>
              </el-menu-item>
              <el-menu-item
                index="/volManage"
                :route="{ path: '/volManage', query: { id: id } }"
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
                :route="{ path: '/elderMsg', query: { lostId: lostId } }"
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
                :route="{ path: '/valSearch', query: { id: id } }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-view"></i>
                  <!-- 文本 -->
                  <span>志愿者查询</span>
                </template>
              </el-menu-item>
<!--              <el-menu-item index="/weather" :route="{ path: '/weather' }">-->
<!--                <template slot="title">-->
<!--                  &lt;!&ndash; 图标 &ndash;&gt;-->
<!--                  <i class="el-icon-sunny"></i>-->
<!--                  &lt;!&ndash; 文本 &ndash;&gt;-->
<!--                  <span>天气查询</span>-->
<!--                </template>-->
<!--              </el-menu-item>-->
              <el-menu-item index="/mapMsg" :route="{ path: '/mapMsg' }">
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
                :route="{ path: '/mainMonitor', query: { id: id } }"
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
                :route="{ path: '/post', query: { id: id } }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-mobile"></i>
                  <!-- 文本 -->
                  <span>队员报备</span>
                </template>
              </el-menu-item>
              <!-- 二级菜单 -->
              <el-menu-item
                index="/clue"
                :route="{ path: '/clue', query: { id: id } }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-user"></i>
                  <!-- 文本 -->
                  <span>线索</span>
                </template>
              </el-menu-item>
              <el-menu-item
                index="/VolunteerStatus"
                :route="{ path: '/VolunteerStatus', query: { id: id } }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-user"></i>
                  <!-- 文本 -->
                  <span>志愿者动态</span>
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
                :route="{ path: '/newsEdit', query: { actionId: this.id } }"
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
                :route="{ path: '/news', query: { actionId: this.id } }"
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
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
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
      id: "",
      iscollapse: false,
      older: {},
      client: Stomp.client(MQTT_SERVICE),
      news: {},
      Msg: {},
      type: "",
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
      print(this.type);
      this.Msg.title = "来自志愿者:" + res.data.name;
      if (this.type === "EMERGENCY_NOTICE") {
        this.Msg.abstract = "紧急通知";
      } else if (this.type === "START_REPORT") {
        this.Msg.abstract = "出发报备";
      } else if (this.type === "RANDOM_REPORT") {
        this.Msg.abstract = "平时报备";
      }
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
.weather{
  z-index: 99999999;
}
.el-menu-item{
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
  color: #fff;
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
  font-size: 14px
}
</style>
