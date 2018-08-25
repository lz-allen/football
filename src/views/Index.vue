<template>
  <div @touchmove.prevent>
    <Main ref="main">
      <h3  slot="title" class="title">FIFA足球世界</h3>
      <i slot="btn"  class="el-icon-search searchIcon" @click="search"></i>
    </Main>
  </div>
</template>
<script>
import Main from '@/components/Main'
export default {
  name: 'Index',
  components: {
    Main
  },
  methods: {
    search () {
      this.$refs.main.toggle()
    }
  }
}
</script>

<style scoped>
  .title{
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    background-color: #f5f5f5;
  }
  .searchIcon {
    position: absolute;
    top: 20px;
    right: 20px;
   font-size: 30px;
  }
</style>
