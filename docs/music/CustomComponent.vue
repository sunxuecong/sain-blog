<template>
  <div class="paly-song-container">
    <div class="song">
      <div class="left">
        <div class="left-top">
          <img class="play-bar-support" src="./image/play-bar-support.png" />
          <img
            :class="{ playing }"
            class="play-bar"
            src="./image/play-bar.png"
          />
          <div class="img-outer-border" ref="disc">
            <div
              :class="{ paused: !playing }"
              class="img-outer"
              ref="discRotate"
            >
              <div class="img-wrap">
                <img :src="genImgUrl(currentSong.img, 400)" />
              </div>
            </div>
          </div>
        </div>
        <div class="progress-bar-container">
          <div class="schedule">
            {{ formatTime(currentTime) }} /
            {{ formatTime(currentSong.duration / 1000) }}
          </div>
          <ProgressBar
            :percent="playedPercent"
            @percentChange="onProgressChange"
          />
        </div>
        <div class="control">
          <img :src="share" alt="" />
          <img @click="togglePlaying" v-show="!playing" :src="playImg" alt="" />
          <img @click="togglePlaying" v-show="playing" :src="pauseImg" alt="" />
          <img :src="lyricImg" alt="" class="lyric-show" @click="showLyric" />
          <!-- 播放时间：{{ currentTime }} -->
        </div>
        <audio
          :src="currentSong.url"
          @canplay="ready"
          @ended="end"
          @timeupdate="updateTime"
          ref="audio"
        ></audio>
      </div>
      <div class="right">
        <div class="name-wrap">
          <p class="name">{{ currentSong.name }}</p>
        </div>
        <div class="desc">
          <div class="desc-item">
            <span class="label">歌手：</span>
            <div class="value">{{ currentSong.artistsText }}</div>
          </div>
        </div>

        <div class="name-wrap is-mobie" @click="showCover"> 
          <p class="name">{{ currentSong.name }}</p>
        </div>
        <div class="desc is-mobie" @click="showCover">
          <div class="desc-item">
            <span class="label">歌手：</span>
            <div class="value">{{ currentSong.artistsText }}</div>
          </div>
        </div>

        <empty v-if="nolyric">还没有歌词哦~</empty>
        <Scroller
          :data="lyric"
          :options="{ disableTouch: false }"
          @init="onInitScroller"
          class="lyric-wrap"
          ref="scroller"
          v-else
        >
          <div class="lyric-item-continer">
            <div
              :class="getActiveCls(index)"
              :key="index"
              class="lyric-item"
              ref="lyric"
              v-for="(l, index) in lyricWithTranslation"
            >
              <p
                :key="contentIndex"
                class="lyric-text"
                v-for="(content, contentIndex) in l.contents"
              >
                {{ content }}
              </p>
            </div>
          </div>
        </Scroller>
      </div>
    </div>
  </div>
</template>

<script>
import lyricImg from "./image/lyricImg.svg";
import playImg from "./image/play.svg";
import pauseImg from "./image/pause.svg";
import share from "./image/share.svg";
import lyricParser from "./utils/lrcparse.js";
function isDef(v) {
  return v !== undefined && v !== null;
}
import Scroller from "./Scroller.vue";
import empty from "./empty.vue";
import ProgressBar from "./ProgressBar.vue";
import { getLyric } from "./api/song.js";
// import { Button } from 'element-ui';
const WHEEL_TYPE = "wheel";
const SCROLL_TYPE = "scroll";
// 恢复自动滚动的定时器时间
const AUTO_SCROLL_RECOVER_TIME = 500;

