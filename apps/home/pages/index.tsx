import { Button } from "@repo/component/Button";
import { addNumber } from "../../../packages/util/src/number";

export default function Home() {
  return (
    <h1>
      Home<Button appName="1">1</Button>
      {addNumber(1, 2)}
    </h1>
  );
}
