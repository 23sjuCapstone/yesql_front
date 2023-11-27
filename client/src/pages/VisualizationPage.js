import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import importIcon from "../img/import.png";
import exportIcon from "../img/export.png";
import axios from "axios";
import { useAsyncError } from "react-router-dom";

const VisualizationPage = () => {
  const [sqlInput, setSqlInput] = useState("");
  const [currentTab, clickTab] = useState(0);
  const [isRunClick, setIsRunClick] = useState(false);
  const [VisualSQLdata, setVisualSQLData] = useState({
    rows: [],
    columns: [],
    conditionColumns: [],
    conditions: "",
    keyword: "",
    selectedColumns: [],
    sqlStatement: "",
    table: ""
  });
  const [Resultdata, setResultData] = useState({ columns: [], rows: [] });
  const [Schemasdata, setSchemasData] = useState({
    columns: [],
    rows: [],
    table: []
  });

  //Tapmenu
  const menuArr = [
    {
      name: "Visual SQL",
      content: (
        <VisualSql obj={VisualSQLdata} sql={sqlInput} isRunClick={isRunClick} />
      )
    },
    {
      name: "Simple Schemas",
      content: <TapSimpleSchemas schema={Schemasdata} isRunClick={isRunClick} />
    },
    {
      name: "Specific Schemas",
      content: (
        <TapSpecificSchemas schema={Schemasdata} isRunClick={isRunClick} />
      )
    },
    {
      name: "Result",
      content: <Result obj={Resultdata} isRunClick={isRunClick} />
    }
  ];

  //Tapmenu-Handler
  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  //resultData, runByStep, simple/specific SchemasData api 호출
  function run() {
    const url = "http://yesql-api.shop:8080";
    const sqlparse = sqlInput;
    setIsRunClick(true);
    axios
      .get(url + "/sql/runByStep", {
        params: { sql: sqlparse, dbName: "admin" }
      })
      .then((response) => {
        const result = response.data.result;

        setVisualSQLData(result);
        console.log("1출력res=", result);
        console.log("1저장res2=", VisualSQLdata);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    axios
      .get(url + "/sql/resultData", {
        params: { sql: sqlparse, dbName: "admin" }
      })
      .then((response) => {
        const result = response.data.result;
        setResultData(result);
        console.log("2출력res=", result);
        console.log("2저장res2=", Resultdata);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    axios
      .get(url + "/manage/schemas/specificData", {
        params: { dbName: "admin" }
      })
      .then((response) => {
        const result = response.data.result;
        console.log("3출력", result);
        if (sqlparse !== "") {
          setSchemasData(result);
          console.log("3저장=", Schemasdata);
        }
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
            value={sqlInput}
            onChange={(e) => {
              setSqlInput(e.target.value);
            }}
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
        <ul className="grid grid-cols-12 justify-center ml-4">
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
          <a className="col-start-11 text-center flex flex-row">
            import
            <img src={importIcon} className="w-5 h-5 mt-1 ml-1"></img>
          </a>
          <a className="text-center flex flex-row">
            export
            <img src={exportIcon} className="w-5 h-5 mt-1 ml-1"></img>
          </a>
        </ul>
        {isRunClick ? (
          <div class="-mt-2.5 mb-20 w-full h-auto rounded-2xl shadow-md border border-grey bg-white z-10 relative">
            <div className="h-full">{menuArr[currentTab].content}</div>
          </div>
        ) : (
          <div className="-mt-2.5 mb-20 w-full h-screen rounded-2xl shadow-md border border-grey bg-white z-10 relative"></div>
        )}
      </div>
    </div>
  );
};

const VisualSQLResult = ({ sqlparse }) => {
  const url = "http://yesql-api.shop:8080";
  const [tapResult, setTapResult] = useState({ columns: [], rows: [] });
  axios
    .get(url + "/sql/resultData", {
      params: { sql: sqlparse, dbName: "admin" }
    })
    .then((response) => {
      const result = response.data.result;
      setTapResult(result);
      console.log("2출력res=", result);
      console.log("2저장res2=", tapResult);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
const Result = ({ obj, isRunClick }) => {
  const convertRows = obj.rows.map((item) => Object.values(item));
  return isRunClick ? (
    <div>
      <div className="flex flex-row">
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
      </div>
    </div>
  ) : (
    <div></div>
  );
};
//tap-VisualSql
const VisualSql = ({ obj, sql, isRunClick }) => {
  console.log("obj=", obj);
  const orderKeyword = ["SELECT", "FROM", "WHERE"];
  let count = 0;
  if (obj && Array.isArray(obj)) {
    return isRunClick ? (
      <div>
        {obj.map((item) => (
          <div className="border-b-2">
            <div className="flex flex-row w-full h-20 border-b-2 border-grey-400">
              <div className="w-1/12 border-r-2 border-grey">
                <div className=" mt-4 text-center text-3xl font-extrabold text-yesql">
                  {++count}
                </div>
              </div>
              <div className="w-full pt-4 pl-2">
                <p>
                  {item.sqlStatement.split(" ").map((word, index) => {
                    const isKeyword = orderKeyword.includes(
                      word.replace(/>/, "")
                    );
                    return (
                      <span
                        key={index}
                        className={isKeyword ? "text-yesql font-bold" : ""}
                      >
                        {word}{" "}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="w-3/5 border-r border-gray-700">
                <div className="px-8 pt-8 flex flex-wrap gap-x-8 gap-y-4">
                  {item.tableData ? (
                    item.tableData.map((td) => (
                      <div className="mt-6">
                        {td.tables !== null && (
                          <p className="mb-4 text-center font-bold text-xl">
                            {td.table}
                          </p>
                        )}
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto mb-8 w-fit">
                          <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-slate-500">
                              <tr>
                                {td.columns.map((subject, columnIndex) => {
                                  if (item.keyword === "SELECT") {
                                    if (item.conditionColumns === "*") {
                                      const isConditionColumn =
                                        item.conditionColumns.find(
                                          (col) => col.columnLabel === subject
                                        );
                                      return (
                                        //"border-4 border-red-500"
                                        <th
                                          className={`px-6 py-3 bg-sky-200 ${
                                            isConditionColumn
                                              ? "bg-red-200"
                                              : ""
                                          }`}
                                        >
                                          {subject}
                                        </th>
                                      );
                                    } else if (item.conditionColumns === null) {
                                      <th className="px-6 py-3">{subject}</th>;
                                    } else {
                                      const isConditionColumn =
                                        item.conditionColumns.find(
                                          (col) => col.columnLabel === subject
                                        );
                                      const isSelectedColumn =
                                        item.selectedColumns.find(
                                          (col) => col.columnLabel === subject
                                        );
                                      return (
                                        //"border-4 border-red-500"
                                        <th
                                          key={columnIndex}
                                          className={`px-6 py-3 ${
                                            isConditionColumn
                                              ? "bg-red-200"
                                              : ""
                                          } ${
                                            isSelectedColumn
                                              ? "border-x-4 border-t-4 border-yesql"
                                              : ""
                                          }`}
                                        >
                                          {subject}
                                        </th>
                                      );
                                    }
                                  } else {
                                    return (
                                      <th
                                        key={columnIndex}
                                        className="px-6 py-3"
                                      >
                                        {subject}
                                      </th>
                                    );
                                  }
                                })}
                              </tr>
                            </thead>
                            <tbody>
                              {td.rows.map((row, rowIndex) => (
                                <tr
                                  key={rowIndex}
                                  className="border-b dark:bg-gray-800 dark:border-gray-700 last:border-b-0"
                                >
                                  {Object.entries(row).map(([key, value]) => {
                                    if (item.keyword === "SELECT") {
                                      const isSelectedColumn =
                                        item.selectedColumns.find(
                                          (col) => col.columnLabel === key
                                        );

                                      const isLastColumn =
                                        rowIndex === td.rows.length - 1;

                                      console.log(row, rowIndex);
                                      return (
                                        <td
                                          key={key}
                                          className={`px-6 py-4 ${
                                            isSelectedColumn
                                              ? "border-x-4 border-yesql"
                                              : ""
                                          } ${
                                            isSelectedColumn && isLastColumn
                                              ? "border-b-4 border-yesql"
                                              : ""
                                          }`}
                                        >
                                          {value}
                                        </td>
                                      );
                                    } else {
                                      return (
                                        <td key={key} className="px-6 py-4">
                                          {value}
                                        </td>
                                      );
                                    }
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div></div>
                  )}
                </div>
                <div>
                  {item.conditions && item.conditions[0] ? (
                    <div className="mx-auto mb-8 w-11/12 h-20 rounded-3xl bg-red-100">
                      <div>
                        <p className="px-8 py-4">
                          {item.conditions[0].split(" ").map((word, index) => {
                            const isKeyword = orderKeyword.includes(
                              word.replace(/>/, "")
                            );
                            return (
                              <span
                                key={index}
                                className={
                                  isKeyword ? "text-red-500 font-bold" : ""
                                }
                              >
                                {word}{" "}
                              </span>
                            );
                          })}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div>1</div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div></div>
    );
  } else {
    return <div></div>;
  }
};

const TapSimpleSchemas = ({ schema, isRunClick }) => {
  return isRunClick ? (
    <div className="px-8 pt-8 flex flex-wrap gap-x-8 gap-y-4">
      {schema.map((obj, index) => (
        <div className="mt-6">
          <p className="mb-2 text-center font-bold text-xl">{obj.table}</p>
          <div
            key={index}
            className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto mb-8 w-fit"
          >
            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                {obj.columns.map((col) => (
                  <tr className="border-b dark:bg-gray-800">
                    <td className="px-6 py-4 text-xs text-gray-700 font-semibold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      {col}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div></div>
  );
};

//Tap-Specific_Schemas
const TapSpecificSchemas = ({ schema, isRunClick }) => {
  return isRunClick ? (
    <div className="px-8 pt-8 flex flex-wrap gap-x-8 gap-y-4">
      {schema.map((obj, index) => (
        <div className="mt-6">
          <p className="mb-2 text-center font-bold text-xl">{obj.table}</p>
          <div
            key={index}
            className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto mb-8 w-fit"
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
        </div>
      ))}
    </div>
  ) : (
    <div></div>
  );
};

export default VisualizationPage;
