"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, CalendarCheck, MusicIcon,ArrowBigRightDash, Tent, Music, VideoIcon  } from "lucide-react";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] })

const routes = [
    {
        label: "View RS activities",
        icon: LayoutDashboard,
        href: "/activities",
        color: "text-sky-500",
    },
    {
        label: "SignUp Schedule",
        icon: CalendarCheck,
        href: "/activity-enrollment-schedule",
        color: "text-violet-500",
    },
    {
        label: "Enroll activity",
        icon: ArrowBigRightDash,
        href: "/registeractivity",
        color: "text-pink-700",
    },
    {
        label: "Seminars",
        icon: Tent,
        href: "/seminars",
        color: "text-emerald-500",
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-green-700",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
    },
]



const Sidebar = () => {
    const pathName = usePathname();
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-start pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image
                            fill
                            alt="logo"
                            src="/logo.jpg" />
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>Rs Utility Tool</h1>
                </Link>

                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathName === route.href ? "text-white bg-white/10" : "text-zinc-400")}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Sidebar;