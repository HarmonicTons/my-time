import { Button, Form, Modal } from "antd";
import * as React from "react";
import { IActivity } from "src/interfaces/IActivity";
import { IOccurence } from "src/interfaces/IOccurence";
import { IUser } from "src/interfaces/IUser";
import { update as updateActivity } from "../../../services/activity";
import { create as createOccurence } from "../../../services/occurence";
import ActivityFormInModal from "./ActivityFormInModal";
import OccurenceFormInModal from "./OccurenceFormInModal";

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

interface IFormActivity {
  name: string;
  description?: string;
  color: string;
}

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
  const OccurenceCreateForm = Form.create({ name: "occurence_form_in_modal" })(
    OccurenceFormInModal
  );

  let activityFormRef: any;
  let occurenceFormRef: any;

  const saveActivityFormRef = (fr: any) => {
    activityFormRef = fr;
  };

  const saveOccurenceFormRef = (fr: any) => {
    occurenceFormRef = fr;
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
    if (!activityFormRef) {
      // tslint:disable-next-line no-console
      console.error("Form ref does not exist.");
      throw new Error(`Unhandled error`);
    }

    const form = activityFormRef.props.form;
    const validateForm = new Promise<IFormActivity>((resolve, reject) => {
      form.validateFields((err: Error, activityValidated: IFormActivity) => {
        if (err) {
          return reject(err);
        }
        resolve(activityValidated);
      });
    });
    const activityToUpdate = {
      id: activity.id,
      removed: activity.removed,
      ...(await validateForm)
    };
    await updateActivity(user.id, activityToUpdate);
    onActivityUpdate();
    form.resetFields();
    closeModalActivity();
  };

  const handleDeleteActivity = async () => {
    if (!activity.id) {
      // tslint:disable-next-line no-console
      console.error("Activity has no id.");
      throw new Error(`Unhandled error`);
    }

    await updateActivity(user.id, {
      ...activity,
      removed: true
    });
    onActivityUpdate();
    closeModalActivity();
  };

  const handleSubmitOccurence = async () => {
    if (!occurenceFormRef || !activity.id) {
      // tslint:disable-next-line no-console
      console.error("Form ref does not exist or activity has no id.");
      throw new Error(`Unhandled error`);
    }

    const form = occurenceFormRef.props.form;
    const validateForm = new Promise<IOccurence>((resolve, reject) => {
      form.validateFields((err: Error, occurenceValidated: IOccurence) => {
        if (err) {
          return reject(err);
        }
        resolve(occurenceValidated);
      });
    });
    const occurenceToCreate = await validateForm;
    await createOccurence(user.id, activity.id, occurenceToCreate);
    form.resetFields();
    closeModalOccurence();
  };

  const showConfirmRestore = () => {
    if (!activity.id) {
      // tslint:disable-next-line no-console
      console.error("Activity has no id.");
      throw new Error(`Unhandled error`);
    }

    confirm({
      title: "Restore activity",
      content: `Do you want to restore the activity '${activity.name}'?`,
      async onOk() {
        await updateActivity(user.id, {
          ...activity,
          removed: false
        });
        onActivityUpdate();
      }
    });
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
        {activity.removed && (
          <Button icon="undo" onClick={showConfirmRestore} />
        )}
        {!activity.removed && (
          <Button icon="edit" onClick={openModalActivity} />
        )}
      </ButtonGroup>
      <ActivityCreateForm
        wrappedComponentRef={saveActivityFormRef}
        activity={activity}
        visible={modalActivityVisible}
        onCancel={closeModalActivity}
        onSubmit={handleSubmitActivity}
        onDelete={handleDeleteActivity}
      />
      <OccurenceCreateForm
        wrappedComponentRef={saveOccurenceFormRef}
        activity={activity}
        visible={modalOccurenceVisible}
        onCancel={closeModalOccurence}
        onSubmit={handleSubmitOccurence}
      />
    </>
  );
};

export default ActivityButton;
