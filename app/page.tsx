import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Code, Laptop, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground">
              Build Something
              <span className="text-primary"> Amazing</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Create stunning web applications with modern tools and frameworks.
              Start building your next big idea today.
            </p>
            <div className="mt-10 flex gap-4 justify-center">
              <Link href="/convert">
                <Button size="lg">
                  Try Tailwind Converter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Built on Next.js for exceptional performance and SEO optimization.
              </p>
            </Card>
            <Card className="p-6">
              <Code className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Modern Stack</h3>
              <p className="text-muted-foreground">
                Leveraging the latest technologies including React, TypeScript, and Tailwind CSS.
              </p>
            </Card>
            <Card className="p-6">
              <Laptop className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
              <p className="text-muted-foreground">
                Beautiful and functional across all devices and screen sizes.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Transform your Tailwind configurations into design tokens with our converter.
          </p>
          <Link href="/convert">
            <Button size="lg" className="bg-primary text-primary-foreground">
              Start Converting Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}