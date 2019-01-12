<template>
  <div>
    <div class="header">
      <div class="container">
        <h1>
          <img v-bind:src="personAvatar"/>
          <p class="name">{{playerInfo.name}}</p>
          <ul>
            <li :class="addBg(item.basicInfo.score)" v-for="item in otherCardArr" :key="item.code" @click="jumpPersonInfoPage(item.code)">{{item.basicInfo.score}}</li>
          </ul>
        </h1>
      </div>
    </div>
    <div>
      <div class="personInfo" v-if="playerInfo.bgNum">
        <div class="container">
          <div class="nav">
            <span @click="toIndex">首页</span>
            <span>/</span>
            <span>球员信息</span>
            <el-button size="small" type="text" icon="el-icon-view" class="compare" @click="jumpComparePage" >球员对比</el-button>
          </div>
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
            <div class="circlrGroup">
              <div>
                <p>步频</p>
                <span>{{basicValArr[0]}}</span>
              </div>
              <div>
                <p>射门</p>
                <span>{{basicValArr[1]}}</span>
              </div>
              <div>
                <p>传球</p>
                <span>{{basicValArr[2]}}</span>
              </div>
              <div>
                <p>灵活</p>
                <span>{{basicValArr[3]}}</span>
              </div>
              <div>
                <p>防守</p>
                <span>{{basicValArr[4]}}</span>
              </div>
              <div>
                <p>体格</p>
                <span>{{basicValArr[5]}}</span>
              </div>
            </div>
            <div class="slide">
              <div>
                <div class="title">训练</div>
                <div class="block">
                  <el-slider
                    v-model="trainVal"
                    show-input
                    :show-tooltip="true"
                    input-size="mini"
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
                    input-size="mini"
                    @change="valueRefresh"
                    :min=0
                    :max=20>
                  </el-slider>
                </div>
                <div class="trainNumVal"><img src="../assets/blue.png" alt="">{{talentValLeft}}&nbsp;|&nbsp;<img src="../assets/fifa.png" alt="">{{talentValRight}}</div>
              </div>
            </div>
            <div class="playerInfo">
              <div><span class="nameLeft">姓名:</span>{{playerInfo.name}}</div>
              <div><span class="nameLeft">英文名:</span>{{playerInfo.eName}}</div>
              <div><span class="nameLeft">品质:</span><span>{{playerInfo.rarity}}</span></div>
              <div><span class="nameLeft">国家:</span><img class="countryImg" :src="playerInfo.nationInfo.icon"><span>{{playerInfo.nationInfo.name}}</span></div>
              <div><span class="nameLeft">身高:</span><span>{{playerInfo.height}}cm</span></div>
              <div><span class="nameLeft">场上位置:</span><span>{{playerInfo.job}}</span></div>
              <div><span class="nameLeft">习惯脚:</span><span>{{playerInfo.foot}}</span></div>
              <div class="leagueMatch"><span class="nameLeft">联赛:</span><img class="countryImg" v-if="playerInfo.leagueInfo.icon" :src="playerInfo.leagueInfo.icon"><span>{{playerInfo.leagueInfo.name}}</span></div>
              <div class="team"><span class="nameLeft">球队:</span><img class="countryImg" v-if="playerInfo.clubInfo.icon" :src="playerInfo.clubInfo.icon"><span>{{playerInfo.clubInfo.name}}足球俱乐部</span></div>
              <div class="activity"><span class="nameLeft">活动:</span><img class="countryImg" :src="playerInfo.programInfo.icon" v-if="playerInfo.programInfo.icon"><span>{{playerInfo.programInfo.name}}</span></div>
              <div><span class="nameLeft">隐藏特性:</span><span>{{playerInfo.traits}}</span></div>
            </div>
          </div>
        </div>
          <div class="radar">
            <my-radar :radarOptions="radarOptions" v-show="radarOptions" ref="radar"></my-radar>
          </div>
          <div class="footer">
            <div class="line">
              <my-line  :lineOptions="lineOptions" v-show="lineOptions" ref="lines"></my-line>
            </div>
            <div class="basicInfo">
              <ul>
                <li><span>冲刺速度:</span><span :class="addBg(detailValArr[0])">{{detailValArr[0]}}</span><i v-show="changeVal[0]">+{{changeVal[0]}}</i></li>
                <li><span>加速:</span><span :class="addBg(detailValArr[1])">{{detailValArr[1]}}</span><i v-show="changeVal[1]">+{{changeVal[1]}}</i></li>
                <li><span>力量:</span><span :class="addBg(detailValArr[2])">{{detailValArr[2]}}</span><i v-show="changeVal[2]">+{{changeVal[2]}}</i></li>
                <li><span>控球:</span><span :class="addBg(detailValArr[3])">{{detailValArr[3]}}</span><i v-show="changeVal[3]">+{{changeVal[3]}}</i></li>
                <li><span>盘带:</span><span :class="addBg(detailValArr[4])">{{detailValArr[4]}}</span><i v-show="changeVal[4]">+{{changeVal[4]}}</i></li>
                <li><span>头球:</span><span :class="addBg(detailValArr[5])">{{detailValArr[5]}}</span><i v-show="changeVal[5]">+{{changeVal[5]}}</i></li>
                <li><span>射门:</span><span :class="addBg(detailValArr[6])">{{detailValArr[6]}}</span><i v-show="changeVal[6]">+{{changeVal[6]}}</i></li>
                <li><span>射门力量:</span><span :class="addBg(detailValArr[7])">{{detailValArr[7]}}</span><i v-show="changeVal[7]">+{{changeVal[7]}}</i></li>
                <li><span>远射:</span><span :class="addBg(detailValArr[8])">{{detailValArr[8]}}</span><i v-show="changeVal[8]">+{{changeVal[8]}}</i></li>
                <li><span>抢点:</span><span :class="addBg(detailValArr[9])">{{detailValArr[9]}}</span><i v-show="changeVal[9]">+{{changeVal[9]}}</i></li>
                <li><span>铲球:</span><span :class="addBg(detailValArr[10])">{{detailValArr[10]}}</span><i v-show="changeVal[10]">+{{changeVal[10]}}</i></li>
                <li><span>人盯人:</span><span :class="addBg(detailValArr[11])">{{detailValArr[11]}}</span><i v-show="changeVal[11]">+{{changeVal[11]}}</i></li>
                <li><span>进攻性:</span><span :class="addBg(detailValArr[12])">{{detailValArr[12]}}</span><i v-show="changeVal[12]">+{{changeVal[12]}}</i></li>
                <li><span>镇定:</span><span :class="addBg(detailValArr[13])">{{detailValArr[13]}}</span><i v-show="changeVal[13]">+{{changeVal[13]}}</i></li>
                <li><span>意识:</span><span :class="addBg(detailValArr[14])">{{detailValArr[14]}}</span><i v-show="changeVal[14]">+{{changeVal[14]}}</i></li>
                <li><span>反应:</span><span :class="addBg(detailValArr[15])">{{detailValArr[15]}}</span><i v-show="changeVal[15]">+{{changeVal[15]}}</i></li>
                <li><span>任意球:</span><span :class="addBg(detailValArr[16])">{{detailValArr[16]}}</span><i v-show="changeVal[16]">+{{changeVal[16]}}</i></li>
                <li><span>短传:</span><span :class="addBg(detailValArr[17])">{{detailValArr[17]}}</span><i v-show="changeVal[17]">+{{changeVal[17]}}</i></li>
                <li><span>长传:</span><span :class="addBg(detailValArr[18])">{{detailValArr[18]}}</span><i v-show="changeVal[18]">+{{changeVal[18]}}</i></li>
                <li><span>传中:</span><span :class="addBg(detailValArr[19])">{{detailValArr[19]}}</span><i v-show="changeVal[19]">+{{changeVal[19]}}</i></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myRadar from '@/components/radar'
