import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


export function LoginForm() {
    return (
        <Card className="w-full max-w-xl">
            <CardHeader>
                <CardTitle className="text-2xl">Login to Lumina</CardTitle>
                <CardDescription>
                    Login to your account either with a nostr extension or with your nsec.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Button className="w-full">Sign in with Extension (NIP-07)</Button>
                </div>
                <hr />
                or
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Login with nsec</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid gap-2">
                                <Label htmlFor="nsec">nsec</Label>
                                <Input id="nsec" type="password" />
                                <Button className="w-full">Sign in</Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}