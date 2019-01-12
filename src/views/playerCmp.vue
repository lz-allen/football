<template>
  <div class="cmp">
    <div class="header">
      <div class="container">
        <h1>球员对比</h1>
      </div>
    </div>
    <div class="bg">
      <div class="container">
        <div class="nav">
          <span @click="toIndex">首页</span>
          <span>/</span>
          <span>球员对比</span>
        </div>
        <div class="content">
          <div class="left">
            <div class="list">
              <div class="item" v-for="(item, index) in playerArr" :key="index">
                <div class="bgImg" :style="{backgroundImage: 'url('+item.backgroundUrl+')'}">
                  <img :src="item.personAvatar" alt="" class="avatar">
                </div>
                <p class="name">{{item.name}}</p>
                <p class="btn">
                  <el-button type="danger" size="mini" @click="deletePlayer(index)">删除球员</el-button>
                </p>
                <p class="trainP">
                  <el-select size="mini" v-model="item.trainVal" placeholder="请选择训练等级"  @change="valueRefresh(index)">
                    <el-option
                      v-for="train in item.trainValArr"
                      :key="train.value"
                      :label="train.label"
                      :value="train.value">
                    </el-option>
                  </el-select>
                </p>
                <p class="talentP">
                  <el-select size="mini" v-model="item.talentVal" placeholder="请选择天赋等级" @change="valueRefresh(index)">
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
          </div>
          <div class="right">
            <div class="top">
              <div class="query">
                <div class="queryLeft">
                  <span>中文/英文名</span>
                  <el-input v-model="playerName" size="mini" placeholder="请输入内容"></el-input>
                </div>
                <div class="queryRight">
                  <span>品质</span>
                  <el-select size="mini" clearable placeholder="请选择品质" v-model="quality">
                    <el-option v-for="(item,key) in qualityArr" :key="key" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </div>
              </div>
              <div class="query">
                <div class="queryLeft">
                  <span>身高</span>
                  <el-input v-model="height" size="mini" placeholder="请输入内容"></el-input>
                </div>
                <div class="queryRight">
                  <span>位置</span>
                  <el-select size="mini" clearable placeholder="请选择位置" v-model="location">
                    <el-option v-for="(item,key) in locationArr" :key="key" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </div>
              </div>
              <div class="query">
                <div class="queryLeft">
                  <span>最小评分</span>
                  <el-input v-model="minScore" size="mini" placeholder="请输入内容"></el-input>
                </div>
                <div class="queryRight">
                  <span>国家</span>
                  <el-select size="mini" clearable placeholder="请选择国家" v-model="country">
                    <el-option v-for="(item,key) in countryArr" :key="key" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </div>
              </div>
              <div class="query">
                <div class="queryLeft">
                  <span>最大评分</span>
                  <el-input v-model="maxScore" size="mini" placeholder="请输入内容"></el-input>
                </div>
                <div class="queryRight">
                  <span>联赛</span>
                  <el-select size="mini" clearable placeholder="请选择联赛" v-model="league">
                    <el-option v-for="(item,key) in leagueArr" :key="key" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </div>
              </div>
              <div class="query">
                <div class="queryLeft">
                  <span>常用脚</span>
                  <div style="width: 100%">
                    <el-select size="mini" clearable placeholder="请选择常用脚" v-model="foots">
                      <el-option v-for="(item,key) in footsArr" :key="key" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </div>
                </div>
                <div class="queryRight">
                  <span>球队</span>
                  <el-select size="mini" clearable placeholder="请选择球队" v-model="team">
                    <el-option v-for="(item,key) in teamArr" :key="key" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </div>
              </div>
              <div class="query">
                <div class="queryLeft">
                  <span>活动</span>
                  <div style="width: 100%">
                    <el-select size="mini" clearable placeholder="请选择活动" v-model="activity">
                      <el-option v-for="(item,key) in activityArr" :key="key" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </div>
                </div>
                <div class="queryRight">
                  <span>天赋</span>
                  <el-select size="mini" clearable placeholder="请选择天赋" v-model="talent">
                    <el-option v-for="(item,key) in talentArr" :key="key" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </div>
              </div>
              <div class="query">
                <div class="queryLeft">
                  <span>输入等级</span>
                  <el-input v-model="level" size="mini" placeholder="请输入等级"></el-input>
                </div>
                <div class="queryRight">
                  <span>隐藏特性</span>
                  <div>
                    <el-select size="mini" clearable placeholder="请选择特性" v-model="hideFeature">
                      <el-option v-for="(item,key) in hideFeatureArr" :key="key" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="btns">
                <el-button sizi="mini" icon="el-icon-search" type="text" @click="getlistInfo">查询</el-button>
                <el-button sizi="mini" type="text" icon="el-icon-delete" @click="clearAll">清空</el-button>
              </div>
            </div>
          </div>
        </div>
        <my-line id="line" :stackOptions="stackOptions" ref="myLine"></my-line>
        <div class="radarWrapper">
          <my-radar ref="myRadar" :radarOptions="radarOptions" id="radar"></my-radar>
          <div class="numPanel">
            <ul v-for="(item, index) in this.radarOptions.series[0].data" :key="index">
              <li class="title">{{item.name}}</li>
              <li><span class="attrName">步频</span><span :class="addBg(item.value[0])+' num'">{{item.value[0]}}</span></li>
              <li><span class="attrName">射门</span><span :class="addBg(item.value[1])+' num'">{{item.value[1]}}</span></li>
              <li><span class="attrName">传球</span><span :class="addBg(item.value[2])+' num'">{{item.value[2]}}</span></li>
              <li><span class="attrName">灵活性</span><span :class="addBg(item.value[3])+' num'">{{item.value[3]}}</span></li>
              <li><span class="attrName">防守</span><span :class="addBg(item.value[4])+' num'">{{item.value[4]}}</span></li>
              <li><span class="attrName">体格</span><span :class="addBg(item.value[5])+' num'">{{item.value[5]}}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <el-dialog center title="查询列表" :visible.sync="dialogTableVisible">
      <cmp-search :playerInfo="playerInfo" @itemCode="getCode"></cmp-search>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import {getPersonDetail, getTrainData, getTalentData, getList, getTeamInfo,
  getTalentInfo,
  getProgramInfo,
  getLeagueInfo,
  getNationInfo} from '@/api/api'
