import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import useKeypress from 'react-use-keypress'

export default function Modal({
    isOpen,
    onClose
                              }) {
    let overlayRef = useRef()

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="relative z-50"
        >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            {/* Full-screen scrollable container */}
            <div className="fixed inset-0 overflow-y-auto">
                {/* Container to center the panel */}
                <div className="flex min-h-full items-center justify-center p-4">
                    {/* The actual dialog panel  */}
                    <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
                        <Dialog.Title>Complete your order</Dialog.Title>

                        {/* ... */}
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    )
}