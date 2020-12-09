import React from 'react'
import { DonationPane } from './panes/DonationPane/DonationPane';
import { DonorPane } from './panes/DonorPane/DonorPane';
import { MethodPane } from './panes/MethodPane/MethodPane';
import { PaymentPane } from './panes/PaymentPane/PaymentPane';
import { ReferralPane } from './panes/ReferralPane/ReferralPane';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useSelector } from 'react-redux';
import { State } from '../store/state';

function Widget() {
  const currentPane = useSelector((state: State) => state.layout.paneNumber)

  console.log("Rerender widget")

  return (
    <div style={{ display: 'block', maxWidth: '100vw', margin: '0 auto' }}>
        <Carousel 
          dynamicHeight={true} 
          selectedItem={currentPane} 
          showArrows={false} 
          showIndicators={false} 
          showStatus={false}
          showThumbs={false}
          transitionTime={200}
          onChange={() => {}}>
          <MethodPane />
          <DonorPane />
          <DonationPane />
          <ReferralPane />
          <PaymentPane />
      </Carousel>
    </div>
  );
}

export default Widget;
