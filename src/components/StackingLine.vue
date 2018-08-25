<template>
  <div id="stackingLine" ref="myLine">
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/title')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
export default {
  name: 'mySLine',
  props: ['stackOptions'],
  methods: {
    drawLine () {
      let myChart = echarts.init(this.$refs.myLine)
      let option = this.stackOptions
      myChart.setOption(option)
    }
  },
  mounted () {
    this.drawLine()
  }
}
</script>

<style scoped>
  #stackingLine{
    width: 100%;
    height: 1500px;
  }
</style>
