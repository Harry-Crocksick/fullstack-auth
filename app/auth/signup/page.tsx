import { Link } from "@nextui-org/react";

export default function SignUpPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center">
      <p>Already Signed up?</p>
      <Link href={"/auth/signin"}>Sign In</Link>
    </div>
  );
}
