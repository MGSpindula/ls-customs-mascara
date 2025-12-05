export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 p-8">
            <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome</h1>
                <p className="text-lg mb-6">Your Next.js landing page is ready.</p>
                <a
                    href="#"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 transition"
                >
                    Learn More
                </a>
            </div>
        </div>
    );
}