<script setup lang="ts">
const { prev } = useContent()
</script>

<template>
  <div
    class="max-w-xl relative border transition rounded-xl overflow-hidden dark:border-gray-500"
  >
    <div class="p-4">
      <h3 class="font-semibold mb-3">
        Regularly newsletter
      </h3>
      <div class="text-sm mt-1 text-gray-500 dark:text-gray-300 prose">
        <p class="mb-2">
          At least each quarter I try to send an update of my journey working on
          different projects and topics to my
          <NuxtLink to="https://discord.com/invite/janslounge" target="_blank">
            Discord community
          </NuxtLink>
        </p>
        <p>After 2 weeks it's made public.</p>
      </div>
    </div>
  </div>
</template>
