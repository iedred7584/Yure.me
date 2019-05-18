<template>
  <div id="earthquake">
    <transition name="fade" mode="out-in">
      <div class="box" v-show="isVisible">
        <div class="information">
          <div class="container">
            <div class="row infos">
              <div class="col-lg-6 col-md-12 info"><div class="kind">発生時刻</div>{{origintime}}</div>
              <div class="col-lg-6 col-md-12 info"><div class="kind">震源地</div>{{hypocenter}}</div>
              <div class="col-lg-6 col-md-12 info"><div class="kind">最大震度</div>{{maxint}}</div>
              <div class="col-lg-6 col-md-12 info"><div class="kind">緯度 / 経度</div>{{latlon}}</div>
              <div class="col-lg-6 col-md-12 info"><div class="kind">マグニチュード</div>{{magnitude}}</div>
              <div class="col-lg-6 col-md-12 info"><div class="kind">震源の深さ</div>{{depth}}</div>
              <div class="col-lg-12 col-md-12 info"><div class="kind">情報</div>{{comment}}</div>
            </div>
          </div>
        </div>
        <div class="map">
          <a :href="imgsrc" class="map--img">
            <img :src="imgsrc" alt="地震マップ">
          </a>
        </div>
        <div class="intensities">
          <p class="intensitylist" v-html="list"></p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
var v

export default {
  data () {
    return {
      origintime: '読み込み中.....',
      hypocenter: '読み込み中.....',
      maxint: '読み込み中.....',
      latlon: '読み込み中.....',
      magnitude: '読み込み中.....',
      depth: '読み込み中.....',
      comment: '読み込み中.....',
      imgsrc: '',
      list: '読み込み中.....',
      isVisible: true
    }
  },
  mounted () {
    v = this
    quake(this.$route.params.id, 0)
  },
  watch: {
    '$route' (to, from) {
      quake(to.fullPath, 1)
    }
  }
}

async function quake (s, i) {
  if (i === 1) v.isVisible = false
  await wait(0.2)
  axios
    .get('https://api.yure.me/' + (typeof s === 'undefined' || s === '/quake' ? 'latest.json' : '/histories/' + s + '.json'))
    .then((response) => {
      var quake = response.data.Earthquake
      var com = ''
      var p = ''
      var pidx = 0
      var prefs = []
      var points = []
      var intensities = ['7', '6+', '6-', '5+', '5-', '4', '3', '2', '1']

      quake.Informations.forEach(element => { com += element.Text })
      quake.Intensity.Pref.forEach(e => {
        prefs[pidx++] = e.Name
        points[e.Name] = []
        var index = { '1': 0, '2': 0, '3': 0, '4': 0, '5-': 0, '5+': 0, '6-': 0, '6+': 0, '7': 0 }
        e.Area.forEach(ee => {
          ee.City.forEach(eee => {
            if (typeof points[e.Name][eee.Int] === 'undefined') points[e.Name][eee.Int] = []
            points[e.Name][eee.Int][index[eee.Int]++] = eee.Name
          })
        })
      })
      prefs.forEach(pref => {
        p += '<div class="line"></div><span class="pref">【' + pref + '】</span>'
        intensities.forEach(intensity => {
          if (intensity in points[pref]) {
            p += '<br>' + Intensity2JMA(intensity) + ': '
            points[pref][intensity].forEach(point => { p += point + ' ' })
          }
        })
      })
      p += '<div class="line"></div>'

      v.origintime = String2DateTime(quake.OriginTime)
      v.hypocenter = quake.Hypocenter.Name
      v.maxint = Intensity2JMA(quake.Intensity.MaxInt)
      v.latlon = quake.Hypocenter.Coordinate.split(',')[0] + ' / ' + quake.Hypocenter.Coordinate.split(',')[1]
      v.magnitude = quake.Hypocenter.Magnitude
      v.depth = quake.Hypocenter.Depth
      v.comment = com
      v.imgsrc = 'https://api.yure.me/img/' + quake.ID + '.png'
      v.list = p
    })
    .catch((reason) => {})

  v.isVisible = true
}

function Intensity2JMA (s) {
  switch (s) {
    case '1': return '震度1'
    case '2': return '震度2'
    case '3': return '震度3'
    case '4': return '震度4'
    case '5-': return '震度5弱'
    case '5+': return '震度5強'
    case '6-': return '震度6弱'
    case '6+': return '震度6強'
    case '7': return '震度7'
  }
}

function String2DateTime (value) {
  var date = new Date(value)
  var yy = date.getFullYear()
  var MM = ('00' + (date.getMonth() + 1)).slice(-2)
  var dd = ('00' + date.getDate()).slice(-2)
  var HH = ('00' + date.getHours()).slice(-2)
  var mm = ('00' + date.getMinutes()).slice(-2)
  var ss = ('00' + date.getSeconds()).slice(-2)
  return yy + '/' + MM + '/' + dd + ' ' + HH + ':' + mm + ':' + ss
}

const wait = (sec) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, sec * 1000)
  })
}
</script>

<style>
.information {
  padding: 10px;
  width: 70%;
  height: 20%;
  background-color: #ffffff;
}

.map {
  position: relative;
  display: flex;
  margin-top: 10px;
  padding: 10px;
  width: 70%;
  height: calc(80% - 10px);
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

.map--img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.map--img img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.intensities {
  position: absolute;
  margin-left: 70%;
  padding: 10px;
  width: calc(30% - 20px);
  height: calc(100% - 20px);
  top: 10px;
  overflow-x: auto;
  background-color: #ffffff;
}

.intensitylist {
  font-size: 20px;
}

.pref {
  margin-left: 20px;
  font-weight: bold;
}

.line {
  margin: 20px auto;
  width: 97%;
  height: 1px;
  border-top: 1px solid #323232;
}

.infos {
  height: 100%;
}

.info {
  display: flex;
  height: 25%;
  align-items: center;
  font-size: 18px;
}

.kind {
  display: inline-block;
  margin-right: 10px;
  padding: 0 10px;
  background-color: #ff5e5e;
  color: #ffffff;
  font-weight: bold;
  border-radius: 10px;
}

.container {
  padding: 0 30px;
  height: 100%;
}

@media screen and (max-width: 1200px) {
  .intensitylist, .info {
    font-size: 16px;
  }
}

@media screen and (max-width: 1050px), screen and (max-height: 830px) {
  .information, .map, .intensities {
    display: block;
    position: static;
    margin: 0 0 10px 0;
    width: 100%;
    height: auto;
  }

  .info {
    display: block;
    text-align: center;
  }

  .kind {
    display: block;
    margin: 10px 0;
  }
}
</style>
