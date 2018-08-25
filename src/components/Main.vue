<template>
  <transition name="fade">
    <div class="mainPage" >
      <slot name="title"></slot>
      <slot name="btn" class="searchIcon"></slot>
      <transition name="slide-fade">
        <div v-show="toggleStatus" class="top">
          <div class="query">
            <div class="queryLeft">
              <span>中文/英文名</span>
              <el-input v-model="playerName" placeholder="请输入内容"></el-input>
            </div>
            <div class="queryRight">
              <span>品质</span>
              <el-select clearable placeholder="请选择品质" v-model="quality">
                <el-option v-for="(item,key) in qualityArr" :key="key" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
          <div class="query">
            <div class="queryLeft">
              <span>身高</span>
              <el-input v-model="height" placeholder="请输入内容"></el-input>
            </div>
            <div class="queryRight">
              <span>位置</span>
              <el-select clearable placeholder="请选择位置" v-model="location">
                <el-option v-for="(item,key) in locationArr" :key="key" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
          <div class="query">
            <div class="queryLeft">
              <span>最小评分</span>
              <el-input v-model="minScore" placeholder="请输入内容"></el-input>
            </div>
            <div class="queryRight">
              <span>国家</span>
              <el-select clearable placeholder="请选择国家" v-model="country">
                <el-option v-for="(item,key) in countryArr" :key="key" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
          <div class="query">
            <div class="queryLeft">
              <span>最大评分</span>
              <el-input v-model="maxScore" placeholder="请输入内容"></el-input>
            </div>
            <div class="queryRight">
              <span>联赛</span>
              <el-select clearable placeholder="请选择联赛" v-model="league">
                <el-option v-for="(item,key) in leagueArr" :key="key" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
          <div class="query">
            <div class="queryLeft">
              <span>常用脚</span>
              <div style="width: 100%">
                <el-select clearable placeholder="请选择常用脚" v-model="foots">
                  <el-option v-for="(item,key) in footsArr" :key="key" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
            <div class="queryRight">
              <span>球队</span>
              <el-select clearable placeholder="请选择球队" v-model="team">
                <el-option v-for="(item,key) in teamArr" :key="key" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
          <div class="query">
            <div class="queryLeft">
              <span>活动</span>
              <div style="width: 100%">
                <el-select clearable placeholder="请选择活动" v-model="activity">
                  <el-option v-for="(item,key) in activityArr" :key="key" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
            <div class="queryRight">
              <span>天赋</span>
              <el-select clearable placeholder="请选择天赋" v-model="talent">
                <el-option v-for="(item,key) in talentArr" :key="key" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
          <div class="query">
            <div class="queryLeft">
              <span>输入等级</span>
              <el-input v-model="level" placeholder="请输入等级"></el-input>
            </div>
            <div class="queryRight">
              <span>隐藏特性</span>
              <div>
                <el-select clearable placeholder="请选择特性" v-model="hideFeature">
                  <el-option v-for="(item,key) in hideFeatureArr" :key="key" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="btns">
            <el-button icon="el-icon-search" type="primary" @click="getlistInfo(1, true)">查询</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="clearAll">清空</el-button>
            <!--<div class="sort">-->
            <!--<span style="padding-left: 40px">排序选择</span>-->
            <!--<el-select clearable v-model="sort" placeholder="请选择">-->
            <!--<el-option-group-->
            <!--v-for="group in attrArr"-->
            <!--:key="group.label"-->
            <!--:label="group.label">-->
            <!--<el-option-->
            <!--v-for="item in group.options"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
            <!--</el-option>-->
            <!--</el-option-group>-->
            <!--</el-select>-->
            <!--</div>-->
          </div>
        </div>
      </transition>
      <div class="header">
        <div  @click="scoreSort">评分<i class="el-icon-d-caret"></i></div>
        <div class="name">基本信息</div>
        <div class="position" @click="basicPropertySort">基本属性<i class="el-icon-d-caret"></i></div>
        <div class="activity" @click="descPropertySort">详细属性<i class="el-icon-d-caret"></i></div>
      </div>
      <scroll ref="scroll" :class="[toggleStatus ? 'contentShort' : 'content']" :data="playerInfo" :pullup="true" @scrollEnd="addMore" :enable="startScroll" :disable="stopScroll">
        <ul style="padding-bottom: 34px">
          <li v-for="(item,index) in playerInfo" :key="index" @click="jumpDesc(item.code)">
            <div class="left" :style="{backgroundImage: `url(${item.bg})`,backgroundRepeat:'no-repeat'}"><img :src="item.url" alt=""></div>
            <div class="right">
              <p>{{item.level}}</p>
              <div class="basicInfo">
                <p>{{item.name}} | {{item.location}}</p>
                <p>{{item.activity}}</p>
              </div>
              <p>{{item.basicTotal}}</p>
              <p>{{item.detailTotal}}</p>
            </div>
          </li>
        </ul>
      </scroll>
      <div class="loading" v-show="loadFlag"><img src="../assets/loading.svg" alt="" width="50"></div>
    </div>
  </transition>
