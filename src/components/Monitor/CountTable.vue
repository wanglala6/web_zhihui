<template>
  <div class="vue">
    <div class="bar box" id="chart1"></div>
  </div>
</template>

<script>
import 'echarts/lib/chart/bar'
export default {
  data () {
    return {
      items2: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }
  },
  methods: {
    draw () {
      // console.log(this.$echarts)
      var echarts = require('echarts');
      // this.chart1 = this.$echarts.init(document.getElementById("chart1"));
      this.chart1 = echarts.init(document.getElementById("chart1"))
      this.chart1.setOption(this.items2);
    }
  },
  mounted () {
    this.draw()
  }
}
</script>

<style scoped>
.box {
  width:400px;
  height:210px;
}
</style>
