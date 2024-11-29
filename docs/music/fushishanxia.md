---
outline: false
---
<script setup>
  import { fushishanxia } from './song_data.js'
import CustomComponent from './CustomComponent.vue'
</script>
<CustomComponent :currentSong="fushishanxia"/>
<style>
.VPDoc {
  padding-top: 0 !important;
}
</style>
