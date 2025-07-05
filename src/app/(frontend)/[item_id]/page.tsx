import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { cache } from 'react'
import { draftMode } from 'next/headers'

export default async function ItemPage({ params }: { params: { item_id: string } }) {
  const items = await queryItems()

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <RichText data={item.description} />
          <PriceDisplay price={item.price} />
        </div>
      ))}
    </div>
  )
}

const PriceDisplay = ({ price }: { price: number }) => {
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS', // Default to USD if currency is not available
    minimumFractionDigits: 2,
  }).format(price) // Convert cents to dollars

  return <div>{formattedPrice}</div>
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

const queryItems = cache(async () => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'items',
    draft,
    overrideAccess: draft,
  })

  return result.docs || null
})
