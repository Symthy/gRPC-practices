import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { ElizaCallbackForm } from "./components/eliza/ElizaCallbackForm";
import { ElizaFormByLocalGen as ElizaFormByBufLocalGen } from "./components/eliza/ElizaFormByLocalGen";
import { ElizaFormByRemoteGen as ElizaFormByBufRemoteGen } from "./components/eliza/ElizaFormByRemoteGen";
import { ElizaStreamingForm } from "./components/eliza/ElizaStreamingForm";

export const App = () => {
  return (
    <>
      <nav>
        <Link to="eliza-remote-gen">{"Eliza Form (by Remote Generation)"}</Link>
        {" | "}
        <Link to="eliza-local-gen">{"Eliza Form (by Local Generation)"}</Link>
        {" | "}
        <Link to="eliza-callback">{"Eliza Form (by Callback)"}</Link>
        {" | "}
        <Link to="eliza-streaming">{"Eliza Form (by Streaming)"}</Link>
      </nav>
      <Routes>
        <Route index element={<ElizaFormByBufRemoteGen />} /> {/* redirect */}
        <Route path="/eliza-remote-gen" element={<ElizaFormByBufRemoteGen />} />
        <Route path="/eliza-local-gen" element={<ElizaFormByBufLocalGen />} />
        <Route path="/eliza-callback" element={<ElizaCallbackForm />} />
        <Route path="/eliza-streaming" element={<ElizaStreamingForm />} />
      </Routes>
    </>
  );
};
