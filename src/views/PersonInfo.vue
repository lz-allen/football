<template>
  <transition name="slide">
    <div>
      <div>
        <div class="personInfo" v-if="playerInfo.bgNum">
          <div class="avatar">
            <div class="avatar_bg" :style="{backgroundImage: 'url('+backgroundUrl+')'}">
              <div class="avatar_photo"><img v-bind:src="personAvatar"/></div>
              <div class="num">{{newScore}}</div>
              <div class="location">{{playerInfo.job}}</div>
              <div class="teamImg"><img class="countryImg" :src="playerInfo.clubInfo.icon"></div>
              <div class="title">{{playerInfo.skills.name}}</div>
              <div class="name">{{playerInfo.name}}</div>
            </div>
            <div class="avatar_words">
              <div>{{playerInfo.name}}</div>
              <div>{{playerInfo.eName}}</div>
              <div><span class="nameLeft">品质:</span><span>{{playerInfo.rarity}}</span></div>
              <div><span class="nameLeft">国家:</span><img class="countryImg" :src="playerInfo.nationInfo.icon"><span>{{playerInfo.nationInfo.name}}</span></div>
              <div><span class="nameLeft">身高:</span><span>{{playerInfo.height}}cm</span></div>
              <div><span class="nameLeft">场上位置:</span><span>{{playerInfo.job}}</span></div>
              <div><span class="nameLeft">习惯脚:</span><span>{{playerInfo.foot}}</span></div>
            </div>
          </div>
          <div class="middle">
            <div class="leagueMatch"><span class="nameLeft">联赛:</span><img class="countryImg" v-if="playerInfo.leagueInfo.icon" :src="playerInfo.leagueInfo.icon"><span>{{playerInfo.leagueInfo.name}}</span></div>
            <div class="team"><span class="nameLeft">球队:</span><img class="countryImg" v-if="playerInfo.clubInfo.icon" :src="playerInfo.clubInfo.icon"><span>{{playerInfo.clubInfo.name}}足球俱乐部</span></div>
            <div class="activity"><span class="nameLeft">活动:</span><img class="countryImg" :src="playerInfo.programInfo.icon" v-if="playerInfo.programInfo.icon"><span>{{playerInfo.programInfo.name}}</span></div>
            <div><span class="nameLeft">隐藏特性:</span><span>{{playerInfo.traits}}</span></div>
          </div>
          <div class="slide">
            <div>
              <div class="title">训练</div>
              <div class="block">
                <el-slider
                  v-model="trainVal"
                  show-input
                  :show-tooltip="true"
                  input-size="medium"
                  @change="valueRefresh"
                  :min="trainMin"
                  :max=100>
                </el-slider>
              </div>
              <div class="trainNumVal"><img src="../assets/jy.png" alt="">{{trainValLeft}}&nbsp;|&nbsp;<img src="../assets/fifa.png" alt="">{{trainValRight}}</div>
            </div>
            <div>
              <div class="title">天赋({{playerInfo.skills.name}})</div>
              <div class="block">
                <el-slider
                  v-model="talentVal"
                  show-input
                  :show-tooltip="true"
                  input-size="medium"
                  @change="valueRefresh"
                  :min=0
                  :max=20>
                </el-slider>
              </div>
              <div class="trainNumVal"><img src="../assets/blue.png" alt="">{{talentValLeft}}&nbsp;|&nbsp;<img src="../assets/fifa.png" alt="">{{talentValRight}}</div>
            </div>
          </div>
          <my-radar class="radar" :radarOptions="radarOptions" v-show="radarOptions" ref="radar"></my-radar>
          <my-line class="line" :lineOptions="lineOptions" v-show="lineOptions" ref="lines"></my-line>
        </div>
      </div>
      <div class="loadingWrap">
        <loading v-show="!playerInfo.bgNum"></loading>
      </div>
    </div>
  </transition>
</template>

<script>
import myRadar from '@/components/radar'
import myLine from '@/components/line'
import Loading from '@/components/Loading'
import {getPersonDetail, getTrainData, getTalentData, getTrainNumVal, getTalentNumVal} from '@/api/api'
import {getBackground, getHead} from '@/util/util'

