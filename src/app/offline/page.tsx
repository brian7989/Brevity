import { getTranslations } from "next-intl/server";

import { OfflineNotice } from "@/features/pwa";

export default async function OfflinePage() {
  const t = await getTranslations("Offline");
  return <OfflineNotice description={t("description")} title={t("title")} />;
}
