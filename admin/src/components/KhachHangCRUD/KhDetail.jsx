import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const NvDetail = () => {
  const { id } = useParams();
  const [dataDeTail, setDataDeTail] = useState(null);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/Khach_Hang/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDataDeTail(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching data detail:", error);
      }
    };

    fetchDataDetail();
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  if (!dataDeTail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Chi tiết nhân viên</h1>
      <p>Tên: {dataDeTail[0].TEN_KHACH}</p>

      {/* Hiển thị các thông tin khác của nhân viên */}
    </div>
  );
};

export default NvDetail;
