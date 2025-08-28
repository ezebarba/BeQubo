type SeoProps = {
  title?: string
  description?: string
  canonical?: string
  image?: string
}

export default function Seo({
  title = 'Bequbo',
  description = 'Desarrollos y proyectos de Bequbo.',
  canonical,
  image = 'https://www.bequbo.com.ar/og.jpg'
}: SeoProps) {
  const fullTitle = title ? `${title} | Bequbo` : 'Bequbo'
  const url = canonical ?? (typeof window !== 'undefined' ? window.location.href : 'https://www.bequbo.com.ar/')

  return (
    <>
      <meta name="x-seo-managed" content="true" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {url && <link rel="canonical" href={url} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  )
}
