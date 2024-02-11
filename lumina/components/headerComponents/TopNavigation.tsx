import { siteConfig } from "@/config/site"
import { TopNavigationItems } from "@/components/headerComponents/TopNavigationItems"
import { DropdownThemeMode } from "@/components/headerComponents/DropdownThemeMode"
import { Button } from "@/components/ui/button"
import { AlignRightIcon } from "@radix-ui/react-icons"
import { Sidebar } from "@/components/SideBar"

export function TopNavigation() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <TopNavigationItems items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {/* <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link> */}
            {/* <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link> */}
            <DropdownThemeMode />
            <Sidebar />
          </nav>
        </div>
      </div>
    </header>
  )
}