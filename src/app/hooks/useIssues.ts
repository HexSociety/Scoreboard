'use client';
import { useEffect, useState } from "react";
import axios from "axios";
type Issue={
    id:string;
    title: string;
    comments_url: string;
    labels: string[];
    state: string;
    events_url: string;
    body: string;
    url: string;
    number: string;
}
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
}