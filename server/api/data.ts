import type { Card } from "components/Card.vue";

import mandarin from "./mandarin_phrases.json";
import french from "./french_phrases.json";
import italian from "./italian_phrases.json";

export interface DataResponse {
  mandarin: Card[];
  french: Card[];
  italian: Card[];
}

export default defineEventHandler(() => {
  return {
    mandarin,
    french,
    italian,
  };
});
