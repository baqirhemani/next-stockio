'use client'

import React from 'react';
import { BarChart, Wallet, Wrench, Box, CircleDollarSign, MapPin, Newspaper, Ship, ShoppingBasket, User, WalletCards, Warehouse, Boxes } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button'
import { title } from 'process';

const mainNav = [
  {
    title: "Dashboard",
    href: "/",
    icon: BarChart,
    isParent: false,
  },
  {
    title: "Purchases",
    href: "/purchases",
    icon: ShoppingBasket,
    isParent: true,
    children: [
        {
          title: "Vendors",
          href: "/purchases/vendors",
        },
        {
          title: "Requisitions",
          href: "/purchases/purchase-requisitions",
        },
        {
            title: "Quotations",
            href: "/purchases/purchase-quotations",
        },
        {
          title: "Purchase Orders",
          href: "/purchases/purchase-orders",
        },
        {
          title: "Invoices",
          href: "/purchases/purchase-invoices",
        },
        {
            title: "Payments",
            href: "/purchases/payments",
          },
        {
          title: "Credit Notes",
          href: "/purchases/credit-notes",
        },
      ],
  },
  {
    title: "Sales",
    href: "/sales",
    icon: CircleDollarSign,
    isParent: true,
    children: [
        {
          title: "Customers",
          href: "/sales/customers",
        },
        {
          title: "Requisitions",
          href: "/sales/sales-requisitions",
        },
        {
            title: "Quotations",
            href: "/sales/sales-quotations",
        },
        {
          title: "Sales Orders",
          href: "/sales/sales-orders",
        },
        {
          title: "Invoices",
          href: "/sales/sales-invoices",
        },
        {
            title: "Receipts",
            href: "/sales/receipts",
          },
        {
          title: "Debit Notes",
          href: "/sales/debit-notes",
        },
      ],
  },
  {
    title: "Locations",
    href: "/locations",
    icon: MapPin,
    isParent: true,
    children: [
        {
          title: "Countries",
          href: "/locations/countries",
        },
        {
          title: "Cities",
          href: "/locations/cities",
        },
        {
            title: "Warehouses",
            href: "/locations/warehouses",
        },
        {
          title: "Parkings",
          href: "/locations/parkings",
        },
        {
          title: "Stores",
          href: "/location/stores",
        },
      ],
  },
  {
    title: "Products",
    href: "/products",
    icon: Box,
    isParent: true,
    children: [
      {
        title: "Category",
        href: "/products/category"
      },
      {
        title: "Sub category",
        href: "/products/subcategory"
      },
      {
        title: "Items",
        href: "/products/items"
      }
    ]
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Warehouse,
    isParent: true,
    children: [
      {
        title: "Stock In Hand",
        href: "/inventory/stockinhand",
      },
      {
        title: "Goods Receipt",
        href: "/inventory/goods-receipt",
      },
      {
        title: "Goods Delivery",
        href: "/inventory/goods-delivery",
      },
      {
        title: "Transfer Orders",
        href: "/goods-transfers",
      },
      {
        title: "Adjustments",
        href: "/adjustment",
      },
    ],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Wrench,
    isParent: false,
  },
  {
    title: "Account",
    href: "/account",
    icon: User,
    isParent: false,
  },
]


export default function Sidebar() {

    const pathname = usePathname();

  return (
  <>
    <aside className="md:block sm:hidden h-screen w-48 flex flex-col overflow-y-auto border-r bg-background px-5 py-8 fixed z-50 dark:border-r-slate-900">
    <Link
     href="/">
    <div className='flex -mt-4 items-center'>
     <Boxes className="h-5 w-5" aria-hidden="true" />
     <span className="mx-5 text-xl font-bold">Stockio</span> 
     </div>
    </Link>
    {mainNav?.length ? (
        <nav className={`flex flex-col gap-4 mt-6 -mx-3 no-underline`}>
          {mainNav?.map((item, index) =>
            item.children ? (
              <Accordion type="single" collapsible key={index}>
                <AccordionItem value={item.title} className="border-b-0">
                  <AccordionTrigger
                    className={cn(
                      buttonVariants({
                        size: "sm",
                        variant: "ghost",
                      }),
                      "justify-between hover:no-underline ease-in-out",
                    )}
                  >
                    <div className={`flex items-center justify-start, 
                    ${pathname === item?.href ? "active:bg-gray-100 active:rounded-lg" : ""}`}>
                      {item.icon && (
                        <item.icon
                          className="mr-4 h-4 w-4"
                          aria-hidden="true"
                        />
                      )}
                      {item.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="ml-8 flex flex-col space-y-1 mt-3 -mb-5 ease-in-out">
                      {item.children.map((child, index) => (
                        <Link
                          key={index}
                          href={child.href || "/"}
                          className={cn(
                            buttonVariants({
                              size: "sm",
                              variant: "ghost",
                            }),
                            "justify-start",
                          )}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    }),
                    "justify-start",
                  )}
                >
                  {item.icon && (
                    <item.icon
                      className="mr-4 h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  {item.title}
                </Link>
              )
            )
          )}
        </nav>
      ) : null}
   </aside>
   </>
  )
}
