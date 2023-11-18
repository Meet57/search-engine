import { Card } from "antd";
import React from "react";

const JobCardComponent = (props) => {
  return (
    <Card className="my-3" title={props.title} bordered={false} style={{ width: "100%" }} extra={<a target="_blank" href={props.link}>Click Here</a>} >
      <p>{props.description}</p>
    </Card>
  );
};

export default JobCardComponent;
