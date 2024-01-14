import { FC } from "react";

type Props = {
  videoId: string; // YouTube video ID
};

const YouTubeEmbed: FC<Props> = ({ videoId }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="rounded-xl overflow-hidden">
      <iframe
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
