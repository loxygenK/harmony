import * as React from "react";
import styles from "@/style/style.module.scss";

export const App = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <p>
        You pushed the button
        <span className={styles.test}> {count} time{count == 1 ? "": "s"}</span>.
      </p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
