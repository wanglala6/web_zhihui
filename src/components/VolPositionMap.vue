<template>
  <div class='amount'>
    <baidu-map class="map" :center="elderPosition" :zoom="11">
      <bml-heatmap :data="positionList" :max="100" :radius="20">
      </bml-heatmap>
    </baidu-map>
  </div>
</template>
<script>
import { BmlHeatmap } from 'vue-baidu-map'
  export default {
  name: "VolPositionMap",
  data () {
    return {
      positionList: [],
      elderPosition: {}
    }
  },
  components: {
    BmlHeatmap
  },
  methods: {
    updateCirclePath (e) {
      this.circlePath.center = e.target.getCenter()
      this.circlePath.radius = e.target.getRadius()
    },
    async getPosition() {
      var _this = this;
      this.$http
        .get("/command/start_report/by-action/" + this.$route.query.id)
        .then((res) => {
          console.log("获取出发位置成功!");
          console.log(res);
          res.data.data.forEach((element) => {
            var tmp = {}
            tmp = { lng: element.location.longitude, lat: element.location.latitude, count: 131 }
             _this.positionList.push(tmp)
          });
          console.log(_this.positionList)
        })
        .catch((err) => {
          console.log("获取出发位置失败!");
          console.log(err);
        });
    },
    async getOld() {
      console.log("获取老人信息");
      var _this = this
      await this.$http.get("/command/lost/" + this.$route.query.lostId).then((res) => {
        console.log(res.data.data.longitude)
        _this.elderPosition = {
          lng: res.data.data.longitude, lat: res.data.data.latitude
        }
      }).catch((err) => {
        console.log("获取老人位置失败!");
        console.log(err);
      });
    },
  },
    created () {
      this.getPosition()
      this.getOld()
    }
}
</script>

<style lang='less' scoped>
.map {
  width: 100%;
  height: 350px;
}
</style>
