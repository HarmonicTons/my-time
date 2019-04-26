import { message, Modal } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { IActivity } from "src/interfaces/IActivity";
import OccurenceForm from "./OccurenceForm";

interface IProps extends FormComponentProps {
  activity: IActivity;
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  confirmLoading: boolean;
}

class OccurenceFormInModal extends React.Component<IProps> {
  public state = {
    confirmLoading: false
  };

  public handleOk = async () => {
    const { onSubmit } = this.props;
    this.setState({
      confirmLoading: true
    });
    try {
      await onSubmit();
    } catch (error) {
      message.error("Invalid occurence");
      // tslint:disable-next-line no-console
      console.error(error);
      this.setState({
        confirmLoading: false
      });
      return;
    }
    message.success("Occurence succesfully created");
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
        title={activity.name}
        onCancel={onCancel}
        onOk={this.handleOk}
        confirmLoading={this.state.confirmLoading}
      >
        <OccurenceForm form={form} />
      </Modal>
    );
  }
}

export default OccurenceFormInModal;
