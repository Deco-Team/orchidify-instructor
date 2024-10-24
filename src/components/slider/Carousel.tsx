import Slider, { Settings } from 'react-slick'
import { Children } from 'react'
import styled from '@emotion/styled'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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

const Carousel = ({ children, slidesToShow, ...sliderSettings }: Settings) => {
  const childrenArray = Children.toArray(children)

  const settings = {
    dots: childrenArray.length > (slidesToShow ?? 5),
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(slidesToShow ?? 5, childrenArray.length),
    swipeToSlide: true,
    slidesToScroll: 1,
    arrows: false,
    ...sliderSettings
  }

  return <CustomSlider {...settings}>{childrenArray}</CustomSlider>
}

export default Carousel
