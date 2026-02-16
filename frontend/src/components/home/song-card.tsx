"use client";

import type { Category, Like, Song } from "@prisma/client";
import { Heart, Loader2, Music, Play } from "lucide-react";
import { useState } from "react";
import { getPlayUrl } from "@/actions/generation";
import { toggleLikeSong } from "@/actions/song";
import { usePlayerStore } from "@/stores/use-player-store";
import Image from "next/image";

type SongCardRel = Song & {
  user: { name: string | null };
  _count: {
    likes: number;
  };
  categories: Category[];
  thumbnailUrl: string | null;
  likes?: Like[];
};

export function SongCard({ song }: { song: SongCardRel }) {
  const setTrack = usePlayerStore((state) => state.setTrack);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(
    song.likes ? song.likes.length > 0 : false
  );
  const [likeCount, setLikeCount] = useState(song._count.likes);

  const handlePlay = async () => {
    setIsLoading(true);
    const playUrl = await getPlayUrl(song.id);

    setTrack({
      id: song.id,
      title: song.title,
      url: playUrl,
      artwork: song.thumbnailUrl,
      prompt: song.prompt,
      createdByUserName: song.user.name,
    });

    setIsLoading(false);
  };

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    await toggleLikeSong(song.id);
  };

  return (
    <div>
      <div onClick={handlePlay} className="cursor-pointer">
        <div className="group relative aspect-square w-full overflow-hidden rounded-md bg-white/5 border border-white/10 group-hover:border-blue-500/50 transition-all">
          {song.thumbnailUrl ? (
            <Image
              className="object-cover object-center"
              src={song.thumbnailUrl}
              alt={song.title ?? "Song thumbnail"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="bg-white/5 flex h-full w-full items-center justify-center">
              <Music className="text-gray-500 h-12 w-12" />
            </div>
          )}

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/90 transition-transform group-hover:scale-105">
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              ) : (
                <Play className="h-6 w-6 fill-white text-white" />
              )}
            </div>
          </div>
        </div>

        <h3 className="mt-2 truncate text-sm font-medium text-white">
          {song.title}
        </h3>

        <p className="text-xs text-gray-400">{song.user.name}</p>

        <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
          <span>{song.listenCount} listens</span>
          <button
            onClick={handleLike}
            className="flex cursor-pointer items-center gap-1 hover:text-white transition-colors"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${isLiked ? "fill-red-500 text-red-500" : ""}`}
            />
            {likeCount} likes
          </button>
        </div>
      </div>
    </div>
  );
}
