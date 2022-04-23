<template>
  <main class="flex flex-col sm:flex-row">
    <!-- <Header /> -->
    <div class="w-full flex-grow">
      <!-- main content -->
      <div class="px-6 py-10">
        <NuxtPage />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: "Language Cards",
});
</script>
