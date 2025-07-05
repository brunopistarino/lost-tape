import ItemCard from '@/components/item-card'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { cache } from 'react'
import { draftMode } from 'next/headers'

export default async function Home() {
  const items = await queryItems()
  console.log(items)
  return (
    <div className="relative min-h-screen">
      {/* Video de fondo 
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/recess.gif" type="video/mp4" />
        Error al cargar el video
      </video>
*/}
      <img
        src="/recess.gif"
        alt="Fondo animado"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <nav className="absolute top-7 left-0 right-0 z-20 h-20">
        <div className="bg-slate-100 opacity-0 top-0 left-0 right-0 bottom-0 w-full h-full absolute" />

        <img src="/logo.png" alt="" className="mx-auto h-16" />
      </nav>

      {/* Contenido principal */}
      <div className="relative z-10 grid place-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-8 mt-24 ">
          {/* {PRODUCTOS.map((producto, x) => (
            <ItemCard {...producto} key={x} />
          ))} */}
        </main>
      </div>

      {/* Filtro oscuro opcional 
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-5"></div>*/}
    </div>
  )
}

const queryItems = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'items',
  })

  return result.docs || null
})
