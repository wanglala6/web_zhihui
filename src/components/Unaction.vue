<template>
  <div>
    <div class="activity" v-for="item in unactionList" :key="item.id">
      <div class="img">
        <a @click="undia(item)">
          <img src="../assets/logo.jpg" style="height: 100%; width: 100%" />
        </a>
      </div>
      <div class="activity_head">
        <h3>{{ item.name }}</h3>
        <p>指挥员: {{ item.commander.name }}</p>
        <span class="time">创建时间: {{ item.createTime }}</span>
      </div>
    </div>
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
  </div>
</template>
<script>
import {
  BaiduMap,
  BmControl,
  BmView,
  BmAutoComplete,
  BmLocalSearch,
  BmMarker,
} from "vue-baidu-map";
export default {
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
          queryInfo: {
        status: 0,
        pageSize: 9999,
        currentPage: 1
      },
      action: {},
      ids: [], // 征集消息志愿者
      location: {
        longitude: "34",
        latitude: "32",
      },
      // 志愿者对话框
      volundia: false,
      volunteerlist: [],
      addundia: false, // 未开始活动
      unactionList: [],
      // 地图
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
      /**/
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
    close() {
      this.addundia = false;
      this.$refs.locationref.resetFields();
    },
    handleClick(tab, event) {
      // console.log(tab, event);
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
    getunactionlist() {
      this.$http
        .get("/command/action/search-like", this.queryInfo)
        .then((res) => {
          console.log(res);
          this.unactionList = res.data.data;
        });
    },
    // 未开始行动对话框
    undia(item) {
      this.addundia = true;
      this.action.actionId = item.id;
      this.action.actionName = item.name;
      this.action = item;
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
  },
  created() {
    this.getunactionlist();
  },
};
</script>
<style lang="less" scoped>
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
.activity_head {
 text-align: center;
}
.time{
    color: #999;
    font-size: 12px;
}
</style>
