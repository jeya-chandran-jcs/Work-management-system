import type { ErrorModalProps } from "../../types/data";
import Button from "../base/Button";



export default function ErrorModal({ message, visible, onClose }: ErrorModalProps) {
  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-800/60 z-40"></div>

      
      <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-lg shadow-lg border border-green-800">
        <div className="flex flex-col gap-2">
          {/* Header */}
          <div className="flex justify-between px-3 items-center w-full p-2 bg-green-300 rounded-t-lg">
            <a className="font-semibold text-md text-green-700 cursor-pointer" onClick={onClose}>Try Again!!</a> 
            <Button
              style="text-xl font-bold  px-2 border border-green-500  rounded-lg bg-white text-green-400  hover:bg-green-700 hover:text-white transition duration-300 ease-in-out"
              handleSubmit={onClose}
              type="button"
              text="x"
            />
          </div>

          {/* Message */}
          <p className="py-4 px-4 text-center text-md font-semibold text-gray-800">
            {message}
          </p>
        </div>
      </div>
    </>
  );
}
