import {
  useState,
  Fragment,
  isValidElement,
  Children,
  cloneElement,
  useRef,
} from "react";
import { Transition } from "@headlessui/react";
import { ReferenceType, useFloating } from "@floating-ui/react-dom";

type TooltipProps = {
  tooltip: string;
  children: React.ReactNode;
};

export default function Tooltip({ children, tooltip }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { x, y, reference, floating, strategy } = useFloating();

  return (
    <>
      <div
        ref={reference}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </div>
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition-opacity"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: "max-content",
          }}
          className="rounded-xl bg-slate-900/50 p-2 opacity-0"
        >
          <h2 className="text-sm font-bold text-slate-50">{tooltip}</h2>
        </div>
      </Transition>
    </>
  );
}
