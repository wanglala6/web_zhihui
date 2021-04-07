<template>
  <div class="bgc">
    <el-container>
      <el-header>
        <el-row :gutter="100">
          <el-col :span="6">
            <div style="width: 80px; height: 80px; border-radius: 50%">
              <img
                src="../assets/logo.jpg"
                style="height: 100%; width: 100%; border-radius: 50%"
              />
            </div>
          </el-col>
          <el-col :span="12" class="head_col">
            <span class="head" style="text-align: center; color: #ffffff"
              >蓝天救援队指挥中心</span
            >
          </el-col>
          <el-col :span="6">
            <el-button type="info" @click="logout" style="float: right"
              >退出</el-button
            >
          </el-col>
        </el-row>
      </el-header>
      <!-- <el-main>
        <el-row class="nav">
          <el-col :span="22" style="margin-top: 20px">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="正在行动" name="first">
                <div class="activity" v-for="item in actionList" :key="item.id">
                  <div class="img">
                    <a @click="jump(item.id)">
                      <img
                        src="../assets/logo.jpg"
                        style="height: 100%; width: 100%"
                      />
                    </a>
                  </div>
                  <div class="activity_head">
                    <p>{{ item.name }}</p>
                    <p>指挥员: {{ item.commander.name }}</p>
                    <p>创建时间: {{ item.createTime }}</p>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="已完成行动" name="second"
                >配置管理</el-tab-pane
              >
              <el-tab-pane label="遗留行动" name="third">角色管理</el-tab-pane> -->
      <!-- <el-tab-pane label="未开始行动" name="forth">
                <div
                  class="activity"
                  v-for="item in unactionList"
                  :key="item.id"
                >
                  <div class="img">
                    <a @click="undia(item)">
                      <img
                        src="../assets/logo.jpg"
                        style="height: 100%; width: 100%"
                      />
                    </a>
                  </div>
                  <div class="activity_head">
                    <p>{{ item.name }}</p>
                    <p>指挥员: {{ item.commander.name }}</p>
                    <p>创建时间: {{ item.createTime }}</p>
                  </div>
                </div>
              </el-tab-pane> -->
      <!-- </el-tabs>
          </el-col> -->
      <!-- <el-col :span="2" style="margin-top: 20px">
            <el-button type="primary" @click="dialog">创建行动</el-button>
          </el-col> -->
      <!-- </el-row> -->
      <!-- </el-main> -->
      <el-row class="nav">
        <el-col :span="22" style="margin-top: 20px">
          <el-menu class="el-menu-demo" mode="horizontal" :router="true">
            <el-submenu index="1">
              <template slot="title">活动</template>
              <el-menu-item
                index="/inaction"
                :route="{
                  path: '/inaction',
                  query: { commanderId: commanderId },
                }"
                >正在行动</el-menu-item
              >
              <el-menu-item index="2-2">已完成行动</el-menu-item>
              <el-menu-item index="2-3">遗留行动</el-menu-item>
              <el-menu-item
                index="/unaction"
                :route="{
                  path: '/unaction',
                  query: { commanderId: commanderId },
                }"
                >未开始行动</el-menu-item
              >
            </el-submenu>
            <el-menu-item index="/volunteer" route="/volunteer">
              志愿者管理
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="2" style="margin-top: 20px">
          <el-button type="primary" @click="dialog">创建行动</el-button>
        </el-col>
      </el-row>
      <!-- 主体区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <!-- 未开始活动对话框 -->
    <el-dialog
      title="选择区域 点击地点即可获得经纬度"
      :visible.sync="addundia"
      width="800px"
    >
      <!-- <mpp
            @func="getson"
          ></mpp> -->
      <el-row>
        <el-col :span="12">
          <baidu-map
            v-bind:style="mapStyle"
            class="bm-view"
            ak="pKCbOFewojmC9xuiiGwOq1MAyABiQwD8"
            :center="center"
            :zoom="zoom"
            :scroll-wheel-zoom="true"
            @click="getClickInfo"
            @moving="syncCenterAndZoom"
            @moveend="syncCenterAndZoom"
            @zoomend="syncCenterAndZoom"
          >
            <bm-view style="width: 100%; height: 500px"></bm-view>
            <bm-marker
              :position="{ lng: center.lng, lat: center.lat }"
              :dragging="true"
              animation="BMAP_ANIMATION_BOUNCE"
            >
            </bm-marker>
            <bm-control :offset="{ width: '10px', height: '10px' }">
              <bm-auto-complete
                v-model="keyword"
                :sugStyle="{ zIndex: 999999 }"
              >
                <input
                  type="text"
                  placeholder="请输入搜索关键字"
                  class="serachinput"
                />
              </bm-auto-complete>
            </bm-control>
            <bm-local-search
              :keyword="keyword"
              :auto-viewport="true"
              style="width: 0px; height: 0px; overflow: hidden"
            ></bm-local-search>
          </baidu-map>
        </el-col>
        <el-col :span="12">
          <el-form
            label-width="150px"
            ref="locationref"
            :model="location"
            :rules="locationrules"
          >
            <el-form-item label="通知范围(米)" prop="distance">
              <el-input v-model="location.distance"></el-input>
            </el-form-item>
            <el-form-item label="走失者地点纬度" prop="latitude">
              <div>{{ location.latitude }}</div>
            </el-form-item>
            <el-form-item label="走失者地点经度" prop="longitude">
              <div>{{ location.longitude }}</div>
            </el-form-item>
            <el-form-item>
              <el-button
                @click="send"
                style="justify-content: center"
                type="primary"
                >确定</el-button
              >
              <el-button
                @click="close"
                style="justify-content: center"
                type="primary"
                >关闭</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog
      title="选择志愿者发送消息"
      :visible.sync="volundia"
      width="800px"
    >
      <el-card>
        <el-table
          :data="volunteerlist"
          border
          stripe
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="姓名" prop="name"></el-table-column>
        </el-table>
        <el-button @click="sendmessage" type="primary" style="margin-top: 15px"
          >发送消息</el-button
        >
        <!-- 分页区 -->
        <!-- <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            >
            </el-pagination> -->
      </el-card>
    </el-dialog>
    <!-- 创建活动对话框 -->

    <el-dialog title="创建活动" :visible.sync="adddialogVisible" width="30%">
      <!-- 内容主体区 -->
      <el-form
        :model="addForm"
        :rules="addrules"
        ref="addFormref"
        label-width="150px"
      >
        <el-form-item label="请选择走失者" prop="lostId">
          <el-select v-model="addForm.lostId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入活动名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import Mpp from "@/components/MapComponent.vue";
