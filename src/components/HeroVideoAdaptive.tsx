import { useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  srcLandscape: string
  srcPortrait: string
  posterLandscape?: string
  posterPortrait?: string
  heightVh?: number           // alto del hero en vh (default 92)
  portraitBelowPx?: number    // fuerza portrait si el ancho < X (default 768)
  className?: string
}

export default function HeroVideoAdaptive({
  srcLandscape,
  srcPortrait,
  posterLandscape,
  posterPortrait,
  heightVh = 92,
  portraitBelowPx = 768,
  className,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [usePortrait, setUsePortrait] = useState(false)
  const [fit, setFit] = useState<'cover' | 'contain'>('cover')
  const [ratio, setRatio] = useState<number | null>(null)

  // Elegir video/poster según estado
  const { src, poster } = useMemo(() => {
    return usePortrait
      ? { src: srcPortrait, poster: posterPortrait }
      : { src: srcLandscape, poster: posterLandscape }
  }, [usePortrait, srcLandscape, srcPortrait, posterLandscape, posterPortrait])

  // Detectar orientación / ancho
  useEffect(() => {
    const mm = window.matchMedia?.('(orientation: portrait)')
    const compute = () => {
      const w = window.innerWidth
      const portraitByMQ = mm ? mm.matches : w < window.innerHeight
      setUsePortrait(portraitByMQ || w < portraitBelowPx)
    }
    compute()
    mm?.addEventListener?.('change', compute)
    window.addEventListener('resize', compute)
    return () => {
      mm?.removeEventListener?.('change', compute)
      window.removeEventListener('resize', compute)
    }
  }, [portraitBelowPx])

  // Evitar upscaling: ajustar cover/contain según videoWidth/Height vs pantalla (con DPR)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onMeta = () => {
      const vw = video.videoWidth
      const vh = video.videoHeight
      if (!vw || !vh) return

      setRatio(vw / vh)

      const dpr = window.devicePixelRatio || 1
      const cssW = window.innerWidth
      const cssH = (heightVh / 100) * window.innerHeight
      const needUpscaleW = vw < cssW * dpr
      const needUpscaleH = vh < cssH * dpr

      setFit(needUpscaleW || needUpscaleH ? 'contain' : 'cover')
    }
    video.addEventListener('loadedmetadata', onMeta)
    return () => video.removeEventListener('loadedmetadata', onMeta)
  }, [src, heightVh])

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: `${heightVh}vh`,
        aspectRatio: ratio ? `${ratio} / 1` : undefined,
        backgroundColor: '#000',
        overflow: 'hidden',
      }}
    >
      <video
        key={src}            // fuerza recarga cuando cambia de portrait/landscape
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: fit,
        }}
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta el video HTML5.
      </video>
    </div>
  )
}