import myLine from '@/components/line'
import {getPersonDetail, getTrainData, getTalentData, getTrainNumVal, getTalentNumVal, getOtherCard} from '@/api/api'
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
      otherCardArr: [],
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
        tooltip: {},
        legend: {
          orient: 'vertical',
          color: '#fff',
          x: 'right',
          y: 'top',
          data: ['训练前', '训练后'],
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
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
    myLine
  },
  created () {
    this._getPersonDetail()
    this._getOtherCard()
  },
  watch: {
    '$route': {
      handler (newVal) {
        this._getPersonDetail()
        this._getOtherCard()
        this.valueRefresh('watch')
        this.talentVal = 0
      }
    }
  },
  methods: {
    toIndex () {
      this.$router.push('/')
    },
    jumpComparePage () {
      this.$router.push({path: '/playerCmp', query: {code: this.$route.query.code}})
    },
    addBg (num) {
      if (num < 40) return 'bglt40'
      if (num >= 40 && num < 60) return 'bglt60'
      if (num >= 60 && num < 80) return 'bglt80'
      if (num >= 80 && num < 100) return 'bglt100'
      if (num >= 100 && num < 120) return 'bglt120'
      if (num >= 120 && num < 140) return 'bglt140'
      if (num === 140) return 'bge140'
    },
    valueRefresh (name) {
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
      if (name === 'watch') {
        this.lineOptions.series[1].data = []
        this.radarOptions.series[0].data[1].value = []
      }
      this.$refs.lines.drawLine()
      this.$refs.radar.drawRadar()
    },
    _getOtherCard () {
      const code = this.$route.query.code
      getOtherCard(code).then(res => {
        if (res.status === 200) {
          this.otherCardArr = res.data
        }
      })
    },
    jumpPersonInfoPage (code) {
      this.$router.push({path: '/PersonInfo', query: {code}})
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
    _getTrainNumVal (level) {
      getTrainNumVal(level).then(res => {
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
    basicValArr () {
      return this.radarOptions.series[0].data[1].value.length ? this.radarOptions.series[0].data[1].value : this.radarOptions.series[0].data[0].value
    },
    detailValArr () {
      return this.lineOptions.series[1].data.length ? this.lineOptions.series[1].data : this.lineOptions.series[0].data
    },
    changeVal () {
      let obj = this.lineOptions
      if (obj.series[1].data.length) {
        return obj.series[1].data.map((val, index) => {
          return val - obj.series[0].data[index]
        })
      }
      return []
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
.container{
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}
.header{
  height: 120px;
  color: #fff;
  padding-top: 40px;
  background-color:#181818;
  background-image: linear-gradient(160deg, #8d835a 20%,#181818 80%);
}
.header h1{
  overflow: hidden;
  height: 120px;
  background-image: url('../assets/descInfo.png');
  background-repeat: no-repeat;
  background-size: 80px 120px;
  background-position: 20px;
  position: relative;
}
.header h1 img {
  width: 300px;
  position: relative;
  top: 0px;
  left: -90px;
}
.header h1 .name{
  position: absolute;
  top: 30px;
  left: 180px;
}
.header h1 ul{
  position: absolute;
  top: 80px;
  list-style: none;
  left: 180px;
  display: flex;
}
.header h1 ul li {
  margin: 0 10px;
  padding: 5px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 0 3px #000;
}
.personInfo{
  width: 100%;
  background: url('../assets/bg_repeat.png');
}
.nav{
  line-height: 60px;
  position: relative;
  display: flex;
}
.nav span {
  margin: 0 5px;
}
.nav span:nth-of-type(1){
  color: #940000;
  cursor: pointer;
}
.nav span:nth-of-type(2){
  color: #8b96a6;
}
.nav span:nth-of-type(3){
  color: #8b96a6;
}
.nav .compare{
  position: absolute;
  right: 348px;
  top: 14px;
  color: #940000;
  font-size: 16px;
}
.avatar{
  height: 368px;
  display: flex;
  width: 850px;
  justify-content: center;
  align-items: center;
  border-top: 3px solid #940000;
  background-color: #2a2b2f;
  padding: 20px 0;
}
.avatar_bg{
  width: 214px;
  height: 315px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  overflow: hidden;
  color: #fff;
}
.avatar_bg .num{
  font-size: 30px;
  position: absolute;
  font-weight: bolder;
  left: 50px;
  top: 80px;
}
.avatar_bg .location{
  font-size: 14px;
  position: absolute;
  font-weight: bolder;
  left: 50px;
  top: 120px;
}
.avatar_bg .teamImg{
  position: absolute;
  font-weight: bolder;
  left: 54px;
  top: 150px;
}
.avatar_bg .teamImg img{
  width: 25px;
}
.avatar_bg .title{
  width: 140px;
  height: 30px;
  line-height: 30px;
  text-align: right;
  background-color: rgba(0, 0, 0, .5);
  font-size: 14px;
  position: absolute;
  font-weight: bolder;
  right: 38px;
  top: 160px;
}
.avatar_bg .name{
  width: 140px;
  height: 30px;
  font-size: 14px;
  position: absolute;
  font-weight: bolder;
  text-align: center;
  right: 38px;
  top: 194px;
}
.avatar_bg .avatar_photo img{
  width: 200px;
  position: absolute;
  right: 0;
  top: 60px;
}
.avatar_words{
  flex: 1;
  height: 300px;
  border-left: 1px solid #535353;
  padding: 10px;
  color: #fff;
  font-weight: bold;
}
.avatar_words .circlrGroup {
  display: flex;
  flex-wrap: wrap;
}
.avatar_words .circlrGroup div{
  margin: 0 10px
}
.avatar_words .circlrGroup div p{
  text-align: center;
  line-height: 30px;
}
.avatar_words .circlrGroup div span{
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  border: 2px solid #ddd;
}
.avatar_words .orange{
  color: #fa6217;
}
.avatar_words .normal{
  color: #8A2BE2;
}
.avatar_words .playerInfo{
  position: absolute;
  width: 340px;
  height: 411px;
  color: #333;
  border: 1px solid #cecece;
  border-top: 3px solid #940000;
  padding: 0 10px;
  box-sizing: border-box;
  top: 60px;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  box-shadow: 3px 3px 5px #ddd;
}
.avatar_words .playerInfo div{
  width: 100%;
  box-sizing: border-box;
  margin: 5px 0;
  border-bottom: 1px solid #ddd;
}
.avatar_words .playerInfo img{
  width: 30px;
  vertical-align: middle;
}
.nameLeft{
  text-align: right;
  display: inline-block;
  width: 80px;
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
  width: 300px;
  margin: 15px 0;
  padding: 0 10px;
  font-size: 14px;
}
.slide .title{
  text-align: center;
  font-weight: bolder;
}
.slide .trainNumVal{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  font-size: 12px;
}
.slide .trainNumVal img{
  width: 25px;
  height: 25px;
}
.radar{
  position: absolute;
  top: 100px;
  right: 350px;
  width: 300px;
  height: 300px;
}
.footer{
  display: flex;
  padding: 30px 0;
}
.footer .line{
  width: 500px;
  height: 500px;
  padding-top: 30px;
  background-color: #fff;
  border:1px solid #ddd;
  border-top: 3px solid #940000;
  box-shadow: 3px 3px 5px #ddd;
}
.footer .basicInfo{
  flex: 1;
  margin-left: 10px;
  background-color: #2a2b2f;
  border-top: 3px solid #940000;
  padding: 30px 20px 20px 20px;
  color: #fff;
}
.footer .basicInfo ul{
  list-style: none;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}
.footer .basicInfo ul li{
  width: 50%;
  box-sizing: border-box;
  line-height: 40px;
}
.footer .basicInfo ul li span:first-of-type{
  display: inline-block;
  width: 100px;
  text-align: right;
  font-weight: bolder;
  padding-right: 15px;
}
.footer .basicInfo ul li span:last-of-type{
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-weight: bolder;
  text-align: center;
  box-shadow: 0 0 3px #fff;
}
.footer .basicInfo ul li i{
  padding-left: 10px;
  color: #ddd;
  font-weight: bold;
}
</style>
