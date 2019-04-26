import { Button, message, Modal } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { IActivity } from "src/interfaces/IActivity";
import ActivityForm from "./ActivityForm";

interface IProps extends FormComponentProps {
  activity?: IActivity;
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  onDelete: () => void;
  confirmLoading: boolean;
  deleteLoading: boolean;
}

class ActivityFormInModal extends React.Component<IProps> {
  public state = {
    confirmLoading: false,
    deleteLoading: false
  };

  public handleOk = async () => {
    const { activity, onSubmit } = this.props;
    this.setState({
      ...this.state,
      confirmLoading: true
    });
    try {
      await onSubmit();
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

  public handleDelete = async () => {
    const { onDelete } = this.props;
    this.setState({
      ...this.state,
      deleteLoading: true
    });
    try {
      await onDelete();
    } catch (error) {
      message.error("Can't delete activity");
      // tslint:disable-next-line no-console
      console.error(error);
      this.setState({
        deleteLoading: false
      });
      return;
    }
    message.success("Activity succesfully deleted.");
    this.setState({
      deleteLoading: false
    });
    return;
  };

  public render() {
    const { activity, visible, onCancel, form } = this.props;
    return (
      <Modal
        visible={visible}
        title={`${activity ? "Edit" : "Create"} an activity`}
        onCancel={onCancel}
        footer={[
          <Button
            key="delete"
            type="danger"
            loading={this.state.deleteLoading}
            onClick={this.handleDelete}
          >
            Delete
          </Button>,
          <Button key="back" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={this.state.confirmLoading}
            onClick={this.handleOk}
          >
            {activity ? "Edit" : "Create"}
          </Button>
        ]}
      >
        <ActivityForm activity={activity} form={form} />
      </Modal>
    );
  }
}

export default ActivityFormInModal;
