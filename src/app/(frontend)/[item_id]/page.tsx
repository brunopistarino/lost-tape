import { RichText } from '@payloadcms/richtext-lexical/react'
import { formatPrice } from '@/utils/formatPrice'
import { getItemById } from '@/utils/getItem'
import ItemSwiper from './item-swiper'

export default async function ItemPage({ params }: { params: { item_id: number } }) {
  const { item_id } = await params
  const item = await getItemById(item_id)

  return (
    <div>
      <ItemSwiper item={item} />
      <p>{item.name}</p>
      {item.description && <RichText data={item.description} />}
      <p>{formatPrice(item.price)}</p>
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
