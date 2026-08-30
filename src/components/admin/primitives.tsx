import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function Panel({
  title,
  description,
  children,
  className,
  aside,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  aside?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border/70 bg-card p-5 shadow-card sm:p-6",
        className,
      )}
    >
      {(title || aside) && (
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title ? (
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {title}
              </h3>
            ) : null}
            {description ? (
              <p className="mt-1.5 text-sm text-muted-foreground/90">{description}</p>
            ) : null}
          </div>
          {aside}
        </div>
      )}
      {children}
    </section>
  );
}

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
      {hint ? <p className="text-[11px] text-muted-foreground/80">{hint}</p> : null}
    </div>
  );
}

export function MoneyInput({
  value,
  onChange,
  prefix = "R$",
  suffix,
  className,
}: {
  value: number | string;
  onChange?: (v: string) => void;
  prefix?: string | null;
  suffix?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {prefix ? (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
          {prefix}
        </span>
      ) : null}
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        inputMode="decimal"
        className={cn(
          "h-9 bg-background tabular-nums",
          prefix ? "pl-10" : "",
          suffix ? "pr-12" : "",
        )}
      />
      {suffix ? (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          {suffix}
        </span>
      ) : null}
    </div>
  );
}
