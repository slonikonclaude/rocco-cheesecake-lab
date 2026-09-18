/**
 * Вордмарк «ROCCO / The Cheesecake Lab» — как на крышке их коробки: имя
 * капсом с широкой разрядкой, подпись мелко под ним. Файла логотипа в хорошем
 * разрешении нет (Glovo отдаёт 200×200), поэтому знак набран Jost (DESIGN.md §6).
 * Цвет — currentColor: одинаково работает на креме, какао и оранжевом.
 */
export function Logo({ size = 22, withTagline = true, className = "" }: { size?: number; withTagline?: boolean; className?: string }) {
  return (
    <span className={`inline-flex flex-col items-start leading-none ${className}`}>
      <span className="wordmark" style={{ fontSize: size }}>
        Rocco
      </span>
      {withTagline ? (
        <span className="mt-1 font-sans font-normal tracking-[0.08em]" style={{ fontSize: Math.max(10, Math.round(size * 0.42)) }}>
          The Cheesecake Lab
        </span>
      ) : null}
    </span>
  );
}

/**
 * Крышка коробки сверху: оранжевый круг с тонким золотым кольцом и «ROCCO».
 * Декоративная — используется там, где нет фото (турон) и в иконках форматов.
 */
export function Lid({ size = 160, label = true, className = "" }: { size?: number; label?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full bg-rocco text-cacao ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="absolute inset-[6%] rounded-full border border-gold/70" />
      {label ? (
        <span className="flex flex-col items-center leading-none">
          <span className="wordmark text-gold" style={{ fontSize: size * 0.15 }}>
            Rocco
          </span>
          <span className="mt-1 text-gold" style={{ fontSize: Math.max(8, size * 0.058) }}>
            The Cheesecake Lab
          </span>
        </span>
      ) : null}
    </span>
  );
}
