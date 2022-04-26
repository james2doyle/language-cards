<template>
  <div
    class="
      flex
      items-top
      justify-center
      text-center
      w-full
      rounded-lg
      shadow-xl
      overflow-hidden
      font-sans
      h-[510px]
    "
  >
    <div
      class="
        bg-white
        dark:bg-gray-700
        text-gray-900
        dark:text-white
        px-4
        w-full
        flex flex-col
        justify-center
      "
    >
      <div>
        <h5 v-text="card.id"></h5>
      </div>
      <div class="mt-5 text-2xl font-medium tracking-tight">
        <h3 v-text="card.translated"></h3>
      </div>
      <div class="mt-5 text-base font-medium tracking-tight">
        <h3 v-text="card.english"></h3>
      </div>
      <div
        v-if="card.pronounced"
        class="mt-5 text-base font-medium tracking-tight"
      >
        <h3 v-text="card.pronounced"></h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export interface Card {
  id: string;
  translated: string;
  english: string;
  pronounced?: string;
}

export default {
  name: "Card",
  props: {
    card: {
      type: Object as () => Card,
      required: true,
    },
  },
};
</script>