import {getBackground, getHead} from '@/util/util'
import myLine from '@/components/StackingLine'
import CmpSearch from '@/components/cmpSearch'
import myRadar from '@/components/radar'

export default {
  name: 'PlayerCmp',
  data: function () {
    return {
      count: 0,
      total: 100,
      currentPage: 1,
      pageSize: 10,
      dialogTableVisible: false,
      isShow: false,
      lineFlag: true,
      playerInfo: [],
      playerArr: [],
      playerName: '',
      quality: '',
      qualityArr: [{
        value: '1',
        label: '传奇'
      }, {
        value: '2',
        label: '大师'
      }, {
        value: '3',
        label: '精英'
      }, {
        value: '4',
        label: '黄金'
      }, {
        value: '5',
        label: '白银'
      }, {
        value: '6',
        label: '青铜'
      }],
      location: '',
      locationArr: [
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
      ],
      country: '',
      countryArr: [],
      maxScore: '',
      league: '',
      leagueArr: [],
      foots: '',
      footsArr: [
        {
          value: '左脚',
          label: '左脚'
        },
        {
          value: '右脚',
          label: '右脚'
        }
      ],
      team: '',
      teamArr: [],
      activity: '',
      activityArr: [
        {
          value: '基本球员',
          label: '基本球员'
        }
      ],
      talent: '',
      talentArr: [],
      level: '',
      hideFeature: '',
      hideFeatureArr: [
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
      ],
      height: '',
      minScore: '',
      stackOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          orient: 'vertical',
          color: '#fff',
          x: 'right',
          y: 'top',
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
        // legend: {
        //   orient: 'vertical',
        //   color: '#fff',
        //   x: 'left',
        //   y: 'bottom',
        //   data: [],
        //   textStyle: {
        //     color: '#fff',
        //     fontSize: 14
        //   }
        // },
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
          data: []
        }]
      }
    }
  },
  created () {
    this.getInfo(this.$route.query.code)
    getTeamInfo().then(res => {
      let data = res && res.data.data
      data.forEach((item, index) => {
        let obj = {
          value: item.code,
          label: item.chname
        }
        this.teamArr.push(obj)
      })
    })
    getTalentInfo().then(res => {
      let data = res && res.data.data
      data.forEach((item, index) => {
        let obj = {
          value: item.code,
          label: item.name
        }
        this.talentArr.push(obj)
      })
    })
    getProgramInfo().then(res => {
      let data = res && res.data.data
      data.forEach((item, index) => {
        let obj = {
          value: item.chname,
          label: item.chname
        }
        this.activityArr.push(obj)
      })
    })
    getLeagueInfo().then(res => {
      let data = res && res.data.data
      data.forEach((item, index) => {
        let obj = {
          value: item.code,
          label: item.chname
        }
        this.leagueArr.push(obj)
      })
    })
    getNationInfo().then(res => {
      let data = res && res.data.data
      data.forEach((item, index) => {
        let obj = {
          value: item.code,
          label: item.chname
        }
        this.countryArr.push(obj)
      })
    })
  },
  methods: {
    getCode (code) {
      this.dialogTableVisible = false
      this.getInfo(code)
    },
    _getList () {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        n: this.playerName,
        r: this.quality,
        j: this.location,
        nc: this.country,
        lc: this.league,
        cc: this.team,
        pc: this.activity,
        b: this.talent,
        h: this.height,
        f: this.foots,
        t: this.hideFeature,
        ma: this.maxScore,
        mi: this.minScore,
        level: this.level
      }
      getList(params).then(res => {
        if (res.status === 200) {
          let arr = []
          this.total = Number(res.data.total)
          res.data.list.forEach(item => {
            let obj = {
              code: item.code,
              name: item.name,
              bg: this.getBackground(item.basicInfo.programInfo.name, item.rarityValue, item.basicInfo.score, item.basicInfo.programInfo.havebackground, item.basicInfo.bg),
              url: this.getHead(item.basicInfo.programInfo.name, item.basicInfo.no, item.basicInfo.score, item.basicInfo.headcalcscore, item.basicInfo.head, item.basicInfo.headcount, item.basicInfo.havaas),
              level: item.basicInfo.score,
              location: item.basicInfo.job,
              activity: item.basicInfo.programInfo.name,
              attribute: item.attribute.attributeArray,
              basicTotal: item.capabilityValuesSum,
              nationInfo: item.basicInfo.nationInfo.icon,
              leagueInfo: item.basicInfo.leagueInfo.icon,
              detailTotal: item.attribute.attributeSum
            }
            arr.push(obj)
          })
          this.playerInfo = arr
        }
      })
    },
    toIndex () {
      this.$router.push('/')
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
    handleCurrentChange (val) {
      this._getList()
    },
    getlistInfo () {
      if (this.count === 3) {
        this.$message.error('最多三个球员')
        return
      }
      this.dialogTableVisible = true
      this._getList()
    },
    getBackground (pn, r, score, hb, bg) {
      let imgUrl = 'http://img.wantuole.com/resources/backgrouds/'
      let num = 0
      let imgName = ''
      if (parseInt(hb) > 0) {
        num = parseInt((parseInt(score) - 70) / 10)
        if (bg === 'CGER' || bg === 'SC' || bg === 'TC' || bg === 'T' || bg === 'TDYX' || pn.indexOf('剧情精英球员') >= 0) num = parseInt((parseInt(score) - 50) / 10)
        else if (bg === 'JLBZ') num = parseInt((parseInt(score) - 60) / 10)
        if (pn === '世界杯球员') {
          if (num > 4) {
            num = 4
          }
        }
        imgName = bg + num + '.png'
      } else {
        num = parseInt((parseInt(score) - 50) / 10)
        if (bg !== 'BASIC') {
          imgName = bg + num + '.png'
        } else {
          switch (parseInt(r)) {
            case 1:
              imgName = ''
              break
            case 2:
              imgName = 'MR'
              break
            case 3:
              imgName = 'ER'
              break
            case 4:
              imgName = 'GR'
              break
            case 5:
              imgName = 'SR'
              break
            case 6:
              imgName = 'BR'
              break
          }
          imgName = imgName + num + '.png'
        }
      }
      imgUrl = imgUrl + imgName
      return imgUrl
    },
    getHead (pn, no, score, calcscore, head, count, haveas) {
      let imgUrl = 'http://img.wantuole.com/FIFA%E8%B6%B3%E7%90%83%E4%B8%96%E7%95%8C/players/'
      if (pn === '世界杯球员') {
        imgUrl = 'http://img.wantuole.com/FIFA%E8%B6%B3%E7%90%83%E4%B8%96%E7%95%8C/wcplayers/'
      }
      let num = 0
      let imgName = ''
      if (parseInt(haveas) === 1) {
        if (parseInt(score) >= 80) {
          if (calcscore) imgName = no + '_AS' + calcscore + '.png'
          else imgName = no + '_AS.png'
        } else {
          imgName = no + '.png'
        }
      } else {
        if (head === 'TOTW') {
          if (score) {
            imgName = no + '_' + head + calcscore + '.png'
          } else {
            imgName = no + '_' + head + '.png'
          }
        } else {
          if (parseInt(count) > 1) {
            num = parseInt((parseInt(score) - calcscore) / 10)
            if (head === 'IC' || head === 'PI') {
              if (num === 0) num = 1
            }
            if (num > count) num = count
            imgName = no + '_' + head + num + '.png'
          } else {
            if (head) {
              if (parseInt(score) >= 80) {
                imgName = no + '_' + head + '.png'
                if (head === 'MM') {
                  if (score >= 100) {
                    imgName = no + '_L' + head + '.png'
                  }
                }
              } else {
                if (calcscore === -1) {
                  imgName = no + '_' + head + '.png'
                } else {
                  imgName = no + '.png'
                }
              }
            } else imgName = no + '.png'
          }
        }
      }
      imgUrl = imgUrl + imgName
      return imgUrl
    },
    clearAll () {
      this.playerName = ''
      this.quality = ''
      this.location = ''
      this.country = ''
      this.country = ''
      this.height = ''
      this.minScore = ''
      this.maxScore = ''
      this.league = ''
      this.foots = ''
      this.team = ''
      this.activity = ''
      this.talent = ''
      this.sort = ''
      this.hideFeature = ''
      this.playerInfo = []
      this.level = ''
    },
    deletePlayer (index) {
      this.playerArr.splice(index, 1)
      this.stackOptions.legend.data.splice(index, 1)
      this.stackOptions.series.splice(index, 1)
      // this.radarOptions.legend.data.splice(index, 1)
      this.radarOptions.series[0].data.splice(index, 1)
      this.count--
      this.$nextTick(() => {
        this.$refs.myLine.dataRefresh()
        this.$refs.myRadar.drawRadar()
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
      // this.radarOptions.legend.data[index] = name
      this.radarOptions.series[0].data[index].name = name
      this.radarOptions.series[0].data[index].value = this.computedBasicAbility(values, this.playerArr[index].jobCode)
      this.$refs.myRadar.drawRadar()
      this.$refs.myLine.dataRefresh()
    },
    getInfo (code) {
      this.count++
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
            this.playerArr.push(obj)
            this.stackOptions.legend.data.push(name)
            this.stackOptions.series.push({
              name: name,
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'right'
                }
              },
              data: res.data.capabilityValues.extend
            })
            let radarItem = {
              value: this.computedBasicAbility(res.data.capabilityValues.extend, res.data.basicInfo.jobCode),
              name: obj.newScore + '-' + res.data.name
            }
            // this.radarOptions.legend.data.push(obj.newScore + '-' + res.data.name)
            this.radarOptions.series[0].data.push(radarItem)
            this.$nextTick(() => {
              this.$refs.myLine.createGraph()
              this.$refs.myRadar.drawRadar()
            })
          })
        }
      })
    }
  },
  components: {
    myLine,
    myRadar,
    CmpSearch
  }
}
</script>

