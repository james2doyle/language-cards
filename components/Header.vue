<template>
  <div class="w-full p-4">
    <button type="button" class="dark:text-white" @click="toggleDark()">
      Is Dark: <input type="checkbox" name="dark" value="1" :checked="isDark" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark({
  selector: "body",
  attribute: "class",
  valueDark: "dark",
  valueLight: "light",
});

const toggleDark = useToggle(isDark);
</script>
