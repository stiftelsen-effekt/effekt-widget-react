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
import { Collapse } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { State, PaneNumber } from '../store/state';

  
export default function Carousel(){
    const currentPane = useSelector((state: State) => state.layout.paneNumber)

    return (
        <CarouselWrapper>
            <Collapse in={currentPane === PaneNumber.MethodPane}>
                <MethodPane />
            </Collapse>
            <Collapse in={currentPane === PaneNumber.DonorPane}>
                <DonorPane />
            </Collapse>
            <Collapse in={currentPane === PaneNumber.DonationPane}>
                <DonationPane />
            </Collapse>
            <Collapse in={currentPane === PaneNumber.SharesPane}>
                <SharesPane />
            </Collapse>
            <Collapse in={currentPane === PaneNumber.ReferralPane}>
                <ReferralPane />
            </Collapse>
            <Collapse in={currentPane === PaneNumber.PayPalPane}>
                <PayPalPane />
            </Collapse>
            <Collapse in={currentPane === PaneNumber.VippsPane}>
                <VippsPane />
            </Collapse>
            <Collapse in={currentPane === PaneNumber.ResultPane}>
                <ResultPane />
            </Collapse>
        </CarouselWrapper>
    );
}