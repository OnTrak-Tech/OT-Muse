# OT-Muse — Technical Documentation

## System Architecture

OT-Muse follows a serverless-first architecture on AWS, with a Next.js frontend deployed on Amplify and backend logic distributed across API Gateway, Lambda functions, and Step Functions for orchestration.

```
┌──────────────────────────────────────────────────────────────┐
│                         CLIENT                                │
│                                                               │
│  Next.js 14 (App Router) + Tailwind CSS + Zustand            │
│  Konva.js (Canvas) + React-Query (Data Fetching/Caching)     │
│  WebSocket Client (API Gateway WebSocket)                     │
│                                                               │
│  Hosted: AWS Amplify (CI/CD from GitHub)                      │
└────────────┬──────────────────────┬──────────────────────────┘
             │ REST                  │ WebSocket
             ▼                      ▼
┌────────────────────┐  ┌──────────────────────────┐
│  API Gateway       │  │  API Gateway              │
│  (REST)            │  │  (WebSocket)              │
│                    │  │                            │
│  Routes:           │  │  Actions:                  │
│  POST /worlds      │  │  $connect / $disconnect    │
│  GET  /worlds      │  │  sendMessage               │
│  PUT  /worlds/:id  │  │  editElement               │
│  POST /generate    │  │  updatePresence            │
│  POST /export      │  │  resolveConflict           │
│  GET  /gallery     │  │                            │
└────────┬───────────┘  └─────────┬────────────────┘
         │                        │
         ▼                        ▼
┌──────────────────────────────────────────────────┐
│                 AWS LAMBDA                         │
│                                                    │
│  • World CRUD (create, read, update, delete)       │
│  • Auth middleware (Cognito JWT verification)       │
│  • Generation trigger (invokes Step Functions)      │
│  • WebSocket handlers (collab, presence, chat)      │
│  • Export packager (assembles ZIP, uploads to S3)   │
│  • Gallery API (list/filter public worlds)          │
│                                                    │
│  Runtime: Node.js 20.x                             │
│  SDK: @aws-sdk v3                                  │
└────────┬───────────────────────┬─────────────────┘
         │                       │
         ▼                       ▼
┌──────────────────┐  ┌──────────────────────────────┐
│  AWS STEP        │  │  AMAZON BEDROCK (Nova)        │
│  FUNCTIONS       │  │                                │
│                  │  │  Models Used:                   │
│  Orchestrates:   │  │  • Nova Micro / Lite (text)     │
│  1. Text refine  │  │  • Nova Canvas (image gen)      │
│  2. Image gen    │──▶  • Nova Reel (video gen)        │
│  3. Video gen    │  │  • Nova Echo (text-to-speech)   │
│  4. Audio gen    │  │                                │
│  5. Graph update │  │  Invoke via Bedrock Runtime     │
│                  │  │  SDK (InvokeModel API)          │
└────────┬─────────┘  └───────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────────┐
│                   DATA LAYER                       │
│                                                    │
│  ┌─────────────────┐    ┌──────────────────────┐  │
│  │  DynamoDB        │    │  Amazon S3            │  │
│  │                  │    │                       │  │
│  │  Tables:         │    │  Buckets:             │  │
│  │  • Users         │    │  • nova-muse-assets   │  │
│  │  • Worlds        │    │    /images/            │  │
│  │  • Sessions      │    │    /videos/            │  │
│  │  • Connections   │    │    /audio/             │  │
│  │  (WebSocket)     │    │    /exports/           │  │
│  │                  │    │                       │  │
│  └─────────────────┘    └──────────────────────┘  │
│                                                    │
└──────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────────┐
│               SUPPORTING SERVICES                  │
│                                                    │
│  • Amazon Cognito — User authentication & OAuth    │
│  • Amazon SQS — Queue for long-running tasks       │
│  • Amazon CloudWatch — Logging & monitoring        │
│  • Amazon CloudFront — CDN for static assets       │
│  • Amazon Route 53 — Custom domain DNS             │
│                                                    │
└──────────────────────────────────────────────────┘
```

---

