"use client";
import React from "react";
import AcitvityDetail from "./ActivityDetail";
import OtherActivitiesHero from "./OtherActivitiesHero";
import RelatedActivities from "./RelatedActivities";

type Props = {};

function OtherActivitiesMain({ activity }: any) {
  return (
    <>
      {activity && (
        <div>
       
          <AcitvityDetail activity={activity} />
          <RelatedActivities activity={activity} />
        </div>
      )}
    </>
  );
}

export default OtherActivitiesMain;
