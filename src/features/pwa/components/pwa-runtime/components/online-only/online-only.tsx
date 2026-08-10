"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { OfflineNotice } from "../../../offline-notice";

type OnlineOnlyProps = { children: ReactNode };

export function OnlineOnly({ children }: OnlineOnlyProps) {
  const t = useTranslations("Offline");
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const updateConnectivity = () => setOnline(navigator.onLine);
    updateConnectivity();
    window.addEventListener("online", updateConnectivity);
    window.addEventListener("offline", updateConnectivity);
    return () => {
      window.removeEventListener("online", updateConnectivity);
      window.removeEventListener("offline", updateConnectivity);
    };
  }, []);

  if (!online) return <OfflineNotice description={t("description")} title={t("title")} />;
  return children;
}
