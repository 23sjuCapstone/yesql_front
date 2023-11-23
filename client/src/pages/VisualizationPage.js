import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";

const VisualizationPage = () => {
  const [currentTab, clickTab] = useState(0);
  const [VisualSQLdata, setVisualSQLData] = useState({ columns: [], rows: [] });
  const [Schemasdata, setSchemasData] = useState({
    columns: [],
    rows: [],
    table: [],
  });

  // const obj = {
  //   header: ["품목", "가격(원)", "수량(개)"],
  //   data: [
  //     { fruit: "사과", price: "10000원", ea: "5" },
  //     { fruit: "딸기", price: "8000원", ea: "25" },
  //     { fruit: "복숭아", price: "15000원", ea: "6" },
  //     { fruit: "바나나", price: "3000원", ea: "1" },
  //     { fruit: "메론", price: "30000원", ea: "1" },
  //     { fruit: "수박", price: "22000원", ea: "1" },
  //     { fruit: "참외", price: "4000원", ea: "2" },
  //     { fruit: "체리", price: "6000원", ea: "30" },
  //     { fruit: "포도", price: "7000원", ea: "3" },
  //     { fruit: "배", price: "4000원", ea: "1" },
  //   ],
  // };

  const menuArr = [
    { name: "Visual SQL", content: <VisualSql obj={VisualSQLdata} /> },
    { name: "Console", content: <visSQL /> },
    { name: "Schemas", content: <TapSchemas schema={Schemasdata} /> },
    { name: "Result", content: "Tab menu THREE" },
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  function run() {
    const url = "http://yesql-api.shop:8080";
    const sqlparse = "SELECT branch_name FROM account WHERE balance > 100;";
    axios
      .get(url + "/sql/resultData", {
        params: { sql: sqlparse, dbName: "admin" },
      })
      .then((response) => {
        const result = response.data.result;
        console.log("1 res=", result);
        setVisualSQLData({ columns: result.columns, rows: result.rows });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    axios
      .get(url + "/manage/schemas/specificData", {
        params: { dbName: "u1" },
      })
      .then((response) => {
        const result = response.data.result;
        setSchemasData(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <div className="text-5xl mb-16 border-y border-indigo-500">
        <p className="ml-5 mt-2.5 mb-2.5 text-yesql-blue font-bold">yeSQL</p>
      </div>
      <div class="grid grid-cols-2 gap-x-6 mx-8 mb-4">
        <div className="h-96 rounded-xl row-auto border border-black p-4 ">
          <textarea type="text" class="h-5/6 w-full resize-none" />
          {/* <button type="button" class="flex rounded-xl bg-blue-600 px-3 py-1.5 text-xl leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">RUN</button> */}

          <button
            onClick={() => run()}
            // type="button"
            class="float-right rounded-xl bg-blue-600 px-3 py-1.5 text-xl text-white shadow-sm hover:bg-blue-700"
          >
            RUN
          </button>
        </div>

        <div class="h-96 rounded-xl border border-black">
          <div class="ml-4 relative overflow-x-auto shadow-md sm:rounded-lg"></div>
        </div>
      </div>

      <div class="mx-8 pt-2.5">
        <ul className="grid grid-cols-12 justify-center ml-2">
          {menuArr.map((el, index) => (
            <li
              className={`${
                index === currentTab ? "submenu bg-yesql" : "bg-blue-200"
              } pt-2.5 pb-4 text-lg text-white rounded-xl text-center md:col-span-2 sm:col-span-3 hover:bg-yesql hover:font-bold`}
              onClick={() => selectMenuHandler(index)}
            >
              {el.name}
            </li>
          ))}
        </ul>
        <div class="-mt-2.5 mb-8 w-full h-screen rounded-xl border border-black bg-white z-10 relative">
          {/* <div className="mx-auto my-8 w-3/5 rounded-xl border border-black"> */}
          {menuArr[currentTab].content}
        </div>
      </div>
    </div>
  );
};

const VisualSql = ({ obj }) => {
  const convertRows = obj.rows.map((item) => Object.values(item));
  console.log(convertRows);
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto my-8 w-fit">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {obj.columns.map((subject) => {
              return <th className="px-6 py-3">{subject}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {convertRows.map((row) => (
            <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
              {row.map((item) => (
                <td className="px-6 py-4">{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const TapSchemas = ({ schema }) => {
  return (
    <div>
      {schema.map((obj, index) => (
        <div
          key={index}
          className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto my-8 w-fit"
        >
          <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {obj.columns.map((subject, columnIndex) => (
                  <th key={columnIndex} className="px-6 py-3">
                    {subject}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {obj.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  {Object.values(row).map((item, itemIndex) => (
                    <td key={itemIndex} className="px-6 py-4">
                      {item}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
const visSQL = () => {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Product name
            </th>
            <th scope="col" class="px-6 py-3">
              Color
            </th>
            <th scope="col" class="px-6 py-3">
              Category
            </th>
            <th scope="col" class="px-6 py-3">
              Price
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td class="px-6 py-4">Silver</td>
            <td class="px-6 py-4">Laptop</td>
            <td class="px-6 py-4">$2999</td>
            <td class="px-6 py-4">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Microsoft Surface Pro
            </th>
            <td class="px-6 py-4">White</td>
            <td class="px-6 py-4">Laptop PC</td>
            <td class="px-6 py-4">$1999</td>
            <td class="px-6 py-4">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr class="bg-white dark:bg-gray-800">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Magic Mouse 2
            </th>
            <td class="px-6 py-4">Black</td>
            <td class="px-6 py-4">Accessories</td>
            <td class="px-6 py-4">$99</td>
            <td class="px-6 py-4">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default VisualizationPage;
