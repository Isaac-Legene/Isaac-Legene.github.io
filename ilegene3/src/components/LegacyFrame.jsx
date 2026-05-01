export default function LegacyFrame({ src, title }) {
  return (
    <iframe
      src={src}
      title={title}
      style={{
        width: '100%',
        height: 'calc(100vh - 64px)',
        border: 'none',
        display: 'block',
        marginTop: '64px',
        background: '#000'
      }}
    />
  )
}
