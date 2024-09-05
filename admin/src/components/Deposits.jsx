import * as React from "react";

import Typography from "@mui/material/Typography";

const Deposits = ({ result }) => {
  // Nhận props result và title
  return (
    <React.Fragment>
      <Typography component="p" variant="h3">
        {result}
      </Typography>
    </React.Fragment>
  );
};

export default Deposits;
