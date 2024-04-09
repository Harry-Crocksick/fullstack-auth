import SignInForm from "@/app/components/SignInForm";
import Link from "next/link";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SigninPage = ({ searchParams }: Props) => {
  console.log({ searchParams });

  return (
    <div>
      <SignInForm callbackUrl={searchParams.callbackUrl} />
      <Link href={"/auth/forgotPass"}>Forgot Your Password?</Link>
    </div>
  );
};

export default SigninPage;
