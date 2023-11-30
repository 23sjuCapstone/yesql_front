import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useAsyncError, useNavigate } from "react-router-dom";

const Main = () => {
  const [Schemasdata, setSchemasData] = useState({
    table: [],
  });
  useEffect(() => {
    const url = "http://yesql-api.shop:8080";
    axios
      .get(url + "/manage/schemas/specificData", {
        params: { dbName: localStorage.getItem("userId") },
      })
      .then((response) => {
        const result = response.data.result;
        console.log(result);
        setSchemasData(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [Schemasdata]);

  const [data, setData] = useState([]);
  const exportdb = ({ tableName }) => {
    console.log(tableName);
    const url = "http://yesql-api.shop:8080";
    axios
      .get(url + "/manage/export", {
        params: { dbName: "appletantam", tableName: tableName },
      })
      .then((response) => {
        console.log("Response Data:", response);
        setData(response.data.JSON);
        console.log(data);
        onDownloadBtn({ table: tableName }); // 데이터 다운로드 함수 호출
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const onDownloadBtn = ({ table }) => {
    const name = table; // 파일명
    downloadFile({
      data: JSON.stringify(data),
      fileName: `${name}.json`,
      fileType: "text/json",
    });
  };
  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });
    const link = document.createElement("a");
    link.download = fileName;
    link.href = URL.createObjectURL(blob);
    link.click();
  };
  const TableList = ({ obj }) => {
    if (obj && Array.isArray(obj)) {
      return (
        <div className="px-8 flex flex-wrap gap-x-8 gap-y-4">
          {obj.map((tb) => (
            <div className="mt-6">
              <a
                className="mb-2 text-center font-bold text-xl list-none"
                onClick={() => exportdb({ tableName: tb.table })}
              >
                {tb.table}
              </a>
            </div>
          ))}
        </div>
      );
    } else {
      return <div></div>;
    }
  };
  return (
    <div>
      <div className="absolute rounded-lg shadow bg-black h-screen w-screen">
        <div class="relative bg-white flex min-h-full flex-col justify-center px-96 py-12 shadow-lg">
          <div class="flex items-center justify-between p-4 border-b dark:border-gray-600">
            <h3 class="text-3xl font-bold text-gray-900 dark:text-white">
              테이블 목록
            </h3>
            <a
              href="/visual"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </a>
          </div>
          <div class="p-4 md:p-5 space-y-4">
            <TableList obj={Schemasdata} />
          </div>
          <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="default-modal"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              I accept
            </button>
            <button
              data-modal-hide="default-modal"
              type="button"
              class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
