import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ListFilter, File, Sheet, FileText, Printer } from 'lucide-react'
import React, { useMemo } from 'react'
import PageHeader from '@/app/_components/PageHeader'
import { DataTable } from '@/app/_components/data-table/data-table'
import { columns } from './_components/columns'
import path from 'path'
import { vendorSchema } from './_components/data/schema'
import { z } from 'zod'
import { promises as fs } from "fs"
import vendorJSON from '../../../data/vendor.json'



async function getVendors() {
    const data = await fs.readFile(
        path.join(process.cwd(), "src/data/vendor.json")
    )

    const vendor = JSON.parse(data.toString())

    return z.array(vendorSchema).parse(vendor)
}


export default async function Vendors() {

    const vendors = useMemo(() => vendorJSON, [])


    return (

        <section className="mx-auto max-w-full">
            <div>
                {/* <Tabs defaultValue="all">
                    <div className="flex items-center mb-5">
                        <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
                            <TabsTrigger
                                value="all"
                                className="relative rounded-none border-b-2 border-b-transparent bg-transparent transition-all px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none 
                     data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                            >
                                All
                            </TabsTrigger>
                            <TabsTrigger
                                value="active"
                                className="relative rounded-none border-b-2 border-b-transparent bg-transparent transition-all px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none 
                     data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                            >
                                Active
                            </TabsTrigger>
                            <TabsTrigger
                                value="archived"
                                className="relative rounded-none border-b-2 border-b-transparent bg-transparent transition-all px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none 
                     data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                            >
                                Archived
                            </TabsTrigger>
                        </TabsList> */}
                        {/* <div className="ml-auto flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 gap-1 text-sm"
                                    >
                                        <ListFilter className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only">Filter</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem checked>
                                        Fulfilled
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        Declined
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        Refunded
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 gap-1 text-sm"
                                    >
                                        <File className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only">Export</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem className='justify-start'>
                                        <Sheet className="mr-3 h-3.5 w-3.5" />
                                        Excel
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        <FileText className="mr-3 h-3.5 w-3.5" />
                                        PDF
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        <Printer className="mr-3 h-3.5 w-3.5" />
                                        Print
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div> */}
                    {/* <TabsContent value="all"> */}
                        <Card x-chunk="dashboard-05-chunk-3">
                            <CardHeader className="px-5">
                                <CardTitle>
                                    <div className="flex flex-col space-y-0 md:flex-row md:items-center md:justify-between md:space-y-0">
                                        <PageHeader
                                            title='Vendors'
                                            href={"/purchases/vendors/add"}
                                            buttonTitle='Vendor'
                                        />
                                    </div>
                                </CardTitle>
                                <CardDescription>
                                    This is a list of all vendors. You can add new vendors, edit or delete existing
                                    ones.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='overflow-x-auto'>
                                <DataTable columns={columns} data={vendorJSON} />
                            </CardContent>
                        </Card>
                    {/* </TabsContent>
                </Tabs> */}
            </div>
        </section>
    )
}
