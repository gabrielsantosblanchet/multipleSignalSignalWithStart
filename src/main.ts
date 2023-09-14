import { defineSignal } from "@temporalio/workflow";
import { WorkflowClient } from "@temporalio/client";
type Order = {
  id: string;
  value: number;
};
const signal1 = defineSignal<[string | undefined]>("signal1");
const signal2 = defineSignal<[Order | undefined]>("signal2");

async function main() {
  let signalToUse;
  if (Date.now() % 2 === 0) signalToUse = signal1;
  else signalToUse = signal2;

  const temporalClient = new WorkflowClient({
    namespace: process.env.TEMPORAL_NAMESPACE,
  });

  temporalClient.signalWithStart("test", {
    signal: signalToUse,
    signalArgs: [undefined],
  });
}

main().catch((e) => {
  console.log(e);
});
