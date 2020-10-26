import React from 'react'
import MethodPane from './panes/MethodPane/MethodPane';
import DonorPane from './panes/DonorPane/DonorPane';
import DonationPane from './panes/DonationPane/DonationPane';
import SharesPane from './panes/SharesPane/SharesPane';
import ReferralPane from './panes/ReferralPane';

function Widget() {

  return (
    <div>
      <MethodPane />
      <DonorPane />
      <DonationPane />
      <SharesPane />
      <ReferralPane />
    </div>
  );
}

export default Widget;
