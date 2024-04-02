"use client";

import { useEffect, useState } from "react";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";

const MeetingSetup = () => {
  const call = useCall();
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  if (!call) {
    throw new Error("usecall must be used whithin StreamCall Compononet");
  }

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  return (
    <div>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
        <h1 className="text-2xl font-bold ">Setup</h1>
        <VideoPreview />
        <div className="flex h-16 items-center justify-center gap-3">
          <label className="flex items-center justify-center gap-2 font-medium">
            <input type="checkbox" checked={isMicCamToggled} onChange={(e) => setIsMicCamToggled(e.target.checked)} />
            mic and camera off
          </label>
          <DeviceSettings/>
        </div>
        <Button className="rounded-md bg-green-500 px-4 py-2.5" onClick={() => {
          call.join()
        }}>
          Join meeting
        </Button>
      </div>
    </div>
  );
};

export default MeetingSetup;
