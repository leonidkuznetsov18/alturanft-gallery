import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

import NFTDetail from '../NFTDetail';

interface IModalProps {
  nft: any;
  onClose: () => void;
}

const Modal = (props: IModalProps): JSX.Element => {
  const { nft, onClose } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      static
      open={true}
      onClose={handleClose}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="relative mx-auto max-w-lg rounded bg-white">
          <button
            className={'absolute top-[5px] right-[5px] z-10 h-[24px] w-[24px]'}
            onClick={handleClose}
          >
            <XMarkIcon />
          </button>
          <NFTDetail nft={nft} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
