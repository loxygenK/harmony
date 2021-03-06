import * as React from "react";
import { TokenRecepter } from "./Token";
import { ClientViewer } from "./Client";

export const App: React.FC = () => {
  const [isLoggedin, setLoggedIn] = React.useState(false);

  return (
    <div>
      {!isLoggedin && <TokenRecepter onClientReady={() => setLoggedIn(true)} />}
      {isLoggedin && <ClientViewer />}
    </div>
  );
};
