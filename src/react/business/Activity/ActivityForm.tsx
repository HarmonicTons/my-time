import { Form, Input } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import * as React from "react";
import { IActivity } from "src/interfaces/IActivity";

const { TextArea } = Input;

interface IProps extends FormComponentProps {
  activity?: IActivity;
}

const ActivityForm = ({ activity, form }: IProps) => {
  const { getFieldDecorator } = form;
  return (
    <Form>
      <Form.Item label="Name">
        {getFieldDecorator("name", {
          rules: [
            { required: true, message: "Please select the activity name" }
          ],
          initialValue: activity && activity.name
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Description">
        {getFieldDecorator("description", {
          initialValue: activity && activity.description
        })(<TextArea />)}
      </Form.Item>
      <Form.Item label="Color">
        {getFieldDecorator("color", {
          rules: [
            {
              required: true,
              message: "Please select a color for this activity"
            }
          ],
          initialValue: (activity && activity.color) || "#000000"
        })(<Input />)}
      </Form.Item>
    </Form>
  );
};

export default ActivityForm;
