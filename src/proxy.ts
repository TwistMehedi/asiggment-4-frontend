import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./service/User/user.service";

export async function proxy(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;

    let isAuthenticated = false;

    let isAdmin = false;
    let isCustomer = false;
    let isProvider = false;

    const { user } = await getUser();

    if (!user) {
      return null;
    }

    if (user) {
      isAuthenticated = true;
      isAdmin = user?.role === "ADMIN";
      isCustomer = user?.role === "CUSTOMER";
      isProvider = user?.role === "PROVIDER";
    }

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
    console.log("Middleware Error", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*", "/provider/:path*"],
};
