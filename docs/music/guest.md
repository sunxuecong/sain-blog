---
outline: false
---
<script setup>
  import { guest } from './song_data.js'
import CustomComponent from './CustomComponent.vue'
</script>
<CustomComponent :currentSong="guest"/>
<style>
.VPDoc {
  padding-top: 0 !important;
}
</style>
