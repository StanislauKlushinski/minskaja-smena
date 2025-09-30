'use client'
import React from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import './mySwiper.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import Image from 'next/image'

import img1 from '@/assets/structure/1.png'
import img2 from '@/assets/structure/2.png'
import img3 from '@/assets/structure/3.png'

const images = [img1, img2, img3, img1, img2]

export default function MySwiper () {
  return (
    <Swiper
      modules={[EffectCoverflow, Pagination]}
      effect='coverflow'
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={2}
      loop={true}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 0,
        scale: 0.45,
        modifier: 1,
        slideShadows: false
      }}
      pagination={{
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class='${className}'></span>`
        }
      }}
      className='w-full mx-auto'
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} className='w-[220px] h-80 flex-shrink-0'
                     style={{
                       display: 'flex',
                       flexDirection: 'column',
                       alignItems: 'center'
                     }}>
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            width={220}
            height={155}
            priority={index === 0}
            className='w-full h-full object-cover'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}