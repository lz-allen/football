<template>
  <transition name="slide">
    <div class="cmp">
      <h3 class="title">球员对比</h3>
      <div class="btn">
        <el-button type="primary" icon="el-icon-circle-plus" @click="addPlayer">增加对比球员</el-button>
      </div>
      <div class="playerList">
        <div class="item" v-for="(item, index) in playerArr" :key="index">
          <div class="bgImg" :style="{backgroundImage: 'url('+item.backgroundUrl+')'}">
            <img :src="item.personAvatar" alt="" class="avatar">
          </div>
          <p class="name">{{item.name}}</p>
          <p class="btn">
            <el-button type="danger" @click="deletePlayer(index)">删除球员</el-button>
          </p>
          <p class="trainP">
            <el-select v-model="item.trainVal" placeholder="请选择训练等级"  @change="valueRefresh(index)">
              <el-option
                v-for="train in item.trainValArr"
                :key="train.value"
                :label="train.label"
                :value="train.value">
              </el-option>
            </el-select>
          </p>
          <p class="talentP">
            <el-select v-model="item.talentVal" placeholder="请选择天赋等级" @change="valueRefresh(index)">
              <el-option
                v-for="talent in item.talentValArr"
                :key="talent.value"
                :label="talent.label"
                :value="talent.value">
              </el-option>
            </el-select>
          </p>
        </div>
      </div>
      <my-radar ref="myRadar" :radarOptions="radarOptions" v-if="radarOptions.legend.data.length" class="radar"></my-radar>
      <my-line :stackOptions="stackOptions" v-if="stackOptions.legend.data.length&&lineFlag" ref="myLine"></my-line>
      <div v-if="isShow" class="mainWrap">
        <Main :searchType="'cmp'" @code="add" ref="main">
          <h3  slot="title" class="title">FIFA足球世界</h3>
          <i slot="btn"  class="el-icon-search searchIcon" @click="search"></i>
        </Main>
      </div>
      <div class="loadWrap" v-show="loadFlag">
        <load></load>
      </div>
    </div>
  </transition>
</template>

<script>
import Main from '@/components/Main'
import {getPersonDetail, getTrainData, getTalentData} from '@/api/api'
import {getBackground, getHead} from '@/util/util'
import myLine from '@/components/StackingLine'
import Load from '@/components/Loading'
import myRadar from '@/components/radar'

