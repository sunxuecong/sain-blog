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
          <ProgressBar
            :percent="playedPercent"
            @percentChange="onProgressChange"
          />
        </div>
        <div class="control">
          <img @click="togglePlaying" v-show="!playing" :src="playImg" alt="" />
          <img @click="togglePlaying" v-show="playing" :src="pauseImg" alt="" />
          <img :src="share" alt="" />
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
        <div class="name-wrap" @click="showCover">
          <p class="name">{{ currentSong.name }}</p>
        </div>
        <div class="desc" @click="showCover">
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
const AUTO_SCROLL_RECOVER_TIME = 1000;

export default {
  name: "CustomComponent",
  components: { ProgressBar, empty, Scroller },
  props: {},
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
      currentSong: {
        id: 1974444808,
        name: "小行迹",
        img: "https://p1.music.126.net/9bVOooAY6U6EJLzpv1Fikw==/109951169682871673.jpg",
        artists: [{ id: 6731, name: "赵雷", tns: [], alias: [] }],
        duration: 277493,
        albumName: "署前街少年",
        url: "https://music.163.com/song/media/outer/url?id=1974444808.mp3",
        artistsText: "赵雷",
        durationSecond: 277.493,
        mvId: 0,
      },
      // 当前播放时长
      currentTime: 0,
      // 播放状态
      playing: false,
      songReady: false,
    };
  },
  mounted() {
    this.updateSong();
    this.$nextTick(() => {
      this.scrollToActiveLyric();
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
    showLyric() {
      const left = document.querySelector(".left");
      const right = document.querySelector(".right");
      left.style.width = "0px";
      right.style.width = "99vw";
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
      console.log("走了 init");
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
      const result = await getLyric(this.currentSong.id);
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
        Boolean(content),
      );
      // content统一转换数组形式
      if (lyricFiltered.length) {
        lyricFiltered.forEach((l) => {
          const { time, content } = l;
          const lyricItem = { time, content, contents: [content] };
          const sameTimeTLyric = this.tlyric.find(
            ({ time: tLyricTime }) => tLyricTime === time,
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
  height: 520px;
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
        // background-color: pink;
        box-sizing: border-box;
        padding: 16px 30px;
      }
    }

    .right {
      float: left;
      padding-top: 5px;
      height: 100%;
      .name-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 16px;

        .name {
          font-size: $font-size-title-lg;
          color: var(--font-color-white);
        }

        .mv-tag {
          display: inline-block;
          margin-left: 8px;
          padding: 2px;
          border: 1px solid currentColor;
          border-radius: 2px;
          color: $theme-color;
          cursor: pointer;
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

      .lyric-wrap {
        // width: 380px;
        height: 350px;
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
      }
      .lyric-show {
        display: block;
      }
    }
  }
}
</style>
