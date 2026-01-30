import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  if (!token) {
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/customer") ||
      pathname.startsWith("/provider")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "your_secret_key",
    );
    const { payload } = await jwtVerify(token, secret);

    const userRole = payload.role;

    // console.log(userRole, "mehedi");
    const isAdmin = userRole === "ADMIN";
    const isCustomer = userRole === "CUSTOMER";
    const isProvider = userRole === "PROVIDER";

    if (pathname.startsWith("/admin") && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/customer") && !isCustomer && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/provider") && !isProvider && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log("Middleware Token Error", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*", "/provider/:path*"],
};
