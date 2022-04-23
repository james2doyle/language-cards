<template>
  <div
    class="controls-wrapper flex items-center justify-center space-x-4 mt-10"
  >
    <button
      type="button"
      name="sound"
      class="bg-transparent border-none"
      @click.prevent="sound"
    >
      <span v-if="isPlaying">⏹️</span>
      <span v-else>⏯️</span>
    </button>
    <button
      type="button"
      name="previous"
      class="bg-transparent border-none text-4xl"
      @click.prevent="previous"
    >
      <span>⏮️</span>
    </button>
    <button
      type="button"
      name="save"
      class="bg-transparent border-none text-4xl opacity-40 hover:opacity-100"
      :class="{ 'opacity-100': hasStar }"
      @click.prevent="save"
    >
      <span>⭐</span>
    </button>
    <button
      type="button"
      name="next"
      class="bg-transparent border-none text-4xl"
      @click.prevent="next"
    >
      <span>⏭️</span>
    </button>
    <button
      type="button"
      name="restart"
      class="bg-transparent border-none"
      @click.prevent="restart"
    >
      <span>🔄</span>
    </button>
  </div>
</template>

<script lang="ts">
import {
  useMagicKeys,
  useSpeechSynthesis,
  whenever,
  until,
  useDark,
  useToggle,
  usePreferredDark,
} from "@vueuse/core";
import type { Card } from "components/Card.vue";

const { left, right, space, enter, backspace } = useMagicKeys();

export default {
  name: "Controls",
  props: {
    currentCard: {
      type: Object as () => Card,
      required: true,
    },
  },
  setup(props, { emit }) {
    const route = useRoute();

    const starredCards = ref<string[]>([]);

    const hasStar = computed(() => {
      return starredCards.value.includes(props.currentCard.id);
    });

    const speechText = computed(() => {
      return props?.currentCard?.translated || "";
    });

    const lang = route.query.lang || "fr";
    const rate = route.query.rate ? parseFloat(route.query.rate) : 0.5;

    const { isPlaying, isSupported, speak } = useSpeechSynthesis(speechText, {
      lang,
      rate,
    });

    const sound = () => {
      until(isPlaying)
        .toMatch((v) => v === false)
        .then(speak);

      emit("sound");
    };

    const previous = () => {
      sound();
      emit("previous");
    };

    const save = () => {
      if (props.currentCard) {
        starredCards.value.push(props.currentCard.id);
      }

      emit("save");
    };

    const next = () => {
      sound();
      emit("next");
    };

    const restart = () => {
      sound();
      emit("restart");
    };

    whenever(space, () => {
      sound();
    });

    whenever(backspace, () => {
      restart();
    });

    whenever(left, () => {
      previous();
    });

    whenever(right, () => {
      next();
    });

    whenever(enter, () => {
      save();
    });

    const isDark = useDark({
      selector: "body",
      attribute: "class",
      valueDark: "dark bg-gray-900",
      valueLight: "light bg-white",
    });
    const shouldBeDark = usePreferredDark();
    const toggleDark = useToggle(isDark);

    if (shouldBeDark) {
      toggleDark();
    }

    return {
      isDark,
      toggleDark,
      starredCards,
      hasStar,
      isPlaying,
      isSupported,
      speak,
      sound,
      previous,
      save,
      next,
      restart,
    };
  },
};
</script>
