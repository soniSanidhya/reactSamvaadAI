import React from "react";

function Response({ response }) {
  return (
    <div className=" my-1">
      <div className="flex w-full justify-end">
        <div className=" bg-red-600 py-2 px-4 rounded-2xl">{response}</div>
        <div className="p-1">
          <i className="fi fi-tr-file-pdf"></i>
        </div>
      </div>
    </div>
  );
}

export default Response;
