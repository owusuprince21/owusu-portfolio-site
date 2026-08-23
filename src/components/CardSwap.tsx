'use client'

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import gsap from 'gsap'

export interface CardSwapProps {
  width?: number | string
  height?: number | string
  cardDistance?: number
  verticalDistance?: number
  delay?: number
  pauseOnHover?: boolean
  onCardClick?: (idx: number) => void
  skewAmount?: number
  easing?: 'linear' | 'elastic'
  children: ReactNode
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
  />
))
Card.displayName = 'Card'

type CardRef = RefObject<HTMLDivElement | null>
interface Slot {
  x: number
  y: number
  z: number
  zIndex: number
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
})

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  })

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children,
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        }

  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children])
  const refs = useMemo<CardRef[]>(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr.length]
  )

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i))

  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const timeoutRef = useRef<number>(0)
  const container = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    const total = refs.length
    order.current = Array.from({ length: total }, (_, i) => i)
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount)
      }
    })

    const clearTimer = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = 0
      }
    }

    const scheduleNext = () => {
      clearTimer()
      if (pausedRef.current) return
      timeoutRef.current = window.setTimeout(runSwap, delay)
    }

    const runSwap = () => {
      if (pausedRef.current || order.current.length < 2) {
        scheduleNext()
        return
      }

      const [front, ...rest] = order.current
      const elFront = refs[front]?.current
      if (!elFront) {
        scheduleNext()
        return
      }

      tlRef.current?.kill()
      const tl = gsap.timeline({
        onComplete: () => {
          order.current = [...rest, front]
          scheduleNext()
        },
      })
      tlRef.current = tl

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease,
      })

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`)
      rest.forEach((idx, i) => {
        const el = refs[idx]?.current
        if (!el) return
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length)
        tl.set(el, { zIndex: slot.zIndex }, 'promote')
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        )
      })

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length)
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`)
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex })
        },
        undefined,
        'return'
      )
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        'return'
      )
    }

    // Start looping after a short beat so first layout settles
    timeoutRef.current = window.setTimeout(runSwap, 800)

    if (pauseOnHover && container.current) {
      const node = container.current
      const pause = () => {
        pausedRef.current = true
        tlRef.current?.pause()
        clearTimer()
      }
      const resume = () => {
        pausedRef.current = false
        tlRef.current?.play()
        if (!tlRef.current || !tlRef.current.isActive()) {
          scheduleNext()
        }
      }
      node.addEventListener('mouseenter', pause)
      node.addEventListener('mouseleave', resume)
      return () => {
        pausedRef.current = false
        node.removeEventListener('mouseenter', pause)
        node.removeEventListener('mouseleave', resume)
        clearTimer()
        tlRef.current?.kill()
      }
    }

    return () => {
      clearTimer()
      tlRef.current?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- match React Bits CardSwap deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing])

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>)
            onCardClick?.(i)
          },
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  )

  return (
    <div
      ref={container}
      className="absolute left-1/2 top-[72%] origin-center -translate-x-1/2 -translate-y-1/2 overflow-visible perspective-[900px] max-lg:left-1/2 max-lg:top-[78%] max-lg:scale-[0.72] max-[480px]:top-[82%] max-[480px]:scale-[0.58]"
      style={{ width, height }}
    >
      {rendered}
    </div>
  )
}

export default CardSwap
