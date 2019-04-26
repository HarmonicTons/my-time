import { DatePicker, Form, Radio } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import * as moment from "moment";
import * as React from "react";

const OccurenceForm = ({ form }: FormComponentProps) => {
  const { getFieldDecorator } = form;
  return (
    <Form>
      <Form.Item label="Date">
        {getFieldDecorator("date", {
          rules: [
            {
              required: true,
              message: "Please select the date of the occurence"
            }
          ],
          initialValue: moment()
        })(<DatePicker />)}
      </Form.Item>
      <Form.Item label="Duration">
        {getFieldDecorator("duration", {
          initialValue: 1
        })(
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={1}>1 min</Radio.Button>
            <Radio.Button value={15}>1/4 h</Radio.Button>
            <Radio.Button value={30}>1/2 h</Radio.Button>
            <Radio.Button value={60}>1 h</Radio.Button>
            <Radio.Button value={120}>2 h</Radio.Button>
            <Radio.Button value={240}> 1/2 day</Radio.Button>
            <Radio.Button value={480}>1 day</Radio.Button>
          </Radio.Group>
        )}
      </Form.Item>
    </Form>
  );
};

export default OccurenceForm;
