import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import clsx from "clsx";

interface FilterListBoxProps {
  label: string;
  undefinedLabel?: string;
  options: readonly (string | undefined)[];
  value?: string;
  onChange: (value?: string) => void;
}

export default function FilterListBox(props: FilterListBoxProps) {
  return (
    <Listbox value={props.value} onChange={(value) => props.onChange(value)}>
      <div className="relative w-full">
        <Listbox.Button className="border border-zinc-300 text-zinc-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8">
          <span className="block truncate">
            {props.label}: {props.value || props.undefinedLabel || ""}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="w-5 h-5 text-zinc-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {props.options.map((option, i) => (
              <Listbox.Option
                key={i}
                className={({ active }) =>
                  clsx(
                    "cursor-default select-none relative py-2 pl-10 pr-4",
                    active ? "text-zinc-900 bg-zinc-100" : "text-zinc-900"
                  )
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={clsx(
                        "block",
                        selected ? "font-medium" : "font-normal"
                      )}
                    >
                      {option || "All"}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-600">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
