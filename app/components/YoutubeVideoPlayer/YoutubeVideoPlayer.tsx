import { FC } from "react";

type Props = {
  videoId: string; // YouTube video ID
};

const YouTubeEmbed: FC<Props> = ({ videoId }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    // <div className="rounded-xl overflow-hidden">
    //   <iframe
    //     src={embedUrl}
    //     title="YouTube video player"
    //     frameBorder="0"
    //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //     allowFullScreen
    //     // width="800"
    //     // height="450"
    //   ></iframe>
    // </div>
    <div className="rounded-xl overflow-hidden">
      <iframe
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        // width="800"
        // height="450"
      ></iframe>
    </div>

    // <div className="aspect-w-16 aspect-h-9">
    //   <iframe
    //     src="https://www.youtube.com/embed/r9jwGansp1E"
    //     frameborder="0"
    //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //     allowfullscreen
    //   ></iframe>
    // </div>
  );
};

export default YouTubeEmbed;
