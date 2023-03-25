/* eslint-disable local-rules/named-styles */
import placeholderImage from "@assets/images/placeholder60x60.png";
import {
  Button,
  Card,
  CardContent,
  Container,
  DialogContentText,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import ActionDialog from "@saleor/components/ActionDialog";
import AppHeader from "@saleor/components/AppHeader";
import CardSpacer from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import FormSpacer from "@saleor/components/FormSpacer";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import { useGetMyStore } from "@saleor/emergency/queries";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import { TypedBulkRemoveTables } from "@saleor/qrcode/queries";
import { Formik } from "formik";
import React from "react";
// import SVG from "react-inlinesvg";
import { FormattedMessage, useIntl } from "react-intl";
import ReactToPrint from "react-to-print";
import * as Yup from "yup";

const useStyles = makeStyles(theme => ({
  configurationCategory: {
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr"
    },
    // borderTop: `solid 1px ${theme.palette.divider}`,
    display: "grid",
    gridColumnGap: theme.spacing(4) + "px",
    gridTemplateColumns: "1fr 3fr"
    // paddingTop: theme.spacing(3)
  },
  configurationLabel: {
    paddingBottom: 20
  },

  printWrap: {
    background: "#ffd668 ",
    // padding: "24px 48px",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  logoBox: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    overflow: "hidden",
    background: "#fff",
    marginBottom: "16px"
  },
  logoStore: {
    width: "100%",
    height: "100%"
  },
  bigText: {
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: "28px",
    color: "#1F1F1F",
    padding: 0,
    margin: "0 0 8px 0",
    textAlign: "center"
  },
  subText: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "18px",
    color: "#1F1F1F",
    padding: 0,
    margin: "0 0 16px 0",
    textAlign: "center"
  },
  qrImg: {
    width: "200px",
    height: "200px",
    borderRadius: "8px",
    overflow: "hidden"
    // padding: "24px"
  },
  qr: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },
  orderichFooter: {
    display: "flex",
    alignItems: "center"
  },
  logoFooter: {
    width: "43px"
  },
  textFooter: {
    fontSize: "10px",
    fontWeight: 400,
    lineHeight: "12px",
    marginRight: "4px"
  }
}));
interface IProps {
  onBack?: any;
  data?: any;
  id?: any;
  params?: any;
  onSubmit?: any;
  saveButtonBarState?: any;
  onCloseModal?: any;
}

