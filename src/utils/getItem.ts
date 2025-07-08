import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const getItemById = async (id: number) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'items',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      id: {
        equals: id,
      },
    },
  })

  return result.docs[0] || null
}
