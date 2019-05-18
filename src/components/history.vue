<template>
  <div id="history">
    <div class="box">
      <div class="lists" v-html="list"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      list: '<div class="loading">読み込み中.....</div>'
    }
  },
  mounted () {
    axios
      .get('https://api.yure.me/history')
      .then((response) => {
        var list = ''
        response.data.histories.forEach(function (e, index) {
          list += '<a href="/archive/' + e.ID + '"><div class="list' + (index % 2 === 0 ? '_' : '') + '"><div class="text">ID: ' + e.ID + ' / 震源地: ' + e.Hypocenter + ' / 最大震度' + e.MaxInt + ' / ' + e.Magnitude + '</div></div></a>'
        })
        this.list = list
      })
      .catch((reason) => { })
  }
}
</script>

<style>
.box {
  padding-top: 10px;
  overflow-x: auto;
}

.loading {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
  background-color: #b8b8b8;
}

.list, .list_ {
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  font-size: 24px;
  text-align: center;
  color: #000000;
  background-color: #ffffff;
}

.list_ {
  background-color: #f3f3f3;
}

@media screen and (max-width: 1050px), screen and (max-height: 830px) {
  .list, .list_ {
    font-size: 18px;
  }
}
</style>
