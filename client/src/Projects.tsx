import "./Projects.css";
import * as React from "react";
import Project from "./Project";


export default function Projects() {
  
  return (
    <div className="content">
      <h1>Project overview</h1>
      <h2>Current projects of your community:</h2>

      <ul>
        <li>
          <Project project={{
            name: "Windmill",
            progress: 25,
            participants: 12

          }}></Project>
        </li>
        <li>
         <Project project={{
            name: "Solar power plant",
            progress: 50,
            participants: 12

          }}></Project>
        </li>
      </ul>
    </div>
  );
}
