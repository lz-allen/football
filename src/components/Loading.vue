<template>
    <div class="loadPage">
      <img src="../assets/ball-triangle.svg">
      <p>{{title}}</p>
    </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    title: {
      type: String,
      default: '正在加载...'
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .loadPage{
    width: 100%;
    font-size: 30px;
    text-align: center;
    color: #fff;
  }

</style>
