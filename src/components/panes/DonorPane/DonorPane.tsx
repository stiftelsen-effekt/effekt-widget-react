/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Validate from "validator";
import { useForm } from "react-hook-form";
import { OrangeLink, Pane } from "../Panes.style";
import { DonorInput, State } from "../../../store/state";
import { submitDonorInfo } from "../../../store/donation/actions";
import { InputFieldWrapper, InputLabel, HiddenCheckBox } from "../Forms.style";
import ErrorField from "../../shared/Error/ErrorField";
import { DonorForm } from "./DonorPane.style";
import { RichSelect } from "../../shared/RichSelect/RichSelect";
import { DonorType } from "../../../types/Temp";
import { RichSelectOption } from "../../shared/RichSelect/RichSelectOption";
import { NextButton } from "../../shared/Buttons/NavigationButtons.style";
import { nextPane, selectPrivacyPolicy } from "../../../store/layout/actions";
import { TextInput } from "../../shared/Input/TextInput";
import { HistoryBar } from "../../shared/HistoryBar/HistoryBar";
import { CustomCheckBox } from "./CustomCheckBox";
import { ToolTip } from "../../shared/ToolTip/ToolTip";

interface DonorFormValues extends DonorInput {
  privacyPolicy: boolean;
}

const tooltipText =
  "Vi trenger ditt fødselsnummer for å rapportere skattefradrag til Skatteetaten for at du skal få skattefradrag for donasjonen din.";
// const tooltipLink = "https://gieffektivt.no/skattefradrag";
const anonDonor: DonorFormValues = {
  name: "Anonym Giver",
  email: "anon@gieffektivt.no",
  taxDeduction: false,
  ssn: 12345678910,
  newsletter: false,
  privacyPolicy: true,
};

