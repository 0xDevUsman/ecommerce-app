import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    // Clear the authentication cookie (assuming you're using HTTP-only cookies)
    const response = NextResponse.json(
      { message: "User logged out successfully" },
      { status: 200 }
    );

    // ✅ Remove the cookie that stores the JWT token
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
