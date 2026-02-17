# OT-Muse — User Flow

This document details every step a user takes through OT-Muse, from first visit to post-session management.

---

## 1. Landing Page

**Entry point**: User visits the OT-Muse URL.

**What they see**:
- Hero section with a compelling tagline and a generated world preview
- Feature highlights (multimodal generation, real-time collaboration, explore mode)
- Call-to-action buttons: **"Get Started"** (sign up) and **"Try Demo"** (guided tour)
- Sample world gallery showcasing community creations

**Actions available**:
- Click "Get Started" → Redirected to Sign-Up / Login
- Click "Try Demo" → Enters a guided interactive demo (no account required)
- Browse the gallery → View shared worlds in read-only mode

---

## 2. Sign-Up and Authentication

### 2.1 New User Sign-Up
1. User clicks "Get Started" from the landing page.
2. Presented with the sign-up form: **email/password** or **OAuth** (Google/Amazon via Cognito).
3. Submits the form → Receives a verification email/SMS.
4. Confirms verification → Account activated → Redirected to Onboarding.

### 2.2 Returning User Login
1. User clicks "Log In" from the landing page.
2. Enters credentials or uses OAuth provider.
3. Authenticated → Redirected to Dashboard.

### 2.3 Edge Cases
- **Email already exists**: Redirect to login with a "Did you mean to log in?" message.
- **Forgot password**: Reset flow via email link (handled by Cognito).
- **OAuth first-time**: Auto-creates account, skips email verification.

---

## 3. Onboarding (First-Time Users)

A 4-step guided introduction that plays on first login:

### Step 1: "Welcome to OT-Muse"
- Brief intro: "Build entire worlds with a single prompt."
- Animated preview showing a prompt transforming into a world.

### Step 2: "Prompt-Based Creation"
- Explanation of how natural language prompts generate multimodal assets.
- Example: typing "a mystical forest kingdom" → images, narration, and video appear.

### Step 3: "Iterative Editing"
- Shows how follow-up prompts refine the world.
- Example: "add ancient ruins near the river" → world updates with new elements.

### Step 4: "Build Together"
- Highlights real-time collaboration.
- Shows multiple avatars editing the same world, with AI resolving conflicts.

### Step 5: "Explore and Share"
- Demonstrates explore mode and export features.
- CTA: **"Create Your First World"** → Redirects to Dashboard.

> **Skip option**: Users can skip onboarding at any time. Preferences saved for future reference.

---

## 4. Dashboard

**The user's home base after login.**

### What They See
- **Header**: Logo, search bar, profile avatar, notifications bell.
- **Quick Actions**: "Create New World" button (prominently placed).
- **Recent Worlds**: Cards showing the user's recent worlds with thumbnails, titles, last-edited dates, and collaborator counts.
- **Shared With Me**: Worlds others have invited them to collaborate on.
- **Stats Overview**: Total worlds created, total collaborators, total elements generated.

### Actions Available
- **Create New World** → Goes to World Creation flow.
- **Click a world card** → Opens that world in the Editor.
- **World card menu** (three dots) → Edit, Share, Export, Duplicate, Archive, Delete.
- **Profile avatar** → Account settings, preferences, logout.

---

## 5. Creating a New World

### 5.1 Prompt Input
1. User clicks "Create New World" from the Dashboard.
2. A prompt modal/page appears with:
   - A large text input area with placeholder: *"Describe your world... (e.g., 'A floating city above the clouds with crystal bridges and wind-powered engines')"*
   - **Style presets** (optional): Fantasy, Sci-Fi, Historical, Abstract, Realistic.
   - **Advanced options** (collapsed by default): aspect ratio, color palette hints, mood tags.
3. User types their prompt and clicks **"Generate World"**.

### 5.2 Generation Pipeline
1. **Loading state**: Progress indicator with status updates:
   - "Refining your concept..." (Nova Micro/Lite text refinement)
   - "Generating landscape..." (Nova Canvas image generation)
   - "Creating animation..." (Nova Reel video clip)
   - "Adding narration..." (Nova Echo text-to-speech)
2. These stages are orchestrated by AWS Step Functions behind the scenes.
3. **Estimated time**: 15–45 seconds for initial generation.

### 5.3 World Canvas Loads
- The **World Editor Canvas** opens displaying:
  - Generated landscape image as the base layer.
  - Overlaid interactive elements (characters, structures, artifacts).
  - A sidebar with the world graph (element list and relationships).
  - A narration player with the generated audio.
  - A video preview panel for animated sequences.

### 5.4 Edge Cases
- **Invalid or vague prompt**: AI suggests refinements (e.g., "Your prompt is broad — try adding details like terrain type, time period, or key landmarks").
- **Generation timeout**: Retry button + option to simplify prompt.
- **API rate limit**: Queue position shown, auto-retries.

---

## 6. Editing and Refining the World

### 6.1 Sidebar Prompt Editor
- Users click an element on the canvas (or select from the sidebar list).
- A prompt input appears: *"What would you like to change?"*
- Example: "Make the castle taller and add a dragon perched on the tower."
- AI processes the edit → Updates the relevant image/video/audio assets.

### 6.2 Canvas Interactions (Konva.js)
- **Select**: Click an element to view its details and edit options.
- **Pan and Zoom**: Navigate the world canvas.
- **Element details**: Click an element to see its generated description, related assets, and history.

### 6.3 Asset Management
- **Image gallery**: All generated images for the world session.
- **Video clips**: Playable animated sequences.
- **Audio tracks**: Narrations and soundscapes.
- **History timeline**: Every prompt and generation, in order, allowing users to "rewind" to earlier states.

