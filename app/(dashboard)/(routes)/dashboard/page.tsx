"use client"

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code, ImageIcon, MessageSquare, MusicIcon, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";


const tools = [
  {
    label: "SignUp Schedule",
    icon: MessageSquare,
    href: "/activity-enrollment-schedule",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Enroll activity",
    icon: ImageIcon,
    href: "/registeractivity",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Civic Engagements (Project সহযাত্রী)",
    icon: VideoIcon,
    href: "/civic-engagements",
    color: "text-orange-700",
    bgColor: "bg-emerald-700/10",
  },
  {
    label: "Seminars",
    icon: MusicIcon,
    href: "/seminars",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Workshops",
    icon: Code,
    href: "/workshops",
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
]


const DashboardPage = () => {
  const router = useRouter();
  return (
    <div className="mt-16 md:mt-24 w-full max-w-7xl mx-auto ">
      <div className="my-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-white">Start Using Rs utility tool</h2>

      </div>
      <div className="px-5 md:px-20 lg:px-32 space-y-4 container py-24 mx-auto">
        {
          tools.map((tool) => (
            <Card
              onClick={() => router.push(tool.href)}
              key={tool.href}
              className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition curser-pointer"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>
                <div className="font-semibold">
                  {tool.label}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-black/50" />

            </Card>
          ))
        }
      </div>
    </div>

  )
}
export default DashboardPage;