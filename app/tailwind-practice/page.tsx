"use client";

import { useState } from "react";
import { SectionCard } from "./components/section-card";
import { CodeComparison } from "./components/code-comparison";
import { Callout } from "./components/callout";

export default function TailwindPracticePage() {
  const [currentModule, setCurrentModule] = useState("1.1");

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Tailwind CSS Learning Playground
        </h1>
        
        {/* Module Selector */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-foreground mb-2">
            Current Module:
          </label>
          <select 
            value={currentModule}
            onChange={(e) => setCurrentModule(e.target.value)}
            className="bg-background border border-border rounded-md px-3 py-2 text-foreground"
          >
            <option value="1.1">Module 1.1: Core Concepts</option>
            <option value="1.2">Module 1.2: Layout & Positioning</option>
            <option value="1.3">Module 1.3: Typography & Colors</option>
            <option value="1.4">Module 1.4: Responsive Design</option>
            <option value="1.5">Module 1.5: States & Interactivity</option>
          </select>
        </div>

        {currentModule === "1.1" && <Module1_1 />}
        {currentModule === "1.2" && <Module1_2 />}
        {currentModule === "1.3" && <Module1_3 />}
        {currentModule === "1.4" && <Module1_4 />}
        {currentModule === "1.5" && <Module1_5 />}
      </div>
    </div>
  );
}

function Module1_1() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-foreground">
        Module 1.1: Core Concepts
      </h2>

      {/* Utility-First Philosophy */}
      <SectionCard title="1. Utility-First Philosophy">
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Instead of writing custom CSS, use pre-built utility classes.
          </p>

          <CodeComparison
            traditionalCode={`.card {
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}`}
            tailwindCode={`<div class="bg-white p-4 rounded-lg shadow-md">
  Card content
</div>`}
          />

          {/* Live Example */}
          <div className="mt-4">
            <h4 className="font-medium mb-2 text-card-foreground">Live Example:</h4>
            <div className="bg-muted p-4 rounded-lg shadow-md border-2 border-dashed border-blue-300">
              This card is styled with: <code className="bg-accent px-1 rounded text-accent-foreground">bg-white p-4 rounded-lg shadow-md</code>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Spacing System */}
      <section className="bg-card p-6 rounded-lg shadow border border-border">
        <h3 className="text-xl font-medium mb-4 text-card-foreground">2. Spacing System (Padding & Margin)</h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Tailwind uses a consistent spacing scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64...
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-card-foreground">Padding Examples:</h4>
              <div className="space-y-2">
                {/* Educational examples - keep original colors to demonstrate Tailwind's color system */}
                <div className="bg-blue-100 p-1 rounded text-blue-900">p-1 (4px)</div>
                <div className="bg-blue-200 p-2 rounded text-blue-900">p-2 (8px)</div>
                <div className="bg-blue-300 p-4 rounded text-blue-900">p-4 (16px)</div>
                <div className="bg-blue-400 p-6 rounded text-white">p-6 (24px)</div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-card-foreground">Margin Examples:</h4>
              <div className="bg-muted p-4 rounded">
                {/* Educational examples - keep original colors */}
                <div className="bg-green-200 p-2 mb-1 rounded text-green-900">mb-1</div>
                <div className="bg-green-300 p-2 mb-2 rounded text-green-900">mb-2</div>
                <div className="bg-green-400 p-2 mb-4 rounded text-white">mb-4</div>
                <div className="bg-green-500 p-2 rounded text-white">Last item</div>
              </div>
            </div>
          </div>

          <Callout variant="tip" title="Pro Tip:" icon="💡">
            Use directional spacing: <code className="bg-accent px-1 rounded text-accent-foreground">pt-4</code> (padding-top), <code className="bg-accent px-1 rounded text-accent-foreground">mr-2</code> (margin-right),
            <code className="bg-accent px-1 rounded text-accent-foreground">px-6</code> (padding horizontal), <code className="bg-accent px-1 rounded text-accent-foreground">my-3</code> (margin vertical)
          </Callout>
        </div>
      </section>

      {/* Sizing System */}
      <section className="bg-card p-6 rounded-lg shadow border border-border">
        <h3 className="text-xl font-medium mb-4 text-card-foreground">3. Sizing System (Width & Height)</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-card-foreground">Width Examples:</h4>
              <div className="space-y-2">
                {/* Educational examples - keep original colors */}
                <div className="w-1/4 h-8 bg-purple-200 rounded flex items-center px-2 text-sm text-purple-900">w-1/4</div>
                <div className="w-1/2 h-8 bg-purple-300 rounded flex items-center px-2 text-sm text-purple-900">w-1/2</div>
                <div className="w-3/4 h-8 bg-purple-400 rounded flex items-center px-2 text-sm text-white">w-3/4</div>
                <div className="w-full h-8 bg-purple-500 rounded flex items-center px-2 text-sm text-white">w-full</div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-card-foreground">Fixed Sizes:</h4>
              <div className="flex items-end space-x-2">
                {/* Educational examples - keep original colors */}
                <div className="w-16 h-16 bg-red-200 rounded flex items-center justify-center text-xs text-red-900">w-16<br/>h-16</div>
                <div className="w-20 h-20 bg-red-300 rounded flex items-center justify-center text-xs text-red-900">w-20<br/>h-20</div>
                <div className="w-24 h-24 bg-red-400 rounded flex items-center justify-center text-xs text-white">w-24<br/>h-24</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color System */}
      <section className="bg-card p-6 rounded-lg shadow border border-border">
        <h3 className="text-xl font-medium mb-4 text-card-foreground">4. Color System</h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Tailwind provides a comprehensive color palette with intensity levels from 50 (lightest) to 950 (darkest).
          </p>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-2 text-card-foreground">Blue Scale:</h4>
              <div className="space-y-1">
                {/* Educational examples - keep original colors to demonstrate Tailwind's color system */}
                <div className="bg-blue-50 p-2 rounded text-blue-900 text-sm">blue-50</div>
                <div className="bg-blue-100 p-2 rounded text-blue-900 text-sm">blue-100</div>
                <div className="bg-blue-300 p-2 rounded text-blue-900 text-sm">blue-300</div>
                <div className="bg-blue-500 p-2 rounded text-white text-sm">blue-500</div>
                <div className="bg-blue-700 p-2 rounded text-white text-sm">blue-700</div>
                <div className="bg-blue-900 p-2 rounded text-white text-sm">blue-900</div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-card-foreground">Text Colors:</h4>
              <div className="space-y-1">
                {/* Educational examples - keep original colors */}
                <p className="text-gray-500">text-gray-500</p>
                <p className="text-red-600">text-red-600</p>
                <p className="text-green-700">text-green-700</p>
                <p className="text-blue-800">text-blue-800</p>
                <p className="text-purple-600">text-purple-600</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-card-foreground">Border Colors:</h4>
              <div className="space-y-1">
                {/* Educational examples - keep original colors */}
                <div className="p-2 border-2 border-red-300 rounded text-card-foreground">border-red-300</div>
                <div className="p-2 border-2 border-green-400 rounded text-card-foreground">border-green-400</div>
                <div className="p-2 border-2 border-blue-500 rounded text-card-foreground">border-blue-500</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Exercise */}
      <section className="bg-card p-6 rounded-lg shadow border-2 border-green-200">
        <h3 className="text-xl font-medium mb-4 text-green-800">🎯 Practice Exercise</h3>
        <p className="text-muted-foreground mb-4">
          Try to recreate this card design using only Tailwind utilities:
        </p>

        {/* Target Design */}
        <div className="mb-6 p-4 bg-muted rounded">
          <h4 className="font-medium mb-2 text-card-foreground">Target Design:</h4>
          <div className="bg-card p-6 rounded-xl shadow-lg border border-border max-w-sm">
            <div className="w-12 h-12 bg-blue-500 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">🎨</span>
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">Design Card</h3>
            <p className="text-muted-foreground text-sm mb-4">
              This is a beautiful card with proper spacing, colors, and shadows.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        <div className="p-4 bg-accent/50 rounded border border-yellow-600">
          <h4 className="font-medium text-foreground mb-2">Classes you'll need:</h4>
          <div className="text-sm text-muted-foreground space-y-2">
            <div><strong>Card container:</strong> <code className="bg-accent px-1 rounded text-accent-foreground">bg-white p-6 rounded-xl shadow-lg border border-gray-200 max-w-sm</code></div>
            <div><strong>Icon container:</strong> <code className="bg-accent px-1 rounded text-accent-foreground">w-12 h-12 bg-blue-500 rounded-lg mb-4 flex items-center justify-center</code></div>
            <div><strong>Title:</strong> <code className="bg-accent px-1 rounded text-accent-foreground">text-lg font-semibold text-gray-900 mb-2</code></div>
            <div><strong>Description:</strong> <code className="bg-accent px-1 rounded text-accent-foreground">text-gray-600 text-sm mb-4</code></div>
            <div><strong>Button:</strong> <code className="bg-accent px-1 rounded text-accent-foreground">bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors</code></div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Placeholder components for other modules