### 6.4 Feedback Loop
- After each generation, users can rate the output (thumbs up/down).
- Ratings are stored and used to improve future prompt construction.
- "Regenerate" button produces a new variation of the same prompt.

---

## 7. Real-Time Collaboration

### 7.1 Inviting Collaborators
1. From the World Editor, user clicks **"Invite"** in the toolbar.
2. Options:
   - **Share link**: Copy a URL that grants edit access.
   - **Invite by email**: Enter email addresses; invitees receive a link.
3. Permission levels: **Editor** (can modify) or **Viewer** (read-only).

### 7.2 Live Session
- **Presence indicators**: Avatars of all connected users appear in the toolbar.
- **Activity feed**: Real-time log of changes (e.g., "Alex added a mountain range").
- **Element locking**: When a user is editing an element, it shows a colored border indicating who's working on it.
- **Cursor awareness**: See which area of the canvas other users are focused on.

### 7.3 AI-Mediated Conflict Resolution
1. **Conflict detection**: Two users edit the same element within a short window.
2. **AI generates options**: Nova analyzes both prompts and produces:
   - **Merged suggestion**: A compromise combining both intents.
   - **Option A vs Option B**: Side-by-side previews of each user's version.
3. **Resolution**: Users accept the merge, pick one version, or provide a new prompt.

### 7.4 Integrated Chat
- A collapsible chat panel for text messaging between collaborators.
- Messages can include references to specific world elements (e.g., "@castle tell me more about this").

### 7.5 Edge Cases
- **User goes offline**: Changes queue locally, sync on reconnect.
- **Session timeout**: After 2 hours of inactivity, user is disconnected (can rejoin via link).
- **Max collaborators**: Limit per session (e.g., 5 editors) to maintain performance.

---

## 8. Explore Mode

### 8.1 Entering Explore Mode
- User clicks **"Explore"** button in the World Editor toolbar.
- The canvas transitions from edit view to an immersive, navigable view.

### 8.2 Navigation
- **Click-to-navigate**: Click a location on the canvas to "travel" there.
- **Prompt-based navigation**: Type "go to the castle" or "zoom into the forest" in a command bar.
- Each navigation action triggers new AI generations:
  - A detailed close-up image of the destination.
  - A narrated description played via Nova Echo.
  - Optionally, a short animated transition via Nova Reel.

### 8.3 Dynamic Content
- **Sub-locations**: Clicking "enter the castle" generates interior scenes.
- **Characters and lore**: Clicking a character triggers a dialogue or backstory narration.
- **Simulations**: Animated sequences showing events (e.g., "What happens when the dragon attacks?").

### 8.4 Returning to Edit Mode
- Click **"Back to Editor"** to return to the full canvas with editing tools.

---

## 9. World Graph and Export

### 9.1 World Graph View
- Accessible from the Editor sidebar — a visual mind-map of all world elements.
- Nodes represent elements (locations, characters, objects, events).
- Edges represent relationships (e.g., "castle" → "contains" → "throne room").
- Clicking a node highlights the element on the canvas and shows its details.

### 9.2 Exporting a World
1. User clicks **"Export"** from the Editor or Dashboard.
2. Options:
   - **Full World Pack (ZIP)**: All images, videos, audio, world graph JSON, and metadata.
   - **Individual assets**: Download specific images or videos.
   - **World graph only**: JSON file for use in external tools.
3. Download via S3 presigned URL. Large exports are chunked; email notification sent if processing takes time.

### 9.3 Sharing
- **Public gallery**: Opt to list the world in OT-Muse's community browser.
- **View-only link**: Anyone with the link can explore the world (no edit access).
- **Embed code**: Paste into a blog or website to show an interactive world preview.

---

## 10. Post-Session and Account Management

### 10.1 Dashboard Return
- After exiting a world, user returns to the Dashboard.
- Updated stats reflect recent activity.

### 10.2 World Management
- **Resume editing**: Click any saved world to continue.
- **Duplicate**: Create a copy of a world as a starting point for a new one.
- **Archive**: Move worlds out of the active list without deleting.
- **Delete**: Permanently remove a world and all its assets.

### 10.3 Profile and Settings
- **Update email/password**: Managed via Cognito.
- **Style preferences**: Default themes, preferred art styles, voice preferences for narration.
- **Notification settings**: Email alerts for collaboration invites, export completion.

### 10.4 Logout
- Secure session termination.
- "Remember me" option for convenience on trusted devices.

---

## Flow Summary

```
Landing Page
    │
    ├──→ Sign Up / Login (Cognito)
    │         │
    │         ▼
    │    Onboarding (first-time only)
    │         │
    │         ▼
    ├──→ Dashboard
    │     │       │
    │     │       ├──→ Open Existing World ──→ World Editor
    │     │       │
    │     ▼       │
    │  Create New World
    │     │
    │     ▼
    │  Prompt Input ──→ Generation Pipeline ──→ World Editor Canvas
    │                                              │         │
    │                                              │         ├──→ Explore Mode
    │                                              │         │       │
    │                                              │         │       ▼
    │                                              │         │  Navigate & Generate
    │                                              │         │
    │                                              │         ├──→ Collaboration
    │                                              │         │       │
    │                                              │         │       ▼
    │                                              │         │  Invite → Live Edit → Resolve Conflicts
    │                                              │         │
    │                                              │         ├──→ World Graph
    │                                              │         │
    │                                              │         └──→ Export / Share
    │                                              │
    │                                              └──→ Dashboard (return)
    │
    └──→ Community Gallery (browse public worlds)
```
