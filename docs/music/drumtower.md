---
outline: false
---
<script setup>
  import { drumtower } from './song_data.js'
import CustomComponent from './CustomComponent.vue'
</script>
<CustomComponent :currentSong="drumtower"/>
<style>
.VPDoc {
  padding-top: 0 !important;
}
</style>