</template>

<script>
import {
  getList,
  getTeamInfo,
  getTalentInfo,
  getProgramInfo,
  getLeagueInfo,
  getNationInfo} from '@/api/api'
import Scroll from '@/components/scroll'
export default {
  props: {
    searchType: {
      type: String,
      default: 'search'
    }
  },
  data () {
    return {
      loadFlag: false,
      addMoreFlag: true,
      stopScroll: false,
      threeToggleFlag: 1,
      startScroll: true,
      toggleStatus: false,
      scoreSortFlag: false,
      basicPropertySortFlag: true,
      descPropertySortFlag: true,
      page: '1',
      level: '',
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
      height: '',
      maxScore: '',
      minScore: '',
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
      attrArr: [{
        label: '主要属性',
        options: [{
          value: '1',
          label: '步频/门将扑球'
        }, {
          value: '2',
          label: '射门/门将站位'
        }]
      }, {
        label: '详细属性',
        options: [{
          value: '冲刺速度',
          label: '冲刺速度'
        }, {
          value: '加速',
          label: '加速'
        }, {
          value: '力量',
          label: '力量'
        }, {
          value: '控球',
          label: '控球'
        }]
      }],
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
      sort: '',
      flag: true,
      playerInfo: []
    }
  },
  created () {
    getList({page: this.page}).then(res => {
      if (res.status === 200) {
        res.data.forEach(item => {
          let obj = {
            code: item.code,
            name: item.name,
            bg: this.getBackground(item.basicInfo.programInfo.name, item.rarityValue, item.basicInfo.score, item.basicInfo.programInfo.havebackground, item.basicInfo.bg),
            url: this.getHead(item.basicInfo.programInfo.name, item.basicInfo.no, item.basicInfo.score, item.basicInfo.headcalcscore, item.basicInfo.head, item.basicInfo.headcount, item.basicInfo.havaas),
            level: item.basicInfo.score,
            location: item.basicInfo.job,
            activity: item.basicInfo.programInfo.name,
            basicTotal: this.sum(this.computedBasicAbility(item.capabilityValues.extend), item.basicInfo.jobCode),
            detailTotal: this.sum(item.capabilityValues.extend)
          }
          this.playerInfo.push(obj)
        })
      }
    })
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
    jumpDesc (code) {
      if (this.searchType === 'cmp') {
        this.$emit('code', code)
        return
      }
      this.$router.push({
        name: `PersonInfo`,
        query: {
          code: code
        }
      })
    },
    toggle () {
      this.toggleStatus = !this.toggleStatus
      setTimeout(() => {
        this.$refs.scroll.scroll.refresh()
      }, 20)
    },
    getlistInfo (page, click, scoreSort, sattNum) {
      if (click) {
        this.addMoreFlag = true
        this.playerInfo = []
      }
      if (!this.addMoreFlag) {
        this.$message.error('没有数据了')
        return
      }
      this.loadFlag = true
      this.page = page
      // n名字 r品质 j位置 nc国家 lc联赛 cc球队 pc活动 b天赋 h身高 f常用脚 ma最大评分 mi最小评分 t隐藏特性
      let params = {
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
        page: this.page,
        level: this.level,
        sorttype: scoreSort,
        satt: sattNum
      }
      getList(params).then(res => {
        if (res.status === 200) {
          if (!res.data.length) {
            this.addMoreFlag = false
            this.loadFlag = false
            this.$message.error('没有数据了')
            return
          }
          res.data.forEach(item => {
            let obj = {
              code: item.code,
              name: item.name,
              bg: this.getBackground(item.basicInfo.programInfo.name, item.rarityValue, item.basicInfo.score, item.basicInfo.programInfo.havebackground, item.basicInfo.bg),
              url: this.getHead(item.basicInfo.programInfo.name, item.basicInfo.no, item.basicInfo.score, item.basicInfo.headcalcscore, item.basicInfo.head, item.basicInfo.headcount, item.basicInfo.havaas),
              location: item.basicInfo.job,
              activity: item.basicInfo.programInfo.name,
              level: item.basicInfo.score,
              detailTotal: item.capabilityValuesSum,
              basicTotal: item.attribute.attributeSum
            }
            this.playerInfo.push(obj)
          })
          setTimeout(() => {
            this.$refs.scroll.scroll.refresh()
            this.loadFlag = false
          }, 20)
        } else {
          this.$message.error('网络错误')
          this.loadFlag = false
        }
      })
    },
    addMore () {
      this.page++
      if (this.threeToggleFlag === 1) {
        let flag = this.scoreSortFlag ? 1 : 0
        this.getlistInfo(this.page, false, flag)
        return
      }
      if (this.threeToggleFlag === 2) {
        let flag = this.basicPropertySortFlag ? 1 : 0
        this.getlistInfo(this.page, false, flag, 7)
        return
      }
      if (this.threeToggleFlag === 3) {
        let flag = this.descPropertySortFlag ? 1 : 0
        this.getlistInfo(this.page, false, flag, 8)
      }
    },
    sum (arr) {
      if (arr && arr.length) {
        let sum = 0
        for (let i = 0, length = arr.length; i < length; i++) {
          sum += parseInt(arr[i])
        }
        return sum
      }
      return 0
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
    scoreSort () {
      this.threeToggleFlag = 1
      this.scoreSortFlag = !this.scoreSortFlag
      let flag = this.scoreSortFlag ? 1 : 0
      this.getlistInfo(1, true, flag)
    },
    basicPropertySort () {
      this.threeToggleFlag = 2
      this.basicPropertySortFlag = !this.basicPropertySortFlag
      let flag = this.basicPropertySortFlag ? 1 : 0
      this.getlistInfo(1, true, flag, 7)
    },
    descPropertySort () {
      this.threeToggleFlag = 3
      this.descPropertySortFlag = !this.descPropertySortFlag
      let flag = this.descPropertySortFlag ? 1 : 0
      this.getlistInfo(1, true, flag, 8)
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
      this.scoreSortFlag = false
      this.basicPropertySortFlag = true
      this.descPropertySortFlag = true
      this.threeToggleFlag = 1
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped>
  .mainPage{
    background-color: #fff;
  }
  .searchIcon {
    position: absolute;
    width: 20px;
    height: 20px;
  }
  .mainPage .query{
    display: flex;
    font-size: 22px;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    justify-content: center;
   align-items: center;
  }
  .mainPage span{
    width: 220px;
    padding-right: 20px;
    text-align: right;
  }
  .mainPage .query .queryRight span {
    width: 80px;
  }
  .mainPage .queryLeft,.mainPage .queryRight{
    flex: 1;
    display: flex;
    align-items: center;
  }
  .mainPage .header{
    font-size: 25px;
    padding: 10px 20px 10px 90px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
  }
  .btns{
    display: flex;
    font-size: 22px;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  .btns .sort{
    display: flex;
    align-items: center;
  }
  .mainPage .header div{
    width: 200px;
    text-align: center;
  }
  .mainPage .content{
    position: absolute;
    top: 130px;
    width: 100%;
    height: calc(100% - 37px - 130px);
    overflow: hidden;
    background-color: #fff;
  }
  .mainPage .contentShort{
    position: absolute;
    width: 100%;
    height: calc(50% - 37px);
    overflow: hidden;
    background-color: #fff;
  }
  .mainPage li{
    display: flex;
    align-items: center;
    font-size: 10px;
    padding: 10px 10px;
    border-top: 2px solid #ddd;
    z-index: 99999;
  }
  .mainPage .left{
    background-size: contain;
  }
  .mainPage .left img{
    width: 120px;
    height: 120px;
    text-align: center;
  }
  .mainPage .right{
    display: flex;
    flex: 1;
    align-items: center;
    font-size: 25px;
    padding-left: 20px;
    padding-right: 10px;
  }
  .mainPage .right .basicInfo{
    width: 200px;
    margin-right: 30px;
  }
  .mainPage .right .basicInfo p{
    width: 100%;
  }
  .mainPage .right p{
    width: 130px;
    text-align: left;
  }
  .mainPage .btn button{
    color: #2c90ff;
    text-decoration: underline;
    border: 0px;
    background-color: transparent;
  }
  .loading{
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .loading img{
    position: absolute;
    bottom: 60%;
    left: 50%;
    transform: translateX(-50%);
  }
  .fade-enter-active, .fade-leave-active{
    transition: all 0.3s;
  }
  .fade-enter, .fade-leave-to {
   opacity: 0;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
