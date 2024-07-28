import * as React from "react";
import Link from "@mui/material/Link";
import Title from "../components/Title.jsx";
import DataTable from "./DataTable.jsx";
import PropTypes from "prop-types";
function preventDefault(event) {
  event.preventDefault();
}

export default function Orders({ data }) {
  const columns = [
    { key: "AUTO_ID", label: "ID" },
    { key: "MA_THE_BAO_HANH", label: "MÃ THẺ HÀNH" },
  ];

  return (
    <React.Fragment>
      <Title></Title>
      <DataTable columns={columns} rows={data} />
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
Orders.propTypes = {
  data: PropTypes.array.isRequired, // Assuming data is an array
};
