import React from 'react';

const descriptions = [
  (
    <>
      <h3 className="text-lg font-semibold mb-2">Importance of PPE:</h3>
      <p className="mb-2">Explain the significance of PPE in preventing injuries and illnesses in the workplace.</p>
      <h3 className="text-lg font-semibold mb-2">Types of PPE:</h3>
      <p className="mb-2">Introduce various types of PPE, such as hard hats, safety glasses, gloves, earplugs, respirators, and steel-toed boots.</p>
      <h3 className="text-lg font-semibold mb-2">Proper Use and Maintenance:</h3>
      <p>Demonstrate how to properly use and maintain PPE, including inspection procedures and storage guidelines.</p>
    </>
  ),
  (
    <>
      <h3 className="text-lg font-semibold mb-2">Importance of Hazard Identification:</h3>
      <p className="mb-2">Explain the importance of identifying potential hazards in the workplace.</p>
      <h3 className="text-lg font-semibold mb-2">Hazard Assessment:</h3>
      <p className="mb-2">Discuss how to assess hazards and determine their potential impact on workers.</p>
      <h3 className="text-lg font-semibold mb-2">Risk Assessment:</h3>
      <p>Demonstrate how to conduct a risk assessment and prioritize hazards based on their severity and likelihood of occurrence.</p>
    </>
  ),
  (
    <>
      <h3 className="text-lg font-semibold mb-2">Importance of Safe Work Practices:</h3>
      <p className="mb-2">Explain the importance of following safe work practices to prevent accidents and injuries.</p>
      <h3 className="text-lg font-semibold mb-2">Safe Work Procedures:</h3>
      <p className="mb-2">Discuss the importance of following established safe work procedures and guidelines.</p>
      <h3 className="text-lg font-semibold mb-2">Safe Work Environment:</h3>
      <p>Demonstrate how to create a safe work environment by maintaining a clean and organized workspace.</p>
    </>
  )
];

function VideoInfo({ video }) {
  if (!video) return <div>Loading...</div>;

  const description = descriptions[video.order - 1] || <p>No description available.</p>;

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5 w-6/6 h-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{video.title}</h2>
      <div className="text-gray-600 dark:text-gray-300">{description}</div>
    </div>
  );
}

export default VideoInfo;
