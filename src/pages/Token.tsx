import { login } from "@/lib/discord";
import * as React from "react";

type TokenRecepterProps = {
  onClientReady: () => void;
}

export const TokenRecepter: React.FC<TokenRecepterProps> = ({onClientReady}) => {
  const [token, setToken] = React.useState("");
  const [state, setState] = React.useState<"awaiting" | "loggingIn" | "done">("awaiting");

  const handleConfirmed = (): void => {
    setState("loggingIn");
    login(token).then(
      () => {
        setState("done");
        onClientReady();
      }
    );
  }

  return (
    <div>
      <h1>発行したトークンを入力してください</h1>
      <input
        onKeyDown={(e) => {
          if(e.key === 'Enter') {
            handleConfirmed();
          }
        }}
        type="password"
        onChange={(e) => setToken(e.target.value)}
        value={token}
        disabled={state != "awaiting"}
      />
    </div>
  )
}

