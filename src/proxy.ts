import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sessionToken =
    req.cookies.get("better-auth.session_token") ||
    req.cookies.get("__Secure-better-auth.session_token");

  let userRole = null;

  if (sessionToken) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/auth/get-session`,
        {
          headers: {
            cookie: req.headers.get("cookie") || "",
          },
        },
      );

      if (response.ok) {
        const session = await response.json();
        userRole = session?.user?.role;
      }
    } catch (error) {
      console.error("Session fetch failed", error);
    }
  }

  const isAdmin = userRole === "ADMIN";
  const isCustomer = userRole === "CUSTOMER";
  const isProvider = userRole === "PROVIDER";

  if (isAdmin) return NextResponse.next();

  if (pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/customer") && !isCustomer) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/provider") && !isProvider) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!sessionToken && pathname === "/check-inbox") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/customer/:path*",
    "/provider/:path*",
    "/check-inbox",
  ],
};
