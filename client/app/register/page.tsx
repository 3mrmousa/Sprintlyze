"use client";
import Link from "next/link";
import Button from "../components/shared/Button";
import { register } from "../services/auth.service";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Register() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    const form = e.currentTarget;

    const firstName = (form.elements.namedItem("firstName") as HTMLInputElement)
      .value;
    const lastName = (form.elements.namedItem("lastName") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      await register(firstName, lastName, email, password);
      router.push("/");
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Register error:", error);
      setError(error.message || "Register failed");
    }
  };

  return (
    <div
      className="bg-background text-text min-h-screen 
    flex flex-col items-center justify-center gap-2 px-8 md:px-0"
    >
      <div className="bg-surface p-8 rounded-lg shadow-lg flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="text-text-muted text-center">
          create your account to get started with Taskly!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="bg-background text-text placeholder:text-text-muted border border-text-muted rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="bg-background text-text placeholder:text-text-muted border border-text-muted rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-background text-text placeholder:text-text-muted border border-text-muted rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              className="bg-background text-text placeholder:text-text-muted border border-text-muted rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button
            theme="primary"
            type="submit"
            className="w-3/4 mx-auto mt-6 block"
          >
            Register
          </Button>
        </form>

        <div className="flex flex-col text-center">
          <p className="text-text-muted">Already have an account?</p>
          <Link href="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </div>
      </div>
      {error && <p className="text-danger text-sm mt-2 text-center">{error}</p>}
    </div>
  );
}
export default Register;
