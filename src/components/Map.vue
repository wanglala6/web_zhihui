<template>
  <div id="map" :style="{height:mapHeight}">
<!--    <div style="width: 300px; height:50px">-->
<!--      <el-input placeholder="请输入搜索位置" v-model="place" class="input-with-select">-->
<!--        <el-button slot="append" icon="el-icon-search"></el-button>-->
<!--      </el-input>-->
<!--    </div>-->
    <div id="allmap" ref="allmap"></div>
  </div>
</template>
<script>
export default {
  name: "map",
  methods: {
    map() {
      const map = new window.BMap.Map(this.$refs.allmap); // 创建Map实例
      map.centerAndZoom(new window.BMap.Point(106.94, 30.85), 13); // 初始化地图,设置中心点坐标和地图级别
      map.addControl(
        new window.BMap.MapTypeControl({
          // 添加地图类型控件
          mapTypes: [window.BMAP_NORMAL_MAP, window.BMAP_HYBRID_MAP],
        })
      );
      map.setCurrentCity("渠县"); // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
      //  设置地图显示元素
      map.setDisplayOptions({
        //  是否显示POI信息
        poi: true,
      })
    },
    initMapHeight() {
      var main = document.getElementById("map");
      main.style.height = window.innerHeight + "px";
    },

  },
  data() {
    return {
      mapHeight: 480 + "px",
      place: ''
    };
  },
  mounted() {
  //   this.initMapHeight();
    this.map();
  //   window.onresize = () => {
  //     return (() => {
  //       this.mapHeight = window.innerHeight + 'px';
  //     })();
  //   };
  },

};
</script>
<style>
#allmap {
  height: 480px;
  overflow: hidden;
}
</style>
