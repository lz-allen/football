<template>
    <div id="line" ref="myLine">
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/title')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
export default {
  name: 'myLine',
  props: ['lineOptions'],
  methods: {
    drawLine () {
      let myChart = echarts.init(this.$refs.myLine)
      let option = this.lineOptions
      myChart.setOption(option)
    }
  },
  mounted () {
    this.drawLine()
  }
}
</script>

<style scoped>
#line{
  width: 100%;
  height: 100%;
}
</style>
