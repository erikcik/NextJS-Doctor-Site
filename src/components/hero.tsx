import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative h-[500px] flex items-center justify-center text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{
          backgroundImage: "url('/placeholder.svg?height=500&width=1920')",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backgroundBlendMode: "overlay"
        }}
      />
      <div className="relative z-10 text-center space-y-4 px-4">
        <h1 className="text-4xl md:text-5xl font-bold">Complementary Medicine</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Treatment Methods Passed Down from Generation to Generation
        </p>
        <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
          Click for details
        </Button>
      </div>
    </section>
  )
}

