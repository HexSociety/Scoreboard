'use client';
import { useEffect, useState } from "react";
import axios from "axios";

type Label = { name: string; color?: string };
type SimpleUser = { login: string; avatar_url?: string } | null;

export type Issue = {
  id: number | string;
  number: number;
  title: string;
  body?: string | null;
  excerpt?: string;
  url?: string;
  html_url?: string;
  labels: Label[];
  state: string;
  user?: SimpleUser;
  comments?: number;
  comments_url?: string;
  reactions?: any;
  created_at?: string;
  updated_at?: string;
  last_activity?: string;
  time_open_days?: number;
  assignees?: SimpleUser[];
  milestone?: { title: string } | null;
  sub_issues_summary?: any;
  issue_dependencies_summary?: any;
  locked?: boolean;
  pull_request?: boolean;
};

export const useIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get("/api/issues");
        setIssues(response.data);
      } catch (error) {
        setError("Failed to fetch issues");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  return { issues, loading, error };
};