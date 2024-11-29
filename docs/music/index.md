---
outline: false
---
<script setup>
import { traillet } from './song_data.js'
import CustomComponent from './CustomComponent.vue'
</script>

<CustomComponent :currentSong="traillet"/>



<style>
.VPDoc {
  padding-top: 0 !important;
}
</style>
