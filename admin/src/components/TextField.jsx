import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";

const MyForm = () => {
  const [options, setOptions] = useState([]);
  const [newValue, setNewValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoId, setAutoId] = useState(null); // ID tự động của vật liệu mới được thêm
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVatLieu = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/Vat_Lieu`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Cập nhật dữ liệu fetch vào options cho Select component
        const formattedData = data.map((item) => ({
          label: item.TenVatLieu, // Tên vật liệu
          value: item.VatLieuID, // ID của vật liệu
        }));
        setOptions(formattedData);
      } catch (error) {
        setError(error);
        console.error("Error fetching vat lieu data:", error);
      }
    };
    fetchVatLieu();
  }, []);

  // Hàm thêm mới vào cơ sở dữ liệu
  const addNewMaterial = async (newMaterial) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/vatlieu",
        {
          tenVatLieu: newMaterial,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"), // Thêm header Authorization khi gọi API
          },
        }
      );

      // Nhận về AUTO_ID mới
      const { autoId } = response.data;
      setAutoId(autoId);

      // Cập nhật danh sách vật liệu
      setOptions((prevOptions) => [
        ...prevOptions,
        { label: newMaterial, value: autoId },
      ]);

      // Đặt giá trị mới cho textfield
      setNewValue({ label: newMaterial, value: autoId });
    } catch (error) {
      console.error("Lỗi khi thêm vật liệu mới:", error);
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    vatLieu: Yup.string().required("Vui lòng chọn hoặc nhập tên vật liệu."),
  });

  return (
    <Formik
      initialValues={{ vatLieu: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Submitted Values:", values);
      }}
    >
      {({ setFieldValue, errors, touched }) => (
        <Form>
          <Select
            options={options}
            onChange={(option) => setFieldValue("vatLieu", option.value)}
            onInputChange={(inputValue) => setNewValue(inputValue)}
            value={
              options.find((option) => option.value === autoId) || {
                label: newValue,
                value: newValue,
              }
            }
            placeholder="Chọn hoặc nhập tên vật liệu..."
            isClearable
          />
          {touched.vatLieu && errors.vatLieu && (
            <div style={{ color: "red" }}>{errors.vatLieu}</div>
          )}

          {/* Button thêm mới nếu không tồn tại trong danh sách */}
          {newValue &&
            typeof newValue === "string" &&
            !options.some((option) => option.label === newValue) && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => addNewMaterial(newValue)}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                Thêm vật liệu mới
              </Button>
            )}

          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
