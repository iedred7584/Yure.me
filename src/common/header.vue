<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark fixed-top" id="mainNav">
    <div class="container">
      <router-link to="/" class="navbar-brand">揺れ見 &nbsp; - &nbsp; Yure.me</router-link>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/quake">
            <button class="btn btn-primary pc">最新の地震情報</button>
            <button class="btn btn-primary sp">最新</button>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/history">
            <button class="btn btn-warning pc">履 歴</button>
            <button class="btn btn-warning sp">履歴</button>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
#mainNav {
  z-index: 98;
}

li {
  margin-left: 20px;
}

.nav-link {
  padding: 0;
}

.btn {
  margin: 0;
  padding: 0 12px;
  height: 35px;
  line-height: 35px;
}

.sp {
  display: none;
}

@media screen and (max-width: 1050px), screen and (max-height: 830px) {
  .pc {
    display: none;
  }

  .sp {
    display: inline-block;
  }
}
</style>
