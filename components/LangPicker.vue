<template>
  <div class="absolute top-0 right-0 p-4">
    <select
      @input="updateLang($event)"
      v-model="$route.query.lang"
      class="bg-transparent dark:text-white"
      placeholder="Choose language"
    >
      <option value="fr">French</option>
      <option value="it">Italian</option>
      <option value="zh">Mandarin</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const route = useRoute();

if (!route.query?.lang) {
  router.push({
    query: {
      card: 1,
      lang: "fr",
    },
  });
}

const updateLang = ({ target }) => {
  router
    .push({
      query: {
        ...route.query,
        card: 1, // reset cards
        lang: target.value,
      },
    })
    .then(() => {
      // refresh the app and load the new voice
      window.location.reload();
    });
};
</script>
