import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import NFTDetail from "../NFTDetail";
import { XMarkIcon } from '@heroicons/react/24/solid'

export default function Modal({
    nft,
                                  onClose
                              }) {
    const router = useRouter()
    function handleClose() {
        onClose()
    }

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
                    <button className={'absolute top-[5px] right-[5px] z-10 w-[24px] h-[24px]'} onClick={handleClose}>
                        <XMarkIcon />
                    </button>
                   <NFTDetail nft={nft} />
                </Dialog.Panel>
            </div>

        </Dialog>
    )
}