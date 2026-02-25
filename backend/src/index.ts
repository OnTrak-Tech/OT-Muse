import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { worldRoutes } from "./routes/worlds";
import { userRoutes } from "./routes/users";
import { generationRoutes } from "./routes/generation";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express.json({ limit: "10mb" }));

// ---------------------------------------------------------------------------
// Health Check
// ---------------------------------------------------------------------------
app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.use("/worlds", worldRoutes);
app.use("/users", userRoutes);
app.use("/worlds", generationRoutes); // nested under /worlds/:id/generate

// ---------------------------------------------------------------------------
// Error Handler (must be last)
// ---------------------------------------------------------------------------
app.use(errorHandler);

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

// Lambda handler (API Gateway proxy)
export const handler = serverless(app);

// Local dev server
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`[OT-Muse API] Running on http://localhost:${PORT}`);
    });
}

export default app;
