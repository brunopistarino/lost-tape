import ItemCard from '@/components/item-card'
import { getGlobal } from '@/utils/getGlobals'

export default async function HomePage() {
  const homeData = await getGlobal('home', 2)
  const homeItems = homeData?.items?.map((item) => item.item).filter(Boolean) || []

  return (
    <div className="relative min-h-screen">
      <img
        src="/recess.gif"
        alt="Fondo animado"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <nav className="absolute top-7 left-0 right-0 z-20 h-20">
        <div className="bg-slate-100 opacity-0 top-0 left-0 right-0 bottom-0 w-full h-full absolute" />

        <img src="/logo.png" alt="" className="mx-auto h-16" />
      </nav>

      <div className="relative z-10 grid place-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-8 mt-24 ">
          {homeItems.map((item: any) => (
            <ItemCard item={item} key={item.id ?? item} />
          ))}
        </main>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
