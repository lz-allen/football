<template>
  <div class="player">
    <div class="header">
      <el-input v-model="playerName.name" placeholder="请输入内容"  prefix-icon="el-icon-search"></el-input>
      <el-button class="btn" @click="search">搜索</el-button>
    </div>
    <div class="conditions">
      <div class="left">
        <span class="span_t">条件:</span>
        <el-tag
          v-for="tag in tagArr"
          :key="tag.name.label"
          closable
          @close="handleClose(tag)"
          :type="tag.type">
          {{tag.name.label}}
        </el-tag>
      </div>
      <div class="right">
        <el-button size="small" type="text" icon="el-icon-delete" class="delete" @click="clear">清除</el-button>
      </div>
    </div>
    <div class="playerList">
      <ul>
        <li class="title">
          <div @click="sortFlagType(1)">评分<i class="el-icon-d-caret"></i></div>
          <div>姓名</div>
          <div @click="sortFlagType(2)">步频<i class="el-icon-d-caret"></i></div>
          <div @click="sortFlagType(3)">射门<i class="el-icon-d-caret"></i></div>
          <div @click="sortFlagType(4)">传球<i class="el-icon-d-caret"></i></div>
          <div @click="sortFlagType(5)">灵活性<i class="el-icon-d-caret"></i></div>
          <div @click="sortFlagType(6)">防守<i class="el-icon-d-caret"></i></div>
          <div @click="sortFlagType(7)">体格<i class="el-icon-d-caret"></i></div>
          <div @click="sortFlagType(8)">合计<i class="el-icon-d-caret"></i></div>
          <div @click="sortFlagType(9)">详细合计<i class="el-icon-d-caret"></i></div>
        </li>
        <li v-for="item in playerInfo" :key="item.code" @click="jumpPage(item.code)">
          <div class="level"><span :class="addBg(item.level)">{{item.level}}</span></div>
          <div class="name">
            <div class="left" :style="{backgroundImage: `url(${item.bg})`,backgroundRepeat:'no-repeat'}">
              <img :src="item.url" alt="">
            </div>
            <div class="right">
              <p>{{item.name}}</p>
              <p>{{item.location}} | <img :src="item.nationInfo" alt=""> | <img :src="item.leagueInfo" alt=""></p>
              <p>{{item.activity}}</p>
            </div>
          </div>
          <div class="numBold">{{item.attribute.bpmp}}</div>
          <div class="numBold">{{item.attribute.smmz}}</div>
          <div class="numBold">{{item.attribute.cqsk}}</div>
          <div class="numBold">{{item.attribute.lhfy}}</div>
          <div class="numBold">{{item.attribute.fscq}}</div>
          <div class="numBold">{{item.attribute.tg}}</div>
          <div class="numBold">{{item.detailTotal}}</div>
          <div class="numBold">{{item.basicTotal}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {storage} from '@/util/util'
export default {
  components: {},
  props: ['playerInfo', 'tagArr', 'playerName'],
  watch: {},
  methods: {
    handleClose (tag) {
      this.tagArr.forEach((item, index) => {
        if (item.name === tag.name) {
          this.tagArr.splice(index, 1)
        }
      })
      storage.clearOneSession(tag.key)
    },
    jumpPage (code) {
      this.$router.push({path: '/PersonInfo', query: {code}})
    },
    clear () {
      storage.clearAll()
      this.$emit('clearALl')
    },
    search () {
      this.$emit('search')
    },
    sortFlagType (num) {
      this.$emit('sortFlagType', num)
    },
    addBg (num) {
      if (num < 40) return 'bglt40'
      if (num >= 40 && num < 60) return 'bglt60'
      if (num >= 60 && num < 80) return 'bglt80'
      if (num >= 80 && num < 100) return 'bglt100'
      if (num >= 100 && num < 120) return 'bglt120'
      if (num >= 120 && num < 140) return 'bglt140'
      if (num === 140) return 'bge140'
    }
  },
  created () {
  },
  mounted () {}
}

</script>
<style lang="less" scoped>
  .player {
    padding-bottom: 20px;
    .header{
      display: flex;
      .btn{
        width: 150px;
        margin-left: 10px;
        background-color: #940000;
        color: #fff;
      }
    }
    .conditions{
      margin-top: 30px;
      display: flex;
      .left{
        flex: 2;
        line-height: 42px;
        align-items: center;
        .span_t{
          display: inline-block;
          vertical-align: middle;
          padding-right: 10px;
        }
        .el-tag{
          margin: 5px;
        }
      }
      .right{
        flex: 1;
        text-align: right;
        .delete{
          color: #940000;
        }
      }
    }
    .playerList{
      ul{
        list-style: none;
        padding-top: 20px;
        li{
          display: flex;
          margin: 10px 0;
          justify-content: space-around;
          border-bottom: 1px solid #ddd;
          margin: 0 10px;
          align-items: center;
          &:hover{
            background-color: #ddd;
            cursor: pointer;
            border-radius:10px;
          }
          &.title:hover{
            background-color: #fff;
            border-radius: none;
          }
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
          .numBold{
            font-weight: bolder;
            font-size: 18px;
          }
          div{
            width: 70px;
            text-align: center;
          }
          div:nth-child(2){
            width: 250px;
            color: #000;
          }
          &.title{
            color: #940000;
            border: none;
            padding-bottom: 10px;
            div{
              cursor: pointer;
            }
            div:nth-child(2){
              text-align: left;
              text-indent: 50px;
            }
          }
          .name{
            display: flex;
            align-items: center;
            justify-content: center;
            .left{
              width: 80px;
              height: 80px;
              background-size: contain;
              background-position: center;
              position: relative;
              img{
                position: absolute;
                top: 10px;
                right: 0;
                width: 60px;
              }
            }
            .right{
              p{
                padding-left: 10px;
                text-align: left;
                font-size: 12px;
                &:first-of-type{
                  font-weight: bolder;
                  font-size: 14px;
                }
              }
              img{
                width: 10px;
                height: 10px;
              }
            }
          }
        }
      }
    }
  }

</style>