import {
  BaiduMap,
  BmControl,
  BmView,
  BmAutoComplete,
  BmLocalSearch,
  BmMarker,
} from "vue-baidu-map";

export default {
  // components: Mpp,
  components: {
    BaiduMap,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker,
  },
  data() {
    return {
      activeIndex: "/inaction",
      commanderId: 0,
      // 志愿者对话框
      volundia: false,
      volunteerlist: [],

      action: {},
      ids: [], // 征集消息志愿者
      location: {
        longitude: "34",
        latitude: "32",
      },
      addundia: false, // 未开始活动

      showMapComponent: this.value,
      keyword: "",
      mapStyle: {
        width: "100%",
        height: this.mapHeight + "px",
      },
      center: { lng: 116.404, lat: 39.915 },
      zoom: 15,

      mapHeight: 400 + "px",
      place: "",

      unactionList: [],
      options: [],
      value: "",
      activeName: "second",
      actionList: [],
      activity: [
        {
          src: "../assets/logo.jpg",
          head: "拯救80岁高龄老人",
        },
        {
          src: "../assets/logo.jpg",
          head: "拯救80岁高龄老人",
        },
        {
          src: "../assets/logo.jpg",
          head: "拯救80岁高龄老人",
        },
        {
          src: "../assets/logo.jpg",
          head: "拯救80岁高龄老人",
        },
        {
          src: "../assets/logo.jpg",
          head: "拯救80岁高龄老人",
        },
      ],
      adddialogVisible: false,
      // 添加活动
      addForm: {},
      addrules: {
        name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur",
          },
        ],
        lostId: [
          {
            required: true,
            message: "请选择走失者",
            trigger: "blur",
          },
        ],
      },
      locationrules: {
        distance: [
          {
            required: true,
            message: "请输入通知范围(米)",
            trigger: "blur",
          },
        ],
        latitude: [
          {
            required: true,
            message: "请输入走失人员纬度",
            // trigger: "blur",
          },
        ],
        longitude: [
          {
            required: true,
            message: "请输入走失人员经度",
            // trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    value: function (currentValue) {
      this.showMapComponent = currentValue;
      if (currentValue) {
        this.keyword = "";
      }
    },
  },
  // props: {
  //   // eslint-disable-next-line vue/no-dupe-keys
  //   value: Boolean,
  //   // eslint-disable-next-line vue/no-dupe-keys
  //   mapHeight: {
  //     type: Number,
  //     default: 500,
  //   },
  // },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    close() {
      this.addundia = false;
      this.$refs.locationref.resetFields();
    },
    // 发送消息给志愿者
    sendmessage() {
      const staytimeGap =
        new Date("2021-03-18 16:14").getTime() -
        new Date("2021-03-17 16:14").getTime();
      const stayHour = Math.floor(staytimeGap / (3600 * 1000));
      //  const leave1 = staytimeGap % (3600 * 1000);
      // const stayMin = Math.floor(leave1 / (60 * 1000));
      //   const leave2 = leave1 % (60 * 1000);
      //  const staySec = Math.floor(leave2 / 1000);
      this.action.lostHours = stayHour;
      console.log(this.action);
      this.$http({
        method: "post", // method
        url: "/command/action/sendDraftMsg/" + this.action.id,
        // params: { actionId:  },
        data: {
          receiveIds: this.ids,
          lostHours: this.action.lostHours,
          lostPlace: this.action.lost.lastPlace,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message.success("发送成功");
          this.volundia = false;
        } else {
          this.$message("发送失败");
        }
      });
    },
    // 选中表格
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
      var arr = [];
      this.multipleSelection.forEach((element) => {
        arr.push(parseInt(element.id));
      });
      // 数组去重
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i] === arr[j]) {
            // 第一个等同于第二个，splice方法删除第二个
            arr.splice(j, 1);
            j--;
          }
        }
      }
      this.ids = arr;
    },
    //     // 监听页码值改变事件
    // handleCurrentChange(newpage){

    // },
    //     // 监听pagesize改变事件
    //     handleSizeChange(newsize) {
    //       console.log(newsize);
    //     },
    // 未开始行动对话框
    undia(item) {
      this.addundia = true;

      this.action = item;
      console.log(this.action, "action");
    },
    send() {
      console.log(this.location);
      this.$refs.locationref.validate((valid) => {
        if (!valid) return;
        this.$http({
          methods: "get",
          url: "/command/volunteer/by-distance",
          params: this.location,
        }).then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success("查询成功");
            this.volunteerlist = res.data.data;
            this.volundia = true;
          } else {
            this.$message("查询失败");
          }
        });
      });
    },
    getunactionlist() {
      this.$http
        .get("/command/action/search-like", { status: 0 })
        .then((res) => {
          console.log(res);
          this.unactionList = res.data.data;
        });
    },
    dialog() {
      // 查询走失者未行动
      this.$http.get("/command/lost/not-actioned").then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.options = res.data.data;
          console.log(this.options);
        } else {
          this.$message("走失者加载失败");
        }
      });
      this.adddialogVisible = true;
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    jump(id) {
      console.log("mmm" + id);
      this.$router.push({
        name: "/home",
        params: { id: id, commanderId: this.commanderId },
      });
    },
    async getActionList() {
      const { data: res } = await this.$http.get(
        "command/action/",
        this.queryInfo
      );
      if (res.code === 200) this.actionList = res.data;
      console.log(res.data);
    },
    // 创建活动
    upload() {
      this.$refs.addFormref.validate((valid) => {
        if (!valid) return;
        this.$http
          .post(
            "/command/action/",
            JSON.stringify({
              lostId: parseInt(this.addForm.lostId),
              name: this.addForm.name,
              commanderId: this.commanderId,
            }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log(res);
            if (res.data.code === 200) {
              this.$message.success("创建活动成功");
              this.getunactionlist();
              this.getActionList();
              this.adddialogVisible = false;
              this.$refs.addFormref.resetFields();
              this.$router.push({
                path: "/unaction",
                query: { commanderId: this.commanderId },
              });
            } else {
              this.$message("创建活动失败");
            }
          });
      });
    },
    /***
     * 地图点击事件。
     */
    getClickInfo(e) {
      this.center.lng = e.point.lng;
      this.center.lat = e.point.lat;
      console.log(this.center);
      this.location.latitude = this.center.lat.toString();
      this.location.longitude = this.center.lng.toString();
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.center.lng = lng;
      this.center.lat = lat;
      this.zoom = e.target.getZoom();
    },
    /***
     * 确认
     */
    confirm: function () {
      this.showMapComponent = false;
      this.$emit("map-confirm", this.center);
    },
    /***
     * 取消
     */
    cancel: function () {
      this.showMapComponent = false;
      this.$emit("cancel", this.showMapComponent);
    },
  },
  // async mounted () {
  //   const { data: res } = await this.$http.post('command/action', this.loginform)
  //   console.log(res)
  // }
  created() {
    this.commanderId = this.$route.query.commanderId;
    console.log(this.commanderId);

    // this.getActionList();
    // this.getunactionlist();
  },
  // mounted() {
  //   this.initMapHeight();
  //   this.map();
  //   window.onresize = () => {
  //     return (() => {
  //       this.mapHeight = window.innerHeight + "px";
  //     })();
  //   };
  // },
};
</script>
<style lang="less" scoped>
.el-table {
  font-size: 12px;
}
.el-header {
  height: 100px !important;
  background-color: #373d41;
}
.bgc {
  height: 100%;
  width: 100%;
  background-color: #f6f8fa;
}
.el-container {
  height: 100%;

  margin: 0 220px;
  background-color: #fff;
}
.head {
  line-height: 100px;
  font-size: 25px;
  letter-spacing: 2px;
}
.activity {
  height: 300px;
  width: 200px;
  margin: 10px;
  float: left;
  background: #f3f3f3;
}
.img {
  height: 150px;
  width: 200px;
}
//.activity_head {
//  text-align: center;
//}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
#allmap {
  height: 100%;
  overflow: hidden;
  margin-top: 20px;
}
</style>
