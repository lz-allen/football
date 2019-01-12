function getHead (pn, no, score, calcscore, head, count, haveas) {
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
}

function getBackground (pn, r, score, hb, bg) {
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
}

const storage = {
  setSession (key, value) {
    typeof value === 'object' ? window.sessionStorage.setItem(key, JSON.stringify(value)) : window.sessionStorage.setItem(key, value)
  },
  getSession (key) {
    let result
    try {
      result = JSON.parse(window.sessionStorage.getItem(key))
    } catch (error) {
      result = window.sessionStorage.getItem(key)
    }
    return result
  },
  getAll () {
    let arr = []
    for (var i = 0, len = window.sessionStorage.length; i < len; i++) {
      let key = window.sessionStorage.key(i)
      let value = this.getSession(key)
      arr.push({key: key, value: value})
    }
    return arr
  },
  clearOneSession (key) {
    window.sessionStorage.removeItem(key)
  },
  clearAll () {
    window.sessionStorage.clear()
  }
}

export {
  getHead,
  getBackground,
  storage
}
