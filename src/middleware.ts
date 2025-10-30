import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Fungsi middleware
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  console.log("accessToken", accessToken);

  const { pathname } = request.nextUrl;

  const authPaths = ["/login", "/register"];
  const isAuthPage = authPaths.includes(pathname);

  if (accessToken) {
    if (isAuthPage) {
      return NextResponse.redirect(
        new URL("/stores/issue_requisition", request.url)
      );
    }
  } else {
    if (!isAuthPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Konfigurasi matcher untuk menentukan path mana yang akan dijalankan oleh middleware
export const config = {
  matcher: [
    /*
     * Cocokkan semua path request kecuali untuk:
     * - _next/static (file statis)
     * - _next/image (file optimasi gambar)
     * - favicon.ico (file ikon)
     * Ini untuk menghindari middleware berjalan pada aset yang tidak perlu.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
