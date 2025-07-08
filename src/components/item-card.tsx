import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import type { Item, Media } from '@/payload-types'
import { formatPrice } from '@/utils/formatPrice'

export default function ItemCard({ item }: { item: Item }) {
  const stock = item.sizes.reduce((acc, variant) => acc + (variant.stock || 0), 0)

  // Helper function to check if coverImage is a Media object
  const isMedia = (image: number | Media | null | undefined): image is Media => {
    return typeof image === 'object' && image !== null && 'url' in image
  }

  const imageUrl = isMedia(item.coverImage) ? item.coverImage.url : '/placeholder.svg'

  return (
    <Link href={'/' + item.id}>
      <Card className="w-[300px] overflow-hidden py-0 gap-0">
        <CardHeader className="p-0">
          <div className="relative w-full aspect-square">
            <Image
              src={imageUrl || '/placeholder.svg'}
              alt={item.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 ">
          <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
          {item.price_old && (
            <p className="text-lg line-through opacity-60 ">{formatPrice(item.price_old)}</p>
          )}
          <p className="text-lg font-semibold">{formatPrice(item.price)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-center">
          <Badge variant={stock > 0 ? 'default' : 'destructive'}>
            {stock > 0 ? `Stock: ${stock}` : 'Sin stock'}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  )
}
