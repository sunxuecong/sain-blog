<template>
  <transition name="slide">
    <div v-if="hasCurrentSong" :class="getPlayerShowCls()" class="player">
      <button @click="play">anniu</button>
      <audio
      :src="currentSong.url"
      @canplay="ready"
      @timeupdate="updateTime"
      ref="audio"
    ></audio>
      <!-- <audio
        ref="audio"
        controls
        src="https://music.163.com/song/media/outer/url?id=2059167064.mp3"
      ></audio> -->
      <div class="content">
        <div class="song">
          <div class="left">
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
                  <!-- <img :src="$utils.genImgUrl(currentSong.img, 400)" /> -->
                </div>
              </div>
            </div>
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
            <empty v-if="nolyric">还没有歌词哦~</empty>
            <Scroller
              :data="lyric"
              :options="{ disableTouch: true }"
              @init="onInitScroller"
              class="lyric-wrap"
              ref="scroller"
              v-else
            >
              <div>
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
    </div>
  </transition>
</template>
<script>
import Scroller from "./Scroller.vue";

import { getLyric } from "./api/index.js";
import lyricParser from "./utils/lrcparse.js";
import { createSong } from "./utils/business.js";
function isDef(v) {
  return v !== undefined && v !== null;
}

const WHEEL_TYPE = "wheel";
const SCROLL_TYPE = "scroll";
// 恢复自动滚动的定时器时间
const AUTO_SCROLL_RECOVER_TIME = 1000;
export default {
  mounted() {
    // this.play()
    this.updateSong();
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
      songReady: true,
      currentSong: {
        id: 2772113,
        name: "I wanted you",
        img: "https://p2.music.126.net/SOnMRzWCldq9E3RXClkv9g==/1696546441663730.jpg",
        artists: [{ id: 60879, name: "Ina Wroldsen", tns: [], alias: [] }],
        duration: 233000,
        albumName: "Suddenly",
        url: "https://music.163.com/song/media/outer/url?id=2772113.mp3",
        artistsText: "Ina Wroldsen",
        durationSecond: 233,
        mvId: 0,
      },
      currentTime: 0,
      playing: true,
      isPlayerShow: false,
      hasCurrentSong: true,

      lyric: [],
      tlyric: [],
      simiLoading: false,
      simiPlaylists: [],
      simiSongs: [],
      nolyric: false,
    };
  },
  methods: {
    async play() {
      this.$refs.audio.play();
    },
    updateTime(e) {
      const time = e.target.currentTime;
      this.currentTime = time;
    },
    ready() {
      this.songReady = true;
    },
    async updateSong() {
      this.updateLyric();
    },
    async updateLyric() {
      const result = await getLyric(this.currentSong.id);
      console.log("获取的歌词result", result);
      this.nolyric = !isDef(result.lrc) || !result.lrc.lyric;
      if (!this.nolyric) {
        const { lyric, tlyric } = lyricParser(result);
        console.log('lyric',lyric);
        console.log('tlyric',tlyric);
        this.lyric = lyric;
        this.tlyric = tlyric;
      }
    },
    getPlayerShowCls() {
      return this.isPlayerShow ? "show" : "hide";
    },
    getActiveCls(index) {
      return this.activeLyricIndex === index ? "active" : "";
    },
    getDiscRotateCls() {
      return this.playing ? "rotate" : "pause";
    },
    onInitScroller(scoller) {
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
    clearTimer(type) {
      this.lyricTimer[type] && clearTimeout(this.lyricTimer[type]);
    },
    onClickPlaylist(id) {
      // 点击的歌单和当前打开的个单页是同一个 直接关闭player
      if (id === Number(this.$route.params.id)) {
        this.setPlayerShow(false);
      } else {
        this.$router.push(`/playlist/${id}`);
      }
    },
    onClickSong(song) {
      this.startSong(song);
      this.addToPlaylist(song);
    },
    onGoMv() {
      this.setPlayerShow(false);
    },
    resizeScroller() {
      this.$refs.scroller.getScroller().refresh();
    },
    addResizeListener() {
      window.addEventListener("resize", this.resizeScroller);
    },
    removeResizeListener() {
      window.removeEventListener("resize", this.resizeScroller);
    },
    setPlayerShow() {},
    startSong() {},
    addToPlaylist() {},
  },
  computed: {
    // activeLyricIndex() {
    //   return this.lyricWithTranslation
    //     ? this.lyricWithTranslation.findIndex((l, index) => {
    //         const nextLyric = this.lyricWithTranslation[index + 1]
    //         return (
    //           this.currentTime >= l.time &&
    //           (nextLyric ? this.currentTime < nextLyric.time : true)
    //         )
    //       })
    //     : -1
    // },
    lyricWithTranslation() {
      let ret = []
      // 空内容的去除
      const lyricFiltered = this.lyric.filter(({ content }) => Boolean(content))
      // content统一转换数组形式
      if (lyricFiltered.length) {
        lyricFiltered.forEach(l => {
          const { time, content } = l
          const lyricItem = { time, content, contents: [content] }
          const sameTimeTLyric = this.tlyric.find(
            ({ time: tLyricTime }) => tLyricTime === time
          )
          if (sameTimeTLyric) {
            const { content: tLyricContent } = sameTimeTLyric
            if (content) {
              lyricItem.contents.push(tLyricContent)
            }
          }
          ret.push(lyricItem)
        })
      } else {
        ret = lyricFiltered.map(({ time, content }) => ({
          time,
          content,
          contents: [content]
        }))
      }
      return ret
    },
    currentSong(){
      return {"id":2059167064,"name":"向云端","artists":[{"id":55941040,"name":"平安","picUrl":null,"alias":[],"albumSize":0,"picId":0,"fansGroup":null,"img1v1Url":"https://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1":0,"trans":null}],"duration":71980,"albumName":"向云端","url":"https://music.163.com/song/media/outer/url?id=2059167064.mp3","artistsText":"平安","durationSecond":71.98,"albumId":168326767,"mvId":0,"alias":[]}
    },
    currentTime(){
      return 0
    },
  },
  watch: {
    isPlayerShow(show) {
      if (show) {
        // 歌词短期内不会变化 所以只拉取相似信息
        this.addResizeListener()
        this.$nextTick(() => {
          this.scrollToActiveLyric()
        })
      } else {
        this.removeResizeListener()
      }
    },
    currentSong(newSong, oldSong) {
      if (!newSong.id) {
        this.setPlayerShow(false)
        return
      }
      if (newSong.id === oldSong.id) {
        return
      }
      // 如果歌曲详情显示状态切歌 需要拉取歌曲相关信息
      if (this.isPlayerShow) {
        this.updateSong()
      } else {
        // 否则只是更新歌词
        this.updateLyric()
      }
    },
    activeLyricIndex(newIndex, oldIndex) {
      if (
        newIndex !== oldIndex &&
        !this.lyricScrolling[WHEEL_TYPE] &&
        !this.lyricScrolling[SCROLL_TYPE]
      ) {
        this.scrollToActiveLyric()
      }
    },
    $route() {
      this.setPlayerShow(false)
    }
  },
  components: {
    Scroller,
  },
};
</script>

