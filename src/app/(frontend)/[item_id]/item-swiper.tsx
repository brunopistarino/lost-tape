'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './swiper-custom.css'
import { Item, Media } from '@/payload-types'

export default function ItemSwiper({ item }: { item: Item }) {
  const itemImages = item.images?.map((image) => image.image).filter(Boolean) || []

  if (itemImages.length === 0) {
    return (
      <div className="relative w-full aspect-square md:aspect-auto md:h-full bg-gray-200 flex items-center justify-center">
        <p>No hay imágenes disponibles</p>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-square md:aspect-auto md:h-full">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active-custom',
        }}
        loop={true}
        className="w-full h-full"
        style={{ height: '100%' }}
      >
        {itemImages.map((image, index) => {
          const mediaImage = typeof image === 'object' ? (image as Media) : null
          return (
            <SwiperSlide key={index} className="w-full h-full">
              <div className="relative w-full h-full aspect-square md:aspect-auto md:min-h-[600px]">
                <Image
                  src={mediaImage?.url || '/placeholder.svg'}
                  alt={mediaImage?.alt || `${item.name} - Imagen ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 66vw"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* Custom navigation buttons */}
      {itemImages.length > 1 && (
        <>
          <button
            className="swiper-button-prev-custom hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all duration-200 z-10"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="swiper-button-next-custom hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all duration-200 z-10"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  )
}
