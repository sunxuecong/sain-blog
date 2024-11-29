---
outline: false
---
<script setup>
  import { xiaotiejiang } from './song_data.js'
import CustomComponent from './CustomComponent.vue'
</script>
<CustomComponent :currentSong="xiaotiejiang"/>
<style>
.VPDoc {
  padding-top: 0 !important;
}
</style>
