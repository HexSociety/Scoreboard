
import IssueCard from "../components/IssueCard";

export default function Issues() {
  return (
    <div className="min-h-screen relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-green-300/10 rounded-full blur-xl"></div>
        <div className="absolute top-3/4 right-1/6 w-40 h-40 bg-blue-300/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="relative z-10 pt-8">
        <div className="text-center mb-8">
          <h1 className="inline-flex items-center gap-3 text-3xl md:text-4xl font-black px-8 py-4 bg-white border-4 border-black neobrutalist-shadow-lg rounded-2xl">
            <span className="text-2xl">🐛</span>
            GitHub Issues
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto px-4">
            Explore and contribute to open issues. Each contribution earns you points towards the leaderboard!
          </p>
        </div>
        
        <IssueCard />
      </div>
    </div>
  );
}