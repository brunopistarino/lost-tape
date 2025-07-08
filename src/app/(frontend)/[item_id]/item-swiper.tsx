'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { Item } from '@/payload-types'

export default function ItemSwiper({ item }: { item: Item }) {
  const itemImages = item.images?.map((image) => image.image).filter(Boolean) || []

  return (
    <Swiper pagination={true} modules={[Pagination]}>
      {itemImages.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image.url} alt={image.alt || `Slide ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
