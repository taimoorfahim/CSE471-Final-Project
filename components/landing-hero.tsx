"use client"

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

export const LandingHero = () => {
    const { isSignedIn } = useAuth();
    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                <h1>Residetial Semester utility tool for</h1>
                <div className="text-transparent bg-clip-text py-10 bg-gradient-to-r from-purple-400 to-pink-600">
                    <TypewriterComponent
                        options={{
                            strings: [
                                "Activity Registration",
                                "Avtivity View",
                                "Seminer Registration",
                                "Workshop Registration",
                                "Meal Ordering",
                            ],
                            autoStart: true,
                            loop: true
                            
                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:xl font-light text-zinc-400 ">
                        Register for anything
            </div>
            <div>
                <Link href={isSignedIn?"/dashboard":"/sign-up"}>
                    <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                        Start Registration
                    </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
                Welcome to BraU Residetial Semester
            </div>
        </div>
    );
};