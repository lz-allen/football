<template>
    <div id="radar" ref="myRadar"></div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/radar')
require('echarts/lib/component/title')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')

export default {
  name: 'myRadar',
  props: ['radarOptions'],
  mounted () {
    this.drawRadar()
  },
  methods: {
    drawRadar () {
      let myChart = echarts.init(this.$refs.myRadar)
      let option = this.radarOptions
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>
#radar{
  width: 100%;
  height: 100%;
}
</style>
