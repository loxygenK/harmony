import * as React from "react";
import * as ReactDOM from "react-dom";

const Sample = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <p>You pushed the button {count} time{count != 1 ? "s" : ""}!</p>
      <button onClick={() => setCount(count + 1)}>Push me</button>
    </div>
  );
}

ReactDOM.render(
  <Sample />,
  document.getElementById("root")
);

