---
outline: false
---
<script setup>
  import { sky } from './song_data.js'
import CustomComponent from './CustomComponent.vue'
</script>
<CustomComponent :currentSong="sky"/>
<style>
.VPDoc {
  padding-top: 0 !important;
}
</style>
