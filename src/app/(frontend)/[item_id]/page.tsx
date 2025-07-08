import { RichText } from '@payloadcms/richtext-lexical/react'
import { formatPrice } from '@/utils/formatPrice'
import { getItemById } from '@/utils/getItem'
import { Button } from '@/components/ui/button'
import ItemSwiper from './item-swiper'

export default async function ItemPage({ params }: { params: { item_id: number } }) {
  const { item_id } = await params
  const item = await getItemById(item_id)

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen">
      {/* Galería de imágenes */}
      <div className="w-full md:w-2/3 md:h-screen">
        <ItemSwiper item={item} />
      </div>

      {/* Información del producto */}
      <div className="w-full md:w-1/3 p-6 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-3">{item.name}</h1>
        {item.subtitle && <p className="mb-4">{item.subtitle}</p>}

        {item.price_old && (
          <p className="text-2xl font-medium mb-2 line-through opacity-60">
            {formatPrice(item.price_old)}
          </p>
        )}
        <p className="text-2xl font-semibold mb-4">{formatPrice(item.price)}</p>

        {/* Talles disponibles */}
        {item.sizes && item.sizes.length > 0 && (
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-4">Talles disponibles</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border border-gray-400 rounded-lg shadow-md divide-y divide-gray-400">
                <thead className="bg-gray-300">
                  <tr>
                    <th className="w-1/2 px-6 py-3 text-left font-semibold border-r border-gray-400">
                      Talle
                    </th>
                    <th className="w-1/2 px-6 py-3 text-left font-semibold">Stock</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {item.sizes.map((size, index) => (
                    <tr key={index}>
                      <td className="w-1/2 px-6 py-3 border-t border-r border-gray-400">
                        {size.size}
                      </td>
                      <td className="w-1/2 px-6 py-3 border-t border-gray-400">{size.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Botón con link a WhatsApp */}
        <a
          href={`https://wa.me/3492310649?text=Hola,%20quiero%20comprar%20${encodeURIComponent(item.name)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="w-full py-6 text-lg">Adquirir</Button>
        </a>

        {/* Descripción del producto */}
        {item.description && (
          <div className="mt-6 opacity-60">
            <RichText data={item.description} />
          </div>
        )}

        <p className="mt-6 opacity-60">Métodos de pago: transferencia o efectivo.</p>
        <p className="mt-6 opacity-60">Las compras se coordinan por mensajería privada.</p>
        <p className="mt-6 opacity-60">No se hacen devoluciones.</p>
      </div>
    </div>
  )
}

// const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
//   const { isEnabled: draft } = await draftMode()

//   const payload = await getPayload({ config: configPromise })

//   const result = await payload.find({
//     collection: 'items',
//     draft,
//     limit: 1,
//     overrideAccess: draft,
//     pagination: false,
//     where: {
//       slug: {
//         equals: slug,
//       },
//     },
//   })

//   return result.docs?.[0] || null
// })
