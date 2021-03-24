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
        <span>指挥端</span>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <!-- 主体区 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="iscollapse ? '64px' : '200px'">
          <div class="toggle_button" @click="togglecollapse">|||</div>

          <!-- 侧边栏菜单区 -->
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF"
            :collapse="iscollapse"
            :collapse-transition="false"
            :router="true"
          >
            <!-- 一级菜单 -->
            <el-submenu index="1">
              <!-- 一级菜单模板qu -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-search"></i>
                <!-- 文本 -->
                <span>数据查询</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                index="/elderMsg"
                :route="{ path: '/elderMsg', query: { id: id } }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-user"></i>
                  <!-- 文本 -->
                  <span>老人信息</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/valSearch" :route="{ path: '/valSearch'}">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-view"></i>
                  <!-- 文本 -->
                  <span>志愿者查询</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/weather" :route="{ path: '/weather'}">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-sunny"></i>
                  <!-- 文本 -->
                  <span>天气查询</span
                  >
                </template>
              </el-menu-item>
              <el-menu-item index="1-4-3">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-map-location"></i>
                  <!-- 文本 -->
                  <span><a href="#/home/map" class="turn_a">地图查询</a></span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <!-- 一级菜单模板qu -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-edit"></i>
                <!-- 文本 -->
                <span>任务管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="2-4-1">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-coordinate"></i>
                  <!-- 文本 -->
                  <span><a href="#/home/task" class="turn_a">任务分配</a></span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <!-- 一级菜单模板qu -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-data-line"></i>
                <!-- 文本 -->
                <!--跳转到监控模块-->
                <span>监控模块</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="3-4-1">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-mobile"></i>
                  <!-- 文本 -->
                  <span
                    ><a href="#/home/monitor" class="turn_a">队员报备</a></span
                  >
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="4" router>
              <!-- 一级菜单模板qu -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-chat-dot-square"></i>
                <!-- 文本 -->
                <span>消息通知</span>
              </template>

              <el-menu-item  index="/newsEdit" :route="{ path: '/newsEdit',query: { actionId: this.id }}">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-edit-outline"></i>
                  <!-- 文本 -->
                  <span>发送消息</span
                  >
                </template>
              </el-menu-item>

              <!-- 二级菜单 -->
              <el-menu-item index="/news" :route="{ path: '/news'}">
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
import Stomp from 'stompjs'
// ---jq:在sysconstant.js配置文件中配置mqtt的服务端地址，账号等信息
import { MQTT_SERVICE, MQTT_USERNAME, MQTT_PASSWORD } from '../config/sysconstant.js'
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
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // jq:点击按钮切换折叠
    togglecollapse() {
      this.iscollapse = !this.iscollapse;
    },
    //  jq:消息弹窗函数
    notify() {
      var that = this
      console.log(that.type)
      this.$notify.info({
        title: this.Msg.title,
        message: this.Msg.abstract,
        onClick() {
          console.log(that.type)
          if (that.type === "START_REPORT") {
            that.toStartDetails()
            // eslint-disable-next-line brace-style
          }//  自定义回调,message为传的参数
          else {
            that.toStartDetails()
          }
        }
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
    evil (fn) {
      // 一个变量指向Function，防止有些前端编译工具报错
      var Fn = Function
      return new Fn('return ' + fn)()
    },
    //  获取到通知弹窗需要的相关信息
    async dataProcess() {
      const { data: res } = await this.$http.get(
        "/command/volunteer/" + this.news.volunteerId)
        this.Msg.title = "来自志愿者:" + res.data.name
        if (this.type === "EMERGENCY_NOTICE") {
          this.Msg.abstract = "紧急通知"
        } else if (this.type === "START_REPORT") {
          this.Msg.abstract = "出发报备"
        } else if (this.type === "RANDOM_REPORT") {
          this.Msg.abstract = "平时报备"
        }
        this.notify()
    },
    // jq：stomp监听消息队列相关函数
    onConnected: function (frame) {
      var topic = '/queue/1_commander'
      // ---订阅频道
      this.client.subscribe(topic, this.responseCallback, this.onFailed)
    },
    onFailed: function (frame) {
      console.log('Failed: ' + frame)
    },
    responseCallback: function (frame) {
      this.news = JSON.parse((this.evil(decodeURI(frame.body))).replace("/\\", "")).data
      this.type = JSON.parse((this.evil(decodeURI(frame.body))).replace("/\\", "")).type
      this.dataProcess()
      console.log(this.type)
      // ---接收消息
    },
    connect: function () {
      // ---初始化mqtt客户端，并连接mqtt服务
      var headers = {
        login: MQTT_USERNAME,
        passcode: MQTT_PASSWORD,
        // additional header
      }
      this.client.connect(headers, this.onConnected, this.onFailed)
    }
  },
  created() {
    this.connect()
    console.log(this.$route.params.id + "xx");
    this.id = this.$route.params.id;
    console.log(this.id);
  }
}
</script>
<style lang="less" scoped>
.el-header {
  background-color: #373d41;
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
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #fff;
}
.home_container {
  height: 100%;
}
.toggle_button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.turn_a {
  text-decoration: none;
  color: #fff;
}
</style>
