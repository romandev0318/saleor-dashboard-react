import {
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FormSpacer from "@saleor/components/FormSpacer";
// import { useIntl } from "react-intl";
import { makeStyles } from "@saleor/theme";
// import FormSpacer from "@saleor/components/FormSpacer";
import React from "react";

const useStyles = makeStyles(
  {
    // style rule
    textCenter: {
      paddingTop: "15px",
      textAlign: "center"
    }
  },
  {
    name:
      "D:Projects\new-orderichsaleor-dashboardsrcdeliverycomponentsDeliveryAreaCardindex"
  }
);

function DeliveryAreaCard({
  value,
  arrayHelpers,
  index,
  handleChange,
  handleBlur,
  touched,
  errors
}: any) {
  // const intl = useIntl();
  const classes = useStyles();

  return (
    <>
      <FormSpacer />
      {/* <div
        style={{
          display: "grid",
          gridGap: "20px",
          gridTemplateColumns: "auto auto auto"
        }}
      > */}
      <Grid container item xs={12} spacing={3}>
        <Grid item xs={3}>
          <TextField
            name={`deliveryArea.${index}.from`}
            fullWidth
            type="number"
            value={value.from}
            helperText={
              errors &&
              errors.deliveryArea &&
              errors.deliveryArea[index] &&
              errors.deliveryArea[index]?.from
            }
            error={
              errors &&
              errors.deliveryArea &&
              errors.deliveryArea[index] &&
              errors.deliveryArea[index]?.from &&
              touched &&
              touched.deliveryArea &&
              touched.deliveryArea[index] &&
              touched.deliveryArea[index]?.from
            }
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.textCenter}>
            up to and including
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            name={`deliveryArea.${index}.to`}
            fullWidth
            type="number"
            helperText={
              errors &&
              errors.deliveryArea &&
              errors.deliveryArea[index] &&
              errors.deliveryArea[index]?.to
            }
            error={
              errors &&
              errors.deliveryArea &&
              errors.deliveryArea[index] &&
              errors.deliveryArea[index]?.to &&
              touched &&
              touched.deliveryArea &&
              touched.deliveryArea[index] &&
              touched.deliveryArea[index]?.to
            }
            value={value.to}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>

        <Grid item xs={3}>
          {" "}
          <div>
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                onClick={() => {
                  arrayHelpers.remove(index);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Grid>
      </Grid>

      {/* </div> */}
    </>
  );
}

export default DeliveryAreaCard;
