import { Button } from "@heroui/button";
import {
  Navbar as HeroUINavbar,
} from "@heroui/navbar";
import { button as buttonStyles } from "@heroui/theme";

import { ThemeSwitch } from "@/components/theme-switch";
import { title } from "@/components/primitives";

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <div className="flex w-full items-center">
        {/* Left: empty for spacing */}
        <div className="flex-1 hidden sm:block" />
        {/* Center: title */}
        <div className="flex-1 flex justify-center">
          <span className={title({ color: "blue" })}>ML</span>
          <span className={title()}>ecture</span>
        </div>
        {/* Right: actions */}
        <div className="flex-1 flex justify-end gap-2 hidden sm:flex">
          <Button
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
          >
            Log Out
          </Button>
          <ThemeSwitch />
        </div>
      </div>
    </HeroUINavbar>
  );
};
