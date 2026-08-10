type OfflineNoticeProps = { description: string; title: string };

export function OfflineNotice({ description, title }: OfflineNoticeProps) {
  return (
    <main className="offline-screen">
      <div className="offline-screen__wordmark" aria-label="Brevity">
        Brevity<span>.</span>
      </div>
      <section className="offline-screen__message" aria-labelledby="offline-title">
        <p>Offline</p>
        <h1 id="offline-title">{title}</h1>
        <span>{description}</span>
      </section>
    </main>
  );
}
