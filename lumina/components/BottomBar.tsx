/**
 * v0 by Vercel.
 * @see https://v0.dev/t/mwaJmHMv0vd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { GlobeIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { JSX, SVGProps } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function BottomBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 h-14 flex flex-row shrink-0 items-center justify-between border-t bg-white shadow-up-4 dark:bg-gray-950 z-50">
      <Link className="flex flex-col items-center justify-center w-full text-xs gap-1 px-4" href="/">
        <HomeIcon className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <Link className="flex flex-col items-center justify-center w-full text-xs gap-1 px-4" href="/global">
        <GlobeIcon className="h-6 w-6" />
        <span className="sr-only">Global</span>
      </Link>
      {/* <Link className="flex flex-col items-center justify-center w-full text-xs gap-1 px-4" href="/profile">
        <Avatar className="h-6 w-6">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="sr-only">Gardening</span>
      </Link> */}
    </nav>
  )
}

function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


// function InfoIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="12" r="10" />
//       <path d="M12 16v-4" />
//       <path d="M12 8h.01" />
//     </svg>
//   )
// }


// function MailIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="20" height="16" x="2" y="4" rx="2" />
//       <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//     </svg>
//   )
// }
