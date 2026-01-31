"use client";

import { queueSong } from "@/actions/generation";

export default function CreateSong() {
    return (<button onClick= {async () => {await queueSong()}}> Generate Song </button>);
}