export default {
  name: "CustomComponent",
  components: { empty, Scroller ,ProgressBar},
  props: {
    currentSong:{
      type:Object,
      required: false,
    }
  },
  created() {
    this.lyricScrolling = {
      [WHEEL_TYPE]: false,
      [SCROLL_TYPE]: false,
    };
    this.lyricTimer = {
      [WHEEL_TYPE]: null,
      [SCROLL_TYPE]: null,
    };
  },
  data() {
    return {
      lyricImg,
      playImg,
      pauseImg,
      share,
      lyric: [],
      nolyric: true,
      // 当前播放歌曲
      // currentSong: {
      //   id: 1974444808,
      //   name: "小行迹",
      //   img: "https://p1.music.126.net/9bVOooAY6U6EJLzpv1Fikw==/109951169682871673.jpg",
      //   artists: [{ id: 6731, name: "赵雷", tns: [], alias: [] }],
      //   duration: 277493,
      //   albumName: "署前街少年",
      //   url: "https://music.163.com/song/media/outer/url?id=1974444808.mp3",
      //   artistsText: "赵雷",
      //   durationSecond: 277.493,
      //   mvId: 0,
      // },
      // 当前播放时长
      currentTime: 0,
      // 播放状态
      playing: false,
      songReady: false,
    };
  },
  mounted() {
    this.updateSong();
    setTimeout(() => {
      this.scrollToActiveLyric();
      
    }, 0);
    this.$nextTick(() => {
    });
  },
  watch: {
    activeLyricIndex(newIndex, oldIndex) {
      if (
        newIndex !== oldIndex &&
        !this.lyricScrolling[WHEEL_TYPE] &&
        !this.lyricScrolling[SCROLL_TYPE]
      ) {
        this.scrollToActiveLyric();
      }
    },
  },
  methods: {
    formatTime(num) {
      const seconds = Math.ceil(num);
      if (seconds < 0) {
        return "00:00";
      }

      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      // 格式化分钟和秒钟为两位数字
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(remainingSeconds).padStart(2, "0");

      return `${formattedMinutes}:${formattedSeconds}`;
    },
    showLyric() {
      const left = document.querySelector(".left");
      const right = document.querySelector(".right");
      left.style.width = "0px";
      right.style.width = "99vw";
      this.$nextTick(()=>{
        this.scrollToActiveLyric()
      })
      console.log("left: ", left);
    },
    showCover() {
      const left = document.querySelector(".left");
      const right = document.querySelector(".right");
      left.style.width = "100%";
      right.style.width = "0px";
      console.log("left: ", left);
    },
    clearTimer(type) {
      this.lyricTimer[type] && clearTimeout(this.lyricTimer[type]);
    },
    getActiveCls(index) {
      return this.activeLyricIndex === index ? "active" : "";
    },
    onInitScroller(scoller) {
      console.log("走了 onInitScroller");
      const onScrollStart = (type) => {
        this.clearTimer(type);
        this.lyricScrolling[type] = true;
      };
      const onScrollEnd = (type) => {
        // 滚动结束后两秒 歌词开始自动滚动
        this.clearTimer(type);
        this.lyricTimer[type] = setTimeout(() => {
          this.lyricScrolling[type] = false;
        }, AUTO_SCROLL_RECOVER_TIME);
      };
      scoller.on("scrollStart", onScrollStart.bind(null, SCROLL_TYPE));
      scoller.on("mousewheelStart", onScrollStart.bind(null, WHEEL_TYPE));

      scoller.on("scrollEnd", onScrollEnd.bind(null, SCROLL_TYPE));
      scoller.on("mousewheelEnd", onScrollEnd.bind(null, WHEEL_TYPE));
    },
    async updateSong() {
      this.updateLyric();
      // this.updateSimi()
    },
    async updateLyric() {
      // const result = await getLyric(this.currentSong.id);
      const result = {
        sgc: false,
        sfy: false,
        qfy: false,
        lrc: {
          version: 1,
          lyric: this.currentSong.lyric
            // "[00:00.00] 作词 : 赵雷\n[00:01.00] 作曲 : 赵雷\n[00:02.00] 制作人 : 赵雷\n[00:42.81]你想预定哪一国的早餐\n[00:48.03]等一杯不加糖的咖啡取暖\n[00:53.40]坐在阳台望着对面的山\n[00:58.56]山尖的雪总是一尘不染\n[01:03.38]\n[01:03.96]去向同样地方的人很多\n[01:09.39]而走在角落的人却只有我\n[01:14.67]我只想静静离开独自徘徊\n[01:19.98]在这陌生却最自由的时刻\n[01:24.51]\n[01:25.38]一场雨揉进乡间的朦胧\n[01:30.63]在湖边回忆往昔的每分钟\n[01:36.00]你是否在仰望潮湿的星\n[01:41.31]还是陷入了闹市的霓虹中\n[01:46.33]\n[01:46.77]吃遍了所有小饭馆\n[01:50.01]海市的便利店\n[01:52.65]走失在迷宫一样的地铁站\n[01:57.21]行李箱与我跌撞地转\n[02:00.57]寻找下家旅店\n[02:03.27]走酸的双脚无处停站\n[02:07.23]\n[02:29.34]去向同样地方的人很多\n[02:34.77]而走在角落的人却只有我\n[02:40.02]我只想静静离开独自徘徊\n[02:45.24]在这陌生却最自由的时刻\n[02:50.11]\n[02:50.67]一场雨揉进乡间的朦胧\n[02:55.95]在湖边回忆往昔的每分钟\n[03:01.38]你是否在仰望潮湿的星\n[03:06.63]还是陷入了闹市的霓虹中\n[03:11.71]\n[03:12.39]吃遍了所有小饭馆\n[03:15.33]海市的便利店\n[03:18.03]走失在迷宫一样的地铁站\n[03:22.53]行李箱与我跌撞地转\n[03:25.92]寻找下家旅店\n[03:28.68]走酸的双脚无处停站\n[03:33.10]\n[03:33.39]跟着冬青树一路向南\n[03:36.60]再见了富士山\n[03:39.27]行迹在地图上画下曲线\n[03:44.04]数着飞机飞回的日子\n[03:47.31]回到旧的城市\n[03:49.98]你的旅行还剩下多少天\n[03:54.49]\n[04:15.99]翻看着照片里的笑脸\n[04:19.44]丢掉手中的烟\n[04:22.23]你的心情有没有好一点\n[04:30.56]\n[04:32.25]\n[04:33.25] 编曲：赵雷\n[04:33.55] 木吉他：赵雷\n[04:33.85] 电吉他：刘磊\n[04:34.15] 贝斯：Damien Banzigou\n[04:34.46] 打击乐：刘恒\n[04:34.76] 班卓琴：刘磊\n[04:35.06] 口风琴：祝子\n[04:35.37] 和声：旭东\n[04:35.67] 录音师：李越\n[04:35.97] 混音师：时俊峰\n[04:36.28] 录音室：野火春风\n[04:36.58] 母带工程室：Sterling Sound\n[04:36.88] 母带工程师：Randy Merrill\n[04:37.18] 封面设计：韩东、小强、阿穆隆\n",
        },
        klyric: {
          version: 0,
          lyric: "",
        },
        tlyric: {
          version: 0,
          lyric: "",
        },
        romalrc: {
          version: 0,
          lyric: "",
        },
        code: 200,
      };
      console.log("result", result);
      this.nolyric = !isDef(result.lrc) || !result.lrc.lyric;
      if (!this.nolyric) {
        const { lyric, tlyric } = lyricParser(result);
        this.lyric = lyric;
        this.tlyric = tlyric;
        console.log("this.lyric", this.lyric);
        console.log("this.tlyric", this.tlyric);
      }
    },

    onProgressChange(percent) {
      this.$refs.audio.currentTime = this.currentSong.durationSecond * percent;
      this.setPlayingState(true);
    },
    genImgUrl(url, w, h) {
      if (!h) {
        h = w;
      }
      url += `?param=${w}y${h}`;
      return url;
    },
    togglePlaying() {
      if (!this.currentSong.id) {
        return;
      }
      this.setPlayingState(!this.playing);
    },
    ready() {
      this.songReady = true;
    },
    async play() {
      this.$refs.audio.play();
    },
    scrollToActiveLyric() {
      if (this.activeLyricIndex !== -1) {
        const { scroller, lyric } = this.$refs;
        console.log('scroller',scroller);
        if (lyric && lyric[this.activeLyricIndex]) {
          scroller
            .getScroller()
            .scrollToElement(lyric[this.activeLyricIndex], 200, 0, true);
        }
      }
    },
    next() {
      if (this.songReady) {
        // this.startSong(this.nextSong)
      }
    },
    end() {
      this.next();
    },
    updateTime(e) {
      const time = e.target.currentTime;
      this.setCurrentTime(time);
    },
    setCurrentTime(time) {
      this.currentTime = time;
    },
    setPlayingState(playing) {
      this.playing = playing;
      this.setPlaying(this.playing);
    },
    setPlaying(newPlaying) {
      this.$nextTick(() => {
        newPlaying ? this.play() : this.pause();
      });
    },
    pause() {
      this.$refs.audio.pause();
    },
  },
  computed: {
    // 播放的进度百分比
    playedPercent() {
      const { durationSecond } = this.currentSong;
      return Math.min(this.currentTime / durationSecond, 1) || 0;
    },
    lyricWithTranslation() {
      let ret = [];
      // 空内容的去除
      const lyricFiltered = this.lyric.filter(({ content }) =>
        Boolean(content)
      );
      // content统一转换数组形式
      if (lyricFiltered.length) {
        lyricFiltered.forEach((l) => {
          const { time, content } = l;
          const lyricItem = { time, content, contents: [content] };
          const sameTimeTLyric = this.tlyric.find(
            ({ time: tLyricTime }) => tLyricTime === time
          );
          if (sameTimeTLyric) {
            const { content: tLyricContent } = sameTimeTLyric;
            if (content) {
              lyricItem.contents.push(tLyricContent);
            }
          }
          ret.push(lyricItem);
        });
      } else {
        ret = lyricFiltered.map(({ time, content }) => ({
          time,
          content,
          contents: [content],
        }));
      }
      return ret;
    },
    activeLyricIndex() {
      return this.lyricWithTranslation
        ? this.lyricWithTranslation.findIndex((l, index) => {
            const nextLyric = this.lyricWithTranslation[index + 1];
            return (
              this.currentTime >= l.time &&
              (nextLyric ? this.currentTime < nextLyric.time : true)
            );
          })
        : -1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./variables.scss";
@import "./mixin.scss";
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn);
  }
}

