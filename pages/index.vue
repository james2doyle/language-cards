<template>
  <div class="flex flex-col justify-around">
    <div v-if="cards.length > 0 && currentCard" class="w-full max-w-xs mx-auto">
      <TransitionGroup name="list" appear>
        <Card
          v-for="card in cards"
          v-show="currentCard.id === card.id"
          :key="card.id"
          :card="card"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Card } from "components/Card.vue";

const route = useRoute();

const { data } = await useAsyncData("data", () => $fetch("/api/data"));

const databases = ref({
  zh: data.value.mandarin,
  fr: data.value.french,
  it: data.value.italian,
});

const lang = ref(String(route.query.lang));
const cardIndex = computed(() => parseInt(String(route.query.card), 10) - 1);

const cards = ref<Card[]>([]);

cards.value = databases.value[lang.value];

const currentCard = computed(() => {
  return cards.value[cardIndex.value];
});
</script>
