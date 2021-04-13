<template>
  <div class="action" @click.stop="jump(action)">
    <div
      class="action-img"
      v-bind:class="{ 'action-img-hover': isHover }"
      @mouseenter="showBotton"
      @mouseleave="hideBotton"
    >
      <img
        :class="{ 'action-img-hover': isHover }"
        style="width: 100%; height: 100%"
        :src="action.lost.avatar"
      />
      <div class="action-img-botton" v-if="isHover">
        <div class="action-img-title">{{ action.lost.name }}</div>
        <div class="action-img-btn">
          <el-button
            @click="del(action)"
            size="mini"
            class="del-btn"
            v-if="action.status == 0"
            >删除</el-button
          >
          <el-button @click.stop="editdia(action)" size="mini" class="edit-btn"
            >修改</el-button
          >
        </div>
      </div>
    </div>
    <div class="action_head">
      <div class="action_head">
        <div class="action_head_name">{{ action.name }}</div>
        <div class="action_head_lost">
          <i class="el-icon-user-solid"></i>
          <span style="font-weight: bold; margin-left: 3px"
            >走失者: {{ action.lost.name }}</span
          >
        </div>
        <div class="action_head_commaner">
          <i class="el-icon-s-custom"></i>
          指挥员: {{ action.commander.name }}
        </div>
        <div class="flex action_head_time">
          <div>
            <i class="el-icon-time"></i>
          </div>
          <div style="margin-left: 3px">{{ action.createTime }}</div>
        </div>
      </div>
    </div>
    <!-- 修改名字 -->
    <el-dialog :visible.sync="diaedit" width="30%">
      <el-form :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item class="text-align:center" label-width="45%">
          <el-button @click="edit" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
                <input type="text" class="serachinput" />
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
            <el-form-item label="走失者地址">
              <span>{{ location.lastPlace }}</span>
            </el-form-item>
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
    <!-- 发送消息 -->
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
      addundia: false, // 未开始活动

      isHover: false,
      diaedit: false,
      form: {
        name: "",
        id: "",
      },
      // 地图
      showMapComponent: this.value,
      keyword: "",
      mapStyle: {
        width: "100%",
        height: this.mapHeight2 + "px",
      },
      center: { lng: 116.404, lat: 39.915 },
      zoom: 15,

      mapHeight2: 400 + "px",
      place: "",
      ids: [], // 征集消息志愿者
      location: {
        longitude: "34",
        latitude: "32",
      },

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

      // 志愿者对话框
      volundia: false,
      volunteerlist: [],
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
  props: ["action"],
  methods: {
    showBotton: function () {
      this.isHover = true;
    },
    hideBotton: function () {
      this.isHover = false;
    },
    del(row) {
      this.$http({
        methods: "delete",
        url: "/command/action/" + row.id,
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.$message.success("删除成功");
          this.$emit("flush");
        } else {
          this.$message("删除失败");
        }
      });
    },
    editdia(row) {
      this.diaedit = true;
      this.form.name = row.name;
      this.form.id = row.id;
    },
    edit() {
      const a = JSON.stringify({
        name: this.form.name,
      });
      this.$http({
        method: "put",
        url: "/command/action/" + this.form.id,
        data: a,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message.success("修改成功");
          this.$emit("flush");
          this.diaedit = false;
        } else {
          this.$message("修改失败");
        }
      });
    },
    jump(item) {
      // 如果是正在进行的行动就跳转
      if (this.action.status === "1") {
        console.log(this.$route.query.commanderId);

        console.log("mmm", item.lostId);
        this.$router.push({
          path: "/elderMsg",
          query: {
            lostId: item.lostId,
            commanderId: this.$route.query.commanderId,
            id: item.id,
          },
        });
      } else {
        this.undia(item);
      }
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
    // 未开始行动对话框
    undia(item) {
      this.action.actionId = item.id;
      this.action.actionName = item.name;
      this.action = item;
      this.keyword = item.lost.lastPlace;
      this.showMapComponent = item.lost.lastPlace;
      this.location.lastPlace = this.action.lost.lastPlace;
      this.addundia = true;
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
    close() {
      console.log("关闭地图")
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
          name: this.action.lost.name,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success("发送成功");
          this.volundia = false;
          this.addundia = false;
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
  },
};
</script>
<style lang="less" scoped>
.action {
  height: 250px;
  width: 200px;
  margin: 10px 30px 10px 0;
  cursor: pointer;
  border-radius: 5px;
}

.action:hover {
  box-shadow: 2px 2px 3px #e2e2e2;
}

.action_head {
  height: 100px;
  text-align: left;
  padding-left: 10px;
  background-color: #ffffff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.action-img {
  width: 100%;
  height: 150px;
  position: relative;
  border-radius: 5px;
}

.action-img-hover {
  background: #2b2b27;
}

.action-img img {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.action-img-title {
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  margin-bottom: 45px;
}

.action-img-btn {
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
}

.action-img-hover {
  opacity: 0.6;
  filter: alpha(opacity=60);
}

.action-img-botton {
  position: absolute;
  left: 50%;
  top: 20%;
  width: 150px;
  margin-left: -75px;
}

.del-btn,
.edit-btn {
  background-color: #000;
  opacity: 0.6;
  color: #fff;
}

.action_head_name {
  font-size: 17px;
  letter-spacing: 2px;
  padding-top: 5px;
  font-weight: bold;
  padding-bottom: 5px;
}

.action_head_commaner {
  font-size: 13.5px;
  color: #999999;
  margin-bottom: 2px;
}

.action_head_lost {
  font-size: 13.5px;
  color: #999999;
}

.img {
  height: 150px;
  width: 200px;
}

.action_head_time {
  font-size: 12px;
  margin-top: 10px;
  position: relative;
}

.flex {
  display: flex;
}
</style>
