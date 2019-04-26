import { Button, Form } from "antd";
import * as React from "react";
import { IActivity } from "src/interfaces/IActivity";
import { IUser } from "src/interfaces/IUser";
import { create } from "../../../services/activity";
import ActivityFormInModal from "./ActivityFormInModal";

const AddActivityButton = ({
  user,
  onActivityCreate
}: {
  user: IUser;
  onActivityCreate: () => void;
}) => {
  const ActivityCreateForm = Form.create({ name: "activity_form_in_modal" })(
    ActivityFormInModal
  );

  let formRef: any;

  const saveFormRef = (fr: any) => {
    formRef = fr;
  };

  const [modalActivityVisible, setModalActivityVisible] = React.useState(false);

  const closeModalActivity = () => {
    setModalActivityVisible(false);
  };

  const openModalActivity = () => {
    setModalActivityVisible(true);
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
    const activityToCreate = await validateForm;
    await create(user.id, {
      ...activityToCreate,
      removed: false
    });
    onActivityCreate();
    form.resetFields();
    closeModalActivity();
  };

  return (
    <>
      <Button
        size="large"
        type="dashed"
        onClick={openModalActivity}
        icon="plus"
      >
        New Activity
      </Button>
      <ActivityCreateForm
        wrappedComponentRef={saveFormRef}
        visible={modalActivityVisible}
        onCancel={closeModalActivity}
        onSubmit={handleSubmitActivity}
      />
    </>
  );
};

export default AddActivityButton;
