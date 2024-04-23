"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/app/_components/data-table/data-table-column-header"
import { DataTableRowActions } from "@/app/_components/data-table/data-table-row-actions"
import { Vendor } from "./data/schema"
import { statuses } from "./data/data"
import { cn } from "@/lib/utils"

export const columns: ColumnDef<Vendor>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ row }) => <div className="w-[20px]">{row.getValue("id")}</div>,
        enableSorting: true,
        enableHiding: false,
    },
    {
        accessorKey: "company_name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Vendor Name" />
        ),
        cell: ({ row }) => {

            return (
                <div className="flex">
                    <span className="max-w-[100px] truncate font-medium">
                        {row.getValue("company_name")}
                    </span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "full_name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Contact Person" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <span className="max-w-[150px] truncate font-normal">
                        {row.getValue("full_name")}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <span className="max-w-[200px] truncate">
                        {row.getValue("email")}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "phone_number",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[150px] items-center truncate">
                    {row.getValue("phone_number")}
                </div>
            )
        },
    },
    // {
    //     accessorKey: "address",
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Address" />
    //     ),
    //     cell: ({ row }) => {
    //         return (
    //             <div className="flex w-[100px] items-center truncate">
    //                     {row.getValue("address")}
    //             </div>
    //         )
    //     },
    // },
    // {
    //     accessorKey: "country",
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Country" />
    //     ),
    //     cell: ({ row }) => {
    //         return (
    //             <div className="flex w-[100px] items-center">
    //                 <span className="max-w-[500px] truncate font-medium">
    //                     {row.getValue("country")}
    //                 </span>
    //             </div>
    //         )
    //     },
    // },
    {
        accessorKey: "date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created Date" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center justify-end">
                    <span className="max-w-[100px] truncate ">
                        {row.getValue("date")}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue("status")
            )

            if (!status) {
                return null
            }
            return (
                <div className={cn("flex w-[100px] items-center text-primary px-1 rounded-xl dark:text-black",
                    status.value == "draft" ? "bg-yellow-100 p-1" :
                        status.value == "inactive" ? "bg-red-100 p-1" :
                                status.value == "archived" ? "bg-gray-100 p-1" : "bg-green-100 p-1"
                )}>
                    {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{status.label}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    // {
    //     id: "actions",
    //     cell: ({ row }) => <DataTableRowActions row={row} />,
    // },
]