function TableCreatePage({
  onBack,
  id,
  data,
  onSubmit,
  saveButtonBarState
}: IProps) {
  const intl = useIntl();
  const [url, setUrl] = React.useState(placeholderImage);
  const classes = useStyles();
  const componentRef = React.useRef();
  const validateSchema = Yup.object().shape({
    tableName: Yup.string().required("Required")
  });
  const notify = useNotifier();

  const { data: curStore } = useGetMyStore({ variables: {} });

  const handleSubmit = values => {
    const table = values.tableName.replace(" ", "");
    // setUrl(
    //   `https://chart.googleapis.com/chart?cht=qr&&chs=400x400&&chl=${t.join(
    //     ":"
    //   )}/?qr=${table}`
    // );
    onSubmit({
      tableName: values.tableName,
      tableQrCode: `https://chart.googleapis.com/chart?cht=qr&&chs=400x400&&chl=${window.location.origin}/?qr=${table}`,
      active: values.active
    });
  };

  const initialValues = data
    ? { tableName: data.tableName, active: data.active }
    : { tableName: "", active: true };

  React.useEffect(() => {
    if (data) {
      setUrl(
        `https://chart.googleapis.com/chart?cht=qr&&chs=400x400&&chl=${window.location.origin}/?qr=${id}`
      );
    }
  }, []);

  const handleBulkDelete = data => {
    if (data.tableServiceBulkDelete.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      onBack();
    }
  };
  const [openDialog, setOpenDialog] = React.useState(false);
  const compareValues = values =>
    JSON.stringify(values) === JSON.stringify(initialValues);
  //   https://chart.googleapis.com/chart?cht=qr&&chs=400x400chl=
  return (
    <>
      <TypedBulkRemoveTables onCompleted={handleBulkDelete}>
        {(bulkDeteleTables, bulkDeleteTableOpts) => (
          <Container>
            <PageHeader
              title={intl.formatMessage({
                defaultMessage: `QR Location`,
                description: "page header"
              })}
            />
            <div className={classes.configurationCategory}>
              <div className={classes.configurationLabel}>
                <Typography>
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#3d3d3d"
                    }}
                  >
                    QR Settings
                  </h2>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#3d3d3d"
                    }}
                  >
                    Define a QR location name such as table number or kiosk
                    number to generate a QR code for your customers to order
                    from.
                  </p>
                </Typography>
              </div>
              <div>
                <AppHeader onBack={onBack}>QR ORDERING</AppHeader>
                {/* {id ? (
                  <PageHeader
                    title={intl.formatMessage({
                      defaultMessage: `QRcode Ordering`,
                      description: "page header"
                    })}
                  />
                ) : (
                  <PageHeader
                    title={intl.formatMessage({
                      defaultMessage: `Create QRcode`,
                      description: "page header"
                    })}
                  />
                )} */}

                <Card>
                  <CardTitle
                    title={intl.formatMessage({
                      defaultMessage: "QR Settings",
                      description: "page header"
                    })}
                  />
                  <CardContent>
                    <Formik
                      initialValues={initialValues}
                      onSubmit={handleSubmit}
                      validationSchema={validateSchema}
                    >
                      {({
                        handleChange,
                        handleSubmit,
                        values,
                        handleBlur,
                        // touched,
                        errors
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <ControlledSwitch
                            name="active"
                            checked={values.active}
                            label="Enable this QR location"
                            onChange={handleChange}
                          />
                          <FormSpacer />
                          {values.active && (
                            <TextField
                              label="QR location name"
                              fullWidth
                              name="tableName"
                              onChange={e => {
                                handleChange(e);
                              }}
                              onBlur={handleBlur}
                              error={!!errors?.tableName}
                              helperText={errors?.tableName}
                              value={values.tableName}
                            />
                          )}

                          {id ? (
                            <SaveButtonBar
                              state={saveButtonBarState}
                              disabled={compareValues(values)}
                              onCancel={onBack}
                              onDelete={() => {
                                setOpenDialog(true);
                              }}
                              onSave={handleSubmit}
                            />
                          ) : (
                            <SaveButtonBar
                              state={saveButtonBarState}
                              disabled={compareValues(values)}
                              onCancel={onBack}
                              onSave={handleSubmit}
                            />
                          )}
                        </form>
                      )}
                    </Formik>
                  </CardContent>
                </Card>
                <CardSpacer />
                <Card>
                  <CardTitle
                    title={intl.formatMessage({
                      defaultMessage: "QR Code",
                      description: "page l"
                    })}
                    toolbar={
                      <ReactToPrint
                        trigger={() => <Button color="primary">Print</Button>}
                        content={() => componentRef.current}
                      />
                    }
                  />
                  {/* <CardHeader title="QR code" action={} /> */}
                  <CardContent>
                    <div
                      style={{
                        maxWidth: "400px",
                        maxHeight: "400px",
                        border: "1px solid #EAEAEA",
                        borderRadius: "8px",
                        padding: "16px"
                      }}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain"
                        }}
                        src={url}
                      />
                    </div>

                    {/* print wwrapp   */}

                    <div style={{ display: "none" }}>
                      <div className={classes.printWrap} ref={componentRef}>
                        <div
                          style={{
                            width: "200px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                          }}
                        >
                          <div className={classes.logoBox}>
                            <img
                              src={
                                curStore?.myStore?.logo?.url || placeholderImage
                              }
                              className={classes.logoStore}
                              alt=""
                            />
                          </div>
                          <p className={classes.bigText}>MENUKAART</p>
                          <p className={classes.subText}>
                            Scan deze QR-code om contactloos te bestellen
                          </p>
                          <div className={classes.qrImg}>
                            <img src={url} alt="" className={classes.qr} />
                          </div>
                          <div className={classes.orderichFooter}>
                            <p className={classes.textFooter}>powered by </p>{" "}
                            {/* <SVG
                              className={classes.logoFooter}
                              src={orderichLogo}
                            /> */}
                            <svg
                              width="117"
                              height="32"
                              viewBox="0 0 117 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className={classes.logoFooter}
                            >
                              <g clip-path="url(#clip0_1127_36718)">
                                <path
                                  d="M37.5782 24.24C35.8182 24.24 34.4582 23.744 33.4982 22.752C32.5542 21.76 32.0502 20.44 31.9862 18.792L31.9622 17.76L31.9862 16.728C32.0502 15.08 32.5622 13.76 33.5222 12.768C34.4982 11.776 35.8502 11.28 37.5782 11.28C39.3062 11.28 40.6502 11.776 41.6102 12.768C42.5862 13.76 43.1062 15.08 43.1702 16.728C43.2022 17.08 43.2182 17.424 43.2182 17.76C43.2182 18.096 43.2022 18.44 43.1702 18.792C43.1062 20.44 42.5942 21.76 41.6342 22.752C40.6902 23.744 39.3382 24.24 37.5782 24.24ZM37.5782 22.44C38.6022 22.44 39.4102 22.12 40.0022 21.48C40.6102 20.824 40.9382 19.888 40.9862 18.672C41.0022 18.512 41.0102 18.208 41.0102 17.76C41.0102 17.312 41.0022 17.008 40.9862 16.848C40.9382 15.632 40.6102 14.704 40.0022 14.064C39.4102 13.408 38.6022 13.08 37.5782 13.08C36.5542 13.08 35.7382 13.408 35.1302 14.064C34.5382 14.704 34.2182 15.632 34.1702 16.848L34.1462 17.76L34.1702 18.672C34.2182 19.888 34.5382 20.824 35.1302 21.48C35.7382 22.12 36.5542 22.44 37.5782 22.44ZM45.8006 24C45.6406 24 45.5046 23.952 45.3926 23.856C45.2966 23.744 45.2486 23.608 45.2486 23.448V12.096C45.2486 11.936 45.2966 11.8 45.3926 11.688C45.5046 11.576 45.6406 11.52 45.8006 11.52H46.8086C46.9846 11.52 47.1206 11.576 47.2166 11.688C47.3286 11.784 47.3846 11.92 47.3846 12.096V13.152C48.0406 12.064 49.1526 11.52 50.7206 11.52H51.6566C51.8326 11.52 51.9686 11.568 52.0646 11.664C52.1606 11.76 52.2086 11.896 52.2086 12.072V12.96C52.2086 13.12 52.1606 13.256 52.0646 13.368C51.9686 13.464 51.8326 13.512 51.6566 13.512H50.2886C49.4086 13.512 48.7126 13.768 48.2006 14.28C47.7046 14.792 47.4566 15.488 47.4566 16.368V23.448C47.4566 23.608 47.4006 23.744 47.2886 23.856C47.1766 23.952 47.0406 24 46.8806 24H45.8006ZM57.5742 24.24C55.8942 24.24 54.6302 23.696 53.7822 22.608C52.9502 21.52 52.5022 20.144 52.4382 18.48L52.4142 17.76L52.4382 17.04C52.5022 15.392 52.9582 14.024 53.8062 12.936C54.6542 11.832 55.9102 11.28 57.5742 11.28C59.2382 11.28 60.5342 11.872 61.4622 13.056V7.512C61.4622 7.352 61.5102 7.224 61.6062 7.128C61.7182 7.016 61.8542 6.96 62.0142 6.96H63.0942C63.2542 6.96 63.3822 7.016 63.4782 7.128C63.5902 7.224 63.6462 7.352 63.6462 7.512V23.448C63.6462 23.608 63.5902 23.744 63.4782 23.856C63.3822 23.952 63.2542 24 63.0942 24H62.0622C61.9022 24 61.7742 23.952 61.6782 23.856C61.5822 23.744 61.5342 23.608 61.5342 23.448V22.416C60.6222 23.632 59.3022 24.24 57.5742 24.24ZM58.0302 22.368C59.1502 22.368 59.9902 22 60.5502 21.264C61.1102 20.512 61.4142 19.624 61.4622 18.6C61.4782 18.424 61.4862 18.12 61.4862 17.688C61.4862 17.24 61.4782 16.928 61.4622 16.752C61.4302 15.776 61.1182 14.936 60.5262 14.232C59.9502 13.512 59.1182 13.152 58.0302 13.152C56.8782 13.152 56.0382 13.512 55.5102 14.232C54.9822 14.952 54.6942 15.896 54.6462 17.064L54.6222 17.76C54.6222 20.832 55.7582 22.368 58.0302 22.368ZM71.2082 24.24C69.5762 24.24 68.2722 23.736 67.2962 22.728C66.3202 21.704 65.7842 20.312 65.6882 18.552L65.6642 17.736L65.6882 16.944C65.7842 15.216 66.3202 13.84 67.2962 12.816C68.2722 11.792 69.5762 11.28 71.2082 11.28C72.9682 11.28 74.3282 11.84 75.2882 12.96C76.2642 14.08 76.7522 15.6 76.7522 17.52V17.952C76.7522 18.112 76.6962 18.248 76.5842 18.36C76.4882 18.456 76.3602 18.504 76.2002 18.504H67.8722V18.72C67.9202 19.76 68.2402 20.648 68.8322 21.384C69.4242 22.12 70.2082 22.488 71.1842 22.488C71.9362 22.488 72.5442 22.344 73.0082 22.056C73.4882 21.752 73.8482 21.44 74.0882 21.12C74.2322 20.928 74.3442 20.816 74.4242 20.784C74.5042 20.736 74.6402 20.712 74.8322 20.712H75.8882C76.0322 20.712 76.1522 20.752 76.2482 20.832C76.3602 20.912 76.4162 21.016 76.4162 21.144C76.4162 21.496 76.2002 21.92 75.7682 22.416C75.3362 22.912 74.7202 23.344 73.9202 23.712C73.1362 24.064 72.2322 24.24 71.2082 24.24ZM74.5682 16.872V16.8C74.5682 15.68 74.2642 14.768 73.6562 14.064C73.0482 13.36 72.2322 13.008 71.2082 13.008C70.1682 13.008 69.3522 13.36 68.7602 14.064C68.1682 14.768 67.8722 15.68 67.8722 16.8V16.872H74.5682ZM79.2225 24C79.0625 24 78.9265 23.952 78.8145 23.856C78.7185 23.744 78.6705 23.608 78.6705 23.448V12.096C78.6705 11.936 78.7185 11.8 78.8145 11.688C78.9265 11.576 79.0625 11.52 79.2225 11.52H80.2305C80.4065 11.52 80.5425 11.576 80.6385 11.688C80.7505 11.784 80.8065 11.92 80.8065 12.096V13.152C81.4625 12.064 82.5745 11.52 84.1425 11.52H85.0785C85.2545 11.52 85.3905 11.568 85.4865 11.664C85.5825 11.76 85.6305 11.896 85.6305 12.072V12.96C85.6305 13.12 85.5825 13.256 85.4865 13.368C85.3905 13.464 85.2545 13.512 85.0785 13.512H83.7105C82.8305 13.512 82.1345 13.768 81.6225 14.28C81.1265 14.792 80.8785 15.488 80.8785 16.368V23.448C80.8785 23.608 80.8225 23.744 80.7105 23.856C80.5985 23.952 80.4625 24 80.3025 24H79.2225ZM87.0539 9.168C86.8939 9.168 86.7579 9.12 86.6459 9.024C86.5499 8.912 86.5019 8.776 86.5019 8.616V7.368C86.5019 7.208 86.5499 7.072 86.6459 6.96C86.7579 6.848 86.8939 6.792 87.0539 6.792H88.4699C88.6299 6.792 88.7659 6.848 88.8779 6.96C88.9899 7.072 89.0459 7.208 89.0459 7.368V8.616C89.0459 8.776 88.9899 8.912 88.8779 9.024C88.7659 9.12 88.6299 9.168 88.4699 9.168H87.0539ZM87.2459 24C87.0859 24 86.9499 23.952 86.8379 23.856C86.7419 23.744 86.6939 23.608 86.6939 23.448V12.072C86.6939 11.912 86.7419 11.784 86.8379 11.688C86.9499 11.576 87.0859 11.52 87.2459 11.52H88.3019C88.4619 11.52 88.5899 11.576 88.6859 11.688C88.7979 11.784 88.8539 11.912 88.8539 12.072V23.448C88.8539 23.608 88.7979 23.744 88.6859 23.856C88.5899 23.952 88.4619 24 88.3019 24H87.2459ZM96.4515 24.24C94.7395 24.24 93.4035 23.76 92.4435 22.8C91.4835 21.824 90.9795 20.464 90.9315 18.72L90.9075 17.76L90.9315 16.8C90.9795 15.056 91.4835 13.704 92.4435 12.744C93.4035 11.768 94.7395 11.28 96.4515 11.28C97.6035 11.28 98.5715 11.488 99.3555 11.904C100.156 12.304 100.748 12.808 101.132 13.416C101.532 14.024 101.748 14.632 101.78 15.24C101.796 15.384 101.74 15.512 101.612 15.624C101.5 15.736 101.372 15.792 101.228 15.792H100.172C100.012 15.792 99.8915 15.76 99.8115 15.696C99.7315 15.616 99.6515 15.48 99.5715 15.288C99.2835 14.504 98.8835 13.952 98.3715 13.632C97.8755 13.296 97.2435 13.128 96.4755 13.128C95.4675 13.128 94.6675 13.44 94.0755 14.064C93.4835 14.688 93.1635 15.64 93.1155 16.92L93.0915 17.76L93.1155 18.6C93.1635 19.88 93.4835 20.832 94.0755 21.456C94.6675 22.08 95.4675 22.392 96.4755 22.392C97.2595 22.392 97.8995 22.232 98.3955 21.912C98.8915 21.576 99.2835 21.016 99.5715 20.232C99.6515 20.04 99.7315 19.912 99.8115 19.848C99.8915 19.768 100.012 19.728 100.172 19.728H101.228C101.372 19.728 101.5 19.784 101.612 19.896C101.74 20.008 101.796 20.136 101.78 20.28C101.748 20.872 101.532 21.472 101.132 22.08C100.748 22.688 100.156 23.2 99.3555 23.616C98.5715 24.032 97.6035 24.24 96.4515 24.24ZM104.231 24C104.071 24 103.935 23.952 103.823 23.856C103.727 23.744 103.679 23.608 103.679 23.448V7.512C103.679 7.336 103.727 7.2 103.823 7.104C103.935 7.008 104.071 6.96 104.231 6.96H105.335C105.511 6.96 105.647 7.008 105.743 7.104C105.839 7.2 105.887 7.336 105.887 7.512V13.104C106.351 12.512 106.895 12.064 107.519 11.76C108.159 11.44 108.943 11.28 109.871 11.28C111.407 11.28 112.599 11.776 113.447 12.768C114.311 13.744 114.743 15.04 114.743 16.656V23.448C114.743 23.608 114.687 23.744 114.575 23.856C114.479 23.952 114.351 24 114.191 24H113.063C112.903 24 112.767 23.952 112.655 23.856C112.559 23.744 112.511 23.608 112.511 23.448V16.8C112.511 15.648 112.231 14.752 111.671 14.112C111.111 13.472 110.303 13.152 109.247 13.152C108.223 13.152 107.407 13.48 106.799 14.136C106.191 14.776 105.887 15.664 105.887 16.8V23.448C105.887 23.608 105.831 23.744 105.719 23.856C105.623 23.952 105.495 24 105.335 24H104.231Z"
                                  fill="#1F1F1F"
                                />
                                <path
                                  d="M26.3467 28.0123L24.6334 25.1571C24.421 24.805 24.1214 24.5136 23.7636 24.3109C23.4059 24.1082 23.0019 24.0012 22.5907 24H16.8307L17.4297 21.2043C18.5169 20.9625 19.4986 20.3803 20.2322 19.5423C20.3859 19.3662 20.5273 19.1798 20.6557 18.9846L21.6168 18.3438C22.5674 17.7114 23.3467 16.8537 23.8854 15.8472C24.424 14.8406 24.7053 13.7164 24.704 12.5747V11.9554C24.7084 10.6668 24.3516 9.40274 23.674 8.30665C22.9965 7.21056 22.0253 6.32628 20.8707 5.75412C20.7127 5.67482 20.586 5.54452 20.5112 5.3843C20.4364 5.22408 20.4179 5.04331 20.4586 4.87125C20.4993 4.69918 20.5969 4.54589 20.7356 4.43618C20.8742 4.32647 21.0459 4.26677 21.2227 4.26672H22.758C23.1085 4.26667 23.4465 4.13633 23.7062 3.90102C23.966 3.66571 24.1289 3.34224 24.1635 2.99347C24.1981 2.6447 24.1018 2.29552 23.8933 2.0138C23.6848 1.73208 23.379 1.53792 23.0354 1.46906L21.2336 1.10906L20.8332 0.708594C20.495 0.370283 20.064 0.139875 19.5948 0.0465105C19.1256 -0.0468545 18.6393 0.00101694 18.1973 0.18407C17.7553 0.367124 17.3775 0.677137 17.1117 1.0749C16.8459 1.47267 16.704 1.94033 16.704 2.41872V4.52139C16.7014 5.34584 16.9297 6.15455 17.3632 6.85586C17.7966 7.55716 18.4179 8.12301 19.1566 8.48924C19.7018 8.76191 20.1603 9.18102 20.4807 9.69961C20.8011 10.2182 20.9708 10.8158 20.9707 11.4254C20.9707 11.5161 20.967 11.6046 20.9597 11.6908C20.9267 12.1094 20.8129 12.5177 20.6246 12.8931C20.6079 12.9264 20.589 12.9584 20.5712 12.9911C20.0821 12.275 19.4257 11.6889 18.6588 11.2839C17.892 10.8788 17.0379 10.667 16.1707 10.6667H5.50406C4.37286 10.668 3.28836 11.1179 2.48848 11.9178C1.6886 12.7177 1.23867 13.8022 1.2374 14.9334C1.23823 15.3475 1.40329 15.7444 1.69637 16.0369C1.98945 16.3295 2.38661 16.4939 2.80073 16.494C3.15369 16.4943 3.49597 16.373 3.76993 16.1504L4.182 15.8208C4.32588 16.0285 4.51799 16.1983 4.74185 16.3156C4.96572 16.4328 5.21467 16.4941 5.46739 16.4941C5.82035 16.4944 6.16263 16.373 6.43659 16.1505L6.94033 15.7475L7.10032 16.0414C7.68847 17.1238 8.47031 18.0891 9.40699 18.8892L6.77893 20.9107C6.68668 20.9817 6.62019 21.0809 6.58959 21.1931L5.04206 26.867L2.26574 28.7179L2.04094 28.6055C1.74145 28.4556 1.39838 28.4172 1.07317 28.4971C0.747951 28.5771 0.461827 28.7703 0.266033 29.042C0.0702398 29.3137 -0.0224351 29.6462 0.0046048 29.98C0.0316447 30.3139 0.176633 30.6271 0.413606 30.8638L0.968272 31.4185C1.15219 31.6034 1.37096 31.75 1.61192 31.8498C1.85288 31.9497 2.11125 32.0007 2.37207 32C2.57755 31.9998 2.78178 31.9679 2.97753 31.9054C3.17372 31.8429 3.35887 31.7499 3.5262 31.6299L6.98206 29.1593C7.47441 28.8088 7.84832 28.3166 8.05399 27.7483L9.66112 23.3283L12.9707 21.8579V26.6667C12.9707 26.8081 13.0269 26.9438 13.1269 27.0438C13.2269 27.1438 13.3626 27.2 13.504 27.2H22.2688L23.5626 29.3565L23.4662 29.5491C23.3166 29.8481 23.2725 30.1889 23.3408 30.5161C23.4092 30.8433 23.5861 31.1379 23.8428 31.352C24.0995 31.5661 24.421 31.6873 24.7552 31.6958C25.0894 31.7043 25.4167 31.5997 25.684 31.399C26.1939 31.0165 26.5438 30.4586 26.6663 29.8331C26.7887 29.2075 26.6749 28.5588 26.347 28.0123H26.3467ZM23.0258 2.63512C23.0673 2.68579 23.0935 2.7472 23.1015 2.81221C23.1095 2.87723 23.0988 2.94316 23.0707 3.00235C23.0427 3.06154 22.9984 3.11154 22.943 3.14654C22.8877 3.18154 22.8235 3.2001 22.758 3.20006H21.504V2.25066L22.8254 2.51492C22.9042 2.53038 22.9751 2.5729 23.0258 2.63512ZM19.6333 7.53511C19.0723 7.25691 18.6005 6.82712 18.2713 6.29446C17.9421 5.7618 17.7687 5.14757 17.7707 4.52139V2.41872C17.7707 2.15132 17.8501 1.88992 17.9986 1.66759C18.1472 1.44526 18.3584 1.27197 18.6054 1.16963C18.8525 1.0673 19.1243 1.04051 19.3866 1.09265C19.6489 1.1448 19.8898 1.27354 20.0789 1.46259L20.4374 1.82099V3.37532C20.1221 3.52276 19.8548 3.75605 19.6661 4.04844C19.4774 4.34083 19.375 4.68049 19.3704 5.02846C19.3659 5.37643 19.4596 5.71862 19.6407 6.0158C19.8218 6.31298 20.0829 6.55311 20.3942 6.70865C21.2559 7.13563 21.9986 7.7692 22.5559 8.55287C23.1133 9.33654 23.4681 10.246 23.5888 11.2H22.0307C21.9912 10.4316 21.7484 9.68742 21.3272 9.04351C20.906 8.39961 20.3214 7.87906 19.6331 7.53505L19.6333 7.53511ZM21.5782 13.3709C21.7531 13.0216 21.8796 12.6501 21.9545 12.2667H23.6374V12.5747C23.6383 13.4628 23.4371 14.3396 23.049 15.1384C22.6609 15.9373 22.0961 16.6374 21.3974 17.1856C21.468 16.8429 21.5038 16.4939 21.504 16.144V16C21.5043 15.3394 21.381 14.6845 21.1408 14.0691C21.3083 13.8507 21.4548 13.6169 21.5782 13.3708V13.3709ZM20.4374 16V16.1442C20.438 18.1988 18.9516 19.9126 16.904 20.2191C16.692 20.2503 16.4779 20.2659 16.2635 20.2658H16.0122C15.86 20.2658 15.708 20.2619 15.5559 20.2541C15.9583 19.8667 16.2145 19.3521 16.281 18.7975C16.3474 18.2429 16.2202 17.6824 15.9207 17.2109L15.9774 17.1731C16.6415 16.7313 17.217 16.1692 17.6742 15.5158L16.8009 14.9036C16.4196 15.4484 15.9397 15.9171 15.386 16.2854L13.7234 17.3934C13.7056 17.4053 13.6884 17.4183 13.6721 17.4322C13.5419 17.5439 13.375 17.6036 13.2034 17.5999C13.0319 17.5961 12.8678 17.5291 12.7426 17.4118C12.6174 17.2945 12.5399 17.1351 12.525 16.9641C12.5101 16.7932 12.5588 16.6228 12.6618 16.4856L13.3138 15.6162C13.3859 15.52 13.4234 15.4024 13.4203 15.2823C13.4171 15.1623 13.3736 15.0467 13.2966 14.9545C13.2196 14.8623 13.1138 14.7988 12.9962 14.7742C12.8786 14.7496 12.7562 14.7655 12.6487 14.8192L11.3479 15.4696C11.2304 15.5284 11.0973 15.5488 10.9676 15.5277C10.8379 15.5066 10.7181 15.4452 10.6253 15.3522C10.5618 15.2888 10.5128 15.2125 10.4814 15.1285C10.4501 15.0444 10.4371 14.9547 10.4435 14.8652C10.4499 14.7757 10.4754 14.6887 10.5183 14.6099C10.5612 14.5312 10.6206 14.4626 10.6923 14.4088L11.671 13.6747C11.7678 13.6021 11.837 13.4989 11.8673 13.3818C11.8976 13.2647 11.8873 13.1409 11.8379 13.0305C11.7886 12.9201 11.7032 12.8297 11.5958 12.7742C11.4883 12.7187 11.3652 12.7014 11.2466 12.725L9.83879 13.0061C9.75084 13.0236 9.6602 13.0225 9.57271 13.0028C9.48522 12.9832 9.40281 12.9454 9.33078 12.892C9.25875 12.8386 9.1987 12.7707 9.15449 12.6927C9.11028 12.6147 9.08289 12.5283 9.07408 12.439C9.06526 12.3498 9.07523 12.2597 9.10333 12.1746C9.13143 12.0894 9.17704 12.0111 9.23724 11.9446C9.29743 11.8781 9.37086 11.825 9.45282 11.7886C9.53478 11.7522 9.62345 11.7334 9.71312 11.7334H16.1707C17.3019 11.7346 18.3864 12.1846 19.1863 12.9844C19.9862 13.7843 20.4361 14.8688 20.4374 16ZM8.03699 15.5308L7.57232 14.6782C7.53503 14.6097 7.48318 14.5503 7.42043 14.504C7.35769 14.4578 7.28557 14.4258 7.20915 14.4105C7.13273 14.3951 7.05387 14.3967 6.97812 14.4151C6.90237 14.4335 6.83158 14.4683 6.77073 14.517L5.76966 15.318C5.68472 15.3886 5.57781 15.4273 5.46739 15.4274C5.40217 15.4282 5.33744 15.416 5.277 15.3915C5.21655 15.367 5.16159 15.3306 5.11535 15.2846C5.0691 15.2386 5.03249 15.1839 5.00766 15.1236C4.98283 15.0633 4.97027 14.9986 4.97073 14.9334C4.97074 14.8329 4.94237 14.7344 4.88887 14.6494C4.83538 14.5643 4.75894 14.4961 4.66837 14.4526C4.57779 14.4091 4.47677 14.392 4.37693 14.4034C4.27709 14.4148 4.18251 14.4542 4.10406 14.517L3.103 15.318C3.01806 15.3886 2.91115 15.4273 2.80073 15.4274C2.73551 15.4282 2.67078 15.416 2.61033 15.3915C2.54989 15.367 2.49493 15.3306 2.44868 15.2846C2.40244 15.2386 2.36583 15.1839 2.341 15.1236C2.31617 15.0633 2.30361 14.9986 2.30407 14.9334C2.30504 14.085 2.64249 13.2716 3.2424 12.6717C3.8423 12.0718 4.65567 11.7343 5.50406 11.7334H8.12959C8.02808 11.9833 7.98719 12.2538 8.01027 12.5226C8.03334 12.7914 8.11973 13.0509 8.26235 13.2799C8.40497 13.5089 8.59979 13.7009 8.83085 13.8402C9.06192 13.9795 9.32267 14.0621 9.59179 14.0812C9.42941 14.3706 9.35564 14.7013 9.37964 15.0322C9.40364 15.3631 9.52435 15.6797 9.72677 15.9426C9.92918 16.2055 10.2044 16.4031 10.5182 16.5109C10.832 16.6187 11.1705 16.6319 11.4918 16.5489C11.4424 16.7907 11.4444 17.0402 11.4977 17.2812L10.2735 18.2229C9.35915 17.4804 8.5993 16.5658 8.03699 15.5308ZM9.02079 22.4459C8.95529 22.4751 8.89632 22.5171 8.84741 22.5696C8.79851 22.622 8.76066 22.6837 8.73612 22.7511L7.05139 27.3844C6.91908 27.7499 6.67856 28.0664 6.36186 28.2917L2.90527 30.7626C2.82864 30.8177 2.74383 30.8605 2.65393 30.8893C2.5628 30.9184 2.46773 30.9332 2.37207 30.9333C2.25138 30.9336 2.13184 30.91 2.02034 30.8638C1.90885 30.8176 1.80763 30.7498 1.72254 30.6642L1.16787 30.1095C1.11043 30.0519 1.07534 29.9756 1.06889 29.8945C1.06243 29.8134 1.08502 29.7326 1.13263 29.6665C1.18024 29.6005 1.24976 29.5535 1.32878 29.534C1.40781 29.5145 1.4912 29.5237 1.56407 29.56L2.0654 29.8106C2.14951 29.8526 2.24324 29.8717 2.33709 29.8659C2.43094 29.86 2.52157 29.8294 2.5998 29.7773L5.79979 27.6439C5.90696 27.5725 5.98464 27.4647 6.01846 27.3405L7.57126 21.6472L12.0367 18.2124C12.3503 18.4962 12.7554 18.6577 13.1782 18.6674C13.601 18.6771 14.0131 18.5343 14.3393 18.2652L15.0314 17.804C15.2041 18.0855 15.2679 18.4203 15.2109 18.7456C15.154 19.0708 14.9801 19.364 14.722 19.57C14.082 20.0819 13.3789 20.5096 12.63 20.8425L9.02079 22.4459ZM25.0436 30.5459C24.9684 30.6023 24.8764 30.6316 24.7825 30.6292C24.6886 30.6267 24.5983 30.5927 24.5262 30.5325C24.4541 30.4723 24.4044 30.3896 24.3851 30.2976C24.3659 30.2057 24.3783 30.11 24.4202 30.0259L24.6476 29.5719C24.6878 29.4916 24.7071 29.4025 24.7037 29.3128C24.7002 29.223 24.6742 29.1356 24.628 29.0586L23.028 26.3919C22.9806 26.313 22.9136 26.2477 22.8334 26.2024C22.7533 26.1571 22.6628 26.1333 22.5707 26.1333H14.0374V21.3214C14.1166 21.2759 14.1958 21.2301 14.2739 21.1826C14.8479 21.2824 15.4294 21.3326 16.012 21.3327H16.2634C16.2793 21.3327 16.2953 21.3319 16.3112 21.3318L15.6492 24.4216C15.6326 24.4994 15.6335 24.5799 15.652 24.6572C15.6705 24.7346 15.706 24.8068 15.756 24.8686C15.806 24.9305 15.8692 24.9804 15.9409 25.0146C16.0127 25.0489 16.0912 25.0667 16.1707 25.0667H22.5907C22.8178 25.0673 23.0409 25.1264 23.2385 25.2384C23.4361 25.3503 23.6015 25.5113 23.7188 25.7057L25.4321 28.5609C25.6244 28.8812 25.6911 29.2614 25.6194 29.628C25.5476 29.9947 25.3425 30.3217 25.0437 30.5459H25.0436Z"
                                  fill="#1F1F1F"
                                />
                                <path
                                  d="M19.9041 2.13342H18.8374V3.20009H19.9041V2.13342Z"
                                  fill="#1F1F1F"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1127_36718">
                                  <rect width="117" height="32" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                  </CardContent>
                </Card>
              </div>
            </div>

            <ActionDialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              confirmButtonState={bulkDeleteTableOpts.status}
              onConfirm={() => {
                bulkDeteleTables({
                  variables: {
                    ids: [id]
                  }
                });
              }}
              variant="delete"
              title={intl.formatMessage({
                defaultMessage: "Delete QR location",
                description: "dialog header"
              })}
            >
              <DialogContentText>
                <FormattedMessage defaultMessage="Are you sure you want to delete" />
              </DialogContentText>
            </ActionDialog>
          </Container>
        )}
      </TypedBulkRemoveTables>
    </>
  );
}

export default TableCreatePage;
