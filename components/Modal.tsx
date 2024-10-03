'use client'

import React, { FormEvent, Fragment, useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import Image from 'next/image'
import { addUserEmailToProduct } from '@/lib/actions'

interface Props {
    productId:string
}

const Modal = ({productId}:Props) => {
    const [isOpen, setIsOpen] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState("")
    
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('you are in the submit button ')
        setIsSubmitting(true);
        await addUserEmailToProduct(productId,email)
        console.log("you have just passed the setIsSubmitting true")
        setIsSubmitting(false);
        console.log('you have just passed the setIsSubmitting(false)')
        setEmail('');
        closeModal();
        console.log("you have closed the model ")
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    return (
        <>
            <button type='button' className='btn' onClick={openModal}>
                Track
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' onClose={closeModal} className='dialog-container'>
                    <div className='min-h-screen px-4 text-center'>
                        {/* ... (TransitionChild components remain unchanged) ... */}
                        

                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <div className='dialog-content'>
                                {/* ... (dialog content remains unchanged) ... */}
                                
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className="p-3 border border-gray-200 rounded-10">
                      <Image 
                        src="/assets/icons/logo.svg"
                        alt="logo"
                        width={28}
                        height={28}
                      />
                    </div>

                    <Image 
                      src="/assets/icons/x-close.svg"
                      alt="close"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={closeModal}
                    />
                  </div>

                  <h4 className="dialog-head_text">
                    Stay updated with product pricing alerts right in your inbox!
                  </h4>

                  <p className="text-sm text-gray-600 mt-2">
                    Never miss a bargain again with our timely alerts!
                  </p>
                </div>

                                <form className='flex flex-col mt-5' onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                                    <label htmlFor="email" className='text-sm font-medium text-gray-700'>Email Address</label>
                                    <div className='dialog-input_container'>
                                        <Image
                                            src='/assets/icons/mail.svg'
                                            alt='mail'
                                            width={18}
                                            height={18}
                                        />
                                        <input
                                            type="email"
                                            required
                                            id='email'
                                            placeholder='Enter your email address'
                                            className='dialog-input'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <button type='submit' className='dialog-btn'>
                                        {isSubmitting ? 'Submitting...' : 'Track'}
                                    </button>
                                </form>
                            </div>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Modal