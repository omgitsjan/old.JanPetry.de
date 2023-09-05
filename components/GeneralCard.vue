<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Entry } from '~/types'

const props = defineProps({
  entry: Object as PropType<Entry>,
})
</script>

<template>
  <a
    :href="entry?.link"
    target="_blank"
    class="relative px-4 py-3 group rounded border-gray-200/10 border-2 hover:bg-white dark:(border-gray-800/10) dark:hover:bg-gray-800 transition-all"
  >
    <div class="!flex">
      <div class="flex-shrink mt-2 mr-2">
        <icon
          v-if="entry?.icon"
          :name="entry.icon"
          class="w-14 h-auto opacity-70 mr-2 group-hover:opacity-75 transition-all svg-container"
        />
      </div>
      <div class="flex-grow">
        <div class="mb-2">
          <h3 class="-mb-1 font-bold">{{ entry?.name }}</h3>
          <span class="opacity-50 text-xs">{{ entry?.link }}</span>
        </div>
      </div>
    </div>
    <p class="text-sm opacity-90 mb-3 m-0">
      {{ entry?.description || 'placeholder' }}
    </p>
    <div class="text-xs inline-flex items-center absolute top-4 right-4">
      <i-uim:calender class="inline mr-1 mb-2px" />
      Since
      {{ entry?.since || 'A while Ago' }}
    </div>
  </a>
</template>

<style>
.svg-container svg {
  width: 35px;
  height: 35px;
}
</style>
