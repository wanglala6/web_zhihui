<template>
  <div>
    <div class="gauge" id="gauge">
    </div>
<!--    <div class="sim_box">相似度</div>-->
  </div>
</template>

<script>
export default {
  name: "gauge",
  methods: {
    gaugeInit() {
      var echarts = require('echarts');
      var myChart = echarts.init(document.getElementById('gauge'));
      var option;

      var getvalue = [88];

      option = {
        title: {
          text: getvalue + '%',
          textStyle: {
            color: '#28BCFE',
            fontSize: 20,
          },
          subtext: '相似度',
          subtextStyle: {
            color: '#fff',
            fontSize: 15,
          },
          itemGap: 20,
          left: 'center',
          top: '43%'
        },
        tooltip: {
          formatter: function (params) {
            return '<span style="color: #fff;">综合得分：' + getvalue + '分</span>';
          }
        },
        angleAxis: {
          max: 100,
          clockwise: true, // 逆时针
          // 隐藏刻度线
          show: false
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,

          },
          axisTick: {
            show: false
          },
        },
        polar: {
          center: ['50%', '50%'],
          radius: '100%'
        },
        series: [{
          type: 'bar',
          data: getvalue,
          showBackground: true,
          backgroundStyle: {
            color: '#BDEBFF',
            opacity: 0.2
          },
          coordinateSystem: 'polar',
          roundCap: true,
          barWidth: 10,
          itemStyle: {
            normal: {
              opacity: 1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#25BFFF',
                opacity: 0.5
              }, {
                offset: 1,
                color: '#5284DE'
              }]),
              shadowBlur: 5,
              shadowColor: '#2A95F9',
            }
          },
        }]
      };
      option && myChart.setOption(option);
    }
  },
  mounted() {
    this.gaugeInit();
  }
}
</script>

<style lang="less">
.sim_box {
  text-align: center;
  color: white;
}

.gauge {
  width: 168px;
  height: 200px;
  position: relative;

  //&__top {
  //  position: absolute;
  //  top: 0;
  //  left: 0;
  //  width: 100%;
  //  height: 200px;
  //}
  //
  //&__bottom {
  //  position: absolute;
  //  top: 0;
  //  left: 0;
  //  width: 100%;
  //  height: 200px;
  //}
  //
  //&__label {
  //  position: absolute;
  //  height: 21px;
  //  width: 30px;
  //  background: #0547c9;
  //  border: 1px solid #1e92ff;
  //  border-radius: 11.5px;
  //  border-radius: 11.5px;
  //  //bottom: 35px;
  //  left: 50%;
  //  transform: translate(-50%, 0);
  //  font-family: PingFangSC-Regular;
  //  font-size: 8px;
  //  color: #ffffff;
  //  text-align: center;
  //  line-height: 21px;
  //}
  //
  //&__title {
  //  font-family: PingFangSC-Medium;
  //  font-size: 14px;
  //  color: #52f9cb;
  //  text-align: center;
  //  position: absolute;
  //  //bottom: 5px;
  //  left: 50%;
  //  transform: translate(-50%, 0);
  //}
}
</style>
