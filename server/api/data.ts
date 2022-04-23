import mandarin from "./mandarin_phrases.json";
import french from "./french_phrases.json";

export default defineEventHandler((event) => {
  return {
    mandarin,
    french,
  };
});
