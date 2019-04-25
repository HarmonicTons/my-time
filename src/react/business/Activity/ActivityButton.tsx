import { Button, Form, Modal } from "antd";
import * as React from "react";
import { IActivity } from "src/interfaces/IActivity";
import { IUser } from "src/interfaces/IUser";
import { update } from "../../../services/activity";
import ActivityFormInModal from "./ActivityFormInModal";

const ButtonGroup = Button.Group;

const ActivityButton = ({
  activity,
  user,
  onActivityUpdate
}: {
  activity: IActivity;
  user: IUser;
  onActivityUpdate: () => void;
}) => {
  const ActivityCreateForm = Form.create({ name: "activity_form_in_modal" })(
    ActivityFormInModal
  );

  let formRef: any;

  const saveFormRef = (fr: any) => {
    formRef = fr;
  };

  const [modalActivityVisible, setModalActivityVisible] = React.useState(false);
  const [modalOccurenceVisible, setModalOccurenceVisible] = React.useState(
    false
  );

  const closeModalActivity = () => {
    setModalActivityVisible(false);
  };

  const openModalActivity = () => {
    setModalActivityVisible(true);
  };

  const closeModalOccurence = () => {
    setModalOccurenceVisible(false);
  };

  const openModalOccurence = () => {
    setModalOccurenceVisible(true);
  };

  const handleSubmitActivity = async () => {
    if (!formRef) {
      return;
    }

    const form = formRef.props.form;
    const validateForm = new Promise<IActivity>((resolve, reject) => {
      form.validateFields((err: Error, activityValidated: IActivity) => {
        if (err) {
          return reject(err);
        }
        resolve(activityValidated);
      });
    });
    const activityToUpdate = {
      id: activity.id,
      ...(await validateForm)
    };
    await update(user.id, activityToUpdate);
    onActivityUpdate();
    form.resetFields();
    closeModalActivity();
  };

  return (
    <>
      <ButtonGroup size="large">
        <Button
          style={{ backgroundColor: activity.color }}
          onClick={openModalOccurence}
        >
          {activity.name}
        </Button>
        <Button icon="edit" onClick={openModalActivity} />
      </ButtonGroup>
      <ActivityCreateForm
        wrappedComponentRef={saveFormRef}
        activity={activity}
        visible={modalActivityVisible}
        onCancel={closeModalActivity}
        onSubmit={handleSubmitActivity}
      />
      <Modal
        visible={modalOccurenceVisible}
        title="occurence"
        onCancel={closeModalOccurence}
        onOk={closeModalOccurence}
      >
        Occurence
      </Modal>
    </>
  );
};

export default ActivityButton;
