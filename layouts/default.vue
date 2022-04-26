<template>
  <main class="flex flex-col justify-between h-screen pb-32 space-y-4">
    <div class="flex items-center justify-between pt-4 px-4">
      <Header />
      <LangPicker />
    </div>
    <NuxtPage />
    <Controls
      :current-card="currentCard"
      @sound="sound"
      @previous="previous"
      @save="save"
      @next="next"
      @restart="restart"
    />
  </main>
</template>

<script setup lang="ts">
import type { Card } from "components/Card.vue";

useHead({
  title: "Language Cards",
});

const router = useRouter();
const route = useRoute();

const { data } = await useAsyncData("data", () => $fetch("/api/data"));

const databases = ref({
  zh: data.value.mandarin,
  fr: data.value.french,
  it: data.value.italian,
});

const lang = ref(String(route.query.lang) || "fr");
const cardIndex = route.query.card
  ? parseInt(String(route.query.card), 10) - 1
  : 0;

const cards = ref<Card[]>([]);

cards.value = databases.value[lang.value];

const currentIndex = ref(cardIndex);

const currentCard = computed(() => {
  return cards.value[currentIndex.value];
});

const sound = () => {
  // alert('sound event');
};

const previous = () => {
  currentIndex.value =
    currentIndex.value - 1 > -1
      ? currentIndex.value - 1
      : cards.value.length - 1;
  router.push({
    query: {
      ...route.query,
      card: currentIndex.value + 1,
    },
  });
};

const next = () => {
  currentIndex.value =
    currentIndex.value + 1 < cards.value.length ? currentIndex.value + 1 : 0;
  router.push({
    query: {
      ...route.query,
      card: currentIndex.value + 1,
    },
  });
};

const save = () => {
  // alert('save event');
};

const restart = () => {
  currentIndex.value = 0;
  router.push({
    query: {
      ...route.query,
      card: 1,
    },
  });
};
</script>
