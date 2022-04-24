<template>
  <div class="flex flex-col justify-around">
    <div v-if="cards.length > 0 && currentCard" class="w-full max-w-xs mx-auto">
      <Card
        v-for="card in cards"
        v-show="currentCard.id === card.id"
        :key="card.id"
        :card="card"
      />
      <Controls
        :current-card="currentCard"
        @sound="sound"
        @previous="previous"
        @save="save"
        @next="next"
        @restart="restart"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const route = useRoute();

const { data } = await useAsyncData("data", () => $fetch("/api/data"));

const databases = ref({
  zh: data.value.mandarin,
  fr: data.value.french,
  it: data.value.italian,
});

const lang = ref(route.query.lang || "fr");
const card = route.query.card ? parseInt(route.query.card, 10) - 1 : 0;

const cards = ref([]);

cards.value = databases.value[lang.value];

const currentIndex = ref(card);

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
