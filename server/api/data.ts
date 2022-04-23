import mandarin from "./mandarin_phrases.json";
import french from "./french_phrases.json";
import italian from "./italian_phrases.json";

export default defineEventHandler(() => {
  return {
    mandarin,
    french,
    italian,
  };
});
