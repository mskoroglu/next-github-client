import React from "react";
import clsx from "clsx";

function ValueSerializer(props: { value: any }) {
  return typeof props.value === "object" ? (
    <pre className="bg-zinc-50 p-2 overflow-auto rounded-lg max-h-48">
      {JSON.stringify(props.value, null, 2)}
    </pre>
  ) : (
    <>{String(props.value || "-")}</>
  );
}

interface InfoTableProps {
  title: string;
  info: object;
}

export default function InfoTable(props: InfoTableProps) {
  const map = new Map(Object.entries(props.info));
  const keys = Array.from(map.keys());
  return (
    <div className="mt-16">
      <h2 className="text-left text-2xl font-bold font-mono text-zinc-800">
        {props.title}
      </h2>
      <dl className="text-left grid grid-cols-2 gap-4">
        {keys.map((key, i) => (
          <div
            key={key}
            className={clsx(
              keys.length % 2 !== 0 && keys.length === i + 1 && "col-span-2"
            )}
          >
            <dt className="font-bold uppercase mt-4 text-zinc-800">
              {key.replace(/_/g, " ")}
            </dt>
            <dd className="break-words">
              <ValueSerializer value={map.get(key)} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
