import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type HeaderProps = {
    title: string,
    buttonTitle: string,
    href: string
}

export default function PageHeader({title, href, buttonTitle } : HeaderProps) {
    return (
        <>
            <div>
                <h2 className="text-4xl font-bold text-primary">{title}</h2>
            </div>
            <div>
                <Link
                    href={href}
                >
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add {buttonTitle}
                    </Button>
                </Link>
            </div>
        </>
    )
}
