import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import bannerImg1 from '../assets/Banner1.png'
import bannerImg2 from '../assets/Banner2.png'
import bannerImg3 from '../assets/Banner3.png'

const Banner = () => {
    return (
         <Carousel autoPlay={true}
         infiniteLoop={true}
         showThumbs={false}
         interval={2000}
          >
                <div>
                    <img className='w-225 h-160' src={bannerImg1} />
                    
                </div>
                <div>
                    <img className='w-225 h-160' src={bannerImg2} />
                   
                </div>
                <div>
                    <img className='w-225 h-160' src={bannerImg3} />
                    
                </div>
            </Carousel>
    );
};

export default Banner;