export default {
  name: 'PersonInfo',
  data () {
    return {
      isLoading: true,
      personAvatar: '',
      trainVal: null,
      trainMin: null,
      talentVal: 0,
      talentArr: [],
      trainArr: [],
      trainNumVal: [],
      talentNumVal: [],
      playerInfo: {
        bgUrl: {
          pn: '',
          r: '',
          hb: '',
          bg: ''
        },
        imgNum: '',
        bgNum: '',
        score: '',
        name: '',
        eName: '',
        traits: '',
        rarity: '',
        nationInfo: {
          icon: '',
          name: ''
        },
        height: '',
        job: '',
        jobCode: '',
        foot: '',
        leagueInfo: {
          icon: '',
          name: ''
        },
        clubInfo: {
          icon: '',
          name: ''
        },
        programInfo: {
          icon: '',
          name: ''
        },
        skills: {
          icon: '',
          name: ''
        },
        initCapacity: []
      },
      radarOptions: {
        title: {
          text: '个人雷达图',
          x: 'right'
        },
        tooltip: {},
        legend: {
          data: ['训练前', '训练后'],
          x: 'left'
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
          data: [
            {
              value: [],
              name: '训练前'
            },
            {
              value: [],
              name: '训练后'
            }
          ]
        }]
      },
      lineOptions: {
        title: {
          text: '个人基础数据',
          x: 'right'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['训练前', '训练后'],
          x: 'left'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['冲刺速度', '加速', '力量', '控球', '盘带', '头球', '射门', '射门力量', '远射', '抢点', '铲球', '人盯人', '进攻性', '镇定', '意识', '反应', '任意球', '短传', '长传', '传中']
        },
        series: [
          {
            name: '训练前',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: []
          },
          {
            name: '训练后',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: []
          }
        ]
      }
    }
  },
  components: {
    myRadar,
    myLine,
    Loading
  },
  created () {
    this._getPersonDetail()
  },
  methods: {
    valueRefresh () {
      let values = []
      for (let i = 0; i < 20; i++) {
        values.push(this.lineOptions.series[0].data[i])
      }
      let newArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (let i = 0, length = this.trainVal - (this.trainMin + 1); i <= length; i++) {
        this.trainArr[i].capabilityValues.forEach((item, index) => {
          newArr[index] = parseInt(newArr[index]) + parseInt(item)
        })
      }
      newArr.forEach((items, index) => {
        let val = parseInt(values[index]) + parseInt(items)
        values[index] = val > 120 ? 120 : val
      })
      if (this.talentVal) {
        for (let i = 0; i < 20; i++) {
          if (parseInt(this.talentArr[this.talentVal - 1].capabilityValues[i])) {
            let value = parseInt(values[i])
            value = value + Math.round(value * this.talentArr[this.talentVal - 1].capabilityValues[i] / 100)
            values[i] = value > 140 ? 140 : value
          }
        }
      }
      this.lineOptions.series[1].data = values
      this.radarOptions.series[0].data[1].value = this.computedBasicAbility(this.lineOptions.series[1].data, this.playerInfo.jobCode)
      this.$refs.lines.drawLine()
      this.$refs.radar.drawRadar()
    },
    _getTalentData (gameCode, code) {
      getTalentData(gameCode, code).then((res) => {
        if (res.status === 200) {
          this.talentArr = res.data.data
        }
      })
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
    _getTrainNumVal (gameCode, level) {
      getTrainNumVal(gameCode, level).then(res => {
        if (res.status === 200) {
          this.trainNumVal = res.data
        }
      })
    },
    _getTrainData (gameCode, code, level) {
      getTrainData(gameCode, code, level).then((res) => {
        if (res.status === 200) {
          this.trainArr = res.data.data
        }
      })
    },
    _getTalentNumVal (gameCode) {
      getTalentNumVal(gameCode).then(res => {
        if (res.status === 200) {
          this.talentNumVal = res.data
        }
      })
    },
    _getPersonDetail () {
      const code = this.$route.query.code
      getPersonDetail(code).then((res) => {
        if (res.status === 200) {
          let playerObj = this.playerInfo
          let aimObj = res.data.basicInfo
          playerObj.score = aimObj.score
          this.trainMin = parseInt(aimObj.score)
          this.trainVal = parseInt(aimObj.score)
          playerObj.job = aimObj.job
          playerObj.imgNum = aimObj.no
          playerObj.bgNum = aimObj.bg
          playerObj.skills.name = res.data.skills.name
          playerObj.name = res.data.name
          playerObj.eName = aimObj.enname
          playerObj.rarity = res.data.rarity
          playerObj.nationInfo.icon = aimObj.nationInfo.icon
          playerObj.nationInfo.name = aimObj.nationInfo.name
          playerObj.height = aimObj.height
          playerObj.jobCode = aimObj.jobCode
          playerObj.foot = aimObj.foot
          // 隐藏特性
          playerObj.traits = aimObj.traits
          playerObj.leagueInfo.icon = aimObj.leagueInfo.icon
          playerObj.leagueInfo.name = aimObj.leagueInfo.name
          playerObj.clubInfo.icon = aimObj.clubInfo.icon
          playerObj.clubInfo.name = aimObj.clubInfo.name
          playerObj.programInfo.icon = aimObj.programInfo.icon
          playerObj.programInfo.name = aimObj.programInfo.name
          playerObj.initCapacity = res.data.capabilityValues.extend
          playerObj.bgUrl.pn = aimObj.programInfo.name
          playerObj.bgUrl.r = res.data.rarityValue
          playerObj.bgUrl.hb = aimObj.programInfo.havebackground
          playerObj.bgUrl.bg = aimObj.bg
          this.personAvatar = getHead(aimObj.programInfo.name, aimObj.no, aimObj.score, aimObj.headcalcscore, aimObj.head, aimObj.headcount, aimObj.havaas)
          this.lineOptions.series[0].data = res.data.capabilityValues.extend
          this.radarOptions.series[0].data[0].value = this.computedBasicAbility(this.lineOptions.series[0].data, playerObj.jobCode)
          this._getTrainData(res.data.basicInfo.jobCode, playerObj.score)
          this._getTalentData(res.data.skills.code)
          this._getTrainNumVal(playerObj.score - 1)
          this._getTalentNumVal()
        }
      })
    }
  },
  computed: {
    newScore () {
      return this.trainVal + this.talentVal
    },
    trainValLeft () {
      if (this.trainVal > this.trainMin) {
        return this.trainNumVal[this.trainVal - this.trainMin].capabilityValues[0] - this.trainNumVal[0].capabilityValues[0]
      }
      return 0
    },
    trainValRight () {
      if (this.trainVal > this.trainMin) {
        return this.trainNumVal[this.trainVal - this.trainMin].capabilityValues[1] - this.trainNumVal[0].capabilityValues[1]
      }
      return 0
    },
    talentValLeft () {
      if (this.talentVal > 0) {
        return this.talentNumVal[this.talentVal - 1].capabilityValues[0]
      }
      return 0
    },
    talentValRight () {
      if (this.talentVal > 0) {
        return this.talentNumVal[this.talentVal - 1].capabilityValues[1]
      }
      return 0
    },
    backgroundUrl () {
      let info = this.playerInfo.bgUrl
      return getBackground(info.pn, info.r, this.newScore, info.hb, info.bg)
    }
  }
}
</script>

