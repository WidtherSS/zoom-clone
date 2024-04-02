"use client";

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const Meeting = ({ params:{id} }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const { call, isCallingLoading } = useGetCallById(id);

  if (!isLoaded || isCallingLoading) return <Loader />;

  return (
    <main className="h-screen w-full ">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup/>
          ) : (
            <MeetingRoom/>
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
