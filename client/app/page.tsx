import Link from "next/link";
import Button from "./components/shared/Button";
import CodeBoxStyle from "./components/text/CodeBoxStyle";
import { getMe } from "./services/auth.service";

export default async function Home() {

  const user = await getMe();
  const isLoggedin = Boolean(user);

  return (
    <div
      className="bg-background text-text min-h-screen flex flex-col
     items-center justify-center gap-2"
    >
      <h1 className="text-3xl font-bold">Taskly</h1>

      <div className="mt-5">
        <CodeBoxStyle>
          {`Get things done one task at a time, Stay organized and boost your${"\n"}productivity Happy tasking`}
        </CodeBoxStyle>
      </div>
      <div className="flex gap-4 mt-6">
        <Button theme="primary">
          <Link href={isLoggedin ? "/tasks" : "/register"}>Get Started</Link>
        </Button>
        <Button theme="secondary">
          <Link href="/learn-more">Learn More</Link>
        </Button>
      </div>
    </div>
  );
}
