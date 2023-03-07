import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import NFTDetail from "../NFTDetail";

export default function Modal({
                                  onClose,
                              }: {

    onClose?: () => void
}) {
    const router = useRouter()

    function handleClose() {
        router.push('/', undefined, { shallow: true })
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
                <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
                    <Dialog.Title>Title</Dialog.Title>

                   <NFTDetail nft={{}} />
                </Dialog.Panel>
            </div>

        </Dialog>
    )
}