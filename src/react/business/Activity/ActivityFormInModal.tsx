import { message, Modal } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { IActivity } from "src/interfaces/IActivity";
import ActivityForm from "./ActivityForm";

interface IProps extends FormComponentProps {
  activity?: IActivity;
  visible: boolean;
  onCancel: () => void;
  onSubmit: (activity: IActivity) => void;
  confirmLoading: boolean;
}

class ActivityFormInModal extends React.Component<IProps> {
  public state = {
    confirmLoading: false
  };

  public handleOk = async (activityToSubmit: IActivity) => {
    const { activity, onSubmit } = this.props;
    this.setState({
      confirmLoading: true
    });
    try {
      await onSubmit(activityToSubmit);
    } catch (error) {
      message.error("Invalid activity");
      // tslint:disable-next-line no-console
      console.error(error);
      this.setState({
        confirmLoading: false
      });
      return;
    }
    message.success(
      `Activity succesfully ${activity ? "updated" : "created"}.`
    );
    this.setState({
      confirmLoading: false
    });
    return;
  };

  public render() {
    const { activity, visible, onCancel, form } = this.props;
    return (
      <Modal
        visible={visible}
        title={`${activity ? "Edit" : "Create"} an activity`}
        okText={activity ? "Edit" : "Create"}
        onCancel={onCancel}
        onOk={this.handleOk}
        confirmLoading={this.state.confirmLoading}
      >
        <ActivityForm activity={activity} form={form} />
      </Modal>
    );
  }
}

export default ActivityFormInModal;
