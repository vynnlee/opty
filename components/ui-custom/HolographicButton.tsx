'use client'

import * as React from 'react'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface HolographicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

const HolographicButton: React.FC<HolographicButtonProps> = ({
  text,
  className,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMouseX((e.clientX - rect.left) / rect.width - 0.5)
      setMouseY((e.clientY - rect.top) / rect.height - 0.5)
    }
  }

  const handleMouseLeave = () => {
    setMouseX(0)
    setMouseY(0)
  }

  const style = {
    '--mx': mouseX,
    '--my': mouseY,
  } as React.CSSProperties

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={handleMouseMove}
      onPointerLeave={handleMouseLeave}
      className="flex items-center justify-center"
      style={style}
      animate={style}
      transition={{ type: 'tween', duration: 0.1 }}
    >
      <div
        className="relative flex w-full items-center justify-center"
        style={{ perspective: '1000px' }}
      >
        {/* 배경 홀로그램 효과 */}
        <div className="absolute -inset-[6rem]">
          <div className="holographic absolute inset-[6rem] overflow-hidden rounded-full opacity-40 blur-[15px] transition-opacity group-hover:opacity-100"></div>
        </div>

        {/* 버튼 */}
        <button
          className={`group relative w-full overflow-hidden rounded-full bg-zinc-100 px-6 py-2.5 font-semibold text-slate-900 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
          {...props}
        >
          {/* 홀로그램 오버레이 */}
          <div className="absolute inset-0 transition-opacity duration-300">
            <div className="holographic absolute inset-0"></div>
            <div className="glare absolute inset-0"></div>
          </div>

          {/* 반투명 레이어 */}
          <div className="absolute inset-0.5 rounded-full bg-white opacity-40 transition-opacity group-hover:opacity-0"></div>

          {/* 버튼 텍스트 */}
          <div className="relative z-10">{text}</div>
        </button>
      </div>
    </motion.div>
  )
}

export default HolographicButton