<style scoped lang="scss">
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

$img-left-padding: 36px;
$img-outer-border-d: 320px;
$img-outer-d: 300px;
.content {
  background-color: pink;
  height: 500px;
  max-width: 870px;
  margin: auto;
  background-color: pink;

  .song {
    display: flex;

    .left {
      position: relative;
      padding: 80px 70px 0 $img-left-padding;
      display: flex;
      justify-content: center;

      $support-d: 30px;
      $support-d-half: $support-d / 2;
      .play-bar-support {
        position: absolute;
        left: $img-left-padding + $img-outer-border-d / 2 - $support-d / 2;
        top: -$support-d-half;
        width: $support-d;
        height: $support-d;
        z-index: 2;
      }

      .play-bar {
        $w: 100px;
        $h: 146px;
        position: absolute;
        top: 0;
        left: $img-left-padding + $img-outer-border-d / 2 - 6px;
        width: $w;
        height: $h;
        z-index: 1;
        transform-origin: 0 0;
        transform: rotate(-30deg);
        transition: all 0.3s;

        &.playing {
          transform: rotate(5deg);
        }
      }

      .img-outer-border {
        @include round($img-outer-border-d);
        @include flex-center;
        background: var(--song-shallow-grey-bg);

        .img-outer {
          @include round($img-outer-d);
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

    .right {
      flex: 1;
      padding-top: 45px;
      .name-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 16px;

        .name {
          font-size: 16px;
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
        width: 380px;
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

        .lyric-item {
          margin-bottom: 16px;
          font-size: $font-size-sm;

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

  .bottom {
    display: flex;
    margin-top: 48px;
    margin-bottom: 36px;

    .left {
      flex: 1;
    }

    .right {
      padding-left: 36px;
      width: 28%;
      overflow: hidden;

      .simi-playlists {
        margin-bottom: 36px;
      }

      .simi-songs {
        .play-icon {
          @include abs-center;
        }
      }

      .simi-item {
        margin-bottom: 6px;
      }

      .title {
        font-size: $font-size-lg;
        font-weight: $font-weight-bold;
        margin-bottom: 12px;
      }

      .desc {
        display: flex;
        align-items: center;

        .count {
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
