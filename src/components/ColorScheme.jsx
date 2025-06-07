import React from 'react';

const ColorScheme = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8">
      {/* Primary Colors Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#1B4332] mb-6">Primary Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1B4332] p-6 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-2">Main Green</h3>
            <p className="text-white">#1B4332</p>
            <p className="mt-4">Used for primary elements, headings, and important UI components</p>
          </div>
          <div className="bg-[#7CB7E3] p-6 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-2">Sustainability Blue</h3>
            <p className="text-white">#7CB7E3</p>
            <p className="mt-4">Used for secondary elements, accents, and interactive elements</p>
          </div>
          <div className="bg-[#9CCC5A] p-6 rounded-lg text-[#1B4332]">
            <h3 className="text-xl font-semibold mb-2">Sustainability Green</h3>
            <p className="text-[#1B4332]">#9CCC5A</p>
            <p className="mt-4">Used for backgrounds, cards, and subtle elements</p>
          </div>
        </div>
      </section>

      {/* Secondary Colors Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#1B4332] mb-6">Secondary Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#2E7D32] p-6 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-2">Dark Green</h3>
            <p className="text-white">#2E7D32</p>
            <p className="mt-4">Used for hover states and emphasis</p>
          </div>
          <div className="bg-[#4A90E2] p-6 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-2">Deep Blue</h3>
            <p className="text-white">#4A90E2</p>
            <p className="mt-4">Used for special elements and highlights</p>
          </div>
          <div className="bg-[#F8F9FA] p-6 rounded-lg text-[#1B4332] border border-[#E9ECEF]">
            <h3 className="text-xl font-semibold mb-2">Cream</h3>
            <p className="text-[#6C757D]">#F8F9FA</p>
            <p className="mt-4">Used for backgrounds and light elements</p>
          </div>
        </div>
      </section>

      {/* Gradients Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#1B4332] mb-6">Gradients</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#1B4332] to-[#2E7D32] p-6 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-2">Green Gradient</h3>
            <p className="text-white">From #1B4332 to #2E7D32</p>
            <p className="mt-4">Used for hero sections and important backgrounds</p>
          </div>
          <div className="bg-gradient-to-br from-[#7CB7E3] to-[#4A90E2] p-6 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-2">Blue Gradient</h3>
            <p className="text-white">From #7CB7E3 to #4A90E2</p>
            <p className="mt-4">Used for secondary sections and cards</p>
          </div>
          <div className="bg-gradient-to-br from-[#1B4332] to-[#9CCC5A] p-6 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-2">Brand Gradient</h3>
            <p className="text-white">From #1B4332 to #9CCC5A</p>
            <p className="mt-4">Used for special elements and highlights</p>
          </div>
        </div>
      </section>

      {/* Example Components */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#1B4332] mb-6">Example Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Example */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-[#1B4332] to-[#9CCC5A]"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#1B4332] mb-2">Example Card</h3>
              <p className="text-[#6C757D] mb-4">This is how a card would look with the new color scheme.</p>
              <button className="bg-[#1B4332] hover:bg-[#2E7D32] text-white px-6 py-2 rounded-lg transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Button Examples */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-[#1B4332] mb-4">Button Styles</h3>
            <div className="space-y-4">
              <button className="w-full bg-[#1B4332] hover:bg-[#2E7D32] text-white px-6 py-3 rounded-lg transition-colors duration-300">
                Primary Button
              </button>
              <button className="w-full bg-[#7CB7E3] hover:bg-[#4A90E2] text-white px-6 py-3 rounded-lg transition-colors duration-300">
                Secondary Button
              </button>
              <button className="w-full bg-[#9CCC5A] hover:bg-[#1B4332] text-[#1B4332] hover:text-white px-6 py-3 rounded-lg transition-colors duration-300">
                Outline Button
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Text Examples */}
      <section>
        <h2 className="text-3xl font-bold text-[#1B4332] mb-6">Typography</h2>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-4xl font-bold text-[#1B4332] mb-4">Heading 1</h1>
          <h2 className="text-3xl font-bold text-[#2E7D32] mb-4">Heading 2</h2>
          <h3 className="text-2xl font-semibold text-[#7CB7E3] mb-4">Heading 3</h3>
          <p className="text-[#6C757D] mb-4">
            This is a paragraph text using the new color scheme. The text is easy to read and maintains good contrast.
          </p>
          <a href="#" className="text-[#7CB7E3] hover:text-[#1B4332] transition-colors duration-300">
            This is a link with hover effect
          </a>
        </div>
      </section>
    </div>
  );
};

export default ColorScheme; 