import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface ItemCardProps {
  titulo: string
  slug: string
  headerImage: string
  stock: number
  precio: number
  oferta: number
}

export default function ItemCard({
  titulo,
  slug,
  headerImage,
  stock,
  precio,
  oferta,
}: ItemCardProps) {
  return (
    <Link href={'/' + slug}>
      <Card className="w-[300px] overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative w-full aspect-square">
            <Image
              src={headerImage || '/placeholder.svg'}
              alt={titulo}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 ">
          <CardTitle className="text-lg font-bold">{titulo}</CardTitle>
          <p className="text-lg line-through opacity-60 ">{precio}</p>
          <p className="text-lg font-semibold">{oferta}</p>
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
