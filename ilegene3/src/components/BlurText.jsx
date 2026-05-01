import { useEffect, useMemo, useState } from 'react'

export default function BlurText({
  text,
  words = [],
  delay = 200,
  animateBy = 'words',
  direction = 'top',
  hold = 1800,
  onAnimationComplete,
  className = ''
}) {
  const dictionary = useMemo(() => {
    if (Array.isArray(words) && words.length > 0) return words
    return [text || '']
  }, [text, words])

  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('enter')
  const current = dictionary[index] || ''
  const parts = animateBy === 'letters' ? current.split('') : current.split(' ')
  const dirClass = direction === 'bottom' ? 'blur-dir-bottom' : 'blur-dir-top'

  useEffect(() => {
    const partCount = Math.max(1, parts.length)
    const staggerTotal = (partCount - 1) * delay
    const enterMs = Math.max(520, 420 + staggerTotal)
    const exitMs = Math.max(420, 320 + staggerTotal)
    const t1 = setTimeout(() => setPhase('hold'), enterMs)
    const t2 = setTimeout(() => setPhase('exit'), enterMs + hold)
    const t3 = setTimeout(() => {
      onAnimationComplete?.()
      setIndex((v) => (v + 1) % dictionary.length)
      setPhase('enter')
    }, enterMs + hold + exitMs)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [index, delay, hold, dictionary.length, onAnimationComplete, parts.length])

  return (
    <span className={`blur-text ${dirClass} ${phase} ${className}`}>
      {parts.map((part, i) => (
        <span
          key={`${part}-${i}`}
          className="blur-part"
          style={{ animationDelay: `${i * delay}ms` }}
        >
          {part}
          {animateBy === 'words' && i < parts.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
