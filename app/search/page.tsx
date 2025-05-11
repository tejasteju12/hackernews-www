"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { serverUrl } from "@/environment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${serverUrl}/search?q=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setPosts(data.data || []);
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setPosts([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">
        Search results for: <span className="text-primary">{query}</span>
      </h1>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-bold mb-1">{post.title}</h2>
              <p className="text-muted-foreground line-clamp-2">
                {post.content}
              </p>
              <div className="flex items-center gap-3 mt-4 text-sm">
                <Avatar className="h-6 w-6">
                  {post.author.image ? (
                    <AvatarImage src={post.author.image} />
                  ) : (
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  )}
                </Avatar>
                <span>{post.author.name}</span>
                <span className="text-muted-foreground">•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No posts found.</p>
      )}
    </div>
  );
};

export default SearchPage;