function Module1_2() {
  return (
    <div className="bg-card p-6 rounded-lg shadow border border-border">
      <h2 className="text-2xl font-semibold text-card-foreground mb-4">
        Module 1.2: Layout & Positioning
      </h2>
      <p className="text-muted-foreground">Coming soon! Complete Module 1.1 first.</p>
    </div>
  );
}

function Module1_3() {
  return (
    <div className="bg-card p-6 rounded-lg shadow border border-border">
      <h2 className="text-2xl font-semibold text-card-foreground mb-4">
        Module 1.3: Typography & Colors
      </h2>
      <p className="text-muted-foreground">Coming soon! Complete previous modules first.</p>
    </div>
  );
}

function Module1_4() {
  return (
    <div className="bg-card p-6 rounded-lg shadow border border-border">
      <h2 className="text-2xl font-semibold text-card-foreground mb-4">
        Module 1.4: Responsive Design
      </h2>
      <p className="text-muted-foreground">Coming soon! Complete previous modules first.</p>
    </div>
  );
}

function Module1_5() {
  return (
    <div className="bg-card p-6 rounded-lg shadow border border-border">
      <h2 className="text-2xl font-semibold text-card-foreground mb-4">
        Module 1.5: States & Interactivity
      </h2>
      <p className="text-muted-foreground">Coming soon! Complete previous modules first.</p>
    </div>
  );
}