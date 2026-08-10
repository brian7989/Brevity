import { getLocale } from "next-intl/server";

import { BrevityGame } from "@/app/components";
import { isAppLocale } from "@/i18n";

export default async function HomePage() {
  const requestedLocale = await getLocale();
  const locale = isAppLocale(requestedLocale) ? requestedLocale : "ko";
  return (
    <BrevityGame
      aiConfigured={Boolean(process.env.AI_GATEWAY_API_KEY)}
      development={process.env.NODE_ENV === "development"}
      key={locale}
      language={locale}
    />
  );
}
