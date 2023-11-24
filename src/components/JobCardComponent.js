import { Card } from "antd";
import React from "react";
import { Button } from "antd";
import locationIcon from "./../assets/images/location.png";

const JobCardComponent = (props) => {
  const { id, title, description, location, showLargeDrawer } = props;
  return (
    <Card
      className="my-3"
      title={title}
      bordered={false}
      style={{ width: "100%" }}
      extra={<Button onClick={() => showLargeDrawer(props)}>View More</Button>}
    >
      <div className="flex">
        <span>
          <img src={locationIcon} style={{ width: "20px" }} />
        </span>
        <span className="mb-2 ml-1 text-base text-gray-600">{location}</span>
      </div>
      <p className="description">{description}</p>
    </Card>
  );
};

export default JobCardComponent;
