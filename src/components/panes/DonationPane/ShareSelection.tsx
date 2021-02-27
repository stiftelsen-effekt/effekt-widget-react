import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Validator from "validator";
import { setShares } from "../../../store/donation/actions";
import { State } from "../../../store/state";
import { TextInput } from "../../shared/Input/TextInput";

export const SharesSelection: React.FC = () => {
  const dispatch = useDispatch();
  const organizations = useSelector(
    (state: State) => state.layout.organizations
  );
  const shareState = useSelector((state: State) => state.donation.shares);

  if (!organizations) return <div>Ingen organisasjoner</div>;

  return (
    <div>
      <div>
        {shareState.map((share) => (
          <div key={share.id}>
            <TextInput
              label={organizations.filter((org) => org.id === share.id)[0].name}
              tooltipText={
                organizations.filter((org) => org.id === share.id)[0].shortDesc
              }
              key={share.id}
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={share.split.toString()}
              onChange={(e) => {
                const newShareState = [...shareState];
                const index = newShareState
                  .map((s) => {
                    return s.id;
                  })
                  .indexOf(share.id);
                newShareState[index].split = Validator.isInt(e.target.value)
                  ? parseInt(e.target.value)
                  : 0;
                dispatch(setShares(newShareState));
              }}
              denomination="%"
              selectOnClick
            />
          </div>
        ))}
      </div>
    </div>
  );
};
