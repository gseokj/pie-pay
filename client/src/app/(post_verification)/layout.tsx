import type {Metadata} from "next";
import Header from "./component/Header"
import {ReactNode} from "react";
import RQProvider from "@/app/(post_verification)/component/RQProvider";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

type Props = { children: ReactNode, modal: ReactNode }

export default async function PostVerificationLayout({children}: Props) {
    return (
        <div className="h-screen">
            <RQProvider>
                <Header/>
                {children}
            </RQProvider>
        </div>
    );
}
