import HeroAnimation from "@/components/hero-animation";

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6">Our Features</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Ubwenge is packed with powerful tools to enhance your learning experience. From intelligent note management to collaborative study groups, we have everything you need to succeed.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>AI-Powered Note Summarization & Analysis</li>
            <li>Collaborative Workspaces & Peer Discussions</li>
            <li>Personalized & Dynamic News Feeds</li>
            <li>Advanced Search Across All Your Materials</li>
            <li>Book Uploading and Sharing Community</li>
            <li>Secure and Role-Based Access Control</li>
          </ul>
        </div>
        <div className="relative h-80 md:h-96">
            <HeroAnimation />
        </div>
      </div>
    </div>
  );
}