.paly-song-container {
  width: 100%;
  height: 540px;
  overflow: hidden;
  .song {
    height: 100%;
    margin: auto;
    display: flex;
    .left {
      overflow: hidden;
      height: 100%;
      .left-top {
        width: 100%;
        position: relative;
        padding: 80px 70px 0 36px;

        .play-bar-support {
          position: absolute;
          left: calc(36px + 160px - 15px);
          top: -15px;
          width: 30px;
          height: 30px;
          z-index: 2;
        }

        .play-bar {
          $w: 100px;
          $h: 146px;
          position: absolute;
          top: 0;
          left: calc(36px + 160px - 6px);
          width: 100px;
          height: 146px;
          z-index: 1;
          transform-origin: 0 0;
          transform: rotate(-30deg);
          transition: all 0.3s;

          &.playing {
            transform: rotate(5deg);
          }
        }

        .img-outer-border {
          @include round(320px);
          @include flex-center;
          background-color: #e6e5e6;
          // background-color: #2A2A2A;

          .img-outer {
            @include round(300px);
            @include flex-center;
            background: #000;
            background: linear-gradient(-45deg, #333540, #070708, #333540);
            animation: rotate 20s linear infinite;

            &.paused {
              animation-play-state: paused;
            }

            .img-wrap {
              @include img-wrap(200px);

              img {
                border-radius: 50%;
              }
            }
          }
        }
      }
      .progress-bar-container {
        width: 100%;
        box-sizing: border-box;
        padding: 16px 30px;
        padding-top: 6px;
        .schedule {
          font-size: 12px;
          display: flex;
          justify-content: flex-end;
        }
      }
    }

    .right {
      float: left;
      padding-top: 10px;
      height: 100%;
      // background-color: goldenrod;
      padding-left: 25px;
      .name-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 8px;

        .name {
          font-size: $font-size-title-lg;
          color: var(--font-color-white);
        }
      }

      .artists {
        margin-bottom: 16px;
      }

      .desc {
        display: flex;
        font-size: $font-size-sm;
        margin-bottom: 30px;

        .desc-item {
          display: flex;
          margin-right: 32px;
          .label {
            display: inline-block;
            margin-right: 4px;
          }

          .value {
            color: $blue;
          }
        }
      }

      .is-mobie {
          display: none;
      }

      .lyric-wrap {
        max-width: 280px;
        height: 380px;
        mask-image: linear-gradient(
          180deg,
          hsla(0, 0%, 100%, 0) 0,
          hsla(0, 0%, 100%, 0.6) 15%,
          #fff 25%,
          #fff 75%,
          hsla(0, 0%, 100%, 0.6) 85%,
          hsla(0, 0%, 100%, 0)
        );
        .lyric-item-continer {
          // padding-left: 10px;
        }
        .lyric-item {
          margin-bottom: 16px;
          font-size: $font-size-sm;
          // display: flex;
          // justify-content: center;

          &.active {
            font-size: $font-size;
            color: var(--font-color-white);
            font-weight: $font-weight-bold;
          }

          .lyric-text {
            margin-bottom: 8px;
          }
        }
      }
    }
  }

  .control {
    display: flex;
    justify-content: center;
    padding-top: 10px;
    gap: 60px;
    .play {
      background: #fff;
      border-radius: 10px;
      padding: 8px 20px;

      box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    }
    > img {
      width: 44px;
      height: 44px;
    }
    .lyric-show {
      display: none;
    }
  }
}



/* 当屏幕宽度小于768px时应用此样式 */
@media (max-width: 767px) {
  .paly-song-container {
    .song {
      .left {
        width: 100%;
        padding: 0;
        justify-content: center;
        .left-top {
          padding: 70px 0 0 0;
          height: 380px;
          .img-outer-border {
            position: absolute;
            left: 50%;
            transform: translate(-50%, 0);
          }
        }
      }
      .right {
        width: 0px;
        height: 440px;
        padding-left: 0px !important;
        .desc {
          display: none;          
        }
        .name-wrap {
          display: none;
        }

      .is-mobie {
          display: block !important;
      }
      }
      .lyric-show {
        display: block;
      }
    }
  }
}


</style>
