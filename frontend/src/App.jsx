import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import VideoPlayer from "./components/VideoPlayer";
import Layout from "./components/Layout";
import VideoInfo from "./components/VideoInfo";
import VideoList from "./components/VideoList";

function App() {
  const [videos, setVideos] = useState([]);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(() => {
    const savedIndex = localStorage.getItem("currentVideoIndex");
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    localStorage.setItem("currentVideoIndex", currentVideoIndex);
    updateProgress();
  }, [currentVideoIndex]);

  const fetchVideos = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/videos");
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleVideoComplete = () => {
    const newCompletedVideos = [...completedVideos, currentVideoIndex];
    setCompletedVideos(newCompletedVideos);

    const newProgress = (newCompletedVideos.length / videos.length) * 100;
    setProgress(newProgress);

    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const updateProgress = () => {
    const newProgress = (completedVideos.length / videos.length) * 100;
    setProgress(newProgress);
  };

  const handleResetProgress = () => {
    videos.forEach((video) => {
      localStorage.removeItem(`video_${video._id}`);
    });

    localStorage.removeItem("currentVideoIndex");

    setCurrentVideoIndex(0);
    setProgress(0);
    setCompletedVideos([]);

    if (videoPlayerRef.current) {
      videoPlayerRef.current.currentTime(0);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row w-full h-full">
        <div className="w-full md:w-1/4 p-4">
          <VideoInfo video={videos[currentVideoIndex]} />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <Dashboard
            progress={progress}
            onResetProgress={handleResetProgress}
          />
          {videos.length > 0 && (
            <VideoPlayer
              video={videos[currentVideoIndex]}
              onComplete={handleVideoComplete}
              currentVideoIndex={currentVideoIndex}
              totalVideos={videos.length}
            />
          )}
        </div>

        <div className="w-full md:w-1/4 p-4">
          <VideoList
            videos={videos}
            currentIndex={currentVideoIndex}
            setCurrentVideoIndex={setCurrentVideoIndex}
            completedVideos={completedVideos}
          />
        </div>
      </div>
    </Layout>
  );
}

export default App;
