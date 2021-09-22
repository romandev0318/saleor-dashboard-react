import { Container } from "@material-ui/core";
import AppHeader from "@saleor/components/AppHeader";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import { sectionNames } from "@saleor/intl";
import { Form, Formik } from "formik";
import React from "react";
import { useIntl } from "react-intl";
import * as Yup from "yup";

import NotificationProcessCard from "./NotificationProcessCard";

export interface InitialFormNotification {
  emailNotifications: boolean | null;
  emailAddress: string | null;
  __typename: "Store";
}

export interface StroreNotification {
  data: InitialFormNotification | null;
  onSubmit: (input: any) => void;
  onBack: () => void;
  disable: any;
  state: any;
}

const NotificationViewPage: React.FC<StroreNotification> = ({
  data,
  onSubmit,
  onBack,
  state
}) => {
  const intl = useIntl();

  const initialForm =
    data && Object.keys(data).length > 0
      ? {
          emailNotifications: data?.emailNotifications ?? false,
          emailAddress: data?.emailAddress ?? ""
        }
      : {
          emailNotifications: true,
          emailAddress: ""
        };

  const compareWithData = values =>
    JSON.stringify(initialForm) === JSON.stringify(values);

  return (
    <Container>
      <AppHeader onBack={onBack}>
        {intl.formatMessage(sectionNames.configuration)}
      </AppHeader>
      <PageHeader title={intl.formatMessage(sectionNames.Notification)} />
      <Grid>
        <div>
          {data !== undefined ? (
            <Formik
              initialValues={initialForm}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors
              }) => (
                <Form>
                  <NotificationProcessCard
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    errors={errors}
                  />
                  <SaveButtonBar
                    disabled={compareWithData(values)}
                    state={state}
                    onCancel={onBack}
                    onSave={handleSubmit}
                  />
                </Form>
              )}
            </Formik>
          ) : (
            <></>
          )}
        </div>
      </Grid>
    </Container>
  );
};

const validationSchema = Yup.object().shape({
  emailAddress: Yup.string()
    .email("Invalid email")
    .required("Please enter email")
});

NotificationViewPage.displayName = "NotificationViewPage";
export default NotificationViewPage;