## Tech Stack Breakdown

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React.js | 18+ | UI component library |
| Next.js | 14+ (App Router) | SSR, routing, API routes for lightweight backend operations |
| Tailwind CSS | 4.x | Utility-first styling, responsive design |
| Zustand | Latest | Lightweight state management (world state, user preferences, UI state) |
| Konva.js | Latest | 2D canvas rendering for the World Editor (pan, zoom, element selection) |
| React-Query | v5 | Data fetching, caching, and synchronization for Nova API responses |
| Axios | Latest | HTTP client for REST API calls |
| WebSocket API | Browser-native | Client for API Gateway WebSocket connections (collaboration) |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20.x | Lambda runtime |
| @aws-sdk/client-bedrock-runtime | v3 | Invoke Nova models via Bedrock |
| @aws-sdk/client-dynamodb | v3 | DynamoDB operations |
| @aws-sdk/client-s3 | v3 | S3 asset management, presigned URLs |
| @aws-sdk/client-sfn | v3 | Step Functions invocation |
| @aws-sdk/client-apigatewaymanagementapi | v3 | Push messages to WebSocket clients |

### AWS Services

| Service | Purpose |
|---|---|
| **Amazon Bedrock** | Access to Nova foundation models (Canvas, Reel, Echo, Micro, Lite) |
| **AWS Lambda** | Serverless compute for all backend logic |
| **API Gateway (REST)** | RESTful endpoints for CRUD operations and generation triggers |
| **API Gateway (WebSocket)** | Persistent connections for real-time collaboration |
| **AWS Step Functions** | Orchestrate multi-step generation pipeline (text → image → video → audio) |
| **Amazon DynamoDB** | NoSQL database for world state, user data, and session management |
| **Amazon S3** | Object storage for generated assets (images, videos, audio, exports) |
| **Amazon Cognito** | User authentication, OAuth integration (Google/Amazon), JWT tokens |
| **Amazon SQS** | Message queue for long-running generation tasks |
| **Amazon CloudFront** | CDN for serving static assets and generated content |
| **Amazon CloudWatch** | Logging, error tracking, and monitoring |
| **AWS Amplify** | Frontend hosting with CI/CD pipeline |
| **Amazon Route 53** | Custom domain DNS management |

### Development Tools

| Tool | Purpose |
|---|---|
| Git / GitHub | Version control and repository hosting |
| ESLint + Prettier | Code quality and formatting |
| Jest | Unit testing for API chains and utility functions |
| Cypress | End-to-end testing for user flows |
| SAM CLI | Local simulation of AWS Lambda and API Gateway |

---

## Data Models

### DynamoDB Table: `Worlds`

```json
{
  "worldId": "uuid-v4",
  "ownerId": "cognito-user-id",
  "title": "Mystical Forest Kingdom",
  "description": "A vast kingdom hidden within ancient forests...",
  "status": "active",
  "style": "fantasy",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T14:22:00Z",
  "collaborators": [
    { "userId": "user-id-2", "role": "editor", "joinedAt": "..." }
  ],
  "worldGraph": {
    "nodes": [
      {
        "id": "node-1",
        "type": "location",
        "name": "Ancient Castle",
        "description": "A towering stone castle on the cliff edge...",
        "assets": {
          "imageKey": "s3://nova-muse-assets/images/world-123/castle.png",
          "videoKey": "s3://nova-muse-assets/videos/world-123/castle-flyby.mp4",
          "audioKey": "s3://nova-muse-assets/audio/world-123/castle-narration.mp3"
        },
        "position": { "x": 450, "y": 300 },
        "metadata": { "generatedFrom": "prompt-text-here", "version": 3 }
      }
    ],
    "edges": [
      {
        "from": "node-1",
        "to": "node-2",
        "relationship": "contains",
        "label": "has entrance to"
      }
    ]
  },
  "history": [
    {
      "timestamp": "2024-01-15T10:30:00Z",
      "action": "created",
      "prompt": "A mystical forest kingdom",
      "userId": "cognito-user-id"
    },
    {
      "timestamp": "2024-01-15T11:05:00Z",
      "action": "edited",
      "prompt": "Add ancient ruins near the river",
      "userId": "cognito-user-id",
      "affectedNodes": ["node-3"]
    }
  ],
  "settings": {
    "isPublic": false,
    "maxCollaborators": 5,
    "defaultVoice": "narrative-deep"
  }
}
```

### DynamoDB Table: `Users`

