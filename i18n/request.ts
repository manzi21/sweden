import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/**
 * Server-side i18n request handler.
 *
 * Loaded by next-intl middleware/plugin for every request.
 * Resolves the active locale (falling back to the default if missing/invalid)
 * and lazy-loads the matching dictionary from `/locales/{locale}/common.json`.
 *
 * Dictionaries are split per locale (no monolithic bundle) so each request
 * only ships the messages for the active language — keeps the i18n bundle
 * additive cost low (~5-8 KB gzipped per locale).
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = (await import(`../locales/${locale}/common.json`)).default;

  return {
    locale,
    messages,
    // Use a stable, locale-agnostic timezone (Vercel deploys in UTC).
    // Components that need a local TZ can override via formats.
    timeZone: "Europe/Stockholm",
    now: new Date(),
  };
});
