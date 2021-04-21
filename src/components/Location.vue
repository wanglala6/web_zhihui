<template>
  <div class="loc" id="3" @keyup.enter="show3">
    <div class="map">
      <!-- <div class="head">
        <span>走失者区域分布</span>
      </div> -->
      <div class="all"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
// import screenfull from "screenfull"; // 引入全屏显示

// import "echarts/map/js/world.js";
// import "echarts/map/js/china.js";
// import "echarts/extension-src/bmap/bmap.js";
// import BMap from "vue-baidu-map";
require("echarts");
require("echarts/extension/bmap/bmap");
require("echarts/map/js/china.js");
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
        // console.log(res.data, "map");
        if (res.data.code === 200) {
          this.sta = res.data.data;
          this.chart();
        } else if (res.data.code === 401) {
          this.$message.console.error("登录过期");
        } else {
          this.$message(res.data.message);
        }
      });
    },
    chart() {
      var myChart = echarts.init(document.querySelector(".all"));
      // var dataList = [
      //   { name: "南海诸岛", value: 0 },
      //   { name: "北京", value: this.randomValue() },
      //   { name: "天津", value: this.randomValue() },
      //   { name: "上海", value: this.randomValue() },
      //   { name: "重庆", value: this.randomValue() },
      //   { name: "河北", value: this.randomValue() },
      //   { name: "河南", value: this.randomValue() },
      //   { name: "云南", value: this.randomValue() },
      //   { name: "辽宁", value: this.randomValue() },
      //   { name: "黑龙江", value: this.randomValue() },
      //   { name: "湖南", value: this.randomValue() },
      //   { name: "安徽", value: this.randomValue() },
      //   { name: "山东", value: this.randomValue() },
      //   { name: "新疆", value: this.randomValue() },
      //   { name: "江苏", value: this.randomValue() },
      //   { name: "浙江", value: this.randomValue() },
      //   { name: "江西", value: this.randomValue() },
      //   { name: "湖北", value: this.randomValue() },
      //   { name: "广西", value: this.randomValue() },
      //   { name: "甘肃", value: this.randomValue() },
      //   { name: "山西", value: this.randomValue() },
      //   { name: "内蒙古", value: this.randomValue() },
      //   { name: "陕西", value: this.randomValue() },
      //   { name: "吉林", value: this.randomValue() },
      //   { name: "福建", value: this.randomValue() },
      //   { name: "贵州", value: this.randomValue() },
      //   { name: "广东", value: this.randomValue() },
      //   { name: "青海", value: this.randomValue() },
      //   { name: "西藏", value: this.randomValue() },
      //   { name: "四川", value: this.randomValue() },
      //   { name: "宁夏", value: this.randomValue() },
      //   { name: "海南", value: this.randomValue() },
      //   { name: "台湾", value: this.randomValue() },
      //   { name: "香港", value: this.randomValue() },
      //   { name: "澳门", value: this.randomValue() },
      // ];
      var option = {
        title: {
          text: "▎走失者区域分布",
          left: 20,
          top: 20,
          textStyle: {
            color: "white",
          },
        },
        geo: {
          map: "china",
          roam: true,
          label: {
            normal: {
              show: true,
              fontSize: "10",
              color: "rgba(0,0,0,0.7)",
            },
          },
          itemStyle: {
            normal: {
              areaColor: "#281e41",

              borderColor: "rgba(0, 0, 0, 0.2)",
            },
            emphasis: {
              areaColor: "#F3B329", // 鼠标选择区域颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            var html = params.name + "<br/>";
            html += "人数" + ":";
            html += params.value[2];
            return html;
          },
        },
        // 左侧小导航图标
        visualMap: {
          show: false,
          x: "left",
          y: "center",
          splitList: [
            {
              start: 2000,
            },
            {
              start: 1500,
              end: 2000,
            },
            {
              start: 1000,
              end: 1500,
            },
            {
              start: 500,
              end: 1000,
            },
            {
              start: 200,
              end: 500,
            },
            {
              start: 0,
              end: 200,
            },
          ],
          color: [
            "#FF0000",
            "#FF34B3",
            "#FF7256",
            "#FF8C69",
            "#FFAEB9",
            "#FFD39B",
          ],
          inRange: {
            color: ["#e0ffff", "#006edd"], // 取值范围的颜色
          },
        },
        toolbox: {
          show: true,
          orient: "vertical",
          x: "1200",
          y: "center",
          itemGap: 20,
          feature: {
            mark: {
              show: true,
            },
            dataView: {
              show: true,
              readOnly: false,
            },
            restore: {
              show: true,
            },
            saveAsImage: {
              show: true,
            },
          },
        },
        // 配置属性
        series: [
          {
            name: "订单量",
            type: "scatter",
            coordinateSystem: "geo", // series坐标系类型
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  formatter: "{b}",
                  position: "right",
                  textStyle: {
                    color: "#3D3D3D",
                  },
                },
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
            },
            data: this.sta, // 数据
          },
        ],
      };

      myChart.clear();
      myChart.setOption(option, true);

      // 当浏览器窗口缩小的时候）图表也等比例缩放
      window.addEventListener("resize", function () {
        myChart.resize();
      });
      var th = this;
      document.onkeydown = function () {
        const key = window.event.keyCode;
        if (key === 67) {
          // document.getElementById("5").resize(function () {
          //   myChart.resize();
          // });
          setInterval(function () {
            myChart.resize();
          }, 100);

          th.$emit("hideOther", "3");
        }
      };
      window.addEventListener("click", function () {
        myChart.resize();
      });
    },
    randomValue() {
      return Math.round(Math.random() * 1000);
    },
  },
  mounted() {
    this.getsta();
    // const element = document.getElementById("3");
    document.getElementById("3").addEventListener("click", () => {
      // if (screenfull.isEnabled) {
      //   screenfull.request(element); // 元素全屏
      // }
      this.$emit("hideOther", "3");
    });
    // this.chart();
  },
};
</script>
  <style lang="less" scoped>
.loc {
  padding: 0.625rem;
}
.map {
  color: #fff;
  // background-color: rgba(255, 255, 255, 0.05);
}
.all {
  width: 100%;
  height: 80vh;
}
.anchorBL {
  display: none !important;
  z-index: 9999;
}
.head {
  font-size: 1rem;
}
</style>
