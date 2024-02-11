import { Button } from "@/components/ui/button"
import { AlignRightIcon } from "@radix-ui/react-icons"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


export function Sidebar() {
    return (
        <>
            <Sheet>
                <SheetTrigger>
                    <Button>
                        <AlignRightIcon />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Tools</SheetTitle>
                        <SheetDescription>
                            Tools will be listed here shortly.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    )
}