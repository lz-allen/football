<template>
    <div class="tab">
      <div class="container">
        <ul>
          <li>FIFA足球世界</li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    width: 1200px;
    margin: 0 auto;
    padding: 0;
  }
  .tab{
    position: fixed;
    width: 100%;
    height: 37px;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: #333;
    border-bottom: 3px solid #940000;
    color: #fff;
    ul{
      line-height: 37px;
      display: flex;
      li{
        list-style: none;
        &:first-of-type{
          font-weight: bold;
        }
      }
    }
  }
</style>
