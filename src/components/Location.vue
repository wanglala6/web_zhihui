<template>
  <div>
    <div class="map">
      <div>
        <span>走失者区域分布</span>
      </div>
      <div class="all"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

// import "echarts/map/js/world.js";
// import "echarts/map/js/china.js";
// import "echarts/extension-src/bmap/bmap.js";
// import BMap from "vue-baidu-map";
require("echarts");
require("echarts/extension/bmap/bmap");
export default {
  data() {
    return {
      sta: [],
      data: [
        { name: 1, value: [113, 46.99999] },
        { name: "成都", value: [104.06, 30.67] },
      ],
    };
  },
  methods: {
    getsta() {
      this.$http({
        method: "get",
        url: "/statistic/lost-geo",
      }).then((res) => {
        console.log(res.data, "map");
        if (res.data.code === 200) {
          this.sta = res.data.data;
          this.chart();
        } else {
          this.$message(res.data.message);
        }
      });
    },
    chart() {
      var myChart = echarts.init(document.querySelector(".all"));

      var option = {
        tooltip: {
          trigger: "item",
          formatter: (p) => {
            // console.log(JSON.stringify(p));
            const dataCon = p.data;
              const txtCon = `${dataCon.name}`;
            return txtCon;
          },
        },
        bmap: {
          center: [104.114129, 37.550339],
          zoom: 1,
          roam: false,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: '#4c9bfd"',
                },
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "rgba(0,240,255,0.3)",
                },
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "highway",
                elementType: "all",
                stylers: {
                  color: "#fdfdfd",
                },
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#fefefe",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#fefefe",
                },
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                  color: "#fefefe",
                },
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "label",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#999999",
                },
              },
            ],
          },
        },
        series: [
          {
            type: "scatter",
            coordinateSystem: "bmap",
            data: this.sta,

            encode: {
              value: 2,
            },
            label: {
              formatter: "{b}",
              position: "right",
              show: false,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
          },
        ],
      };
      myChart.clear();
      myChart.setOption(option, true);

      // 当浏览器窗口缩小的时候）图表也等比例缩放
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
  mounted() {
    setInterval(this.getsta(), 2000);

    // this.chart();
  },
};
</script>
  <style lang="less" scoped>
.map {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.05);
}
.all {
  width: 100%;
  height: 300px;
}
.anchorBL {
  display: none !important;
  z-index: 9999;
}
</style>
