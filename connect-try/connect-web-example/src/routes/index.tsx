import { Link, useRoutes } from "react-router-dom";
import { ElizaCallbackForm } from "../components/eliza/ElizaCallbackForm";
import { ElizaFormByLocalGen } from "../components/eliza/ElizaFormByLocalGen";
import { ElizaFormByRemoteGen } from "../components/eliza/ElizaFormByRemoteGen";
import { ElizaStreamingForm } from "../components/eliza/ElizaStreamingForm";
import { GreetForm } from "../components/greet/GreetForm";

const ELIZA_REMOTE_GEN_COMP_TITLE = "Eliza Form (by Remote Generation)";
const ELIZA_LOCAL_GEN_COMP_TITLE = "Eliza Form (by Local Generation)";
const ELIZA_CALLBACK_COMP_TITLE = "Eliza Form (by Callback)";
const ELIZA_STREMING_COMP_TITLE = "Eliza Form (by Streaming)";
const GREET_COMP_TITLE = "Greet Form (own connect server by Golang)";

export const AppRoutes = () => {
  const routes = [
    {
      index: true,
      element: <ElizaFormByRemoteGen title={ELIZA_REMOTE_GEN_COMP_TITLE} />,
    },
    {
      path: "/eliza-remote-gen",
      element: <ElizaFormByRemoteGen title={ELIZA_REMOTE_GEN_COMP_TITLE} />,
    },
    {
      path: "/eliza-local-gen",
      element: <ElizaFormByLocalGen title={ELIZA_LOCAL_GEN_COMP_TITLE} />,
    },
    {
      path: "/eliza-callback",
      element: <ElizaCallbackForm title={ELIZA_CALLBACK_COMP_TITLE} />,
    },
    {
      path: "/eliza-streaming",
      element: <ElizaStreamingForm title={ELIZA_STREMING_COMP_TITLE} />,
    },
    { path: "/greet", element: <GreetForm title={GREET_COMP_TITLE} /> },
  ];

  const elements = useRoutes(routes);
  return (
    <>
      <nav>
        <Link to="eliza-remote-gen">{ELIZA_REMOTE_GEN_COMP_TITLE}</Link>
        {" | "}
        <Link to="eliza-local-gen">{ELIZA_LOCAL_GEN_COMP_TITLE}</Link>
        {" | "}
        <Link to="eliza-callback">{ELIZA_CALLBACK_COMP_TITLE}</Link>
        {" | "}
        <Link to="eliza-streaming">{ELIZA_STREMING_COMP_TITLE}</Link>
        {" | "}
        <Link to="greet">{GREET_COMP_TITLE}</Link>
      </nav>
      {elements}
    </>
  );
};
