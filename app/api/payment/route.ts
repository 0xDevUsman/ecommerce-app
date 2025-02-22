import { NextResponse, type NextRequest } from "next/server";



interface BodyData {
    name : string;
    price : number;
}
export const POST = async (req: NextRequest) => {
  try {
    const data : BodyData = await req.json()
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      {
        status: 500,
      }
    );
  }
};