export default {
  name: 'PlayerCmp',
  data: function () {
    return {
      count: 0,
      isShow: false,
      loadFlag: false,
      lineFlag: true,
      playerArr: [],
      stackOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: []
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.02]
        },
        yAxis: {
          type: 'category',
          data: ['冲刺速度', '加速', '力量', '控球', '盘带', '头球', '射门', '射门力量', '远射', '抢点', '铲球', '人盯人', '进攻性', '镇定', '意识', '反应', '任意球', '短传', '长传', '传中']
        },
        series: []
      },
      radarOptions: {
        tooltip: {},
        legend: {
          data: [],
          x: 'center'
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 4]
            }
          },
          indicator: [
            {name: '步频', max: 140},
            {name: '射门', max: 140},
            {name: '传球', max: 140},
            {name: '灵活性', max: 140},
            {name: '防守', max: 140},
            {name: '体格', max: 140}
          ]
        },
        series: [{
          name: '个人能力',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: []
        }]
      }
    }
  },
  methods: {
    addPlayer () {
      this.isShow = true
      document.addEventListener('touchmove', this.preHandler, {passive: false})
    },
    preHandler (e) {
      e.preventDefault()
    },
    search () {
      this.$refs.main.toggle()
    },
    add (code) {
      this.getInfo(code)
      code && (this.isShow = false)
      document.removeEventListener('touchmove', this.preHandler)
    },
    deletePlayer (index) {
      this.playerArr.splice(index, 1)
      this.stackOptions.legend.data.splice(index, 1)
      this.stackOptions.series.splice(index, 1)
      this.radarOptions.legend.data.splice(index, 1)
      this.radarOptions.series[0].data.splice(index, 1)
      this.count--
      this.lineFlag = false
      setTimeout(() => {
        this.$refs.myRadar.drawRadar()
        this.lineFlag = true
      }, 20)
    },
    computedBasicAbility (oldArr, jobCode) {
      if (!oldArr.length) {
        return []
      }
      let arr = []
      if (jobCode === 'GK') {
        arr[0] = oldArr[6]
        arr[1] = oldArr[7]
        arr[2] = oldArr[9]
        arr[3] = oldArr[8]
        arr[4] = Math.round(oldArr[17] * 0.35 + oldArr[18] * 0.3 + oldArr[19] * 0.3 + oldArr[16] * 0.05)
        arr[5] = Math.round(oldArr[17] * 0.6 + oldArr[12] * 0.4)
        return arr
      }
      arr[0] = Math.round(oldArr[0] * 0.55 + oldArr[1] * 0.45)
      arr[1] = Math.round(oldArr[6] * 0.45 + oldArr[7] * 0.25 + oldArr[8] * 0.2 + oldArr[9] * 0.1)
      arr[2] = Math.round(oldArr[17] * 0.35 + oldArr[18] * 0.3 + oldArr[19] * 0.3 + oldArr[16] * 0.05)
      arr[3] = Math.round(oldArr[4] * 0.7 + oldArr[3] * 0.3)
      arr[4] = Math.round(oldArr[11] * 0.45 + oldArr[10] * 0.35 + oldArr[5] * 0.2)
      arr[5] = Math.round(oldArr[2] * 0.6 + oldArr[12] * 0.4)
      return arr
    },
    valueRefresh (index) {
      let values = []
      for (let i = 0; i < 20; i++) {
        values.push(this.playerArr[index].tempArr[i])
      }
      let newArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (let i = 0, length = this.playerArr[index].trainVal - (this.playerArr[index].score + 1); i <= length; i++) {
        this.playerArr[index].trainArr[i].capabilityValues.forEach((item, index) => {
          newArr[index] = parseInt(newArr[index]) + parseInt(item)
        })
      }
      newArr.forEach((items, index) => {
        let val = parseInt(values[index]) + parseInt(items)
        values[index] = val > 120 ? 120 : val
      })
      if (parseInt(this.playerArr[index].talentVal)) {
        for (let i = 0; i < 20; i++) {
          if (parseInt(this.playerArr[index].talentArr[this.playerArr[index].talentVal - 1].capabilityValues[i])) {
            let value = parseInt(values[i])
            value = value + Math.round(value * this.playerArr[index].talentArr[this.playerArr[index].talentVal - 1].capabilityValues[i] / 100)
            values[i] = value > 140 ? 140 : value
          }
        }
      }
      let name = parseInt(this.playerArr[index].trainVal) + parseInt(this.playerArr[index].talentVal) + '-' + this.playerArr[index].name
      this.stackOptions.legend.data[index] = name
      this.stackOptions.series[index].name = name
      this.stackOptions.series[index].data = values
      this.radarOptions.legend.data[index] = name
      this.radarOptions.series[0].data[index].name = name
      this.radarOptions.series[0].data[index].value = this.computedBasicAbility(values, this.playerArr[index].jobCode)
      this.$refs.myRadar.drawRadar()
      this.$refs.myLine.drawLine()
    },
    getInfo (code) {
      this.count++
      this.loadFlag = true
      getPersonDetail(code).then((res) => {
        if (res) {
          let aimObj = res.data.basicInfo
          let obj = {
            backgroundUrl: getBackground(aimObj.programInfo.name, res.data.rarityValue, aimObj.score, aimObj.programInfo.havebackground, aimObj.bg),
            personAvatar: getHead(aimObj.programInfo.name, aimObj.no, aimObj.score, aimObj.headcalcscore, aimObj.head, aimObj.headcount, aimObj.havaas),
            code: code,
            bgNum: aimObj.bg,
            imgNum: aimObj.no,
            jobCode: aimObj.jobCode,
            score: parseInt(aimObj.score),
            newScore: parseInt(aimObj.score),
            name: res.data.name,
            trainValArr: [],
            talentValArr: [
              {value: '0', label: '0'}, {value: '1', label: '1'}, {value: '2', label: '2'}, {value: '3', label: '3'}, {value: '4', label: '4'},
              {value: '5', label: '5'}, {value: '6', label: '6'}, {value: '7', label: '7'}, {value: '8', label: '8'}, {value: '9', label: '9'},
              {value: '10', label: '10'}, {value: '11', label: '11'}, {value: '12', label: '12'}, {value: '13', label: '13'}, {value: '14', label: '14'},
              {value: '15', label: '15'}, {value: '16', label: '16'}, {value: '17', label: '17'}, {value: '18', label: '18'}, {value: '19', label: '19'}, {value: '20', label: '20'}
            ],
            trainArr: [],
            tempArr: [],
            talentArr: [],
            trainVal: aimObj.score,
            talentVal: '0'
          }
          let num = obj.score
          while (num <= 100) {
            let val = String(num++)
            let objTemp = {
              value: val,
              label: val
            }
            obj.trainValArr.push(objTemp)
          }
          Promise.all([getTrainData(obj.jobCode, obj.score), getTalentData(res.data.skills.code)]).then(result => {
            obj.trainArr = result[0].data.data
            obj.tempArr = res.data.capabilityValues.extend
            obj.talentArr = result[1].data.data
            let name = obj.newScore + '-' + res.data.name
            let tagArr = ['insideRight', 'insideLeft', 'inside']
            this.playerArr.push(obj)
            this.stackOptions.legend.data.push(name)
            this.stackOptions.series.push({
              name: name,
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: tagArr[this.count % 3]
                }
              },
              data: res.data.capabilityValues.extend
            })
            let radarItem = {
              value: this.computedBasicAbility(res.data.capabilityValues.extend, res.data.basicInfo.jobCode),
              name: obj.newScore + '-' + res.data.name
            }
            this.radarOptions.legend.data.push(obj.newScore + '-' + res.data.name)
            this.radarOptions.series[0].data.push(radarItem)
            setTimeout(() => {
              this.$refs.myLine.drawLine()
              this.$refs.myRadar.drawRadar()
              this.loadFlag = false
            }, 30)
          })
        }
      })
    }
  },
  components: {
    Main,
    myLine,
    myRadar,
    Load
  }
}
</script>

<style scoped>
  .cmp{
    font-size: 30px;
    padding-bottom: 60px;
  }
  h3{
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    background-color: #f5f5f5;
  }
  .btn{
    padding: 20px 20px 0 0;
    text-align: right;
  }
  .playerList{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .playerList .item{
    width: 33.333333%;
    font-size: 20px;
    text-align: center;
    position: relative;
  }
  .playerList .item p{
    padding: 0 20px;
    margin: 10px;
    text-align: center;
  }
  .playerList .item .bgImg{
    width: 100%;
    height: 200px;
    background: center no-repeat;
    background-size: contain;
  }
  .playerList .item .bgImg img{
    position: absolute;
    left: 24px;
    width: 200px;
  }
  .radar{
    margin-top: 30px;
  }
  .mainWrap{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    top: 0;
    bottom: 0;
  }
  .mainWrap .title{
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    background-color: #f5f5f5;
  }
  .mainWrap .searchIcon {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 30px;
  }
  .loadWrap{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E74C3C;
  }
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
