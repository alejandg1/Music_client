import React from "react";
import { Player } from "../../src/components/player";
import { RootContainer } from "../../src/components/container";
import { SecondaryText } from "../../src/components/text";

export default function Downloads() {
  return (
    <RootContainer>
      <SecondaryText text="Downloads" />
      <Player />
    </RootContainer>
  );
};
