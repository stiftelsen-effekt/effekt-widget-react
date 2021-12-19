import React from "react";
import { OrangeLink } from "../../../Widget.style";
import { Pane, PaneContainer, PaneTitle, UnderTitle } from "../../Panes.style";

export const BitCoinPane: React.FC = () => {
  return (
    <Pane>
      <PaneContainer>
        <PaneTitle>Tusen takk!</PaneTitle>
        <UnderTitle>Du kan nå overføre til oss</UnderTitle>
        <div style={{ textAlign: "center" }}>
          <img
            src="https://thumb.tildacdn.com/tild3530-3036-4434-a366-363935306361/-/resize/500x/-/format/webp/image.png"
            alt="wallet-qr"
            style={{ width: "65%" }}
          />
        </div>
        <p>
          Doner bitcoin til vår wallet adresse:
          <strong style={{ display: "block" }}>
            bc1qflz6uau39k4l48zn8p9d3s5vlmqk09ekpsga25
          </strong>
          eller bruk QR-koden over.
        </p>
        <p>
          Merk at donasjon av kryptovaluta&nbsp;
          <strong>ikke utløser gevinstskatt.</strong>
          &nbsp;Enn så lenge registrer vi ikke donor eller fordeling ved
          &nbsp;donasjoner av krypto, så din donasjon vil støtte effektiv
          bistand gjennom&nbsp;
          <OrangeLink
            href="http://www.gieffektivt.no/organisasjoner"
            target="_blank"
          >
            GiveWells tildelingsfond
          </OrangeLink>
          .
        </p>
        <p>
          <OrangeLink href="https://www.gieffektivt.no/krypto" target="_blank">
            Les mer om donasjon av krypto
          </OrangeLink>
          . Ta kontakt på&nbsp;
          <OrangeLink href="mailto:donasjon@gieffektivt.no" target="_blank">
            donasjon@gieffektivt.no
          </OrangeLink>
          &nbsp;for spørsmål
        </p>
      </PaneContainer>
    </Pane>
  );
};
