import React from 'react';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './Carousel.style.css'
import { CarouselWrapper } from './Carousel.style'
import MethodPane from './panes/MethodPane/MethodPane';
import DonorPane from './panes/DonorPane/DonorPane';
import DonationPane from './panes/DonationPane/DonationPane';
import SharesPane from './panes/SharesPane/SharesPane';
import PayPalPane from './panes/PayPalPane/PayPalPane'
import VippsPane from './panes/VippsPane/VippsPane';
import ReferralPane from './panes/ReferralPane/ReferralPane';
import ResultPane from './panes/ResultPane/ResultPane';
import { useSelector } from 'react-redux';
import { State } from '../store/state';

  
export default function Carousel(){
    const currentPane = useSelector((state: State) => state.layout.paneNumber)

    return (
        <CarouselWrapper>
            <MethodPane />
            <DonorPane />
            <DonationPane />
            <SharesPane />
            <ReferralPane />
            <PayPalPane />
            <VippsPane />
            <ResultPane />
        </CarouselWrapper>
    );
}