<template>
  <div class="s" id="4">
    <div class="or">
      <div class="in">
        <span style="padding: 0; margin-bottom: 0">▎志愿者出动率</span>

        <div class="col_succ">
          <div id="chart2"></div>
        </div>
        <!-- <el-row class="data">
          <el-col class="item" :span="6">
            <div class="box">
              <span class="font">{{ identify.faceCount }}</span>
              <span>人脸库照片数</span>
            </div>
          </el-col>
          <el-col class="item" :span="6">
            <div class="box">
              <span class="font">{{ identify.successCount }}</span>
              <span>识别成功数</span>
            </div>
          </el-col>
          <el-col class="item" :span="6">
            <div class="box">
              <span class="font">{{ identify.failureCount }}</span>
              <i class="icon-dot" style="color: #eacf19"></i>
              <span>识别失败数</span>
            </div>
          </el-col>

          <el-col class="item" :span="6">
            <div class="box">
              <span class="font">{{ identify.successRate }}</span>
              <span>识别成功率</span>
            </div>
          </el-col>
        </el-row> -->
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import "echarts-liquidfill";
import screenfull from "screenfull";
// import screenfull from "screenfull"; // 引入全屏显示

export default {
  data() {
    return {
      identify: {
        faceCount: "",
        successCount: "",
        failureCount: "",
        successRate: "",
      },
    };
  },
  methods: {
    // getdata() {
    //   this.$http({
    //     method: "get",
    //     url: "/statistic/face-count",
    //   }).then((res) => {
    //     // console.log(res.data, "成功率");
    //     if (res.data.code === 200) {
    //       this.identify = res.data.data;
    //     } else {
    //       this.$message(res.message);
    //     }
    //   });
    // },
    chart() {
      function getCirlPoint(x0, y0, r, angle) {
        const x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
        const y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
        return {
          x: x1,
          y: y1,
        };
      }
      var myChart = echarts.init(document.getElementById("chart2"));
      let angle = 0; // 角度，用来做简单的动画效果的
      const value = 55.33;
      var option = {
        title: {
          text: "{a|" + value + "}{c|%}",
          x: "center",
          y: "center",
          textStyle: {
            rich: {
              a: {
                fontSize: 25,
                color: "#29EEF3",
              },

              c: {
                fontSize: 20,
                color: "#ffffff",
                // padding: [5,0]
              },
            },
          },
        },
        legend: {
          type: "plain",
          orient: "vertical",
          right: 0,
          top: "10%",
          align: "auto",
          data: [
            {
              name: "涨价后没吃过",
              icon: "circle",
            },
            {
              name: "天天吃",
              icon: "circle",
            },
            {
              name: "三五天吃一次",
              icon: "circle",
            },
            {
              name: "半个月吃一次",
              icon: "circle",
            },
          ],
          textStyle: {
            color: "white",
            fontSize: 16,
            padding: [10, 1, 10, 0],
          },
          selectedMode: false,
        },
        series: [
          {
            name: "ring5",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                  startAngle: ((0 + angle) * Math.PI) / 180,
                  endAngle: ((90 + angle) * Math.PI) / 180,
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            name: "ring5",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                  startAngle: ((180 + angle) * Math.PI) / 180,
                  endAngle: ((270 + angle) * Math.PI) / 180,
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            name: "ring5",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                  startAngle: ((270 + -angle) * Math.PI) / 180,
                  endAngle: ((40 + -angle) * Math.PI) / 180,
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            name: "ring5",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                  startAngle: ((90 + -angle) * Math.PI) / 180,
                  endAngle: ((220 + -angle) * Math.PI) / 180,
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            name: "ring5",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              const x0 = api.getWidth() / 2;
              const y0 = api.getHeight() / 2;
              const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
              const point = getCirlPoint(x0, y0, r, 90 + -angle);
              return {
                type: "circle",
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4,
                },
                style: {
                  stroke: "#0CD3DB", // 粉
                  fill: "#0CD3DB",
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            name: "ring5", // 绿点
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              const x0 = api.getWidth() / 2;
              const y0 = api.getHeight() / 2;
              const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
              const point = getCirlPoint(x0, y0, r, 270 + -angle);
              return {
                type: "circle",
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4,
                },
                style: {
                  stroke: "#0CD3DB", // 绿
                  fill: "#0CD3DB",
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            name: "吃猪肉频率",
            type: "pie",
            radius: ["58%", "45%"],
            silent: true,
            clockwise: true,
            startAngle: 90,
            z: 0,
            zlevel: 0,
            label: {
              normal: {
                position: "center",
              },
            },
            data: [
              {
                value: value,
                name: "",
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#4FADFD", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#28E8FA", // 100% 处的颜色
                        },
                      ],
                    },
                  },
                },
              },
              {
                value: 100 - value,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
                itemStyle: {
                  normal: {
                    color: "#173164",
                  },
                },
              },
            ],
          },

          {
            name: "",
            type: "gauge",
            radius: "58%",
            center: ["50%", "50%"],
            startAngle: 0,
            endAngle: 359.9,
            splitNumber: 8,
            hoverAnimation: true,
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 60,
              lineStyle: {
                width: 5,
                color: "#061740",
              },
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                opacity: 0,
              },
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 0,
                name: "",
              },
            ],
          },
        ],
      };
      angle = angle + 3;
      // 为echarts对象加载数据
      myChart.clear();
      myChart.setOption(option, true);
      // 当浏览器窗口缩小的时候）图表也等比例缩放
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
  mounted() {
    this.chart();
    setInterval(() => {
      this.chart();
    }, 2000);
    const element = document.getElementById("4");
    document.getElementById("4").addEventListener("click", () => {
      if (screenfull.isEnabled) {
        screenfull.request(element); // 元素全屏
      }
    });
  },
};
</script>

<style lang="less" scoped>
.or:hover {
  background-color: #181725;
}
.s {
  padding: 0.625rem;
  height: 28vh;
  display: flex;
  align-items: center;
}
.or {
  width: 100%;
}
.in {
  border: 15px solid transparent;
  border-width: 51 38 20 132;
  border-image-source: url(../assets/imgs/border.png);
  border-image-slice: 51 38 20 132;
}
.col_succ {
  height: 100%;
  display: flex;
  align-items: center;
}
.order span {
  color: #4c9bfd;
  font-size: 12px;
}
.font {
  color: #fff !important;
  display: block;
  text-align: center;
}
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
#chart2 {
  width: 100%;
  height: 23vh;
}
</style>
