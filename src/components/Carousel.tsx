import React from 'react';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './Carousel.style.css'
import { CarouselWrapper } from './Carousel.style'
import MethodPane from './panes/MethodPane/MethodPane';
import DonorPane from './panes/DonorPane/DonorPane';
import DonationPane from './panes/DonationPane/DonationPane';
import SharesPane from './panes/SharesPane/SharesPane';
import ReferralPane from './panes/ReferralPane/ReferralPane';
import ResultPane from './panes/ResultPane/ResultPane';
import { Collapse } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { State } from '../store/state';
  
export default function Carousel(){
    const currentPane = useSelector((state: State) => state.layout.paneNumber)

    return (
        <CarouselWrapper>
            <Collapse in={currentPane === 0}>
                <MethodPane />
            </Collapse>
            <Collapse in={currentPane === 1}>
                <ResultPane />
            </Collapse>
            <Collapse in={currentPane === 2}>
                <DonationPane />
            </Collapse>
            <Collapse in={currentPane === 3}>
                <SharesPane />
            </Collapse>
            <Collapse in={currentPane === 4}>
                <ReferralPane />
            </Collapse>
            <Collapse in={currentPane === 5}>
                <ResultPane />
            </Collapse>
        </CarouselWrapper>
    );
}