import { motion } from 'motion/react'
import './PremiumGlowButton.css'

export default function PremiumGlowButton({
  href,
  target,
  rel,
  children,
  className = '',
  text,
  glowColor = '#B3A369',
  spinSpeed = 3,
  innerColor = 'rgba(8, 9, 12, 0.92)',
  enableGlass = true,
  glassColor = 'rgba(8, 9, 12, 0.55)',
  blurAmount = 20,
  showOuterGlow = true,
  outerGlowColor = 'rgba(179, 163, 105, 0.38)',
  glowOffsetX = 0,
  glowOffsetY = 12,
  glowBlur = 28,
  glowSpread = 0,
  textColor = '#f5f7fb',
  borderWidth = 1.5,
  radius = 999,
  paddingX = 18,
  paddingY = 12,
  ...rest
}) {
  const innerRadius = Math.max(radius - borderWidth, 0)
  const Tag = href ? motion.a : motion.button

  const outerStyle = {
    position: 'relative',
    padding: borderWidth,
    borderRadius: radius,
    overflow: 'hidden',
    cursor: 'pointer',
    width: 'max-content',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    border: 'none',
    background: 'transparent',
    boxShadow: showOuterGlow
      ? `${glowOffsetX}px ${glowOffsetY}px ${glowBlur}px ${glowSpread}px ${outerGlowColor}`
      : 'none',
  }

  const innerStyle = {
    position: 'relative',
    zIndex: 1,
    background: enableGlass ? glassColor : innerColor,
    backdropFilter: enableGlass ? `blur(${blurAmount}px)` : 'none',
    WebkitBackdropFilter: enableGlass ? `blur(${blurAmount}px)` : 'none',
    borderRadius: innerRadius,
    padding: `${paddingY}px ${paddingX}px`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    color: textColor,
    minHeight: '46px',
    whiteSpace: 'nowrap',
  }

  return (
    <Tag
      href={href}
      target={target}
      rel={rel}
      className={`premium-glow-button ${className}`.trim()}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={outerStyle}
      {...rest}
    >
      <motion.div
        className="premium-glow-button__spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: spinSpeed, ease: 'linear' }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          x: '-50%',
          y: '-50%',
          width: 2000,
          height: 2000,
          zIndex: 0,
          background: `conic-gradient(from 0deg, transparent 0%, ${glowColor} 20%, transparent 50%)`,
        }}
        aria-hidden="true"
      />
      <span className="premium-glow-button__inner" style={innerStyle}>
        {children ?? text}
      </span>
    </Tag>
  )
}
