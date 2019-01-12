<template>
  <div class="container">
    <div class="navBar">
      <ul>
        <li class="item" v-for="(item, index) in navBarData" :key="item.name">{{item.name}}
          <ul class="subUl">
            <li class="subItem" v-for="(subItem, indexs) in item.item" @click="setItem(index, subItem)" :key="indexs">{{subItem.label}}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  getTeamInfo,
  getTalentInfo,
  getProgramInfo,
  getLeagueInfo,
  getNationInfo} from '@/api/api'
import { storage } from '@/util/util'
export default {
  components: {},
  props: {},
  data () {
    return {
      navBarData: [
        {
          name: '品质',
          item: [{
            value: '传奇',
            label: '传奇'
          }, {
            value: '大师',
            label: '大师'
          }, {
            value: '精英',
            label: '精英'
          }, {
            value: '黄金',
            label: '黄金'
          }, {
            value: '白银',
            label: '白银'
          }, {
            value: '青铜',
            label: '青铜'
          }]
        },
        {
          name: '位置',
          item: [
            {
              value: 'ST',
              label: '前锋'
            }, {
              value: 'LW',
              label: '左前锋'
            }, {
              value: 'RW',
              label: '右边锋'
            }, {
              value: 'LF',
              label: '左内锋'
            }, {
              value: 'CF',
              label: '中锋'
            }, {
              value: 'RF',
              label: '右内锋'
            }, {
              value: 'CAM',
              label: '前腰'
            }, {
              value: 'LM',
              label: '左前卫'
            }, {
              value: 'CM',
              label: '中前卫'
            }, {
              value: 'RM',
              label: '右前卫'
            }, {
              value: 'CDM',
              label: '后腰'
            }, {
              value: 'LWB',
              label: '左翼卫'
            }, {
              value: 'LB',
              label: '左后卫'
            }, {
              value: 'CB',
              label: '中后卫'
            }, {
              value: 'RB',
              label: '右后卫'
            }, {
              value: 'RWB',
              label: '右翼卫'
            }, {
              value: 'GK',
              label: '门将'
            }
          ]
        },
        {
          name: '国家',
          item: []
        },
        {
          name: '联赛',
          item: []
        },
        {
          name: '球队',
          item: []
        },
        {
          name: '活动',
          item: []
        },
        {
          name: '天赋',
          item: []
        },
        {
          name: '隐藏特性',
          item: [
            {
              value: '进攻组织者',
              label: '进攻组织者'
            },
            {
              value: '一脚出球',
              label: '一脚出球'
            },
            {
              value: '远射',
              label: '远射'
            },
            {
              value: '加速',
              label: '加速'
            },
            {
              value: '独狼',
              label: '独狼'
            },
            {
              value: '跳水',
              label: '跳水'
            },
            {
              value: '技术盘带',
              label: '技术盘带'
            },
            {
              value: '45度传中',
              label: '45度传中'
            },
            {
              value: '底线传中',
              label: '底线传中'
            },
            {
              value: '习惯铲球',
              label: '习惯铲球'
            },
            {
              value: '大力手抛球',
              label: '大力手抛球'
            },
            {
              value: '守门员参与角色',
              label: '守门员参与角色'
            }
          ]
        },
        {
          name: '常用脚',
          item: [
            {
              value: '左脚',
              label: '左脚'
            },
            {
              value: '右脚',
              label: '右脚'
            }
          ]
        }
      ]
    }
  },
  watch: {},
  computed: {},
  methods: {
    handleCommand (val) {
      console.log(val)
    },
    setItem (index, val) {
      switch (index) {
        case 0:
          storage.setSession('r', val); break
        case 1:
          storage.setSession('j', val); break
        case 2:
          storage.setSession('nc', val); break
        case 3:
          storage.setSession('lc', val); break
        case 4:
          storage.setSession('cc', val); break
        case 5:
          storage.setSession('pc', val); break
        case 6:
          storage.setSession('b', val); break
        case 7:
          storage.setSession('t', val); break
        case 8:
          storage.setSession('f', val); break
      }
      this.$emit('isClick')
    },
    _getTeam () {
      getTeamInfo().then(res => {
        let data = res && res.data.data
        data.forEach((item, index) => {
          let obj = {
            value: item.code,
            label: item.chname
          }
          this.navBarData[4].item.push(obj)
        })
      })
    },
    _getTalentInfo () {
      getTalentInfo().then(res => {
        let data = res && res.data.data
        data.forEach((item, index) => {
          let obj = {
            value: item.code,
            label: item.name
          }
          this.navBarData[6].item.push(obj)
        })
      })
    },
    _getProgramInfo () {
      getProgramInfo().then(res => {
        let data = res && res.data.data
        data.forEach((item, index) => {
          let obj = {
            value: item.chname,
            label: item.chname
          }
          this.navBarData[5].item.push(obj)
        })
      })
    },
    _getLeagueInfo () {
      getLeagueInfo().then(res => {
        let data = res && res.data.data
        data.forEach((item, index) => {
          let obj = {
            value: item.code,
            label: item.chname
          }
          this.navBarData[3].item.push(obj)
        })
      })
    },
    _getNationInfo () {
      getNationInfo().then(res => {
        let data = res && res.data.data
        data.forEach((item, index) => {
          let obj = {
            value: item.code,
            label: item.chname
          }
          this.navBarData[2].item.push(obj)
        })
      })
    }
  },
  created () {
    this._getTeam()
    this._getTalentInfo()
    this._getProgramInfo()
    this._getLeagueInfo()
    this._getNationInfo()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
  .container{
    max-width: 1200px;
    margin: 0 auto;
  }
  li{
    list-style: none;
  }
  .navBar {
    height: 40px;
    ul{
      display: flex;
      li.item{
        padding: 0 20px;
        font-size: 14px;
        line-height: 40px;
        border-right: 1px solid #ddd;
        position: relative;
        cursor: pointer;
        &:hover{
          color: #940000;
          border-bottom: 3px solid #940000;
          .subUl{
            display: block;
          }
        }
        .subUl{
          position: absolute;
          background-color: #fff;
          width: 150px;
          max-height: 320px;
          overflow-y:scroll;
          z-index: 666;
          left: 0;
          top: 43px;
          display: none;
          border: 1px solid #ddd;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          color: #000;
          padding: 10px 0;
          .subItem{
            padding-left: 18px;
            font-size: 12px;
            &:hover{
              color: #fff;
              background-color: #940000;
            }
          }
        }
      }
    }
  }

</style>