```json
{
  "userId": "cognito-user-id",
  "email": "user@example.com",
  "displayName": "WorldBuilder42",
  "avatarUrl": "s3://...",
  "preferences": {
    "defaultStyle": "fantasy",
    "voicePreference": "narrative-warm",
    "theme": "dark"
  },
  "stats": {
    "worldsCreated": 12,
    "totalPrompts": 87,
    "collaborationSessions": 5
  },
  "createdAt": "2024-01-10T08:00:00Z"
}
```

### DynamoDB Table: `Connections` (WebSocket)

```json
{
  "connectionId": "api-gateway-connection-id",
  "userId": "cognito-user-id",
  "worldId": "world-uuid",
  "connectedAt": "2024-01-15T10:30:00Z",
  "ttl": 1705320600
}
```

---

## Generation Pipeline (Step Functions)

The core generation workflow is orchestrated by AWS Step Functions. A single user prompt triggers a multi-step pipeline:

```
┌────────────┐
│  Trigger    │  User submits prompt
│  (Lambda)   │  via POST /generate
└──────┬─────┘
       ▼
┌────────────────┐
│  Step 1:       │  Nova Micro/Lite refines the raw prompt
│  Text Refine   │  into structured descriptions for each modality
└──────┬─────────┘
       ▼
┌────────────────┐
│  Step 2:       │  Nova Canvas generates landscape/element images
│  Image Gen     │  from the refined prompt. Stored in S3.
└──────┬─────────┘
       ▼
┌────────────────┐
│  Step 3:       │  Nova Reel generates a short animated clip
│  Video Gen     │  (e.g., flyover, day-night cycle). Stored in S3.
│  (Optional)    │
└──────┬─────────┘
       ▼
┌────────────────┐
│  Step 4:       │  Nova Echo generates narration audio
│  Audio Gen     │  describing the scene. Stored in S3.
│  (Optional)    │
└──────┬─────────┘
       ▼
┌────────────────┐
│  Step 5:       │  Updates the world graph in DynamoDB
│  Graph Update  │  with new nodes, edges, and asset references
└──────┬─────────┘
       ▼
┌────────────────┐
│  Step 6:       │  Pushes completion status + asset URLs
│  Notify Client │  to the client via WebSocket or polling
└────────────────┘
```

### Parallel Optimization

Steps 2, 3, and 4 (image, video, audio) can run in **parallel** after text refinement completes, significantly reducing total generation time.

```
                    ┌──→ Image Gen ──┐
Text Refine ────────┼──→ Video Gen ──┼────→ Graph Update → Notify
                    └──→ Audio Gen ──┘
```

---

## Real-Time Collaboration (WebSocket Architecture)

### Connection Flow

```
1. User opens a world → Client connects to wss://api-gateway-url
2. $connect Lambda:
   - Validates JWT token from Cognito
   - Stores connectionId + userId + worldId in Connections table
   - Broadcasts "user joined" to all connections in the same world
3. User performs actions → Client sends JSON messages
4. Action Lambda:
   - Processes the action (edit, chat, presence update)
   - Updates DynamoDB (world state)
   - Broadcasts the change to all connections in the same world
5. User leaves → $disconnect Lambda:
   - Removes connectionId from Connections table
   - Broadcasts "user left" to remaining connections
```

### WebSocket Message Types

| Message Type | Direction | Payload |
|---|---|---|
| `join` | Client → Server | `{ worldId, token }` |
| `userJoined` | Server → Clients | `{ userId, displayName, avatarUrl }` |
| `userLeft` | Server → Clients | `{ userId }` |
| `editElement` | Client → Server | `{ elementId, prompt, action }` |
| `elementUpdated` | Server → Clients | `{ elementId, changes, editedBy }` |
| `elementLocked` | Server → Clients | `{ elementId, lockedBy }` |
| `elementUnlocked` | Server → Clients | `{ elementId }` |
| `chatMessage` | Client → Server | `{ text, timestamp }` |
| `chatBroadcast` | Server → Clients | `{ userId, text, timestamp }` |
| `presenceUpdate` | Client → Server | `{ cursorPosition, activeElement }` |
| `conflict` | Server → Clients | `{ elementId, options: [merged, optionA, optionB] }` |
| `conflictResolved` | Client → Server | `{ elementId, chosenOption }` |

### Conflict Resolution Flow

