"use client"

import { Table } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from "@/components/ui/button"
import { ListFilter, File, Sheet, FileText, Printer } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "../data-table/data-table-view-options"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { X } from "lucide-react"
import { statuses } from "@/app/purchases/vendors/_components/data/data"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2 mt-2">
        <Input
          placeholder="Filter..."
          value={(table.getColumn("company_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("company_name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1 text-sm"
            >
              <ListFilter className="mr-2 h-4 w-4" />
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
              <File className="mr-2 h-4 w-4" />
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
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}