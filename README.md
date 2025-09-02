# 🚀 Ship-It

*Ship-It* is a fun, gamified platform that turns GitHub contributions into a friendly competition. Developers earn points for creating issues, reviewing pull requests, and merging code — all tracked and displayed on a colorful scoreboard.

---

## 🎯 Goal

The goal of this project is to **gamify open-source collaboration** by:

* Tracking **issues, pull requests, and contributions** from GitHub repos.
* Displaying them in a **retro arcade-style UI** with bold visuals.
* Maintaining a **global scoreboard** so contributors can compete.
* Encouraging developers to **ship faster and better** through playful rivalry.

---

## 🛠 Implementation

* **Frontend**: Next.js + Tailwind CSS for a vibrant, retro look.
* **Navbar**: Dynamic white "island" with quick access to Home, Issues, Pulls, and Scoreboard.
* **Pages**:
  * **Home** → Explains what the platform does.
  * **Issues** → Shows active GitHub issues.
  * **Pulls** → Lists open pull requests.
  * **Scoreboard** → Leaderboard with contributor points.
* **GitHub Integration**: Pulls data directly from GitHub APIs.
* **Gamification Layer**: Points assigned based on actions.
* **Storage**: Redis for leaderboard + GitHub Gist fallback for persistence.

---

## 🎮 Points System

| Action              | Points |
| ------------------- | ------ |
| Create Issue        | +5     |
| Open Pull Request   | +10    |
| Review Pull Request | +8     |
| Merge Pull Request  | +20    |
| Close Issue/PR      | +3     |

*(Customizable for different repos/teams.)*

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Redis instance (optional but recommended)
- GitHub repository to track

### Installation

1. **Clone and Install**
```bash
git clone https://github.com/your-org/ship-it.git
cd ship-it
pnpm install
```

2. **Environment Setup**
Create a `.env.local` file:
```env
# GitHub Repository (required)
GITHUB_OWNER=your-username
GITHUB_REPO=your-repo-name

# GitHub API Token (optional, for higher rate limits)
GITHUB_TOKEN=your_github_token

# Redis (optional but recommended for production)
REDIS_URL=redis://localhost:6379

# Gist Fallback Storage (if no Redis)
GIST_ID=your_gist_id
```

3. **Run Development Server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see Ship-It in action!

---

## 🎯 Configuration

### GitHub Repository

Update `src/app/api/url.ts` with your target repository:

```typescript
export const url = "https://github.com/your-org/your-repo"
export const owner = "your-org"
export const repo = "your-repo"
```

### Storage Options

**Option 1: Redis (Recommended)**
- Set `REDIS_URL` in your environment
- Provides real-time leaderboard updates
- Scales well for multiple users

**Option 2: GitHub Gist Fallback**
- Set `GIST_ID` and `GITHUB_TOKEN` 
- Works without Redis infrastructure
- Good for small teams or demos

### Points Customization

Modify `src/app/api/redis.ts` to adjust the points system:

```typescript
export const POINTS = {
  CREATE_ISSUE: 5,
  OPEN_PULL_REQUEST: 10,
  REVIEW_PULL_REQUEST: 8,
  MERGE_PULL_REQUEST: 20,
  CLOSE_ISSUE_OR_PR: 3,
} as const;
```

---

## 📱 Features

### 🏠 Home Page
- **Neobrutalist Design**: Bold borders, flat colors, chunky shadows
- **Mission Statement**: Clear explanation of gamification goals
- **Quick Navigation**: Direct links to GitHub repo and scoreboard

### 📋 Issues Page
- **Live GitHub Issues**: Real-time sync with your repository
- **Level-based Filtering**: Sort by difficulty levels
- **Rich Issue Cards**: User avatars, labels, progress tracking

### 🔄 Pull Requests Page
- **PR Tracking**: All pull requests with linked issues
- **Score Calculation**: Automatic point assignment
- **Mini Leaderboard**: Top contributors sidebar

### 🏆 Scoreboard Page
- **Global Rankings**: Real-time leaderboard with ranks
- **User Profiles**: Click to see individual contribution history
- **Points Breakdown**: Visual representation of scoring system

---

## 🏗 Architecture

```
src/
├── app/
│   ├── api/
│   │   ├── redis.ts          # Redis client & leaderboard service
│   │   ├── storage.ts        # Gist fallback storage
│   │   ├── leaderboard/      # Leaderboard API endpoints
│   │   ├── issues/          # GitHub issues API
│   │   └── pulls/           # GitHub PRs API
│   ├── components/
│   │   ├── Navbar.tsx       # Navigation island
│   │   └── IssueCard.tsx    # Issue display component
│   ├── issues/             # Issues page
│   ├── pulls/              # Pull requests page
│   ├── scoreboard/         # Leaderboard page
│   └── layout.tsx          # Root layout with navbar
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect GitHub Repository**
   - Import your Ship-It fork to Vercel
   - Configure environment variables in dashboard

2. **Environment Variables**
   ```env
   REDIS_URL=your_redis_url
   GITHUB_TOKEN=your_token
   GIST_ID=your_gist_id
   ```

3. **Deploy**
   - Automatic deployments on push to main
   - Edge functions for fast API responses

---

## 🤝 Contributing

We love contributions! Here's how to get involved:

1. **Fork the Repository**
2. **Create Feature Branch**: `git checkout -b feature/awesome-feature`
3. **Make Changes**: Follow our coding standards
4. **Test Locally**: `pnpm dev` and verify everything works
5. **Submit PR**: Include description of changes

### Development Guidelines

- **Neobrutalist Design**: Maintain bold borders, flat colors, chunky shadows
- **Performance**: Optimize API calls and use proper caching
- **Accessibility**: Ensure keyboard navigation and screen reader support
- **Mobile-First**: Test responsive behavior across devices

---

## 📊 API Reference

### GET `/api/leaderboard`
```typescript
// Get top contributors
GET /api/leaderboard?limit=10

// Get specific user details
GET /api/leaderboard?user=username
```

### POST `/api/leaderboard`
```typescript
// Add points manually
POST /api/leaderboard
{
  "username": "developer",
  "action": "MERGE_PULL_REQUEST",
  "points": 20
}
```

### GET `/api/issues`
```typescript
// Get all repository issues
GET /api/issues
```

### GET `/api/pulls`
```typescript
// Get pull requests with scores
GET /api/pulls
```

---

## 🐛 Troubleshooting

### Common Issues

**"Failed to fetch leaderboard"**
- Check Redis connection or Gist configuration
- Verify environment variables are set correctly

**"GitHub API rate limit exceeded"**
- Add `GITHUB_TOKEN` to your environment variables
- Use a personal access token with repo permissions

**"Issues not showing"**
- Verify repository URL in `src/app/api/url.ts`
- Check if repository is public or token has access

### Debug Mode

Enable verbose logging:
```env
NODE_ENV=development
DEBUG=ship-it:*
```

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- **Neobrutalism Design**: Inspired by modern web brutalism movement
- **GitHub API**: For providing excellent developer tools
- **Next.js Team**: For the amazing React framework
- **Vercel**: For seamless deployment platform

---

**Ready to ship? 🚀 [Get started now!](#-quick-start)**
