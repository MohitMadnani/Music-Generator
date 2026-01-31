"use server";

import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { headers } from "next/headers";
import { inngest } from "@/inngest/client";

export async function queueSong(){
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    const song = await db.song.create({
        data: {
            userId: session.user.id,
            title: "Test song 1",
            fullDescribedSong: "Hip-Hop song with a catchy hook and a great beat",
        },
    });

    await inngest.send({
        name: "generate-song-event",
        data: {
            songId: song.id,
            userId: song.userId,
        }
    })

}
