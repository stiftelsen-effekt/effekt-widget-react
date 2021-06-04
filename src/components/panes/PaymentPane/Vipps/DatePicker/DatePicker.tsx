import React, { useEffect, useState } from "react";
import { orange20 } from "../../../../../config/colors";
import { Datebox, DateBoxWrapper, DateText, Wrapper } from "./DatePicker.style";
import { formatDate, getNewChargeDayResults } from "./dates";

export const DatePicker: React.FC = () => {
  const [selectedChargeDay, setSelectedChargeDay] = useState<number>(1);
  const [nextChargeDate, setNextChargeDate] = useState<Date>();
  const [forcedChargeDate, setForcedChargeDate] = useState<Date | false>(false);

  useEffect(() => {
    const results = getNewChargeDayResults(selectedChargeDay);
    setNextChargeDate(results.nextChargeDate);
    setForcedChargeDate(results.forcedChargeDate);
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
