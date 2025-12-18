import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "College Decision Matrix",
    description: "Make your college choice with confidence using a weighted decision system",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
