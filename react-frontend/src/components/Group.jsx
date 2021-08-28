import React from "react";
import { groups } from "../utils/data";
import GroupItem from "./GroupItem";

const Group = ({ services }) => {
  // const data = groups.sort((a, b) => a.order_id - b.order_id);

  // if (!data.length > 0) return <></>;

  return (
    <div>
      {services?.map((service) => {
        return <GroupItem key={service.id} service={service} />;
      })}
    </div>
  );
};

export default Group;
