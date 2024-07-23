<template>
  <div class="paly-song-container">
    <div class="song"></div>
    <ProgressBar
      :disabled="!hasCurrentSong"
      :percent="playedPercent"
    />
    <div class="control">
      <!-- <Button type="primary">主要按钮</Button> -->
      <button class="play" @click="togglePlaying">
        {{ playing ? "暂停" : "播放" }}
      </button>
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
</template>

<script>
import ProgressBar from './ProgressBar.vue'
// import { Button } from 'element-ui';
export default {
  name: "CustomComponent",
  components: {ProgressBar},
  props: {},
  data() {
    return {
      // 当前播放歌曲
      currentSong: {
        id: 1488737309,
        name: "如果当时2020",
        artists: [
          {
            id: 5771,
            name: "许嵩",
            picUrl: null,
            alias: [],
            albumSize: 0,
            picId: 0,
            fansGroup: null,
            img1v1Url:
              "https://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
            img1v1: 0,
            trans: null,
          },
          {
            id: 37207396,
            name: "朱婷婷",
            picUrl: null,
            alias: [],
            albumSize: 0,
            picId: 0,
            fansGroup: null,
            img1v1Url:
              "https://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
            img1v1: 0,
            trans: null,
          },
        ],
        duration: 306783,
        albumName: "如果当时2020",
        url: "https://music.163.com/song/media/outer/url?id=1488737309.mp3",
        artistsText: "许嵩/朱婷婷",
        durationSecond: 306.783,
        albumId: 97118598,
        mvId: 10969591,
        alias: ["不曾遗忘的符号"],
      },
      // 当前播放时长
      currentTime: 0,
      // 播放状态
      playing: false,
      currentTime: 0,
      songReady: false,
    };
  },
  mounted() {},
  methods: {
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
  },
};
</script>

<style lang="less" scoped>
.paly-song-container {
  height: 500px;
  width: 100%;
  // background-color: pink;
  .song {
    height: 400px;
    // background: greenyellow;
    border: 1px solid #ccc;
  }

  .control {
    display: flex;
    justify-content: center;
    padding-top: 10px;
    .play {
      background: #fff;
      border-radius: 10px;
      padding: 8px 20px;

      box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    }
  }
}
</style>
