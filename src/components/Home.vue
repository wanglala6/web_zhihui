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
                :route="{ path: '/elderMsg', query: { id: id } }"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-user"></i>
                  <!-- 文本 -->
                  <span>老人信息</span>
                </template>
              </el-menu-item>
              <el-menu-item index="1-4-1">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-view"></i>
                  <!-- 文本 -->
                  <span
                    ><a href="#/home/valSearch" class="turn_a"
                      >志愿者查询</a
                    ></span
                  >
                </template>
              </el-menu-item>
              <el-menu-item index="1-4-2">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-sunny"></i>
                  <!-- 文本 -->
                  <span
                    ><a href="#/home/weather" class="turn_a">天气查询</a></span
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
            <!-- 一级菜单模板任务管理 -->
            <el-submenu index="2">
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
              <el-menu-item  index="/post"
                :route="{ path: '/post', query: { id: id } }">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-mobile"></i>
                  <!-- 文本 -->
                  <span
                    >队员报备</span
                  >
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
            </el-submenu>
            <!-- 一级菜单模板消息通知 -->

            <el-submenu index="4">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-chat-dot-square"></i>
                <!-- 文本 -->
                <span><a href="#/home/news" class="turn_a">消息通知</a></span>
              </template>

              <el-menu-item index="4-4-1">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-edit-outline"></i>
                  <!-- 文本 -->
                  <span
                    ><a href="#/home/newsEdit" class="turn_a">发送消息</a></span
                  >
                </template>
              </el-menu-item>

              <!-- 二级菜单 -->
              <el-menu-item index="4-4-2">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-pie-chart"></i>
                  <!-- 文本 -->
                  <span>志愿者统计</span>
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
export default {
  data() {
    return {
      id: "",
      iscollapse: false,
      older: {},
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 点击按钮切换折叠
    togglecollapse() {
      this.iscollapse = !this.iscollapse;
    },
  },
  created() {
    console.log(this.$route.params.id + "xx");
    this.id = this.$route.params.id;
    console.log(this.id);
  },
};
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
