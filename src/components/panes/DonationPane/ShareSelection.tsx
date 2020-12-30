import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postDonation } from "../../helpers/network";
import { Organization } from "../../../types/Organization";
import { setShares } from "../../../store/donation/actions";
import { State } from "../../../store/state";
import { ToolTip } from "../../shared/ToolTip/ToolTip";

import { DonationData, OrganizationSplit } from "../../helpers/network.types";
import { NextButton } from "../../shared/Buttons/NavigationButtons.style";
import {
  OrganizationName,
  PercentageText,
  ShareInput,
  ShareInputContainer,
} from "./ShareSelection.style";
import { IServerResponse } from "../../../types/Temp";

const tooltipLink = "https://gieffektivt.no/organisasjoner";

// TODO: Loading animation after submitting

interface PrefetchData {
  isLoading: boolean;
  error: unknown;
  data: IServerResponse<[Organization]>;
}

interface ShareSelectionProps {
  prefetchData: PrefetchData;
}

export const SharesPane: React.FC<ShareSelectionProps> = ({ prefetchData }) => {
  const dispatch = useDispatch();
  const [nextDisabled, setNextDisabled] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const donorName = useSelector((state: State) => state.donation.donor?.name);
  const donorEmail = useSelector((state: State) => state.donation.donor?.email);
  const donorSSN = useSelector((state: State) => state.donation.donor?.ssn);
  const donorNewsletter = useSelector(
    (state: State) => state.donation.donor?.newsletter
  );
  const donationSum = useSelector((state: State) => state.donation.sum);
  const donationMethod = useSelector((state: State) => state.donation.method);
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
      setNextDisabled(false);
      setPercentageErrorAnimation(false);
    } else if (prefetchData.data) {
      setNextDisabled(true);
      setPercentageErrorAnimation(true);
    }
    if (negative) {
      setNextDisabled(true);
      setPercentageErrorAnimation(true);
    }
  }, [watchAllFields]);

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
        const orgSplits: Array<OrganizationSplit> = [];

        Object.keys(watchAllFields).forEach((property) => {
          const split = watchAllFields[property];
          if (split > 0) {
            const orgSplit: OrganizationSplit = { id: 0, split: 0, name: "" };
            orgSplit.id = parseInt(property);
            orgSplit.split = parseInt(watchAllFields[property]);
            prefetchData.data.content.forEach((org: Organization) => {
              if (orgSplit.id === org.id) {
                orgSplit.name = org.name;
              }
            });
            orgSplits.push(orgSplit);
          }
        });

        const postData: DonationData = {
          donor: {
            name: donorName,
            email: donorEmail,
            newsletter: donorNewsletter,
          },
          // TODO: Send payment method as string (not number)
          method: "",
          organizations: orgSplits,
        };
        if (donationSum) postData.amount = donationSum;
        if (donorSSN) postData.donor.ssn = donorSSN.toString();

        // TODO: Move dispatches from network.ts to here
        postDonation(postData, dispatch).then(() => {
          setSubmitLoading(false);
        });
      }
    }
  }

  return (
    <div>
      <h1>Velg fordeling</h1>
      {!submitLoading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {prefetchData.isLoading && <p>Laster inn...</p>}
            {prefetchData.error && <p>Noe gikk galt</p>}
            {prefetchData.data.content.map((org: Organization) =>
              setupOrganizationInput(org)
            )}
          </div>
          {percentageErrorAnimation && (
            <p>
              Du har fordelt
              {`${getTotalPercentage().totalPercentage} / 100%`}
            </p>
          )}
          <NextButton disabled={nextDisabled}>Neste</NextButton>
        </form>
      ) : (
        <p>Laster...</p>
      )}
    </div>
  );
};
