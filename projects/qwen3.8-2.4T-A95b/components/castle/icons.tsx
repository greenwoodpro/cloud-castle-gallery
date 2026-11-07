import type { SVGProps } from 'react'

/**
 * 手绘感的细线图标。
 * 用 stroke-linecap="round" 与略微不规则的路径，配合绘本 UI 的纸质感。
 */

type IconProps = SVGProps<SVGSVGElement>

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function SunIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
    </Base>
  )
}

export function DuskIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 17.5h16" />
      <path d="M7.4 14.2a4.6 4.6 0 0 1 9.2 0" />
      <path d="M12 4.2v2M4.8 7.6l1.4 1.4M19.2 7.6l-1.4 1.4M2.5 20.4h4M17.5 20.4h4" />
    </Base>
  )
}

export function MoonIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M20 14.4A8.4 8.4 0 0 1 9.6 4a8.4 8.4 0 1 0 10.4 10.4Z" />
      <path d="M17.4 4.6l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5Z" />
    </Base>
  )
}

export function XRayIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.6 8.2 12 4l8.4 4.2v7.6L12 20l-8.4-4.2Z" />
      <path d="M3.6 8.2 12 12.4l8.4-4.2M12 12.4V20" strokeDasharray="2 2.2" />
    </Base>
  )
}

export function OrbitIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="3.1" />
      <ellipse cx="12" cy="12" rx="9.2" ry="4.4" transform="rotate(-24 12 12)" />
      <circle cx="19.4" cy="8.4" r="1.3" fill="currentColor" stroke="none" />
    </Base>
  )
}

export function CompassIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.8" />
      <path d="m15.4 8.6-2 4.8-4.8 2 2-4.8Z" />
    </Base>
  )
}

export function DownloadIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.6v10.8" />
      <path d="m7.8 10.4 4.2 4.2 4.2-4.2" />
      <path d="M4.4 17.2v1.6a1.6 1.6 0 0 0 1.6 1.6h12a1.6 1.6 0 0 0 1.6-1.6v-1.6" />
    </Base>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m6.4 6.4 11.2 11.2M17.6 6.4 6.4 17.6" />
    </Base>
  )
}

export function ChevronIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m8.4 5.6 6.4 6.4-6.4 6.4" />
    </Base>
  )
}

export function TowerIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6.4 20.4V9.2L12 5.2l5.6 4v11.2" />
      <path d="M4.4 20.4h15.2" />
      <path d="M6.4 9.2h11.2" />
      <path d="M10.2 20.4v-4.2a1.8 1.8 0 0 1 3.6 0v4.2" />
      <path d="M8.2 6.6V4.2M12 5.2V2.8M15.8 6.6V4.2" />
    </Base>
  )
}

export function IslandIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.2 10.4c2.6-2.6 5.6-3.8 8.8-3.8s6.2 1.2 8.8 3.8" />
      <path d="M4.6 11.2c1.4 3.4 3.2 5.8 5.2 7.2.9.6 1.5.6 2.2 0 2-1.4 3.8-3.8 5.2-7.2" />
      <path d="M12 6.6V3.4M12 3.4c-1.4 0-2.2-.7-2.4-1.8 1.5-.2 2.4.5 2.4 1.8Zm0 0c1.4 0 2.2-.7 2.4-1.8-1.5-.2-2.4.5-2.4 1.8Z" />
    </Base>
  )
}

export function ScrollIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6.2 4.4h11.6v13.2a2 2 0 0 1-2 2H8.2a2 2 0 0 1-2-2Z" />
      <path d="M6.2 4.4a1.8 1.8 0 0 0-1.8 1.8v1.6h1.8" />
      <path d="M9.4 9h5.2M9.4 12.4h5.2M9.4 15.8h3.2" />
    </Base>
  )
}

export function DragIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.4v17.2M3.4 12h17.2" />
      <path d="m9.4 6 2.6-2.6L14.6 6M9.4 18l2.6 2.6L14.6 18M6 9.4 3.4 12 6 14.6M18 9.4l2.6 2.6L18 14.6" />
    </Base>
  )
}

export function ZoomIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="10.6" cy="10.6" r="6.2" />
      <path d="m15.2 15.2 4.4 4.4M8.2 10.6h4.8M10.6 8.2v4.8" />
    </Base>
  )
}

export function PanIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M8.6 11.4V6.6a1.4 1.4 0 0 1 2.8 0v4.2" />
      <path d="M11.4 10.6V5.4a1.4 1.4 0 0 1 2.8 0v5.2" />
      <path d="M14.2 10.8V7.6a1.4 1.4 0 0 1 2.8 0v6.6c0 3.4-2.2 5.8-5.4 5.8-2.6 0-4.2-1.2-5.4-3.4l-1.8-3.4a1.3 1.3 0 0 1 2.2-1.4l1.4 2" />
    </Base>
  )
}

export function StarIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m12 3.6 2.3 5.3 5.7.5-4.3 3.8 1.3 5.6L12 15.9l-5 2.9 1.3-5.6-4.3-3.8 5.7-.5Z" />
    </Base>
  )
}
