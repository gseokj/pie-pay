import type {Metadata} from "next";
import "@/styles/globals.css";
import * as styles from '@/styles/app.css'
import {MSWComponent} from "@/app/component/MSWComponent";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={styles.body} >
            <MSWComponent/>
                <div className={styles.container}>
                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}