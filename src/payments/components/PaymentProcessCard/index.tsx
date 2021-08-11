import {
  Card,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";
import createSvgIcon from "@material-ui/icons/utils/createSvgIcon";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import { makeStyles } from "@saleor/theme";
import React from "react";
import { /* FormattedMessage ,*/ useIntl } from "react-intl";

const Draggable = createSvgIcon(
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM4 2C4 3.10457 3.10457 4 2 4C0.895431 4 0 3.10457 0 2C0 0.895431 0.895431 0 2 0C3.10457 0 4 0.895431 4 2ZM9.5 2C9.5 2.82843 8.82843 3.5 8 3.5C7.17157 3.5 6.5 2.82843 6.5 2C6.5 1.17157 7.17157 0.5 8 0.5C8.82843 0.5 9.5 1.17157 9.5 2ZM10 2C10 3.10457 9.10457 4 8 4C6.89543 4 6 3.10457 6 2C6 0.895431 6.89543 0 8 0C9.10457 0 10 0.895431 10 2ZM8 9.5C8.82843 9.5 9.5 8.82843 9.5 8C9.5 7.17157 8.82843 6.5 8 6.5C7.17157 6.5 6.5 7.17157 6.5 8C6.5 8.82843 7.17157 9.5 8 9.5ZM8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10ZM3.5 8C3.5 8.82843 2.82843 9.5 2 9.5C1.17157 9.5 0.5 8.82843 0.5 8C0.5 7.17157 1.17157 6.5 2 6.5C2.82843 6.5 3.5 7.17157 3.5 8ZM4 8C4 9.10457 3.10457 10 2 10C0.895431 10 0 9.10457 0 8C0 6.89543 0.895431 6 2 6C3.10457 6 4 6.89543 4 8ZM2 15.5C2.82843 15.5 3.5 14.8284 3.5 14C3.5 13.1716 2.82843 12.5 2 12.5C1.17157 12.5 0.5 13.1716 0.5 14C0.5 14.8284 1.17157 15.5 2 15.5ZM2 16C3.10457 16 4 15.1046 4 14C4 12.8954 3.10457 12 2 12C0.895431 12 0 12.8954 0 14C0 15.1046 0.895431 16 2 16ZM9.5 14C9.5 14.8284 8.82843 15.5 8 15.5C7.17157 15.5 6.5 14.8284 6.5 14C6.5 13.1716 7.17157 12.5 8 12.5C8.82843 12.5 9.5 13.1716 9.5 14ZM10 14C10 15.1046 9.10457 16 8 16C6.89543 16 6 15.1046 6 14C6 12.8954 6.89543 12 8 12C9.10457 12 10 12.8954 10 14Z"
      fill="url(#paint0_linear)"
      style={{
        transform: "translate(7px, 4px)"
      }}
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="0"
        y1="0"
        x2="16.0896"
        y2="10.4478"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#06847B" />
        <stop offset="1" stopColor="#3EE7CD" />
      </linearGradient>
    </defs>
  </>,
  "Draggable"
);

const useStyles = makeStyles(
  {
    colAction: {
      // width: "50%",
      alignItems: "right"
    },
    colGrab: {
      width: 60
    },
    colName: {
      marginTop: 25,
      width: "30%"
    },
    colSlug: {
      width: 300
    },
    link: {
      cursor: "pointer"
    },
    textLeft: {
      textAlign: "left"
    },
    draggable: {
      width: "5%",
      marginTop: 21,
      marginLeft: 20
    },
    checkbox: {
      marginTop: 13,
      width: "10%"
    },
    table: {
      minWidth: 650
    }
  },
  { name: "ProductTypeAttributes" }
);

const Text = [
  {
    label: "Contant",
    cost: "contantCost",
    enable: "contantEnable"
  },
  {
    label: "Stripe",
    cost: "stripeCost",
    enable: "stripeEnable"
  }
];

export interface PaymentProcessCard {
  values: any;
  handleChange: any;
  errors: any;
}

const ServiceProcessCard: React.FC<PaymentProcessCard> = ({
  values,
  handleChange,
  errors
}) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card data-test={"product-attributes"}>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Payment methods",
          description: "section header"
        })}
      />
      <CardContent>
        <ControlledSwitch
          name="enableTransactionFee"
          label={`Enable transaction fees`}
          checked={values.enableTransactionFee}
          onChange={handleChange}
        />
      </CardContent>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" style={{ textAlign: "right" }}>
              Payment method
            </TableCell>
            <TableCell align="right">Transaction fee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Text.map((value, index) => (
            <TableRow>
              <TableCell align="right" key={index}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Draggable />
                  <Checkbox
                    value={values?.[value.enable]}
                    checked={values?.[value.enable] === true}
                    name={value.enable}
                    onChange={handleChange}
                    disabled={!values.enableTransactionFee}
                  />
                  <p>{value.label}</p>
                </div>
                {/* <Grid container direction="row">
                  <Grid className={classes.draggable}></Grid>
                  <Grid className={classes.checkbox}></Grid>
                  <Grid className={classes.colName}></Grid>
                </Grid> */}
              </TableCell>
              <TableCell align="right">
                {values.enableTransactionFee && (
                  <TextField
                    type="number"
                    error={!!errors?.[value.cost]}
                    value={values?.[value.cost]}
                    name={value.cost}
                    onChange={handleChange}
                    helperText={errors?.[value.cost]}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ServiceProcessCard;
