<template>
  <div class="cmpSearch">
    <ul>
      <li v-for="item in playerInfo" :key="item.code" @click="triggerCode(item.code)">
        <div class="level"><span :class="addBg(item.level)">{{item.level}}</span></div>
        <div class="name">
          <div class="left" :style="{backgroundImage: `url(${item.bg})`,backgroundRepeat:'no-repeat'}">
            <img :src="item.url" alt="">
          </div>
          <p class="playerName">{{item.name}}</p>
          <p class="location">{{item.location}}</p>
          <img :src="item.nationInfo" class="right" alt="">
          <img :src="item.leagueInfo" class="right" alt="">
          <p class="activity">{{item.activity}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['playerInfo'],
  data () {
    return {}
  },
  watch: {},
  computed: {
  },
  methods: {
    addBg (num) {
      if (num < 40) return 'bglt40'
      if (num >= 40 && num < 60) return 'bglt60'
      if (num >= 60 && num < 80) return 'bglt80'
      if (num >= 80 && num < 100) return 'bglt100'
      if (num >= 100 && num < 120) return 'bglt120'
      if (num >= 120 && num < 140) return 'bglt140'
      if (num === 140) return 'bge140'
    },
    handleCurrentChange (val) {
      console.log(val)
    },
    triggerCode (code) {
      this.$emit('itemCode', code)
    }
  },
  created () {},
  mounted () {}
}

</script>
<style lang="less" scoped>
  .cmpSearch {
    li{
      list-style: none;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
      padding: 5px 0;
      font-size: 12px;
      cursor: pointer;
      .level{
        span{
          display: inline-block;
          padding: 5px;
          border: 1px solid #333;
          color: #fff;
          border-radius: 5px;
          font-weight: bold;
        }
      }
      .name{
        flex: 1;
        display: flex;
        align-items: center;
        .left{
          width: 50px;
          height: 50px;
          margin: 0 20px;
          background-position: center;
          background-size: cover;
          img{
            width: 50px;
          }
        }
        .playerName{
          width: 130px;
          overflow: hidden;
        }
        .location{
          width: 60px;
        }
        img.right{
          width: 25px;
          height: 25px;
          margin: 0 10px;
        }
      }
    }
  }

</style>