<style scoped>

.personInfo{
  width: 100%;
  padding-bottom: 60px;
}
.avatar{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 144, 59, 0.2);
  padding: 20px 0;
}
.avatar_bg{
  width: 50%;
  height: 350px;
  background-size: cover;
  position: relative;
  overflow: hidden;
  color: #fff;
}
.avatar_bg .num{
  font-size: 60px;
  position: absolute;
  font-weight: bolder;
  left: 70px;
  top: 60px;
}
.avatar_bg .location{
  font-size: 20px;
  position: absolute;
  font-weight: bolder;
  left: 78px;
  top: 130px;
}
.avatar_bg .teamImg{
  position: absolute;
  font-weight: bolder;
  left: 80px;
  top: 170px;
}
.avatar_bg .title{
  font-size: 20px;
  position: absolute;
  font-weight: bolder;
  right: 65px;
  top: 215px;
}
.avatar_bg .name{
  font-size: 20px;
  position: absolute;
  font-weight: bolder;
  right: 164px;
  top: 250px;
}
.avatar_bg .avatar_photo img{
  width: 360px;
  position: absolute;
  right: 0;
  top: 10px;
}
.avatar_words{
  flex: 1;
  color: #333;
  font-weight: bold;
  font-size: 30px;
}
.avatar_words .orange{
  color: #fa6217;
}
.avatar_words .normal{
  color: #8A2BE2;
}
.nameLeft{
  padding-right: 20px;
}
.countryImg{
  padding-right: 10px;
  width: 35px;
}
.middle{
  font-size: 30px;
  margin-top: 10px;
  padding: 10px 0;
  background-color: rgba(121, 196, 255, 0.1);
  text-align: center;
  color: #333;
  line-height: 40px;
}
.slide{
  margin: 20px 0;
  padding: 0 30px;
  font-size: 25px;
}
.slide .title{
  text-align: center;
  font-weight: bolder;
}
.slide .trainNumVal{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.slide .trainNumVal img{
  width: 40px;
  height: 40px;
}
.radar{
  margin-top: 30px;
}
.line{
  margin-top: 30px;
}
.loadingWrap{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E74C3C;
}
.slide-enter-active, .slide-leave-active{
  transition: all 0.3s;
}
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

</style>
