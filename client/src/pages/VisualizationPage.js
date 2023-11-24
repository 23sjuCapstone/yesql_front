import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";

const VisualizationPage = () => {
  const [currentTab, clickTab] = useState(0);
  const [VisualSQLdata, setVisualSQLData] = useState({ columns: [], rows: [] });
  const [Schemasdata, setSchemasData] = useState({
    columns: [],
    rows: [],
    table: []
  });

  //Tapmenu
  const menuArr = [
    { name: "Visual SQL", content: <VisualSql obj={VisualSQLdata} /> },
    { name: "Console", content: <visSQL /> },
    { name: "Schemas", content: <TapSchemas schema={Schemasdata} /> },
    { name: "Result", content: "" }
  ];
  //<TapSchemasSimple schema={Schemasdata} />

  //Tapmenu-Handler
  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  //resultData, runByStep, simple/specific SchemasData api 호출
  function run() {
    const url = "http://yesql-api.shop:8080";
    const sqlparse = "SELECT branch_name FROM account WHERE balance > 100;";
    axios
      .get(url + "/sql/resultData", {
        params: { sql: sqlparse, dbName: "admin" }
      })
      .then((response) => {
        const result = response.data.result;
        setVisualSQLData({ columns: result.columns, rows: result.rows });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    axios
      .get(url + "/manage/schemas/specificData", {
        params: { dbName: "u1" }
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
      <div className="text-5xl mb-10 border-b-2 border-yesql">
        <p className="ml-5 mt-2.5 mb-4 text-yesql font-bold">yeSQL</p>
      </div>

      <div class="grid grid-cols-2 gap-x-6 mx-8 mb-4">
        <div class="h-96 rounded-2xl shadow-md border border-grey">
          <textarea
            type="text"
            class="rounded-2xl h-5/6 w-full px-4 pt-4 resize-none focus:border-0"
          />
          <button
            onClick={() => run()}
            type="button"
            class="float-right rounded-xl bg-blue-600 px-3 py-1.5 mr-3 shadow-sm text-xl text-white shadow-sm hover:bg-blue-700"
          >
            RUN
          </button>
          {/* <button type="button" class="flex rounded-xl bg-blue-600 px-3 py-1.5 text-xl leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">RUN</button> */}
        </div>

        <div class="h-96 rounded-2xl shadow-md border">
          <div class="ml-4 relative overflow-x-auto shadow-md sm:rounded-lg"></div>
        </div>
      </div>

      <div class="mx-8 pt-2.5">
        <ul className="grid grid-cols-12 justify-center ml-2">
          {menuArr.map((el, index) => (
            <li
              className={`${
                index === currentTab
                  ? "submenu bg-yesql font-bold"
                  : "bg-blue-200"
              } pt-2.5 pb-4 text-lg text-white shadow-lg rounded-xl text-center md:col-span-2 sm:col-span-3 hover:bg-yesql hover:font-bold`}
              onClick={() => selectMenuHandler(index)}
            >
              {el.name}
            </li>
          ))}
        </ul>

        <div class="-mt-2.5 mb-20 w-full h-screen rounded-2xl shadow-md border border-grey bg-white z-10 relative">
          {menuArr[currentTab].content}
        </div>
      </div>
    </div>
  );
};

//tap-VisualSql
const VisualSql = ({ obj }) => {
  const convertRows = obj.rows.map((item) => Object.values(item));
  const orderKeyword = ["SELECT", "FROM", "WHERE"];
  const sql = "SELECT branch_name FROM account WHERE balance > 100;";
  const splitText = sql.split(" ");
  const whereKeyword = "WHERE";
  const index = sql.indexOf(whereKeyword);
  const substring = index !== -1 ? sql.slice(index + whereKeyword.length) : "";
  const result = whereKeyword + substring;
  const resultt = result.split(" ");

  return (
    <div className="h-full">
      <div className="flex flex-row w-full h-20 border-b-2 border-grey-400">
        <div className="w-1/12 border-r-2 border-grey">
          <div className=" mt-4 text-center text-3xl font-extrabold text-yesql">
            1
          </div>
        </div>
        <div className="w-full pt-4 pl-2">
          <p>
            {splitText.map((word, index) => {
              const isKeyword = orderKeyword.includes(word.replace(/>/, ""));
              return (
                <span
                  key={index}
                  className={isKeyword ? "text-red-500 font-bold" : ""}
                >
                  {word}{" "}
                </span>
              );
            })}
          </p>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-3/5">
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
          <div className="mx-auto w-11/12 h-20 rounded-3xl bg-red-100">
            <p className="px-8 py-4">
              {resultt.map((word, index) => {
                const isKeyword = orderKeyword.includes(word.replace(/>/, ""));
                return (
                  <span
                    key={index}
                    className={isKeyword ? "text-red-500 font-bold" : ""}
                  >
                    {word}{" "}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
        <div className="border-r-2 border-grey-400"></div>
      </div>
    </div>
  );
};

//**Tap-Simple_Schemas 수정 예정 */
// const TapSchemasSimple = ({ schema }) => {
//   return (
//     <div>
//       {schema.map((obj) => (
//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto my-8 w-fit">
//           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//               <tr>
//                 <th className="px-6 py-3">{obj.table}</th>
//               </tr>
//             </thead>
//             <tbody>
//               {obj.columns.map((col) => (
//                 <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
//                   {Object.values(col).map((item) => (
//                     <td className="px-6 py-4">{item}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// };

//Tap-Specific_Schemas
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

export default VisualizationPage;
