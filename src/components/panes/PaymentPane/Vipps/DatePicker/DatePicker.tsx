import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orange20 } from "../../../../../config/colors";
import { setVippsAgreement } from "../../../../../store/donation/actions";
import { State } from "../../../../../store/state";
import { CustomCheckBox } from "../../../DonorPane/CustomCheckBox";
import { CheckBoxWrapper, HiddenCheckBox } from "../../../Forms.style";
import {
  Datebox,
  DateBoxWrapper,
  DateText,
  DateTextWrapper,
  Wrapper,
} from "./DatePicker.style";
import { calculateNextCharge, formatDate } from "./dates";

export const DatePicker: React.FC = () => {
  const dispatch = useDispatch();
  const vippsAgreement = useSelector(
    (state: State) => state.donation.vippsAgreement
  );
  const [selectedChargeDay, setSelectedChargeDay] = useState<number>(
    vippsAgreement.monthlyChargeDay
  );
  const [nextChargeDate, setNextChargeDate] = useState<Date>();
  const [chargeThisMonth, setChargeThisMonth] = useState<boolean>(true);

  useEffect(() => {
    const nextCharge = calculateNextCharge(selectedChargeDay, chargeThisMonth);
    dispatch(
      setVippsAgreement({
        ...vippsAgreement,
        monthlyChargeDay: selectedChargeDay,
        initialCharge: nextCharge.initialCharge,
        captureChargeDate: nextCharge.captureChargeDate,
      })
    );
    setNextChargeDate(nextCharge.nextChargeDate);
  }, [selectedChargeDay, chargeThisMonth]);

  const dateBoxes: JSX.Element[] = [];
  for (let i = 1; i <= 28; i += 1) {
    dateBoxes.push(
      <Datebox
        key={i}
        style={{
          backgroundColor: selectedChargeDay === i ? orange20 : "white",
        }}
        onClick={() => {
          if (i > new Date().getDate() + 3) {
            setChargeThisMonth(false);
          }
          setSelectedChargeDay(i);
        }}
      >
        {i}
      </Datebox>
    );
  }

  return (
    <Wrapper>
      <DateBoxWrapper>
        {dateBoxes.map((box) => {
          return box;
        })}
        <Datebox
          key="0"
          style={{
            backgroundColor: selectedChargeDay === 0 ? orange20 : "white",
            width: "120px",
          }}
          onClick={() => {
            setSelectedChargeDay(0);
          }}
        >
          Siste hver måned
        </Datebox>
      </DateBoxWrapper>
      <DateTextWrapper>
        <DateText>
          {selectedChargeDay < new Date().getDate() &&
          selectedChargeDay !== 0 &&
          vippsAgreement.initialCharge
            ? "Første trekk blir i dag"
            : nextChargeDate &&
              `Første trekk blir ${formatDate(nextChargeDate)}`}
          <br />
        </DateText>
        {selectedChargeDay < new Date().getDate() && selectedChargeDay !== 0 && (
          <CheckBoxWrapper>
            <HiddenCheckBox
              name="initialCharge"
              type="checkbox"
              onChange={() => {
                (document.activeElement as HTMLElement).blur();
                setChargeThisMonth(!chargeThisMonth);
              }}
            />
            <CustomCheckBox
              label="Trekk meg denne måneden også"
              checked={chargeThisMonth}
            />
          </CheckBoxWrapper>
        )}
      </DateTextWrapper>
    </Wrapper>
  );
};
