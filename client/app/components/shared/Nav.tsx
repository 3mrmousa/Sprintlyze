"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMe, logout } from "../../services/auth.service";

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    getMe()
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false));
  }, [pathname]);

  const router = useRouter();
  const myLogout = async () => {
    await logout();
  };
  const handleLogout = () => {
    myLogout();
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="bg-surface p-3 fixed w-3/4 md:w-1/2 top-3 left-1/2 -translate-x-1/2 z-10 rounded-2xl shadow-xl shadow-surface-hover">
      <div className="container flex items-center justify-between mx-auto">
        <h1 className="text-lg text-text font-bold">
          <Link href="/">Taskly</Link>
        </h1>
        <ul className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  href="/tasks"
                  className={
                    pathname === "/tasks" ? "text-primary" : "text-text-muted"
                  }
                >
                  Tasks
                </Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="text-text-muted hover:text-primary-glow transition-colors"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className={
                    pathname === "/login" ? "text-primary" : "text-text-muted"
                  }
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className={
                    pathname === "/register"
                      ? "text-primary"
                      : "text-text-muted"
                  }
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
