# OT-Muse — API Contract

This document defines every REST and WebSocket endpoint, including request/response schemas, status codes, and authentication requirements.

**Base URL**: `https://api.ot-muse.app` (API Gateway)
**WebSocket URL**: `wss://ws.ot-muse.app`
**Content-Type**: `application/json`
**Authentication**: Bearer token (Cognito JWT) in `Authorization` header unless marked Public.

---

## Table of Contents

- [Authentication](#authentication)
- [Worlds](#worlds)
- [Generation](#generation)
- [Collaboration](#collaboration)
- [Export](#export)
- [Gallery](#gallery)
- [User Profile](#user-profile)
- [WebSocket API](#websocket-api)
- [Error Responses](#error-responses)

---

## Authentication

All authenticated endpoints require the following header:

```
Authorization: Bearer <cognito-jwt-token>
```

Tokens are obtained via Amazon Cognito after sign-up or login. Tokens expire after 1 hour; refresh tokens are valid for 30 days.

---

### `POST /auth/signup`

Register a new user account.

**Auth**: Public

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecureP@ss123",
  "displayName": "WorldBuilder42"
}
```

**Response** `201 Created`:
```json
{
  "message": "Account created. Please verify your email.",
  "userId": "usr_a1b2c3d4"
}
```

**Errors**:
| Status | Code | Description |
|---|---|---|
| `400` | `INVALID_INPUT` | Missing or malformed fields |
| `409` | `EMAIL_EXISTS` | Email already registered |

---

### `POST /auth/login`

Authenticate an existing user.

**Auth**: Public

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecureP@ss123"
}
```

**Response** `200 OK`:
```json
{
  "accessToken": "eyJhbGciOiJSUzI1NiIs...",
  "refreshToken": "eyJjdHkiOiJKV1QiLCJl...",
  "idToken": "eyJhbGciOiJSUzI1NiIs...",
  "expiresIn": 3600,
  "user": {
    "userId": "usr_a1b2c3d4",
    "email": "user@example.com",
    "displayName": "WorldBuilder42"
  }
}
```

**Errors**:
| Status | Code | Description |
|---|---|---|
| `401` | `INVALID_CREDENTIALS` | Wrong email or password |
| `403` | `UNVERIFIED_EMAIL` | Email not yet verified |

---

### `POST /auth/refresh`

Refresh an expired access token.

**Auth**: Public

**Request Body**:
```json
{
  "refreshToken": "eyJjdHkiOiJKV1QiLCJl..."
}
```

**Response** `200 OK`:
```json
{
  "accessToken": "eyJhbGciOiJSUzI1NiIs...",
  "expiresIn": 3600
}
```

---

### `POST /auth/forgot-password`

Initiate a password reset.

**Auth**: Public

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response** `200 OK`:
```json
{
  "message": "If that email exists, a reset link has been sent."
}
```

---

### `POST /auth/reset-password`

Complete a password reset with the code from email.

**Auth**: Public

**Request Body**:
```json
{
  "email": "user@example.com",
  "code": "123456",
  "newPassword": "NewSecureP@ss456"
}
```

**Response** `200 OK`:
```json
{
  "message": "Password reset successful."
}
```

---

## Worlds

### `POST /worlds`

Create a new world.

**Auth**: Required

**Request Body**:
```json
{
  "title": "Mystical Forest Kingdom",
  "description": "A vast kingdom hidden within ancient forests",
  "style": "fantasy",
  "settings": {
    "isPublic": false,
    "maxCollaborators": 5
  }
}
```

**Response** `201 Created`:
```json
{
  "worldId": "wld_x7y8z9a0",
  "title": "Mystical Forest Kingdom",
  "description": "A vast kingdom hidden within ancient forests",
  "style": "fantasy",
  "status": "draft",
  "ownerId": "usr_a1b2c3d4",
  "worldGraph": {
    "nodes": [],
    "edges": []
  },
  "settings": {
    "isPublic": false,
    "maxCollaborators": 5
  },
  "createdAt": "2026-02-17T01:00:00Z",
  "updatedAt": "2026-02-17T01:00:00Z"
}
```

---

### `GET /worlds`

List all worlds owned by or shared with the authenticated user.

**Auth**: Required

**Query Parameters**:
| Param | Type | Default | Description |
|---|---|---|---|
| `filter` | string | `all` | `owned`, `shared`, or `all` |
| `status` | string | `active` | `active`, `archived`, or `all` |
| `limit` | number | `20` | Max results per page (1–50) |
| `nextToken` | string | — | Pagination token from previous response |

**Response** `200 OK`:
```json
{
  "worlds": [
    {
      "worldId": "wld_x7y8z9a0",
      "title": "Mystical Forest Kingdom",
      "description": "A vast kingdom hidden within ancient forests",
      "style": "fantasy",
      "status": "active",
      "thumbnailUrl": "https://cdn.ot-muse.app/thumbnails/wld_x7y8z9a0.jpg",
      "elementCount": 14,
      "collaboratorCount": 3,
      "ownerId": "usr_a1b2c3d4",
      "createdAt": "2026-02-17T01:00:00Z",
      "updatedAt": "2026-02-17T03:45:00Z"
    }
  ],
  "nextToken": "eyJsYXN0S2V5Ijo...",
  "totalCount": 12
}
```

---

### `GET /worlds/:worldId`

Get full details of a specific world, including the world graph.

**Auth**: Required (must be owner or collaborator)

**Response** `200 OK`:
```json
{
  "worldId": "wld_x7y8z9a0",
  "title": "Mystical Forest Kingdom",
  "description": "A vast kingdom hidden within ancient forests",
  "style": "fantasy",
  "status": "active",
  "ownerId": "usr_a1b2c3d4",
  "collaborators": [
    {
      "userId": "usr_e5f6g7h8",
      "displayName": "PixelDreamer",
      "role": "editor",
      "joinedAt": "2026-02-17T02:00:00Z"
    }
  ],
  "worldGraph": {
    "nodes": [
      {
        "id": "nde_001",
        "type": "location",
        "name": "Ancient Castle",
        "description": "A towering stone castle on the cliff edge...",
        "position": { "x": 450, "y": 300 },
        "assets": {
          "image": {
            "key": "images/wld_x7y8z9a0/castle.png",
            "url": "https://cdn.ot-muse.app/images/wld_x7y8z9a0/castle.png"
          },
          "video": {
            "key": "videos/wld_x7y8z9a0/castle-flyby.mp4",
            "url": "https://cdn.ot-muse.app/videos/wld_x7y8z9a0/castle-flyby.mp4"
          },
          "audio": {
            "key": "audio/wld_x7y8z9a0/castle-narration.mp3",
            "url": "https://cdn.ot-muse.app/audio/wld_x7y8z9a0/castle-narration.mp3"
          }
        },
        "metadata": {
          "generatedFrom": "A towering stone castle perched on the cliff edge",
          "version": 3,
          "createdAt": "2026-02-17T01:05:00Z",
          "updatedAt": "2026-02-17T02:30:00Z"
        }
      }
    ],
    "edges": [
      {
        "id": "edg_001",
        "from": "nde_001",
        "to": "nde_002",
        "relationship": "contains",
        "label": "has entrance to"
      }
    ]
  },
  "history": [
    {
      "id": "hst_001",
      "timestamp": "2026-02-17T01:00:00Z",
      "action": "created",
      "prompt": "A mystical forest kingdom",
      "userId": "usr_a1b2c3d4",
      "affectedNodes": []
    }
  ],
  "settings": {
    "isPublic": false,
    "maxCollaborators": 5,
    "defaultVoice": "narrative-deep"
  },
  "createdAt": "2026-02-17T01:00:00Z",
  "updatedAt": "2026-02-17T03:45:00Z"
}
```

**Errors**:
| Status | Code | Description |
|---|---|---|
| `404` | `WORLD_NOT_FOUND` | World does not exist |
| `403` | `ACCESS_DENIED` | User is not owner or collaborator |

---

### `PUT /worlds/:worldId`

Update world metadata (title, description, settings). Does not modify the world graph.

**Auth**: Required (owner only)

**Request Body** (partial update):
```json
{
  "title": "Dark Mystical Forest Kingdom",
  "settings": {
    "isPublic": true
  }
}
```

**Response** `200 OK`:
```json
{
  "worldId": "wld_x7y8z9a0",
  "title": "Dark Mystical Forest Kingdom",
  "settings": {
    "isPublic": true,
    "maxCollaborators": 5
  },
  "updatedAt": "2026-02-17T04:00:00Z"
}
```

---

### `DELETE /worlds/:worldId`

Permanently delete a world and all associated assets.

**Auth**: Required (owner only)

**Response** `200 OK`:
```json
{
  "message": "World deleted successfully.",
  "worldId": "wld_x7y8z9a0"
}
```

---

### `POST /worlds/:worldId/duplicate`

Create a copy of a world under the current user's ownership.

**Auth**: Required (owner or collaborator with view access)

**Request Body**:
```json
{
  "title": "Mystical Forest Kingdom (Copy)"
}
```

**Response** `201 Created`:
```json
{
  "worldId": "wld_newcopy01",
  "title": "Mystical Forest Kingdom (Copy)",
  "status": "active",
  "copiedFrom": "wld_x7y8z9a0",
  "createdAt": "2026-02-17T05:00:00Z"
}
```

---

### `PATCH /worlds/:worldId/archive`

Archive or unarchive a world.

**Auth**: Required (owner only)

**Request Body**:
```json
{
  "archived": true
}
```

**Response** `200 OK`:
```json
{
  "worldId": "wld_x7y8z9a0",
  "status": "archived",
  "updatedAt": "2026-02-17T05:30:00Z"
}
```

---

## Generation

### `POST /worlds/:worldId/generate`

Trigger the full multimodal generation pipeline for a new world or a major addition. Returns a job ID for tracking.

**Auth**: Required

**Request Body**:
```json
{
  "prompt": "A floating city above the clouds with crystal bridges and wind-powered engines",
  "options": {
    "generateImage": true,
    "generateVideo": true,
    "generateAudio": true,
    "style": "fantasy",
    "aspectRatio": "16:9"
  }
}
```

**Response** `202 Accepted`:
```json
{
  "jobId": "job_m1n2o3p4",
  "status": "processing",
  "stages": [
    { "name": "textRefine", "status": "in_progress" },
    { "name": "imageGen", "status": "pending" },
    { "name": "videoGen", "status": "pending" },
    { "name": "audioGen", "status": "pending" },
    { "name": "graphUpdate", "status": "pending" }
  ],
  "estimatedDurationSeconds": 30,
  "createdAt": "2026-02-17T01:05:00Z"
}
```

---

### `GET /worlds/:worldId/generate/:jobId`

Poll the status of a generation job.

**Auth**: Required

**Response** `200 OK` (in progress):
```json
{
  "jobId": "job_m1n2o3p4",
  "status": "processing",
  "stages": [
    { "name": "textRefine", "status": "completed" },
    { "name": "imageGen", "status": "completed" },
    { "name": "videoGen", "status": "in_progress" },
    { "name": "audioGen", "status": "in_progress" },
    { "name": "graphUpdate", "status": "pending" }
  ],
  "progress": 60
}
```

**Response** `200 OK` (completed):
```json
{
  "jobId": "job_m1n2o3p4",
  "status": "completed",
  "stages": [
    { "name": "textRefine", "status": "completed" },
    { "name": "imageGen", "status": "completed" },
    { "name": "videoGen", "status": "completed" },
    { "name": "audioGen", "status": "completed" },
    { "name": "graphUpdate", "status": "completed" }
  ],
  "progress": 100,
  "result": {
    "nodesCreated": ["nde_005", "nde_006", "nde_007"],
    "edgesCreated": ["edg_003", "edg_004"],
    "assets": {
      "images": [
        {
          "nodeId": "nde_005",
          "url": "https://cdn.ot-muse.app/images/wld_x7y8z9a0/floating-city.png"
        }
      ],
      "videos": [
        {
          "nodeId": "nde_005",
          "url": "https://cdn.ot-muse.app/videos/wld_x7y8z9a0/floating-city-flyby.mp4"
        }
      ],
      "audio": [
        {
          "nodeId": "nde_005",
          "url": "https://cdn.ot-muse.app/audio/wld_x7y8z9a0/floating-city-narration.mp3"
        }
      ]
    }
  },
  "completedAt": "2026-02-17T01:05:35Z"
}
```

---

### `POST /worlds/:worldId/refine`

Refine an existing element through a follow-up prompt.

**Auth**: Required

**Request Body**:
```json
{
  "nodeId": "nde_001",
  "prompt": "Make the castle taller and add a dragon perched on the tower",
  "options": {
    "regenerateImage": true,
    "regenerateVideo": false,
    "regenerateAudio": true
  }
}
```

**Response** `202 Accepted`:
```json
{
  "jobId": "job_q5r6s7t8",
  "status": "processing",
  "nodeId": "nde_001",
  "estimatedDurationSeconds": 20
}
```

---

### `POST /worlds/:worldId/explore`

Navigate to a location or element in explore mode, triggering sub-generations.

**Auth**: Required

**Request Body**:
```json
{
  "action": "navigate",
  "target": "nde_001",
  "prompt": "Enter the castle and look around the great hall"
}
```

**Response** `202 Accepted`:
```json
{
  "jobId": "job_u9v0w1x2",
  "status": "processing",
  "explorationContext": {
    "parentNode": "nde_001",
    "action": "navigate"
  },
  "estimatedDurationSeconds": 15
}
```

---

### `POST /worlds/:worldId/feedback`

Submit feedback on a generated asset to improve future outputs.

**Auth**: Required

**Request Body**:
```json
{
  "nodeId": "nde_001",
  "assetType": "image",
  "rating": "up",
  "comment": "Love the detail on the tower but the colors are too dark"
}
```

**Response** `200 OK`:
```json
{
  "message": "Feedback recorded.",
  "feedbackId": "fbk_y3z4a5b6"
}
```

---

## Collaboration

### `POST /worlds/:worldId/invite`

Invite a user to collaborate on a world.

**Auth**: Required (owner only)

**Request Body**:
```json
{
  "email": "collaborator@example.com",
  "role": "editor"
}
```

**Response** `200 OK`:
```json
{
  "message": "Invitation sent.",
  "inviteId": "inv_c7d8e9f0",
  "inviteLink": "https://app.ot-muse.app/join/inv_c7d8e9f0"
}
```

---

### `POST /worlds/:worldId/invite/link`

Generate a shareable invite link.

**Auth**: Required (owner only)

**Request Body**:
```json
{
  "role": "editor",
  "expiresInHours": 48,
  "maxUses": 5
}
```

**Response** `200 OK`:
```json
{
  "inviteLink": "https://app.ot-muse.app/join/lnk_g1h2i3j4",
  "expiresAt": "2026-02-19T01:00:00Z",
  "maxUses": 5,
  "currentUses": 0
}
```

---

### `POST /worlds/join/:inviteCode`

Accept an invitation and join a world session.

**Auth**: Required

**Response** `200 OK`:
```json
{
  "worldId": "wld_x7y8z9a0",
  "title": "Mystical Forest Kingdom",
  "role": "editor",
  "message": "You've joined the world."
}
```

**Errors**:
| Status | Code | Description |
|---|---|---|
| `404` | `INVITE_NOT_FOUND` | Invalid or expired invite code |
| `409` | `ALREADY_MEMBER` | User is already a collaborator |
| `403` | `INVITE_EXHAUSTED` | Max uses reached |

---

### `DELETE /worlds/:worldId/collaborators/:userId`

Remove a collaborator from a world.

**Auth**: Required (owner only)

**Response** `200 OK`:
```json
{
  "message": "Collaborator removed.",
  "userId": "usr_e5f6g7h8"
}
```

---

## Export

### `POST /worlds/:worldId/export`

Start generating an export package.

**Auth**: Required

**Request Body**:
```json
{
  "format": "full",
  "includeImages": true,
  "includeVideos": true,
  "includeAudio": true,
  "includeMetadata": true
}
```

`format` options: `full` (ZIP with all assets), `graph_only` (JSON), `images_only`, `metadata_only`.

**Response** `202 Accepted`:
```json
{
  "exportId": "exp_k5l6m7n8",
  "status": "processing",
  "estimatedDurationSeconds": 60
}
```

---

### `GET /worlds/:worldId/export/:exportId`

Check export status and get the download URL.

**Auth**: Required

**Response** `200 OK` (processing):
```json
{
  "exportId": "exp_k5l6m7n8",
  "status": "processing",
  "progress": 45
}
```

**Response** `200 OK` (ready):
```json
{
  "exportId": "exp_k5l6m7n8",
  "status": "ready",
  "downloadUrl": "https://s3.amazonaws.com/ot-muse-exports/exp_k5l6m7n8.zip?X-Amz-...",
  "expiresAt": "2026-02-17T02:00:00Z",
  "fileSizeBytes": 52428800
}
```

---

## Gallery

### `GET /gallery`

Browse publicly shared worlds.

**Auth**: Optional (public endpoint, auth adds personalization)

**Query Parameters**:
| Param | Type | Default | Description |
|---|---|---|---|
| `style` | string | — | Filter by style: `fantasy`, `scifi`, `historical`, `abstract`, `realistic` |
| `sort` | string | `recent` | `recent`, `popular`, `trending` |
| `search` | string | — | Free-text search in title and description |
| `limit` | number | `20` | Max results (1–50) |
| `nextToken` | string | — | Pagination token |

**Response** `200 OK`:
```json
{
  "worlds": [
    {
      "worldId": "wld_pub_01",
      "title": "Sunken Temple of the Deep",
      "description": "An ancient underwater civilization...",
      "style": "fantasy",
      "thumbnailUrl": "https://cdn.ot-muse.app/thumbnails/wld_pub_01.jpg",
      "owner": {
        "displayName": "OceanBuilder",
        "avatarUrl": "https://cdn.ot-muse.app/avatars/usr_001.jpg"
      },
      "stats": {
        "elementCount": 28,
        "viewCount": 1420,
        "collaboratorCount": 4
      },
      "createdAt": "2026-02-10T12:00:00Z"
    }
  ],
  "nextToken": "eyJsYXN0S2V5Ijo..."
}
```

---

### `GET /gallery/:worldId`

View a public world in read-only mode.

**Auth**: Optional

**Response**: Same as `GET /worlds/:worldId` but without edit-specific fields (history, settings).

---

## User Profile

### `GET /users/me`

Get the authenticated user's profile.

**Auth**: Required

**Response** `200 OK`:
```json
{
  "userId": "usr_a1b2c3d4",
  "email": "user@example.com",
  "displayName": "WorldBuilder42",
  "avatarUrl": "https://cdn.ot-muse.app/avatars/usr_a1b2c3d4.jpg",
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
  "createdAt": "2026-02-10T08:00:00Z"
}
```

---

### `PUT /users/me`

Update profile information and preferences.

**Auth**: Required

**Request Body** (partial update):
```json
{
  "displayName": "WorldCrafter99",
  "preferences": {
    "defaultStyle": "scifi",
    "theme": "light"
  }
}
```

**Response** `200 OK`:
```json
{
  "userId": "usr_a1b2c3d4",
  "displayName": "WorldCrafter99",
  "preferences": {
    "defaultStyle": "scifi",
    "voicePreference": "narrative-warm",
    "theme": "light"
  },
  "updatedAt": "2026-02-17T06:00:00Z"
}
```

---

### `PUT /users/me/avatar`

Upload a new profile avatar.

**Auth**: Required

**Request Body**: `multipart/form-data` with `avatar` file field (max 2MB, JPEG/PNG).

**Response** `200 OK`:
```json
{
  "avatarUrl": "https://cdn.ot-muse.app/avatars/usr_a1b2c3d4.jpg",
  "updatedAt": "2026-02-17T06:05:00Z"
}
```

---

### `DELETE /users/me`

Delete the user account and all associated data.

**Auth**: Required

**Request Body**:
```json
{
  "confirmPhrase": "DELETE MY ACCOUNT"
}
```

**Response** `200 OK`:
```json
{
  "message": "Account scheduled for deletion. All data will be removed within 24 hours."
}
```

---

## WebSocket API

**URL**: `wss://ws.ot-muse.app`

### Connection

Connect with auth token and world ID as query parameters:

```
wss://ws.ot-muse.app?token=<jwt>&worldId=<worldId>
```

On successful connection, the server sends:

```json
{
  "action": "connected",
  "connectionId": "conn_abc123",
  "worldId": "wld_x7y8z9a0",
  "activeUsers": [
    { "userId": "usr_a1b2c3d4", "displayName": "WorldBuilder42" }
  ]
}
```

### Client → Server Messages

#### `editElement`
```json
{
  "action": "editElement",
  "data": {
    "elementId": "nde_001",
    "prompt": "Make the castle taller",
    "lockElement": true
  }
}
```

#### `sendMessage`
```json
{
  "action": "sendMessage",
  "data": {
    "text": "What do you think about adding a moat?",
    "timestamp": "2026-02-17T01:30:00Z"
  }
}
```

#### `updatePresence`
```json
{
  "action": "updatePresence",
  "data": {
    "cursorPosition": { "x": 450, "y": 300 },
    "activeElement": "nde_001",
    "status": "editing"
  }
}
```

#### `resolveConflict`
```json
{
  "action": "resolveConflict",
  "data": {
    "conflictId": "cfl_001",
    "chosenOption": "merged"
  }
}
```

#### `unlockElement`
```json
{
  "action": "unlockElement",
  "data": {
    "elementId": "nde_001"
  }
}
```

### Server → Client Messages

#### `userJoined`
```json
{
  "action": "userJoined",
  "data": {
    "userId": "usr_e5f6g7h8",
    "displayName": "PixelDreamer",
    "avatarUrl": "https://cdn.ot-muse.app/avatars/usr_e5f6g7h8.jpg"
  }
}
```

#### `userLeft`
```json
{
  "action": "userLeft",
  "data": {
    "userId": "usr_e5f6g7h8"
  }
}
```

#### `elementUpdated`
```json
{
  "action": "elementUpdated",
  "data": {
    "elementId": "nde_001",
    "changes": {
      "description": "A much taller stone castle with a dragon on the tower...",
      "assets": {
        "image": {
          "url": "https://cdn.ot-muse.app/images/wld_x7y8z9a0/castle-v4.png"
        }
      },
      "version": 4
    },
    "editedBy": "usr_a1b2c3d4"
  }
}
```

#### `elementLocked`
```json
{
  "action": "elementLocked",
  "data": {
    "elementId": "nde_001",
    "lockedBy": {
      "userId": "usr_a1b2c3d4",
      "displayName": "WorldBuilder42"
    }
  }
}
```

#### `elementUnlocked`
```json
{
  "action": "elementUnlocked",
  "data": {
    "elementId": "nde_001"
  }
}
```

#### `chatBroadcast`
```json
{
  "action": "chatBroadcast",
  "data": {
    "userId": "usr_e5f6g7h8",
    "displayName": "PixelDreamer",
    "text": "What do you think about adding a moat?",
    "timestamp": "2026-02-17T01:30:00Z"
  }
}
```

#### `presenceBroadcast`
```json
{
  "action": "presenceBroadcast",
  "data": {
    "userId": "usr_e5f6g7h8",
    "cursorPosition": { "x": 200, "y": 150 },
    "activeElement": "nde_003",
    "status": "viewing"
  }
}
```

#### `conflict`
```json
{
  "action": "conflict",
  "data": {
    "conflictId": "cfl_001",
    "elementId": "nde_001",
    "userA": { "userId": "usr_a1b2c3d4", "prompt": "Make the castle taller" },
    "userB": { "userId": "usr_e5f6g7h8", "prompt": "Add ivy on the castle walls" },
    "options": {
      "merged": "A taller castle covered in climbing ivy with green-tinged stone walls",
      "optionA": "A taller castle with reinforced stone towers",
      "optionB": "A castle with ivy-covered walls and overgrown battlements"
    }
  }
}
```

#### `conflictResolved`
```json
{
  "action": "conflictResolved",
  "data": {
    "conflictId": "cfl_001",
    "elementId": "nde_001",
    "chosenOption": "merged",
    "resolvedBy": "usr_a1b2c3d4",
    "jobId": "job_conflict_01"
  }
}
```

#### `generationProgress`
```json
{
  "action": "generationProgress",
  "data": {
    "jobId": "job_m1n2o3p4",
    "stage": "imageGen",
    "status": "completed",
    "progress": 60
  }
}
```

---

## Error Responses

All errors follow a consistent format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable description of what went wrong.",
    "details": {}
  }
}
```

### Standard Error Codes

| HTTP Status | Code | Description |
|---|---|---|
| `400` | `INVALID_INPUT` | Request body validation failed |
| `400` | `INVALID_PROMPT` | Prompt is empty, too short, or contains disallowed content |
| `401` | `UNAUTHORIZED` | Missing or invalid authentication token |
| `403` | `ACCESS_DENIED` | Authenticated but lacks permission for this resource |
| `404` | `NOT_FOUND` | Requested resource does not exist |
| `409` | `CONFLICT` | Resource state conflict (e.g., duplicate email) |
| `429` | `RATE_LIMITED` | Too many requests; retry after `Retry-After` header value |
| `500` | `INTERNAL_ERROR` | Unexpected server error |
| `502` | `GENERATION_FAILED` | Nova model invocation failed |
| `503` | `SERVICE_UNAVAILABLE` | Dependent service (Bedrock, DynamoDB) is temporarily unavailable |
| `504` | `GENERATION_TIMEOUT` | Generation pipeline exceeded maximum duration |

### Rate Limits

| Endpoint Group | Limit | Window |
|---|---|---|
| Authentication | 10 requests | per minute |
| World CRUD | 60 requests | per minute |
| Generation | 10 requests | per minute |
| Export | 5 requests | per hour |
| Gallery | 120 requests | per minute |
| WebSocket messages | 30 messages | per minute per connection |

Rate limit headers are included in every response:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1708131600
```
