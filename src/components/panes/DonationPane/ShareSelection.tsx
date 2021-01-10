import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Organization } from "../../../types/Organization";
import { setShares } from "../../../store/donation/actions";
import { State } from "../../../store/state";
import { ToolTip } from "../../shared/ToolTip/ToolTip";

import {
  OrganizationName,
  PercentageText,
  ShareInput,
  ShareInputContainer,
} from "./ShareSelection.style";
import { OrganizationShare } from "../../../types/Temp";

const tooltipLink = "https://gieffektivt.no/organisasjoner";

export const SharesSelection: React.FC = () => {
  const dispatch = useDispatch();
  const [submitLoading, setSubmitLoading] = useState(false);
  const donorName = useSelector((state: State) => state.donation.donor?.name);
  const donorEmail = useSelector((state: State) => state.donation.donor?.email);
  // const donorSSN = useSelector((state: State) => state.donation.donor?.ssn);
  const donorNewsletter = useSelector(
    (state: State) => state.donation.donor?.newsletter
  );
  // const donationSum = useSelector((state: State) => state.donation.sum);
  const donationMethod = useSelector((state: State) => state.donation.method);
  const organizations = useSelector(
    (state: State) => state.layout.organizations
  );
  const [percentageErrorAnimation, setPercentageErrorAnimation] = useState(
    false
  );
  const { register, watch, handleSubmit, setValue } = useForm({ mode: "all" });
  const watchAllFields = watch();

  function getTotalPercentage() {
    let totalPercentage = 0;
    let detectedNegativeShare = false;
    Object.keys(watchAllFields).forEach((property) => {
      const share = watchAllFields[property];

      if (share !== "") totalPercentage += parseInt(watchAllFields[property]);
      if (share === "0") setValue(property, "");
      if (parseInt(watchAllFields[property], 10) < 0)
        detectedNegativeShare = true;
    });
    return {
      totalPercentage,
      detectedNegativeShare,
    };
  }

  function setupOrganizationInput(org: Organization) {
    return (
      <ShareInputContainer key={org.id}>
        <div>
          <OrganizationName>{org.name}</OrganizationName>
          <ToolTip text={org.shortDesc} link={tooltipLink} />
        </div>
        <div>
          <ShareInput
            type="number"
            inputMode="decimal"
            placeholder="0"
            name={org.id.toString()}
            defaultValue={org.standardShare ? org.standardShare : 0}
            ref={register}
          />
          <PercentageText>%</PercentageText>
        </div>
      </ShareInputContainer>
    );
  }

  useEffect(() => {
    const total = getTotalPercentage().totalPercentage;
    const negative = getTotalPercentage().detectedNegativeShare;
    if (total === 100) {
      // setNextDisabled(false);
      setPercentageErrorAnimation(false);
    } else if (organizations) {
      // setNextDisabled(true);
      setPercentageErrorAnimation(true);
    }
    if (negative) {
      // setNextDisabled(true);
      setPercentageErrorAnimation(true);
    }
  }, [watchAllFields]);

  /**
   * Check if donation is valid on input and set state
   */
  function onSubmit() {
    dispatch(setShares(watchAllFields));
    if (getTotalPercentage().totalPercentage === 100) {
      setSubmitLoading(true);
      if (
        donorName &&
        donorEmail &&
        donationMethod &&
        donorNewsletter !== undefined
      ) {
        const orgShares: Array<OrganizationShare> = [];

        Object.keys(watchAllFields).forEach((property) => {
          const Share = watchAllFields[property];
          if (Share > 0 && organizations) {
            const orgShare: OrganizationShare = { id: 0, share: 0, name: "" };
            orgShare.id = parseInt(property);
            orgShare.share = parseInt(watchAllFields[property]);
            organizations.forEach((org: Organization) => {
              if (orgShare.id === org.id) {
                orgShare.name = org.name;
              }
            });
            orgShares.push(orgShare);
          }
        });

        /*
        const postData: DonationData = {
          donor: {
            name: donorName,
            email: donorEmail,
            newsletter: donorNewsletter,
          },
          // TODO: Send payment method as string (not number)
          method: "",
          organizations: orgShares,
        };
        if (donationSum) postData.amount = donationSum;
        if (donorSSN) postData.donor.ssn = donorSSN.toString();

        // TODO: Move dispatches from network.ts to here
        postDonation(postData, dispatch).then(() => {
          setSubmitLoading(false);
        });
        */
      }
    }
  }

  if (!organizations) return <div>Ingen organisasjoner</div>;

  return (
    <div>
      {!submitLoading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {organizations.map((org: Organization) =>
              setupOrganizationInput(org)
            )}
          </div>
          {percentageErrorAnimation && (
            <p>
              Du har fordelt
              {`${getTotalPercentage().totalPercentage} / 100%`}
            </p>
          )}
        </form>
      ) : (
        <p>Laster...</p>
      )}
    </div>
  );
};
