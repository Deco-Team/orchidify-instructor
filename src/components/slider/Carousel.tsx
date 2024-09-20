import { ReactNode } from 'react'
import Slider from 'react-slick'
import { Children } from 'react'
import styled from '@emotion/styled'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface SliderProps {
  children: ReactNode
}

const CustomSlider = styled(Slider)`
  .slick-track {
    display: flex;
    flex-wrap: nowrap;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    width: auto !important;
    flex: 0 0 auto;
  }
`

const Carousel = ({ children }: SliderProps) => {
  const childrenArray = Children.toArray(children)

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(5, childrenArray.length),
    swipeToSlide: true,
    slidesToScroll: 1,
    arrows: false
  }

  return <CustomSlider {...settings}>{childrenArray}</CustomSlider>
}

export default Carousel
