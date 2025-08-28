import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart, Globe, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6" data-testid="heading-about-title">
            About Sathi Ko Recipe
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-about-subtitle">
            Empowering international students and cooking beginners with simple, affordable, and delicious recipes from around the world.
          </p>
        </div>

        {/* Mission & Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6" data-testid="heading-mission">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-mission-description">
              We believe that everyone deserves access to healthy, affordable, and delicious meals, especially students who are away from home. Our mission is to make cooking accessible and enjoyable for international students and beginners.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Founded by students, for students, we understand the challenges of cooking on a budget, limited time, and minimal kitchen equipment. Every recipe is tested and designed with these constraints in mind.
            </p>
            <div className="grid grid-cols-3 gap-4" data-testid="stats-section">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1" data-testid="stat-recipes">500+</div>
                <div className="text-sm text-muted-foreground">Recipes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1" data-testid="stat-students">50k+</div>
                <div className="text-sm text-muted-foreground">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1" data-testid="stat-countries">25+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              alt="Students cooking together in kitchen"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
              data-testid="img-mission"
            />
          </div>
        </div>

        {/* Team Values */}
        <div className="bg-muted rounded-2xl p-8 lg:p-12 mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12" data-testid="heading-values">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="value-accessibility">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Accessibility</h3>
              <p className="text-muted-foreground">
                Every recipe is designed to be simple, affordable, and achievable with basic cooking skills and equipment.
              </p>
            </div>
            <div className="text-center" data-testid="value-diversity">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Cultural Diversity</h3>
              <p className="text-muted-foreground">
                We celebrate cuisines from around the world, helping students stay connected to their roots while exploring new flavors.
              </p>
            </div>
            <div className="text-center" data-testid="value-community">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Community</h3>
              <p className="text-muted-foreground">
                Building a supportive community where students can share recipes, tips, and culinary experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center" data-testid="cta-section">
          <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="heading-join-community">
            Join Our Community
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-join-description">
            Ready to start your culinary journey? Explore our recipes, share your creations, and connect with fellow student chefs from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/recipes">
              <Button 
                className="bg-primary text-primary-foreground hover:bg-green-700 transition-colors btn-scale px-8 py-3 rounded-xl font-semibold"
                data-testid="button-explore-recipes"
              >
                Explore Recipes
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="secondary"
                className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors btn-scale px-8 py-3 rounded-xl font-semibold"
                data-testid="button-contact-us"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
