"use client";
import Link from "next/link";
import Button from "../components/shared/Button";
import { useState } from "react";
import { login } from "../services/auth.service";
import { useRouter } from "next/navigation";

function Login() {
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      await login(email, password);
      router.push("/tasks");
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.errors?.[0]?.msg || err?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-background px-8 md:px-0 text-text min-h-screen flex flex-col items-center justify-center gap-2">
      <div className="bg-surface p-8 rounded-lg shadow-lg flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Login</h1>

        <p className="text-text-muted text-center">
          Welcome back! Please login to your account.
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-4 w-full">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="bg-background text-text placeholder:text-text-muted border border-text-muted rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="current-password"
              className="bg-background text-text placeholder:text-text-muted border border-text-muted rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <Button
            theme="primary"
            type="submit"
            className="w-3/4 mx-auto mt-6 block"
          >
            Login
          </Button>
        </form>

        <p className="text-text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
      {error && <p className="text-danger text-sm mt-2 text-center">{error}</p>}
    </div>
  );
}

export default Login;
