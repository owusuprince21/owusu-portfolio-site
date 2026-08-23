export default function BlogLoading() {
  return (
    <section className="py-20 section-padding bg-dark-bg min-h-screen">
      <div className="max-w-7xl mx-auto animate-pulse">
        <div className="text-center mb-16 space-y-4">
          <div className="h-10 w-64 bg-white/10 rounded-lg mx-auto" />
          <div className="h-5 w-96 max-w-full bg-white/5 rounded-lg mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 h-[320px] bg-white/5 rounded-2xl" />
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-72 bg-white/5 rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  )
}
