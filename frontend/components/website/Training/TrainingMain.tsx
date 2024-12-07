import React from "react";
import TrainingHero from "./TrainingHero";
import Training from "./Training";

type Props = {};

export default function TrainingMain({}: Props) {
  return (
    <div>
      <TrainingHero />
      <Training />
    </div>
  );
}
