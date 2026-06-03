import app, { initDB } from "../index";

export default async function handler(req: any, res: any) {
  try {
    await initDB();
    return app(req, res);
  } catch (error) {
    console.error("Vercel function error:", error);

    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}
