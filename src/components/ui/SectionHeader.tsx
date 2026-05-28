export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-accent">{eyebrow}</p> : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">{title}</h2>
      {lead ? <p className="mt-5 text-pretty text-base leading-8 text-muted sm:text-lg">{lead}</p> : null}
    </div>
  );
}
