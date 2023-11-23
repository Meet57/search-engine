import {Card} from "antd";
import React from "react";
import {Button} from 'antd';

const JobCardComponent=(props) => {
  return (
    <Card className="my-3" title={props.title} bordered={false} style={{width: "100%"}} extra={<Button onClick={props.showLargeDrawer}>Click Here</Button>} >
      <p>{props.description}</p>
    </Card>
  );
};

export default JobCardComponent;
