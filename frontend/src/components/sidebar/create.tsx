"use client";

import { useRouter } from "next/navigation";

export default function CreateSong() {
    const router = useRouter();
    return (
        <button onClick={() => router.push("/create")}>
            Generate Song
        </button>
    );
}