<style lang="less" scoped>
.container{
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}
.cmp{
  padding-top: 40px;
  .bg{
    background: url('../assets/bg_repeat.png');
    padding: 20px 0;
  }
  .header{
    height: 120px;
    color: #fff;
    background-color:#181818;
    background-image: url('../assets/header_bg.png');
    background-repeat: no-repeat;
    background-size: 80px 120px;
    background-position: 60px;
    h1{
      line-height: 120px;
    }
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
  .content{
    display: flex;
    .left{
      flex: 2;
      border: 1px solid #ddd;
      border-top: 3px solid #940000;
      box-shadow: 3px 3px 5px #ccc;
      background-color: #2a2b2f;
      padding: 20px;
      .list{
        display: flex;
        justify-content: center;
        .item{
          text-align: center;
          margin: 0 10px;
          padding: 10px;
          box-shadow: 0 0 5px #fff;
          .bgImg{
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            img{
              width: 100px;
            }
          }
          .name{
            margin: 5px 0;
            color: #fff;
          }
          .trainP,.talentP{
            margin: 5px;
          }
        }
      }
    }
    .right{
      flex: 1;
      border: 1px solid #ddd;
      border-top: 3px solid #940000;
      box-shadow: 3px 3px 5px #ccc;
      padding: 10px;
      background-color: #fff;
      margin-left: 15px;
      .query{
        display: flex;
        align-items: center;
        font-size: 12px;
        margin: 10px 0;
        span{
          display: inline-block;
          line-height: 28px;
          width: 80px;
          padding-right: 10px;
          text-align: right;
        }
        .queryLeft{
          display: flex;
          flex: 1;
          div{
            flex: 1;
          }
        }
        .queryRight{
          display: flex;
          flex: 1;
        }
      }
      .btns{
        font-size: 14px;
        text-align: center;
        button{
          color: #940000;
          margin: 0 10px;
        }
      }
    }
  }
  #line{
    margin-top: 10px;
    padding-top: 10px;
    width: 500px;
    height: 500px;
    border: 1px solid #ddd;
    border-top: 3px solid #940000;
    background-color: #fff;
    box-shadow: 3px 3px 5px #ccc;
  }
  .radarWrapper{
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #2a2b2f;
    width: 670px;
    height: 510px;
    padding: 0 10px;
    border-top: 3px solid #940000;
    display: flex;
    justify-content: center;
    align-items: center;
    #radar{
      width: 250px;
      height: 250px;
    }
    .numPanel{
      flex: 1;
      height: 300px;
      margin-left: 10px;
      padding: 10px;
      border-left: 1px solid #333;
      display: flex;
      justify-content: center;
      align-items: center;
      ul{
        width: 105px;
        color: #fff;
        overflow: hidden;
        padding: 0 15px;
        li{
          list-style: none;
          padding: 5px 0;
          .attrName{
            display: inline-block;
            width: 60px;
            line-height: 30px;
            overflow: hidden;
          }
          &.title{
            overflow: hidden;
            white-space: nowrap;
            text-align: center;
            line-height: 60px;
          }
          span{
            vertical-align: middle;
          }
          .num{
            display: inline-block;
            width: 30px;
            text-align: center;
            line-height: 30px;
            font-weight: bolder;
            box-shadow: 0 0 5px #fff;
          }
        }
      }
    }
  }
}
</style>
