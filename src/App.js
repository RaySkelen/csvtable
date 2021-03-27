import React, { useEffect, useLayoutEffect, useState } from "react";
import { readString } from "react-papaparse";
import { connect } from "react-redux";
import "./App.css";
import Incorrect from "./Incorrect";
import { setState } from "./redux/dataReducer";
import Table from "./Table";

const App = (props) => {
  const [data, setData] = useState("");
  const [fileIsCorrect, setFileIsCorrect] = useState(true);
  let input = React.createRef();
  let fileReader;
  const handleFileRead = () => {
    const content = fileReader.result;
    setData(readString(content));
  };

  const handleFileChosen = (file) => {
    if (file.name.split(".")[1] === "csv") {
      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
      setFileIsCorrect(true);
    } else {
      setFileIsCorrect(false);
    }
  };
  useLayoutEffect(() => {
    props.setState();
  }, []);
  useEffect(() => {
    if (props.data !== undefined) {
      setData(readString(props.data));
    }
  }, [props.data]);
  return (
    <div className="App">
      {fileIsCorrect ? <Table data={data} /> : <Incorrect />}
      <button>
        Import users
      <input
          name="csv"
          type="file"
          onChange={(e) => handleFileChosen(e.target.files[0])}
          accept=".csv"
          ref={input}
        />
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.data.data,
});

export default connect(mapStateToProps, { setState })(App);
