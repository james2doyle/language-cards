<template>
  <div class="w-full p-4">
    <ClientOnly>
      <button type="button" class="dark:text-white" @click="toggleDark()">
        <Transition name="fade" mode="out-in" appear>
          <span v-if="isDark">🌕 (L)</span>
          <span v-else>🌑 (D)</span>
        </Transition>
      </button>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark({
  selector: "html",
  attribute: "class",
  valueDark: "dark",
  valueLight: "light",
});

const toggleDark = useToggle(isDark);
</script>
