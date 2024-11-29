---
outline: false
---
<script setup>
  import { tianmasfantasy } from './song_data.js'
  import CustomComponent from './CustomComponent.vue'
</script>
<CustomComponent :currentSong="tianmasfantasy"/>
<style>
  .VPDoc {
    padding-top: 0 !important;
  }
</style>
