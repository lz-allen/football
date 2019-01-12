<template>
  <div class="home">
    <div class="header">
      <div class="container">
        <h1>球员列表</h1>
      </div>
    </div>
    <nav-bar @isClick="isClick"></nav-bar>
    <div class="bg">
      <div class="bg_container">
        <div class="left">
          <player-content :playerName="playerName" @sortFlagType="sortFlagType" @search="search" @clearALl="clearALl" :playerInfo="playerInfo" :tagArr="tagArr"></player-content>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[20, 30, 40, 50]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
        <div class="right">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/navBar'
import PlayerContent from '@/components/playerContent'
import {getList} from '@/api/api'
import {getBackground, getHead, storage} from '@/util/util'
export default {
  components: {
    navBar,
    PlayerContent
  },
  props: {},
  data () {
    return {
      playerInfo: [],
      tagArr: [],
      playerName: {name: ''},
      currentPage: 1,
      pageSize: 20,
      total: 1000,
      scoreFlag: -1,
      bPFlag: 1,
      sMFlag: 1,
      cQFlag: 1,
      lHFlag: 1,
      fSFlag: 1,
      tGFlag: 1,
      countFlag: 1,
      detalCountFlag: 1
    }
  },
  watch: {},
  computed: {},
  methods: {
    _getList (num) {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        n: this.playerName.name,
        r: storage.getSession('r') && storage.getSession('r').value,
        j: storage.getSession('j') && storage.getSession('j').value,
        nc: storage.getSession('nc') && storage.getSession('nc').value,
        lc: storage.getSession('lc') && storage.getSession('lc').value,
        cc: storage.getSession('cc') && storage.getSession('cc').value,
        pc: storage.getSession('pc') && storage.getSession('pc').value,
        b: storage.getSession('b') && storage.getSession('b').value,
        f: storage.getSession('f') && storage.getSession('f').value,
        t: storage.getSession('t') && storage.getSession('t').value
      }
      if (num) {
        switch (num) {
          case 1:
            this.scoreFlag === 1 ? this.scoreFlag = -1 : this.scoreFlag = 1
            params['scoreFlag'] = this.scoreFlag
            break
          case 2:
            this.bPFlag === 1 ? this.bPFlag = -1 : this.bPFlag = 1
            params['bPFlag'] = this.bPFlag
            break
          case 3:
            this.sMFlag === 1 ? this.sMFlag = -1 : this.sMFlag = 1
            params['sMFlag'] = this.sMFlag
            break
          case 4:
            this.cQFlag === 1 ? this.cQFlag = -1 : this.cQFlag = 1
            params['cQFlag'] = this.cQFlag
            break
          case 5:
            this.lHFlag === 1 ? this.lHFlag = -1 : this.lHFlag = 1
            params['lHFlag'] = this.lHFlag
            break
          case 6:
            this.fSFlag === 1 ? this.fSFlag = -1 : this.fSFlag = 1
            params['fSFlag'] = this.fSFlag
            break
          case 7:
            this.tGFlag === 1 ? this.tGFlag = -1 : this.tGFlag = 1
            params['tGFlag'] = this.tGFlag
            break
          case 8:
            this.countFlag === 1 ? this.countFlag = -1 : this.countFlag = 1
            params['countFlag'] = this.countFlag
            break
          case 9:
            this.detalCountFlag === 1 ? this.detalCountFlag = -1 : this.detalCountFlag = 1
            params['detalCountFlag'] = this.detalCountFlag
            break
        }
      }
      getList(params).then(res => {
        if (res.status === 200) {
          let arr = []
          this.total = res.data.total
          res.data.list.forEach(item => {
            let obj = {
              code: item.code,
              name: item.name,
              bg: getBackground(item.basicInfo.programInfo.name, item.rarityValue, item.basicInfo.score, item.basicInfo.programInfo.havebackground, item.basicInfo.bg),
              url: getHead(item.basicInfo.programInfo.name, item.basicInfo.no, item.basicInfo.score, item.basicInfo.headcalcscore, item.basicInfo.head, item.basicInfo.headcount, item.basicInfo.havaas),
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
    sortFlagType (num) {
      this._getList(num)
    },
    handleSizeChange (val) {
      this.pageSize = val
      this._getList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this._getList()
    },
    search () {
      this._getList()
    },
    isClick () {
      let type = ['success', 'info', 'warning', 'danger']
      this.tagArr = storage.getAll().map((item, index) => {
        return {
          key: item.key,
          name: item.value,
          type: type[index]
        }
      })
    },
    clearALl () {
      this.tagArr = []
    }
  },
  created () {
    this._getList()
    this.isClick()
  },
  mounted () {}
}

</script>
<style lang="less" scoped>
  .container{
    max-width: 1200px;
    margin: 0 auto;
  }
  .home {
    padding-top: 40px;
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
    .bg{
      background: url('../assets/bg_repeat.png');
      .bg_container{
        display: flex;
        max-width: 1200px;
        margin: 0 auto;
        padding: 30px 0;
      }
      .left{
        flex: 2;
        border-top: 3px solid #940000;
        box-shadow: 3px 3px 5px #ccc;
        background-color: #fff;
        padding: 20px;
      }
      .right{
        flex: 1;
      }
    }
  }
</style>
