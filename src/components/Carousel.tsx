import React, { useRef } from 'react';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './Carousel.style.css'
import { CarouselWrapper } from './Carousel.style'
import { useSelector } from 'react-redux';
import { State } from '../store/state';
import { PaymentPane } from './panes/PaymentPane/PaymentPane';
import { DonorPane } from './panes/DonorPane/DonorPane';
import { DonationPane } from './panes/DonationPane/DonationPane';
import { SharesPane } from './panes/SharesPane/SharesPane';
import { ReferralPane } from './panes/ReferralPane/ReferralPane';
import { MethodPane } from './panes/MethodPane/MethodPane';

  
export default function Carousel(){
    const currentPane = useSelector((state: State) => state.layout.paneNumber)
    const height = useSelector((state: State) => state.layout.height)

    let pane = null;
    switch (currentPane) {
        case 0:
            pane = <MethodPane />;
            break;
        case 1:
            pane = <DonorPane />;
            break;
        case 2:
            pane = <DonationPane />;
            break;
        case 3:
            pane = <ReferralPane />;
            break;
        case 4:
            pane = <PaymentPane />;
            break;
    }

    return (
        <CarouselWrapper>
            {pane}
        </CarouselWrapper>
    );
}