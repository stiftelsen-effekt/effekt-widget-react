import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orange20 } from "../../../../../config/colors";
import { setVippsAgreement } from "../../../../../store/donation/actions";
import { State } from "../../../../../store/state";
import { Datebox, DateBoxWrapper, DateText, Wrapper } from "./DatePicker.style";
import { formatDate, getNewChargeDayResults } from "./dates";

export const DatePicker: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedChargeDay, setSelectedChargeDay] = useState<number>(1);
  const [nextChargeDate, setNextChargeDate] = useState<Date>();
  const [forcedChargeDate, setForcedChargeDate] = useState<Date | false>(false);
  const vippsAgreement = useSelector(
    (state: State) => state.donation.vippsAgreement
  );

  useEffect(() => {
    const results = getNewChargeDayResults(selectedChargeDay);
    setNextChargeDate(results.nextChargeDate);
    setForcedChargeDate(results.forcedChargeDate);
    if (vippsAgreement) {
      // eslint-disable-next-line no-console
      console.log(selectedChargeDay);
      dispatch(
        setVippsAgreement({
          ...vippsAgreement,
          forceChargeDate: results.forcedChargeDate
            ? results.forcedChargeDate
            : undefined,
          chargeDay: selectedChargeDay,
        })
      );
    }
  }, [selectedChargeDay]);

  const dateBoxes: JSX.Element[] = [];
  for (let i = 1; i <= 28; i += 1) {
    dateBoxes.push(
      <Datebox
        key={i}
        style={{
          backgroundColor: selectedChargeDay === i ? orange20 : "white",
        }}
        onClick={() => setSelectedChargeDay(i)}
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
      <DateText>
        Startdato blir
        {nextChargeDate && ` ${formatDate(nextChargeDate)}`}
        <br />
        {forcedChargeDate && `Etterfølgende måneder trekkes på ny trekkdag`}
      </DateText>
    </Wrapper>
  );
};
