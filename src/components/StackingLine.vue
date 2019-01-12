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
  data () {
    return {
      myChart: null
    }
  },
  methods: {
    createGraph () {
      this.myChart = echarts.init(this.$refs.myLine)
      this.myChart.setOption(this.stackOptions)
    },
    dataRefresh () {
      this.myChart.setOption(this.stackOptions)
    }
  },
  mounted () {
    this.createGraph()
  }
}
</script>

<style scoped>
  #stackingLine{
    width: 100%;
    height: 100%;
  }
</style>
