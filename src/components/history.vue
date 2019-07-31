<template>
  <div id="history">
    <div class="box">
      <div class="loading" v-if="isLoading">読み込み中...</div>
      <div class="lists" v-for="(e, i) in Histories" :key="i">
        <router-link :to="{ name : 'Archive', params : { id: e.ID }}">
          <div :class="i % 2 === 0 ? 'list_' : 'list'">
            <div class="text">ID:{{e.ID}} / 震源地: {{e.Hypocenter}} / 最大震度 {{e.MaxInt}} / {{e.Magnitude}}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isLoading: true,
      Histories: []
    }
  },
  mounted() {
    axios.get("https://api.yure.me/history").then(response => {
      this.isLoading = false
      this.Histories = response.data.histories
      console.log("ok " + this.isLoading)
    })
  }
}
</script>

<style>
.box {
  padding-top: 10px;
  padding-bottom: 0;
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

.list,
.list_ {
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
  .list,
  .list_ {
    font-size: 18px;
  }
}
</style>
