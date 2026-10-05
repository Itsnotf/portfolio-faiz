import type messages from '../messages/id.json';

// Message keys are type-checked against the Indonesian file, so a missing or misspelled key fails `tsc`.
// messages/en.json must keep exactly the same keys.
declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages;
  }
}
