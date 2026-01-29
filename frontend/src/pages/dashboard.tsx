import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Code2,
  GitPullRequest,
  Clock,
  TrendingUp,
  AlertCircle,
  Settings,
  Search,
  Bell,
  ChevronDown,
  ExternalLink,
  BarChart3,
  Users,
  Home,
  FileText,
} from "lucide-react";
import axios from "axios";
import { gitHubUser } from "@/models/userModel";

function Dashboard() {
  const [selectedRepo, setSelectedRepo] = useState("my-app");
  const [timePeriod, setTimePeriod] = useState("7d");
  const [userData, setUserData] = useState<gitHubUser | null>(null);
  const [repositories, setRepositories] = useState(null);

  // Mock data
  const stats = {
    totalReviews: 156,
    reviewsChange: 12,
    issuesFound: 43,
    issuesChange: -8,
    timeSaved: 24.5,
    timeSavedChange: 15,
    avgTime: 3.2,
    avgTimeChange: -5,
  };

  const recentPRs = [
    {
      id: 1,
      number: 245,
      title: "Add user authentication flow",
      status: "approved",
      score: 92,
      comments: 3,
      time: "2 hours ago",
      author: "alice",
    },
    {
      id: 2,
      number: 244,
      title: "Fix memory leak in dashboard",
      status: "changes",
      score: 78,
      comments: 8,
      time: "5 hours ago",
      author: "bob",
    },
    {
      id: 3,
      number: 243,
      title: "Update API documentation",
      status: "approved",
      score: 95,
      comments: 2,
      time: "1 day ago",
      author: "carol",
    },
    {
      id: 4,
      number: 242,
      title: "Refactor payment service",
      status: "review",
      score: 85,
      comments: 5,
      time: "1 day ago",
      author: "dave",
    },
    {
      id: 5,
      number: 241,
      title: "Add dark mode support",
      status: "approved",
      score: 88,
      comments: 4,
      time: "2 days ago",
      author: "eve",
    },
  ];

  const topIssues = [
    { type: "Security", count: 12, severity: "high" },
    { type: "Code Smell", count: 18, severity: "medium" },
    { type: "Bug Risk", count: 8, severity: "high" },
    { type: "Best Practice", count: 15, severity: "low" },
    { type: "Performance", count: 6, severity: "medium" },
  ];

  const activities = [
    {
      id: 1,
      action: "AI reviewed PR #245",
      detail: "3 suggestions made",
      time: "2 hours ago",
      type: "review",
    },
    {
      id: 2,
      action: "Security vulnerability detected",
      detail: "in auth.ts",
      time: "5 hours ago",
      type: "security",
    },
    {
      id: 3,
      action: "PR #244 needs changes",
      detail: "8 issues found",
      time: "5 hours ago",
      type: "changes",
    },
    {
      id: 4,
      action: "Best practices violation",
      detail: "in api/users.js",
      time: "1 day ago",
      type: "warning",
    },
    {
      id: 5,
      action: "PR #243 approved",
      detail: "Code quality: 95/100",
      time: "1 day ago",
      type: "success",
    },
  ];

  const getStatusColor = (status: any) => {
    switch (status) {
      case "approved":
        return "bg-success/10 text-success border-success/30";
      case "changes":
        return "bg-warning/10 text-warning border-warning/30";
      case "review":
        return "bg-secondary/10 text-secondary border-secondary/30";
      default:
        return "bg-muted/10 text-muted-foreground border-border";
    }
  };

  const getStatusText = (status: any) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "changes":
        return "Changes Requested";
      case "review":
        return "In Review";
      default:
        return "Pending";
    }
  };

  const getScoreColor = (score: any) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getSeverityColor = (severity: any) => {
    switch (severity) {
      case "high":
        return "bg-destructive/10 text-destructive";
      case "medium":
        return "bg-warning/10 text-warning";
      case "low":
        return "bg-muted/10 text-muted-foreground";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  const getUserData = async () => {
    try {
      const userReponse = await axios.get<gitHubUser>(
        "http://localhost:4040/api/user/me",
        {
          withCredentials: true,
        },
      );
      console.log(userReponse.data);
      setUserData(userReponse.data);
    } catch (error) {
      console.log("Error fetching the user data");
    }
  };

    const getUserRepositories = async () => {
    try {
      const repoReponse = await axios.get(
        "http://localhost:4040/api/user/repos",
        {
          withCredentials: true,
        },
      );
      console.log(repoReponse.data);
      setRepositories(repoReponse.data);
    } catch (error) {
      console.log("Error fetching the user repositories data");
    }
  };

  useEffect(() => {
    getUserData();
    getUserRepositories();
    // console.log("User data :", userData);
    // console.log("Repo data :", repositories);
  }, []);

    console.log("User data :", userData);
    console.log("Repo data :", repositories);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 glass border-r border-border p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <Link to={"/"}>
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Code2 className="w-6 h-6 text-primary-foreground" />
            </div>

            <span className="text-xl font-bold gradient-text">CodeReviewX</span>
          </Link>
        </div>

        <nav className="space-y-2 flex-1">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium"
          >
            <Home className="w-5 h-5" />
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            <GitPullRequest className="w-5 h-5" />
            Pull Requests
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            <BarChart3 className="w-5 h-5" />
            Analytics
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            <FileText className="w-5 h-5" />
            Reports
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            <Users className="w-5 h-5" />
            Team
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            <Settings className="w-5 h-5" />
            Settings
          </a>
        </nav>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
              {userData?.avatarUrl ? (
                <img src={userData.avatarUrl} alt={userData?.username} className="rounded-full"></img>
              ) : (
                <div className="w-full h-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {userData?.username?.[0]?.toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{userData?.username}</p>
              <p className="text-xs text-muted-foreground">{userData?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your code reviews.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search PRs..."
                className="pl-10 pr-4 py-2 glass rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring w-64"
              />
            </div>

            <button className="relative p-2 glass rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>

            <select
              value={selectedRepo}
              onChange={(e) => setSelectedRepo(e.target.value)}
              className="px-4 py-2 glass rounded-lg border border-border appearance-none cursor-pointer pr-10"
            >
              <option value="my-app">my-app</option>
              <option value="backend-api">backend-api</option>
              <option value="mobile-app">mobile-app</option>
            </select>

            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="px-4 py-2 glass rounded-lg border border-border appearance-none cursor-pointer pr-10"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="all">All time</option>
            </select>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="glass glass-hover rounded-xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <GitPullRequest className="w-6 h-6 text-primary" />
              </div>
              <span
                className={`text-sm font-medium ${stats.reviewsChange > 0 ? "text-success" : "text-destructive"}`}
              >
                {stats.reviewsChange > 0 ? "+" : ""}
                {stats.reviewsChange}%
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.totalReviews}</p>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
            </div>
          </div>

          <div className="glass glass-hover rounded-xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-warning" />
              </div>
              <span
                className={`text-sm font-medium ${stats.issuesChange < 0 ? "text-success" : "text-destructive"}`}
              >
                {stats.issuesChange > 0 ? "+" : ""}
                {stats.issuesChange}%
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.issuesFound}</p>
              <p className="text-sm text-muted-foreground">Issues Found</p>
            </div>
          </div>

          <div className="glass glass-hover rounded-xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-success" />
              </div>
              <span className="text-sm font-medium text-success">
                +{stats.timeSavedChange}%
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.timeSaved}h</p>
              <p className="text-sm text-muted-foreground">Time Saved</p>
            </div>
          </div>

          <div className="glass glass-hover rounded-xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <span className="text-sm font-medium text-success">
                {stats.avgTimeChange}%
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.avgTime}min</p>
              <p className="text-sm text-muted-foreground">Avg Review Time</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Recent PRs - 2/3 width */}
          <div className="col-span-2 glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Recent Pull Requests</h2>
              <a
                href="#"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View All
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </a>
            </div>

            <div className="space-y-4">
              {recentPRs.map((pr) => (
                <div
                  key={pr.id}
                  className="glass-hover rounded-lg p-4 border border-border flex items-center justify-between group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-muted-foreground text-sm">
                        #{pr.number}
                      </span>
                      <h3 className="font-medium">{pr.title}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(pr.status)}`}
                      >
                        {getStatusText(pr.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>by {pr.author}</span>
                      <span>•</span>
                      <span>{pr.comments} comments</span>
                      <span>•</span>
                      <span>{pr.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p
                        className={`text-2xl font-bold ${getScoreColor(pr.score)}`}
                      >
                        {pr.score}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Quality Score
                      </p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 glass rounded-lg border border-border hover:bg-muted/50">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Top Issues */}
            <div className="glass rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Top Issues</h2>
              <div className="space-y-3">
                {topIssues.map((issue, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 glass-hover rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(issue.severity)}`}
                      >
                        {issue.severity}
                      </span>
                      <span className="text-sm font-medium">{issue.type}</span>
                    </div>
                    <span className="text-lg font-bold text-muted-foreground">
                      {issue.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="glass rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.detail}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
