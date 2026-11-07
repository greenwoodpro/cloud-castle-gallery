import { StarIcon } from './icons'

export function TitleCard() {
  return (
    <div className="pointer-events-none select-none">
      <div className="flex items-center gap-2 text-accent">
        <StarIcon className="size-4" />
        <span className="font-sans text-[10px] tracking-[0.32em] text-muted-foreground uppercase">
          Three.js · 浮空岛
        </span>
      </div>
      <h1 className="mt-1.5 font-serif text-3xl leading-tight font-semibold text-balance text-foreground sm:text-4xl">
        浮空岛上的城堡
      </h1>
      <p className="mt-1.5 max-w-xs font-sans text-xs leading-relaxed text-muted-foreground">
        一座中世纪城堡被安放在漂浮的岛屿上，以《小王子》的水彩笔调绘制——
        温和、细腻，可以从任意角度走进它的每一层房间。
      </p>
    </div>
  )
}
