<template>
  <div class="s" id="ll">
    <div class="or">
      <div class="in" >
        <div id="chart2" ></div>
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
import 'echarts-liquidfill'
import screenfull from "screenfull"; // 引入全屏显示

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
       var value = 0.4;
 var data = [value, value, value];
       var myChart = echarts.init(document.getElementById("chart2"));
      var option = {
        backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
          {
            offset: 0,
            color: "#282c51",
          },
          {
            offset: 1,
            color: "#050a2a",
          },
        ]),
        title: {
          text: (value * 100).toFixed(0) + "{a|%}",
          textStyle: {
            fontSize: 60,
            fontFamily: "Microsoft Yahei",
            fontWeight: "normal",
            color: "#fff",
            rich: {
              a: {
                fontSize: 60,
              },
            },
          },
          x: "center",
          y: "35%",
        },
        graphic: [
          {
            type: "group",
            left: "center",
            top: "60%",
            children: [
              {
                type: "text",
                z: 100,
                left: "10",
                top: "middle",
                style: {
                  fill: "#fff",
                  text: "流量统计",
                  font: "20px Microsoft YaHei",
                },
              },
            ],
          },
        ],
        series: [
          {
            type: "liquidFill",
            radius: "80%",
            center: ["50%", "50%"],
            //  shape: 'roundRect',
            data: data,
            backgroundStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.7,
                colorStops: [
                  {
                    offset: 1,
                    color: "rgba(50, 65, 96, 1)",
                  },
                  {
                    offset: 0.5,
                    color: "rgba(50, 65, 96, 1)",
                  },
                  {
                    offset: 0,
                    color: "rgba(111, 117, 139, 1)",
                  },
                ],
                globalCoord: false,
              },
            },
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 0,
                borderColor: {
                  type: "linear",
                  x: 1,
                  y: 0,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(212, 252, 125, 0)",
                    },
                    {
                      offset: 0.5,
                      color: "rgba(2, 193, 131, 0)",
                    },
                    {
                      offset: 1,
                      color: "rgba(2, 193, 131, 0)",
                    },
                  ],
                  globalCoord: false,
                },
                shadowBlur: 10,
                shadowColor: "rgba(13, 13, 46, 0)",
              },
            },
            color: new echarts.graphic.RadialGradient(0.6, 0, 1, [
              {
                offset: 0,
                color: "rgba(178, 251, 105, 0)",
              },
              {
                offset: 1,
                color: "rgba(10, 203, 135, 0)",
              },
            ]),
            label: {
              normal: {
                formatter: "",
              },
            },
          },
          {
            type: "liquidFill",
            radius: "80%",
            center: ["50%", "50%"],
            //  shape: 'roundRect',
            data: data,
            backgroundStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.7,
                colorStops: [
                  {
                    offset: 1,
                    color: "rgba(50, 65, 96, 1)",
                  },
                  {
                    offset: 0.5,
                    color: "rgba(50, 65, 96, 1)",
                  },
                  {
                    offset: 0,
                    color: "rgba(111, 117, 139, 1)",
                  },
                ],
                globalCoord: false,
              },
            },
            outline: {
              borderDistance: 17,
              itemStyle: {
                borderWidth: 7,
                borderColor: {
                  type: "linear",
                  x: 1,
                  y: 0,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(212, 252, 125, 1)",
                    },
                    {
                      offset: 0.5,
                      color: "rgba(2, 193, 131, 1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(2, 193, 131, 1)",
                    },
                  ],
                  globalCoord: false,
                },
                shadowBlur: 10,
                shadowColor: "rgba(13, 13, 46, 1)",
              },
            },
            color: new echarts.graphic.RadialGradient(0.6, 0, 1, [
              {
                offset: 0,
                color: "rgba(178, 251, 105, 1)",
              },
              {
                offset: 1,
                color: "rgba(10, 203, 135, 1)",
              },
            ]),
            label: {
              normal: {
                formatter: "",
              },
            },
          },
        ],
      };
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
   this.chart()
    const element = document.getElementById("ll");
    document.getElementById("ll").addEventListener("click", () => {
      if (screenfull.isEnabled) {
        screenfull.request(element); // 元素全屏
      }
    });
  },
};
</script>

<style lang="less" scoped>
.s {
  padding: 0.625rem;
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
#chart2{
  width: 100%;
  height: 25vh;
}
</style>
