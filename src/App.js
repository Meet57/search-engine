import { Col, Divider, Row } from "antd";
import SearchBoxComponent from "./components/SearchBoxComponent";
import JobWidgetsComponent from "./components/JobWidgetsComponent";

function App() {
  return (
    <Row className="mt-5 flex justify-center">
        <Col span={18}>
          <div className="text-4xl mb-6">Enter the job you are looking for: </div>
          <SearchBoxComponent />
          <Divider />
          <JobWidgetsComponent />
        </Col>
    </Row>
  );
}

export default App;
