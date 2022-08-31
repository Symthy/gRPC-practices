import { Link, useRoutes } from "react-router-dom";
import { ElizaCallbackForm } from "../components/eliza/ElizaCallbackForm";
import { ElizaFormByLocalGen } from "../components/eliza/ElizaFormByLocalGen";
import { ElizaFormByRemoteGen } from "../components/eliza/ElizaFormByRemoteGen";
import { ElizaStreamingForm } from "../components/eliza/ElizaStreamingForm";
import { GreetForm } from "../components/greet/GreetForm";

export const AppRoutes = () => {
  const routes = [
    { index: true, element: <ElizaFormByRemoteGen /> },
    { path: "/eliza-remote-gen", element: <ElizaFormByRemoteGen /> },
    { path: "/eliza-local-gen", element: <ElizaFormByLocalGen /> },
    { path: "/eliza-callback", element: <ElizaCallbackForm /> },
    { path: "/eliza-streaming", element: <ElizaStreamingForm /> },
    { path: "/greet", element: <GreetForm /> },
  ];

  const elements = useRoutes(routes);
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
        {" | "}
        <Link to="greet">{"Greet (own connect server by Golang)"}</Link>
      </nav>
      {elements}
    </>
  );
};
