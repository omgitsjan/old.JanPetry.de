<script lang="ts" setup>
import { defineOgImage } from '#imports'

const { data: categories } = await useGeneralList()

const totalEntrys = computed(() => {
  return (
    categories.value?.body
      // @ts-expect-error untyped
      .map(c => c.entrys)
      .flat().length
  )
})

defineOgImage({
  component: 'PartnersOgImage',
  title: 'Partners',
})
</script>

<template>
  <div class="space-y-15 text-center">
    <div
      class="font-bold inline-flex items-center opacity-90 bg-green-400 dark:bg-green-600 text-xl px-5 py-3 rounded text-white"
    >
      <i-line-md:heart class="inline text-yellow-400 mr-2" />
      <span>
        {{ totalEntrys }} Partners
        <span class="opacity-70 text-xs">and counting</span>
      </span>
    </div>
    <div v-for="(category, cKey) in categories?.body" :key="cKey">
      <SubTitle>
        <IconNuxt
          v-if="category?.name === 'Nuxt'"
          class="text-black dark:text-white w-7 h-7 mr-1 inline"
        />
        <icon
          v-else-if="category?.icon"
          :name="category.icon"
          class="h-auto mr-2 group-hover:opacity-75 transition-all svg-container"
        />
        {{ category?.name }}
      </SubTitle>
      <div class="grid md:grid-cols-2 gap-5 text-left">
        <GeneralCard
          v-for="(entry, pKey) in category?.entrys"
          :key="pKey"
          :entry="entry"
        />
      </div>
    </div>
  </div>
</template>
