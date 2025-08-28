type SmartImageProps = {
  // import de imagetools con ?w=...&format=...&as=picture
  source: any
  alt: string
  className?: string
  priority?: boolean
}

export default function SmartImage({ source, alt, className, priority }: SmartImageProps) {
  const { img, sources } = source ?? {}
  const loading = priority ? 'eager' : 'lazy'

  return (
    <picture>
      {Array.isArray(sources) &&
        sources.map((s: any, i: number) => (
          <source key={i} srcSet={s.srcset} type={s.type} sizes="100vw" />
        ))}
      <img
        src={img?.src ?? source}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </picture>
  )
}
