'use client'

import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { FormDataSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { CheckIcon, ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { addVendorSchema } from '@/lib/purchases.schema/vendor.schema'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { countryList } from '@/constants/data/countries'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

type Inputs = z.infer<typeof addVendorSchema>

const steps = [
    {
        id: 'Step 1',
        name: 'Basic Information',
        fields: ['firstName', 'lastName', 'email']
    },
    {
        id: 'Step 2',
        name: 'Address',
        fields: ['country', 'address']
    },
    { id: 'Step 3', name: 'Complete' }
]

export default function AddVendorForm() {

    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const delta = currentStep - previousStep

    const {
        register,
        handleSubmit,
        watch,
        reset,
        trigger,
        formState: { errors }
    } = useForm<Inputs>({
        resolver: zodResolver(addVendorSchema)
    })

    const processForm: SubmitHandler<Inputs> = data => {
        console.log(data)
        reset()
    }

    type FieldName = keyof Inputs

    const next = async () => {
        const fields = steps[currentStep].fields
        const output = await trigger(fields as FieldName[], { shouldFocus: true })

        if (!output) return

        if (currentStep < steps.length - 1) {
            if (currentStep === steps.length - 2) {
                await handleSubmit(processForm)()
            }
            setPreviousStep(currentStep)
            setCurrentStep(step => step + 1)
        }
    }

    const prev = () => {
        if (currentStep > 0) {
            setPreviousStep(currentStep)
            setCurrentStep(step => step - 1)
        }
    }

    return (
        <section className=' w-full inset-0 flex flex-col justify-between p-8'>
            {/* steps */}
            <nav aria-label='Progress'>
                <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
                    {steps.map((step, index) => (
                        <li key={step.name} className='md:flex-1'>
                            {currentStep > index ? (
                                <div className='group flex w-full flex-col border-l-4 border-primary py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                    <span className='text-sm font-semibold text-primary transition-colors '>
                                        {step.id}
                                    </span>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            ) : currentStep === index ? (
                                <div
                                    className='flex w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                                    aria-current='step'
                                >
                                    <span className='text-sm font-semibold text-primary'>
                                        {step.id}
                                    </span>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            ) : (
                                <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                    <span className='text-sm font-medium text-gray-500 transition-colors'>
                                        {step.id}
                                    </span>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>

            {/* Form */}
            <Form>
                <form className='mt-4 py-4 h-[400px]' onSubmit={handleSubmit(processForm)}>
                    {currentStep === 0 && (
                        <motion.div
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <h2 className='text-base font-semibold leading-7 text-primary'>
                                Basic Information
                            </h2>
                            <p className='mt-1 text-sm leading-6 text-gray-600'>
                                Provide your basic details.
                            </p>
                            <div className='mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6'>
                                <div className='sm:col-span-3'>
                                    <Label
                                        htmlFor='companyName'
                                        className='block text-sm font-medium leading-6 text-primary'
                                    >
                                        Company Name
                                    </Label>
                                    <div className='mt-2'>
                                        <Input
                                            type='text'
                                            id='companyName'
                                            {...register('companyName')}
                                            autoComplete='given-name'
                                            className='block w-full border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary rounded-lg sm:text-sm sm:leading-6'
                                        />
                                        {errors.companyName?.message && (
                                            <p className='mt-2 text-sm text-red-400'>
                                                {errors.companyName.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className='sm:col-span-3'>
                                    <Label
                                        htmlFor='tradeLicenseNumber'
                                        className='block text-sm font-medium leading-6 text-primary'
                                    >
                                        Trade License / Incorporation No.
                                    </Label>
                                    <div className='mt-2'>
                                        <Input
                                            type='text'
                                            id='tradeLicenseNumber'
                                            {...register('tradeLicenseNumber')}
                                            autoComplete='tradeLicenseNumber'
                                            className='block w-full rounded-lg border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                        />
                                        {errors.tradeLicenseNumber?.message && (
                                            <p className='mt-2 text-sm text-red-400'>
                                                {errors.tradeLicenseNumber.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className='sm:col-span-3'>
                                    <Label
                                        htmlFor='email'
                                        className='block text-sm font-medium leading-6 text-gray-900'
                                    >
                                        Address
                                    </Label>
                                    <div className='mt-2'>
                                        <Input
                                            id='address'
                                            type='address'
                                            {...register('address')}
                                            autoComplete='email'
                                            className='block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                                        />
                                        {errors.address?.message && (
                                            <p className='mt-2 text-sm text-red-400'>
                                                {errors.address.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className='sm:col-span-3'>
                                    <Label
                                        htmlFor='email'
                                        className='block text-sm font-medium leading-6 text-gray-900'
                                    >
                                        Address
                                    </Label>
                                    <div className='mt-2'>
                                        <Input
                                            id='address'
                                            type='address'
                                            {...register('address')}
                                            autoComplete='email'
                                            className='block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                                        />
                                        {errors.address?.message && (
                                            <p className='mt-2 text-sm text-red-400'>
                                                {errors.address.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 1 && (
                        <motion.div
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <h2 className='text-base font-semibold leading-7 text-gray-900'>
                                Address
                            </h2>
                            <p className='mt-1 text-sm leading-6 text-gray-600'>
                                Address where you can receive mail.
                            </p>

                            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                                <div className='sm:col-span-3'>
                                    <Label
                                        htmlFor='country'
                                        className='block text-sm font-medium leading-6 text-gray-900'
                                    >
                                        Country
                                    </Label>
                                    <div className='mt-2'>
                                        <FormField
                                            control={form.control}
                                            name="language"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Country</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "w-[540px] justify-between",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value
                                                                        ? countryList.find(
                                                                            (countryList) => countryList.label === field.value
                                                                        )?.label
                                                                        : "Select Country"}
                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[200px] p-0">
                                                            <Command>
                                                                <CommandInput placeholder="Search country..." />
                                                                <ScrollArea className="h-96">
                                                                    <CommandEmpty>No country found.</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {countryList.map((countryList) => (
                                                                            <CommandItem
                                                                                value={countryList.label}
                                                                                key={countryList.value}
                                                                                onSelect={() => {
                                                                                    form.setValue("country", countryList.label)
                                                                                }}
                                                                            >
                                                                                {countryList.icon}
                                                                                <div className="ml-4">
                                                                                    {countryList.label}
                                                                                </div>
                                                                                <CheckIcon
                                                                                    className={cn(
                                                                                        "ml-auto h-4 w-4",
                                                                                        countryList.label === field.value
                                                                                            ? "opacity-100"
                                                                                            : "opacity-0"
                                                                                    )}
                                                                                />
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </ScrollArea>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormDescription>
                                                        This is the language that will be used in the dashboard.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* <Select
                                        id='country'
                                        {...register('country')}
                                        autoComplete='country-name'
                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'>
        
                                        {errors.country?.message && (
                                                    <p className='mt-2 text-sm text-red-400'>
                                                        {errors.country.message}
                                                    </p>
                                                )}
                                        </Select> */}
                                        {/* <div className='col-span-full'>
                                        <label
                                            htmlFor='street'
                                            className='block text-sm font-medium leading-6 text-gray-900'
                                        >
                                            Street address
                                        </label>
                                        <div className='mt-2'>
                                            <input
                                                type='text'
                                                id='street'
                                                {...register('street')}
                                                autoComplete='street-address'
                                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                                            />
                                            {errors.street?.message && (
                                                <p className='mt-2 text-sm text-red-400'>
                                                    {errors.street.message}
                                                </p>
                                            )}
                                        </div>
                                    </div> */}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <>
                            <h2 className='text-base font-semibold leading-7 text-gray-900'>
                                Complete
                            </h2>
                            <p className='mt-1 text-sm leading-6 text-gray-600'>
                                Thank you for your submission.
                            </p>
                        </>
                    )}
                </form>
            </Form>

            {/* Navigation */}
            <div className='mt-8 pt-5'>
                <div className='flex justify-between'>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        disabled={currentStep === 0}
                        onClick={prev}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        disabled={currentStep === steps.length - 1}
                        onClick={next}
                    >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next</span>
                    </Button>
                </div>
            </div>
        </section>
    )
}
