import http from "http";

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();

export const SUPABASE_URL = "https://grtqfohpifovervglcrg.supabase.co";
export const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdydHFmb2hwaWZvdmVydmdsY3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcwMTA2MjIsImV4cCI6MjAyMjU4NjYyMn0.YivoxSnG1mLzOnRAAjkpx_cAHPtjkALfQ2If2nEdZOY";

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  },
});

// Create a Socket.IO server
const io = new Server({
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow GET and POST methods
  },
});

// Listen for connection events
io.on("connection", (socket) => {
  console.log("A user connected");

  // Create a function to handle inserts
  const handleInserts = (payload: any) => {
    console.log("Change received!", payload);
  };

  // Subscribe to changes in the "likes" table using Supabase Realtime
  const likeSubscription = supabase
    .channel("Like")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Like" },
      handleInserts,
    )
    .subscribe();

  // Unsubscribe from the subscription when the socket disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    likeSubscription.unsubscribe();
  });
});

// Start the server
const port = 3001;
const server = http.createServer();
io.attach(server);
server.listen(port);
console.log(`Server is running on port ${port}`);
