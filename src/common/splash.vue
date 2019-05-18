<template>
  <div id="splash">
    <div id="splash_line" style="top:calc(50% - 80px)"></div>
    <div id="splash_box">
      <img id="splash_logo" src="../assets/logo.png">
      <div class="splash_loading">
        <span class="dot1" style="animation-delay: 0.2s;"></span>
        <span class="dot2" style="animation-delay: 0.1s;"></span>
        <span class="dot3" style="animation-delay: 0.0s;"></span>
        <span class="dot4" style="animation-delay: -0.1s;"></span>
        <span class="dot5" style="animation-delay: -0.2s;"></span>
      </div>
    </div>
    <div id="splash_line" style="top:calc(50% + 80px)"></div>
  </div>
</template>

<style>
#splash {
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  background-color: #26547c;
  z-index: 99;
}

#splash_box {
  text-align: center;
}

#splash_logo {
  margin: 0 auto;
  width: 70%;
  max-width: 400px;
}

#splash_loading {
  width: 50px;
}

#splash_line {
  position: fixed;
  width: 100%;
  height: 1px;
  left: 0;
  border-top: solid 2px #ffffff;
}

.splash_loading {
  display: flex;
  padding-top: 15px;
  width: 100vw;
  justify-content: center;
  align-items: center;
}

.splash_loading span {
  opacity: 0;
  animation: dot 3s cubic-bezier(0.0, 0.8, 1.0, 0.2) infinite, dot_fade 1.5s ease infinite alternate;
}

.splash_loading .dot1:after, .splash_loading .dot2:after, .splash_loading .dot3:after, .splash_loading .dot4:after, .splash_loading .dot5:after {
  display: block;
  width: 20px;
  height: 20px;
  content: "";
  border-radius: 50%;
}

.splash_loading .dot1:after {
  background-color: #8ceb18;
}

.splash_loading .dot2:after {
  background-color: #ffff00;
}

.splash_loading .dot3:after {
  background-color: #ff972f;
}

.splash_loading .dot4:after {
  background-color: #ff4444;
}

.splash_loading .dot5:after {
  background-color: #ea0000;
}

@keyframes dot {
  5% {
    transform: translateX(-500px);
  }

  95% {
    transform: translateX(500px);
  }
}

@keyframes dot_fade {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
