import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { AcmeLogo } from "./AcmeLogo";
import Link from "next/link";
import SigninButton from "./SigninButton";

export default function Appbar() {
  return (
    <Navbar>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/">Features</Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/">Integrations</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/">Login</Link>
        </NavbarItem>
        <NavbarItem>
          {/* <Link href="/auth/signup">Sign up</Link> */}
          <SigninButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
