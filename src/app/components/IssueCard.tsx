"use client";
import React, { useState, useMemo } from "react";
import { useIssues, Issue } from "../hooks/useIssues";

const colors: Record<string, string> = {
  level1: "bg-gradient-to-br from-pink-200 to-pink-300",
  level2: "bg-gradient-to-br from-yellow-200 to-yellow-300",
  default: "bg-gradient-to-br from-gray-100 to-gray-200",
};

function timeAgo(iso?: string) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.round(hrs / 24);
  return `${days}d`;
}

const IssueCard = () => {
  const { issues } = useIssues();
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "closed">("all");
  const [levelFirst, setLevelFirst] = useState<boolean>(true);

  // precedence for level-wise sorting
  const levelPrecedence: Record<string, number> = {
    level1: 0,
    level2: 1,
  };

  // filtered and grouped issues memoized for performance
  const grouped = useMemo(() => {
    // apply status filter
    const filtered = issues.filter((issue) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "open") return issue.state === "open";
      return issue.state === "closed";
    });

    // group by first label name
    const groups = filtered.reduce((acc: Record<string, Issue[]>, issue) => {
      const level = issue.labels?.[0]?.name || "unlabeled";
      if (!acc[level]) acc[level] = [];
      acc[level].push(issue);
      return acc;
    }, {} as Record<string, Issue[]>);

    // when levelFirst, sort groups by precedence then name; otherwise alphabetical
    const orderedKeys = Object.keys(groups).sort((a, b) => {
      if (levelFirst) {
        const pa = levelPrecedence[a] ?? 99;
        const pb = levelPrecedence[b] ?? 99;
        if (pa !== pb) return pa - pb;
      }
      return a.localeCompare(b);
    });

    // sort issues inside each group: open first then newest
    const ordered: Record<string, Issue[]> = {};
    for (const k of orderedKeys) {
      ordered[k] = groups[k].slice().sort((x, y) => {
        // open first
        if (x.state !== y.state) return x.state === "open" ? -1 : 1;
        // fallback to created_at (newest first)
        const tx = x.created_at ? new Date(x.created_at).getTime() : 0;
        const ty = y.created_at ? new Date(y.created_at).getTime() : 0;
        return ty - tx;
      });
    }

    return ordered;
  }, [issues, statusFilter, levelFirst]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-white/80 border-4 border-black neobrutalist-shadow rounded-2xl">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">🔍 Filter:</span>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 border-2 border-black font-bold rounded-lg transition-all hover-lift ${
                statusFilter === "all" 
                  ? "bg-purple-400 text-white neobrutalist-shadow" 
                  : "bg-white hover:bg-purple-100"
              }`}
              onClick={() => setStatusFilter("all")}
            >
              📋 All
            </button>
            <button
              className={`px-4 py-2 border-2 border-black font-bold rounded-lg transition-all hover-lift ${
                statusFilter === "open" 
                  ? "bg-green-400 text-white neobrutalist-shadow" 
                  : "bg-white hover:bg-green-100"
              }`}
              onClick={() => setStatusFilter("open")}
            >
              🟢 Open
            </button>
            <button
              className={`px-4 py-2 border-2 border-black font-bold rounded-lg transition-all hover-lift ${
                statusFilter === "closed" 
                  ? "bg-red-400 text-white neobrutalist-shadow" 
                  : "bg-white hover:bg-red-100"
              }`}
              onClick={() => setStatusFilter("closed")}
            >
              🔴 Closed
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 font-medium cursor-pointer">
            <input 
              type="checkbox" 
              checked={levelFirst} 
              onChange={(e) => setLevelFirst(e.target.checked)}
              className="w-4 h-4 border-2 border-black rounded"
            />
            <span>⚡ Level-first sorting</span>
          </label>
        </div>
      </div>
      {Object.keys(grouped).map((level) => (
        <div key={level} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl md:text-3xl font-black px-6 py-3 border-4 border-black bg-white neobrutalist-shadow-lg rounded-xl">
              {level === "level1" && "🥉"} 
              {level === "level2" && "🥈"} 
              {level === "unlabeled" && "📋"} 
              {level.toUpperCase()}
            </h2>
            <div className="text-sm font-medium text-gray-600">
              {grouped[level].length} issue{grouped[level].length !== 1 ? 's' : ''}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {grouped[level].map((issue) => (
              <a
                key={issue.id}
                href={issue.html_url || issue.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-6 border-4 border-black neobrutalist-shadow-lg rounded-2xl font-bold hover-lift cursor-pointer transition-all duration-300 ${
                  colors[issue.labels?.[0]?.name] || colors.default
                } hover:scale-[1.02]`}
              >
                <div className="flex items-start gap-4">
                  {issue.user?.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={issue.user.avatar_url}
                      alt={issue.user.login || "avatar"}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300" />
                  )}

                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg mb-1">{issue.title}</h3>
                      <div className="text-xs text-black/70">
                        #{issue.number}
                      </div>
                    </div>
                    <p className="text-sm text-black/90 mb-2">
                      {issue.excerpt ||
                        (issue.body ? issue.body.slice(0, 140) + "…" : "")}
                    </p>

                    <div className="flex items-center gap-3 flex-wrap">
                      {/* labels */}
                      {issue.labels?.map((l) => (
                        <span
                          key={l.name}
                          className="text-xs px-2 py-1 rounded-full border border-black/10"
                          style={{
                            backgroundColor: l.color
                              ? `#${l.color}`
                              : undefined,
                          }}
                        >
                          {l.name}
                        </span>
                      ))}

                      {issue.milestone ? (
                        <span className="text-xs px-2 py-1 rounded-full border border-black/10 bg-white">
                          {issue.milestone.title}
                        </span>
                      ) : null}

                      {issue.locked ? (
                        <span className="text-xs px-2 py-1">🔒</span>
                      ) : null}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-black/70">
                        <span>State: {issue.state.toUpperCase()}</span>
                        <span>•</span>
                        <span>{issue.comments ?? 0} comments</span>
                        {issue.reactions ? (
                          <span>• 👍 {issue.reactions["+1"] || 0}</span>
                        ) : null}
                        <span>• opened {timeAgo(issue.created_at)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* assignees */}
                        {issue.assignees?.slice(0, 3).map((a) =>
                          a?.avatar_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              key={a.login}
                              src={a.avatar_url}
                              className="w-6 h-6 rounded-full"
                              alt={a.login}
                            />
                          ) : (
                            <div
                              key={a?.login}
                              className="w-6 h-6 rounded-full bg-gray-200"
                            />
                          )
                        )}
                      </div>
                    </div>

                    {/* progress bar from sub_issues_summary.percent_completed if present */}
                    {issue.sub_issues_summary?.percent_completed ? (
                      <div className="mt-3">
                        <div className="w-full bg-black/10 h-2 rounded-full">
                          <div
                            className="h-2 rounded-full bg-black"
                            style={{
                              width: `${issue.sub_issues_summary.percent_completed}%`,
                            }}
                          />
                        </div>
                        <div className="text-xs text-black/60 mt-1">
                          {issue.sub_issues_summary.percent_completed}% complete
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IssueCard;
