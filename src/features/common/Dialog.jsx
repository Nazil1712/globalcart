import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const PopupBox = ({
  title,
  message,
  dangerOption,
  cancelOption,
  dangerAction,
  cancleAction,
  showPopUp,
}) => {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const handleDanger = () => {
    setOpen(false);
    dangerAction();
  };

  const handleCancle = () =>{
    setOpen(false)
    cancleAction()
  }

  useEffect(() => {
    if (showPopUp) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [showPopUp]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-[2rem] bg-white/95 backdrop-blur-2xl text-center md:text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md premium-shadow border border-white">
                <div className="px-6 pb-6 pt-8 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-[1.5rem] bg-red-50/80 ring-8 ring-red-50/50">
                      <ExclamationTriangleIcon
                        className="h-8 w-8 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-2 text-center sm:mt-1 sm:text-left flex-1">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-black leading-6 text-slate-900 tracking-tight"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-3">
                        <p className="text-sm font-medium text-slate-500 leading-relaxed">{message}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50/80 px-6 py-5 sm:flex sm:flex-row-reverse sm:px-8 border-t border-slate-100 gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-2xl bg-red-500 px-5 py-3.5 md:py-2.5 text-sm font-bold text-white shadow-lg shadow-red-200 hover:bg-red-600 transition-all duration-200"
                    onClick={() => handleDanger()}
                  >
                    {dangerOption}
                  </button>
                  <button
                    type="button"
                    className="mt-3 sm:mt-0 inline-flex w-full justify-center rounded-2xl bg-white px-5 py-3.5 md:py-2.5 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
                    onClick={() => handleCancle()}
                    ref={cancelButtonRef}
                  >
                    {cancelOption}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PopupBox;