```
User A edits "castle" with prompt: "Make it taller"
User B edits "castle" with prompt: "Add ivy on the walls"
                    │
                    ▼
         Conflict detected
         (same element, overlapping window)
                    │
                    ▼
         Nova Micro generates:
         - Merged: "A taller castle covered in climbing ivy"
         - Option A: "A taller castle" (User A's version)
         - Option B: "A castle with ivy walls" (User B's version)
                    │
                    ▼
         Both users see options → one is selected → generation proceeds
```

---

## API Endpoints

### REST API (API Gateway)

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/auth/signup` | Register new user | Public |
| `POST` | `/auth/login` | Authenticate user | Public |
| `GET` | `/worlds` | List user's worlds | Required |
| `POST` | `/worlds` | Create a new world | Required |
| `GET` | `/worlds/:id` | Get world details | Required |
| `PUT` | `/worlds/:id` | Update world metadata | Required |
| `DELETE` | `/worlds/:id` | Delete a world | Required |
| `POST` | `/worlds/:id/generate` | Trigger generation pipeline | Required |
| `POST` | `/worlds/:id/refine` | Refine an existing element | Required |
| `POST` | `/worlds/:id/export` | Generate export ZIP | Required |
| `GET` | `/worlds/:id/export/:exportId` | Get export download URL | Required |
| `GET` | `/gallery` | Browse public worlds | Optional |
| `POST` | `/worlds/:id/share` | Generate share link | Required |

### WebSocket API (API Gateway)

| Route | Handler | Description |
|---|---|---|
| `$connect` | `wsConnect` | Authenticate and register connection |
| `$disconnect` | `wsDisconnect` | Clean up connection record |
| `sendMessage` | `wsChatHandler` | Broadcast chat messages |
| `editElement` | `wsEditHandler` | Process element edits with locking |
| `updatePresence` | `wsPresenceHandler` | Update cursor/focus state |
| `resolveConflict` | `wsConflictHandler` | Process conflict resolution choice |

---

## Security

| Concern | Implementation |
|---|---|
| **Authentication** | Amazon Cognito User Pools with JWT tokens |
| **Authorization** | Lambda authorizers validate JWTs on every API/WebSocket request |
| **World-level access control** | Owner + collaborator list stored in DynamoDB; checked per-request |
| **Input sanitization** | Prompt text sanitized before passing to Nova (strip injection attempts) |
| **S3 access** | Presigned URLs with expiration (15 min for uploads, 1 hour for downloads) |
| **Rate limiting** | API Gateway throttling (per-user quotas) |
| **Data encryption** | DynamoDB encryption at rest; S3 SSE; HTTPS in transit |

---

## Infrastructure as Code

The project uses **AWS SAM (Serverless Application Model)** for defining and deploying infrastructure:

- `template.yaml` — SAM template defining all Lambda functions, API Gateway, DynamoDB tables, S3 buckets, Step Functions state machine, and IAM roles.
- Deployed via `sam build && sam deploy --guided`.
- CI/CD: Amplify handles frontend; backend deployed via SAM or integrated into the Amplify pipeline.

---

## Environment Variables

| Variable | Service | Description |
|---|---|---|
| `COGNITO_USER_POOL_ID` | Lambda | Cognito user pool identifier |
| `COGNITO_CLIENT_ID` | Lambda / Frontend | Cognito app client ID |
| `DYNAMODB_WORLDS_TABLE` | Lambda | Worlds table name |
| `DYNAMODB_USERS_TABLE` | Lambda | Users table name |
| `DYNAMODB_CONNECTIONS_TABLE` | Lambda | WebSocket connections table name |
| `S3_ASSETS_BUCKET` | Lambda | Asset storage bucket name |
| `BEDROCK_REGION` | Lambda | AWS region for Bedrock API calls |
| `STEP_FUNCTION_ARN` | Lambda | ARN of the generation pipeline state machine |
| `WEBSOCKET_API_ENDPOINT` | Lambda | WebSocket API URL for pushing messages |
| `NEXT_PUBLIC_API_URL` | Frontend | REST API base URL |
| `NEXT_PUBLIC_WS_URL` | Frontend | WebSocket API URL |
| `NEXT_PUBLIC_COGNITO_DOMAIN` | Frontend | Cognito hosted UI domain |
