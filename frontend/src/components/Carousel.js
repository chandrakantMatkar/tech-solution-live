import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true, // Enable center mode
    centerPadding: '0',
  };

  return (
    <Slider {...settings}>
      <div className='fixed-size-div'>
        <img src="https://images.unsplash.com/photo-1581089781785-603411fa81e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1vbml0b3J8ZW58MHwwfDB8fHwy" alt="Slide 1"/>
      </div>
      <div className='fixed-size-div'>
        <img src="https://images.unsplash.com/photo-1591775667978-2222e699c77a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vbml0b3J8ZW58MHwwfDB8fHwy" alt="Slide 2"/>
      </div>
      <div className='fixed-size-div'>
        <img src="https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1vbml0b3J8ZW58MHwwfDB8fHwy" alt="Slide 3"/>
      </div>
      {/* Add more slides as needed */}
    </Slider>
  );
};

export default Carousel;
