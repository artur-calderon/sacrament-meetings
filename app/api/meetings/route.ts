import { getMeetings } from "../../../lib/meetings-db";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const date = searchParams.get("date");
  const query = searchParams.get("query") ?? "";
  const page = Number(searchParams.get("page")) || 1;
  return Response.json(await getMeetings(date ?? query, page));
}
