import BlogPostClient from './BlogPostClient';

// Required for static export with dynamic routes
export async function generateStaticParams() {
  // Return empty array since blog posts are fetched dynamically from API
  // In production, you should fetch actual blog slugs from your API
  return [];
}

export const dynamic = 'force-static';
export const dynamicParams = false; // Disable dynamic params to prevent build errors

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogPostClient params={params} />;
}
