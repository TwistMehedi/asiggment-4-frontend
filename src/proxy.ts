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

  // console.log("userRole:", userRole);
  const isAdmin = userRole === "ADMIN";
  const isCustomer = userRole === "CUSTOMER";
  const isProvider = userRole === "PROVIDER";

  const hasAccess = isAdmin || isCustomer || isProvider;
  if (pathname.startsWith("/dashboard") && !hasAccess) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/dashboard/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/dashboard/customer") && !isCustomer) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/dashboard/provider") && !isProvider) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
