import React, { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  closeModal: () => void;
};

const Modal = ({ isOpen, children, closeModal }: Props) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/60 grid place-items-center px-[30px]"
      onClick={closeModal}
    >
      <div
        className="flex flex-col md:mx-0 md:max-w-[333px] w-full bg-bingo-foggyBlue border-[3px] border-black rounded-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