export const DonorPane: React.FC = () => {
  const dispatch = useDispatch();
  const donor = useSelector((state: State) => state.donation.donor);
  const layoutState = useSelector((state: State) => state.layout);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [nameErrorAnimation, setNameErrorAnimation] = useState(false);
  const [emailErrorAnimation, setEmailErrorAnimation] = useState(false);
  const [ssnErrorAnimation, setSsnErrorAnimation] = useState(false);
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(
    layoutState.privacyPolicy
  );
  const [newsletterChecked, setNewsletterChecked] = useState(
    donor?.newsletter ? donor.newsletter : false
  );
  const [taxDeductionChecked, setTaxDeductionChecked] = useState(
    donor?.taxDeduction ? donor.taxDeduction : false
  );
  const [donorType, setDonorType] = useState<DonorType>(DonorType.DONOR);
  const [
    privacyPolicyErrorAnimation,
    setPrivacyPolicyErrorAnimation,
  ] = useState(false);
  const {
    register,
    watch,
    errors,
    handleSubmit,
    clearErrors,
    setValue,
  } = useForm<DonorFormValues>();
  const watchAllFields = watch();

  useEffect(() => {
    setValue("taxDeduction", donor?.taxDeduction);
    setValue("newsletter", donor?.newsletter);
    setValue("privacyPolicy", layoutState.privacyPolicy);
  }, []);

  useEffect(() => {
    errors.name ? setNameErrorAnimation(true) : setNameErrorAnimation(false);
    errors.email ? setEmailErrorAnimation(true) : setEmailErrorAnimation(false);
    errors.ssn ? setSsnErrorAnimation(true) : setSsnErrorAnimation(false);
    errors.privacyPolicy
      ? setPrivacyPolicyErrorAnimation(true)
      : setPrivacyPolicyErrorAnimation(false);

    if (donorType === DonorType.ANONYMOUS) {
      setNextDisabled(false);
    } else if (Object.keys(errors).length === 0) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  }, [donorType, dispatch, errors, watchAllFields]);

  const paneSubmitted = (data: DonorFormValues) => {
    dispatch(
      submitDonorInfo(
        data.name ? data.name : "",
        data.email ? data.email : "",
        data.taxDeduction ? data.taxDeduction : false,
        data.taxDeduction && data.ssn ? data.ssn : 1,
        data.newsletter ? data.newsletter : false
      )
    );
    dispatch(selectPrivacyPolicy(watchAllFields.privacyPolicy));
    dispatch(nextPane());
  };

  const submitAnonymous = () => {
    dispatch(
      submitDonorInfo(
        anonDonor.name ? anonDonor.name : "",
        anonDonor.email ? anonDonor.email : "",
        anonDonor.taxDeduction ? anonDonor.taxDeduction : false,
        anonDonor.ssn ? anonDonor.ssn : 1,
        anonDonor.newsletter ? anonDonor.newsletter : false
      )
    );
    dispatch(selectPrivacyPolicy(watchAllFields.privacyPolicy));
    dispatch(nextPane());
  };

  return (
    <Pane>
      <HistoryBar />
      <DonorForm onSubmit={handleSubmit(paneSubmitted)}>
        <RichSelect
          selected={donorType}
          onChange={(type: DonorType) => setDonorType(type)}
        >
          <RichSelectOption label="Info om deg" value={DonorType.DONOR}>
            <InputFieldWrapper>
              {nameErrorAnimation && <ErrorField text="Ugyldig navn" />}
              <TextInput
                name="name"
                type="text"
                placeholder="Navn"
                defaultValue={donor?.name}
                innerRef={register({ required: true, minLength: 3 })}
              />
              {emailErrorAnimation && <ErrorField text="Ugyldig epost" />}
              <TextInput
                name="email"
                type="text"
                placeholder="Epost"
                defaultValue={donor?.email}
                innerRef={register({
                  required: true,
                  validate: (val) => Validate.isEmail(val),
                })}
              />
            </InputFieldWrapper>
            <div>
              <div>
                <CustomCheckBox checked={taxDeductionChecked} />
                <HiddenCheckBox
                  name="taxDeduction"
                  type="checkbox"
                  ref={register}
                  onChange={(e) => {
                    !e.target.checked && clearErrors(["ssn"]);
                    setTaxDeductionChecked(!taxDeductionChecked);
                  }}
                />
                <ToolTip
                  text={tooltipText}
                  marginTop="10px"
                  marginLeft="-195px"
                  textMarginTop="-115px"
                  textMarginLeft="-105px"
                />
                <InputLabel>Jeg ønsker skattefradrag</InputLabel>
                {watchAllFields.taxDeduction && (
                  <InputFieldWrapper>
                    {ssnErrorAnimation && (
                      <ErrorField text="Ugyldig personnummer" />
                    )}
                    <TextInput
                      name="ssn"
                      type="tel"
                      placeholder="Personnummer"
                      defaultValue={donor?.ssn}
                      innerRef={register({
                        required: false,
                        validate: (val) =>
                          !watchAllFields.taxDeduction ||
                          (Validate.isInt(val) &&
                            Validate.isLength(val, { min: 9, max: 11 })),
                      })}
                    />
                  </InputFieldWrapper>
                )}
              </div>
              <div>
                <CustomCheckBox checked={newsletterChecked} />
                <HiddenCheckBox
                  name="newsletter"
                  type="checkbox"
                  ref={register}
                  onClick={() => setNewsletterChecked(!newsletterChecked)}
                />
                <InputLabel>Jeg ønsker å melde meg på nyhetsbrevet</InputLabel>
              </div>
              <div>
                {privacyPolicyErrorAnimation && (
                  <ErrorField text="Du må godta personvernerklæringen" />
                )}
                <CustomCheckBox checked={privacyPolicyChecked} />
                <HiddenCheckBox
                  name="privacyPolicy"
                  type="checkbox"
                  ref={register({ required: true })}
                  onClick={() => setPrivacyPolicyChecked(!privacyPolicyChecked)}
                />
                <InputLabel>Jeg godtar</InputLabel>
                <OrangeLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://gieffektivt.no/samarbeid-drift#personvern"
                >
                  personvernerklæringen
                </OrangeLink>
              </div>
            </div>
          </RichSelectOption>

          <RichSelectOption label="Doner anonymt" value={DonorType.ANONYMOUS} />
        </RichSelect>
        {donorType === DonorType.DONOR ? (
          <NextButton type="submit" disabled={nextDisabled}>
            Neste
          </NextButton>
        ) : null}
        {donorType === DonorType.ANONYMOUS ? (
          <NextButton onClick={submitAnonymous} disabled={nextDisabled}>
            Neste
          </NextButton>
        ) : null}
      </DonorForm>
    </Pane>
  );
};
