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
      {eyebrow ? (
        <div className={`eyebrow-line ${align === "center" ? "justify-center" : ""}`}>
          <span className="eyebrow">{eyebrow}</span>
        </div>
      ) : null}
      <h2 className="font-display text-balance text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-[3.25rem]">
        {title}
      </h2>
      {lead ? <p className="mt-5 text-pretty text-base leading-8 text-muted sm:text-[1.0625rem]">{lead}</p> : null}
    </div>
  );
}
