<template>
  <div class="amount">
    <baidu-map class="map" :style="{height: height}" :center="center" :zoom="11" enableScrollWheelZoom="true"
               :scroll-wheel-zoom="true">
<!--      <bm-view></bm-view>-->
      <bm-control :offset="{width: '100px', height: '100px'}">
        <bm-auto-complete :v-model="keyword" :sugStyle="{zIndex: 1}">
          <el-input placeholder="请输入地名关键字" v-model="keyword" class="search_box"></el-input>
        </bm-auto-complete>
      </bm-control>
      <bm-local-search :keyword="keyword" :auto-viewport="true" ></bm-local-search>
      <bm-marker
        :position="position"
        :title="position.name"
        :zIndex="99999999"
        @click="lookDetail(position)"
        v-for="position in positionList"
        :key="position.id"
        :icon="{ url: volIcon, size: { width: 32, height: 32 } }"
        >
<!--        :icon="{ url: position.avatar, size: { width: 70, height: 70 } }"-->
        <bm-info-window
          :show="position.showInfo"
          @close="infoWindowClose(position)"
          @open="infoWindowOpen(position)"
          >志愿者:{{ infoWindow.name }}</bm-info-window
        >
      </bm-marker>

      <bm-marker
        :position="elderPosition"
        title="走失老人位置"
        :zIndex="99999999"
        @click="lookDetail(elderPosition)"
        :icon="{ url: oldIcon, size: { width: 64, height: 64 } }"
      >
        <bm-info-window
          :show="elderPosition.showInfo"
          @close="infoWindowClose(elderPosition)"
          @open="infoWindowOpen(elderPosition)"
        >老人</bm-info-window
        >
      </bm-marker>
    </baidu-map>
  </div>
</template>
<script>
import BmMarker from "vue-baidu-map/components/overlays/Marker";
import BmInfoWindow from "vue-baidu-map/components/overlays/InfoWindow";
import { devServer } from "../../vue.config";

export default {
  name: "VolPositionMap",
  components: {
    BmMarker,
    BmInfoWindow,
  },
  props: ["height"],
  data() {
    return {
      url: "https://gitee.com/waxijiang/MyImage/raw/master/img/test.png",
      center: {},
      oldIcon: "https://gitee.com/waxijiang/MyImage/raw/master/img/oldimg.svg",
      volIcon: "https://gitee.com/waxijiang/MyImage/raw/master/img/vol32.svg",
      positionList: [],
      elderPosition: {},
      markerIcon: "",
      infoWindow: {
        name: ""
      },
      keyword: '',
    };
  },
  methods: {
    updateCirclePath(e) {
      this.circlePath.center = e.target.getCenter();
      this.circlePath.radius = e.target.getRadius();
    },
    async getPosition() {
      var _this = this;
      this.$http
        .get("/command/start_report/by-action/" + this.$route.query.id)
        .then((res) => {
          console.log("获取出发位置成功!");
          console.log(res);
          res.data.data.forEach((element) => {
            var tmp = {};
            tmp = {
              lng: element.location.longitude,
              lat: element.location.latitude,
              name: element.volunteer.name,
              id: element.id,
              avatar: element.volunteer.avatar,
              showInfo: false
            };
            _this.positionList.push(tmp);
          });
          console.log(_this.positionList);
        })
        .catch((err) => {
          console.log("获取出发位置失败!");
          console.log(err);
        });
    },
    async getOld() {
      console.log("获取老人信息");
      var _this = this;
      await this.$http
        .get("/command/lost/" + this.$route.query.lostId)
        .then((res) => {
          console.log(res)
          // console.log(res.data.data.longitude);
          _this.center = {
            lng: res.data.data.longitude,
            lat: res.data.data.latitude,
          }
          _this.elderPosition = {
            lng: res.data.data.longitude,
            lat: res.data.data.latitude,
            avatar: devServer.proxy["/"].target + res.data.data.avatar,
            showInfo: false,
            name: res.name,
          };
        })
        .catch((err) => {
          console.log("获取老人位置失败!");
          console.log(err);
        });
    },

    infoWindowClose(position) {
      //  弹框关闭
      position.showInfo = false;
    },

    infoWindowOpen(position) {
      //  弹框打开
      position.showInfo = true;
    },
    lookDetail(position) {
      position.showInfo = true;
      this.infoWindow.name = position.name;
    }
  },
  created() {
    this.getOld();
    this.getPosition();
  },
};
</script>

<style lang='less' scoped>
.map {
  width: 100%;
}
.search-box{
  width: 200px;
}
</style>
