import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Productos',
      fields: [
        {
          name: 'item',
          type: 'relationship',
          relationTo: 'items',
          label: 'Producto',
          required: true,
        },
      ],
    },
  ],
}
