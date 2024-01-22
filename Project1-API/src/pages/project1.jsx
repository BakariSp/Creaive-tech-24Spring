import React, { useEffect, useRef } from 'react';
import Navbar from '../components/navigater';

function SketchfabViewer() {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Dynamically load the Sketchfab API script
    const script = document.createElement('script');
    script.src = "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      if (iframeRef.current) {
        const client = new window.Sketchfab(iframeRef.current);
        const uid = '7w7pAfrCfjovwykkEeRFLGw5SXS'; // Your Sketchfab UID

        client.init(uid, {
          success: function onSuccess(api) {
            api.start();
            api.addEventListener('viewerready', function() {
              console.log('Viewer is ready');
            });
          },
          error: function onError() {
            console.log('Viewer error');
          }
        });
      }
    };

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <iframe
        ref={iframeRef}
        id="api-frame"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking="true"
        execution-while-out-of-viewport="true" 
        execution-while-not-rendered="true" 
        web-share="true" 
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
      ></iframe>
    </>
    
  );
}

export default SketchfabViewer;
