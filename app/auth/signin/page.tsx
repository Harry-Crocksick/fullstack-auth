import SignInForm from "@/app/components/SignInForm";
import Link from "next/link";

const SigninPage = () => {
  return (
    <div>
      <SignInForm />
      <Link href={"/auth/forgotPass"}>Forgot Your Password?</Link>
    </div>
  );
};

export default SigninPage;
