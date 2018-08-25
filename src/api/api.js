import axios from 'axios'

// function getList (page) {
//   return axios.get('/api/playerList', {
//     params: {
//       page: page,
//       _: new Date().getTime()
//     }
//   })
// }

function getPersonDetail (code) {
  return axios.get('/api/api/fifamobile/card/detail', {
    params: {
      code: code,
      _: new Date().getTime()
    }
  })
}

function getTrainData (code, level) {
  return axios('http://api.wantuole.com/api/levelup/list', {
    params: {
      gameCode: 'fifamobile',
      type: '1',
      code: code,
      level: level,
      _: new Date().getTime()
    }
  })
}

function getTalentData (code) {
  return axios.get('http://api.wantuole.com/api/levelup/list', {
    params: {
      gameCode: 'fifamobile',
      type: '2',
      code: code,
      level: '0',
      _: new Date().getTime()
    }
  })
}

function getTrainNumVal (level) {
  return axios.get('/api/api/levelup/list', {
    params: {
      gameCode: 'fifamobile',
      type: '3',
      code: 'training',
      level: level,
      _: new Date().getTime()
    }
  })
}

function getTalentNumVal () {
  return axios.get('api/api/levelup/list', {
    params: {
      gameCode: 'fifamobile',
      type: '3',
      code: 'boost',
      level: '0',
      _: new Date().getTime()
    }
  })
}

// 条件查询页面
// 查询
// n名字 r品质 j位置 nc国家 lc联赛 cc球队 pc活动 b天赋 h身高 f常用脚 ma最大评分 mi最小评分
function getList (obj) {
  let params = {
    '1': 1,
    v: 1,
    page: 1,
    _: new Date().getTime()
  }
  Object.keys(obj).forEach(key => {
    if (obj[key] !== '') {
      console.log(obj[key])
      params[key] = obj[key]
    }
  })
  return axios.get('api/api/fifa/list2', {
    params: params
  })
}
// 球队信息
function getTeamInfo () {
  return axios.get('http://api.wantuole.com/api/club/list', {
    params: {
      gameCode: 'fifamobile',
      _: new Date().getTime()
    }
  })
}
// 天赋信息
function getTalentInfo () {
  return axios.get('http://api.wantuole.com/api/skill/list', {
    params: {
      gameCode: 'fifamobile',
      _: new Date().getTime()
    }
  })
}
// 活动信息
function getProgramInfo () {
  return axios.get('http://api.wantuole.com/api/program/list', {
    params: {
      gameCode: 'fifamobile',
      _: new Date().getTime()
    }
  })
}
// 联赛信息
function getLeagueInfo () {
  return axios.get('http://api.wantuole.com/api/league/list', {
    params: {
      _: new Date().getTime()
    }
  })
}
// 国家信息
function getNationInfo () {
  return axios.get(' http://api.wantuole.com/api/nation/list', {
    params: {
      _: new Date().getTime()
    }
  })
}

export {
  getPersonDetail,
  getTrainData,
  getTalentData,
  getTrainNumVal,
  getTalentNumVal,
  getList,
  getTeamInfo,
  getTalentInfo,
  getProgramInfo,
  getLeagueInfo,
  getNationInfo
}
