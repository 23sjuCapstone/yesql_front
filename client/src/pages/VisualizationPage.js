import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";

const VisualizationPage =()=>{
return(
    <div>
        <div className="text-5xl mb-16 border-y border-indigo-500">
        <p className="ml-5 mt-2.5 mb-2.5  text-yesql-blue font-bold">yeSQL</p>
      </div>
        <div class="grid grid-rows-2 grid-flow-col grid-flow-row gap-6 mx-8 mb-4 h-screen">
    <div className="rounded-xl border border-black p-4 ">
        <textarea type="text" class="h-5/6 w-full resize-none"/>
    {/* <button type="button" class="flex rounded-xl bg-blue-600 px-3 py-1.5 text-xl leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">RUN</button> */}
        
        <button type="button" class="float-right rounded-xl bg-blue-600 px-3 py-1.5 text-xl text-white shadow-sm hover:bg-blue-700">
            RUN
        </button>
        
        
    
    </div>
    
  <div class="rounded-xl border border-black"></div>
  <div class="col-span-2 row-span-2 rounded-xl border border-black"></div>
</div>
    </div>

);
}

export default VisualizationPage;