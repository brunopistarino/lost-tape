import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Items: CollectionConfig = {
  slug: 'items',
  labels: {
    singular: 'Producto',
    plural: 'Productos',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      label: 'Subtítulo',
      type: 'text',
      required: false,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          label: 'Precio actual',
          type: 'number',
          required: true,
        },
        {
          name: 'price_old',
          label: 'Precio anterior',
          type: 'number',
          required: false,
        },
      ],
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
    },
    {
      name: 'sizes',
      label: 'Talles',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'size',
              label: 'Talle',
              type: 'text',
            },
            {
              name: 'stock',
              label: 'Stock',
              type: 'number',
            },
          ],
        },
      ],
      required: true,
    },
    {
      name: 'coverImage',
      label: 'Imagen de portada',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'images',
      label: 'Imágenes',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
