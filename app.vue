<script lang="ts" setup>
const siteMeta = useSiteMeta()
const year = computed(() => new Date().getFullYear())
</script>

<template>
  <Html dir="ltr">
    <Head>
      <SchemaOrgPerson
        :name="siteMeta.name"
        image="https://res.cloudinary.com/dwl1vhp3v/image/upload/f_jpg,q_auto:best,dpr_auto,w_240,h_240/v1686178087/images/jan-petry"
        :same-as="siteMeta.sameAs"
      />
    </Head>
    <Body class="text-gray-800 dark:text-gray-100 antialiased">
      <NuxtLoadingIndicator />
      <Header />
      <main class="md:(max-w-8xl pb-20 px-8 pt-7) sm:(pb-16) mx-auto max-w-full px-4 pb-10">
        <NuxtPage class="page-enter-active" />
      </main>
      <footer class="px-5 sm:px-7 md:px-10 text-center text-gray-400 text-sm my-5">
        <div class="flex justify-center mb-3">
          <SocialIcons />
        </div>
        <p class="mb-3">
          © {{ year }}-PRESENT {{ siteMeta.name }}. All rights reserved.
        </p>
      </footer>
    </Body>
  </Html>
</template>
