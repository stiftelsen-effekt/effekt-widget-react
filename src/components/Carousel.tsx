import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './Carousel.style.css'
import { CarouselWrapper } from './Carousel.style'
import DonationPane from './panes/DonationPane/DonationPane';
import DonorPane from './panes/DonorPane/DonorPane';
import MethodPane from './panes/MethodPane/MethodPane';
import ReferralPane from './panes/ReferralPane/ReferralPane';
import SharesPane from './panes/SharesPane/SharesPane';
  
export default function Carousel(){
    return (
        <CarouselWrapper>
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={200}
                totalSlides={5}
                dragEnabled={false}
            >
            <Slider>
                <Slide index={0}><MethodPane /></Slide>
                <Slide index={1}><DonorPane /></Slide>
                <Slide index={2}><DonationPane /></Slide>
                <Slide index={3}><SharesPane /></Slide>
                <Slide index={4}><ReferralPane /></Slide>
            </Slider>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext id="buttonNext">Next</ButtonNext>
            </CarouselProvider>
        </CarouselWrapper>

        
    );
  
}