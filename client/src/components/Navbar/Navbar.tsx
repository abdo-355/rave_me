import { useContext } from "react";
import { Disclosure } from "@headlessui/react";

import NavToggler from "./NavToggler";
import Logo from "./Logo";
import PanelItem from "./PanelItem";
import NavButton from "./NavButton";
import NavLinks from "./NavLinks";
import LogoutButton from "./LogoutButton";
import authContext from "../../context/auth-context";
import { links } from "./NavLinks";

const Navbar = () => {
  const { isLoggedIn } = useContext(authContext);
  return (
    <>
      <Disclosure as="nav" className="bg-green-500">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 lg:px-8 relative flex h-16 items-center justify-between">
              {/* Mobile menu button*/}
              <NavToggler open={open} />
              {/*---------------------*/}
              <Logo />
              {isLoggedIn ? (
                <>
                  <NavLinks />
                  <LogoutButton />
                </>
              ) : (
                <div className="flex items-center flex-initial  ml-10">
                  <NavButton content="log in" path="/auth/login" />
                  <NavButton content="sign up" path="/auth/signup" />
                </div>
              )}
            </div>
            <Disclosure.Panel className="sm:hidden z-30 relative">
              <div className="space-y-1 px-2 pt-2 pb-3 z-30 relative bg-black bg-opacity-25">
                {links.map((link) => (
                  <PanelItem key={link.name} {...link} />
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};
export default Navbar;
