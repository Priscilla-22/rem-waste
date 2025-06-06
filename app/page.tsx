"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Star,
  Truck,
  Shield,
  AlertTriangle,
  X,
  Info,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"

interface SkipOption {
  id: string
  name: string
  size: string
  price: number
  hirePeriod: string
  description: string
  image: string
  popular?: boolean
  capacity: string
  suitable: string[]
  gradient: string
}

export default function SkipSelectorPage() {
  const [skipOptions, setSkipOptions] = useState<SkipOption[]>([])
  const [selectedSkip, setSelectedSkip] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showMobileSteps, setShowMobileSteps] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)

  const mockSkipData: SkipOption[] = [
    {
      id: "4-yard",
      name: "4 Yard Skip",
      size: "4 Yards",
      price: 227,
      hirePeriod: "7 day hire",
      description: "Perfect for small home projects and garden clearance",
      image: "/images/skip-bin-professional.png", // Professional render
      capacity: "30-40 bin bags",
      suitable: ["Garden waste", "Small renovations"],
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    },
    {
      id: "6-yard",
      name: "6 Yard Skip",
      size: "6 Yards",
      price: 300,
      hirePeriod: "14 day hire",
      description: "Ideal for medium-sized renovations and clear-outs",
      image: "/images/skip-bin-photo.png", // Original photo
      popular: true,
      capacity: "50-60 bin bags",
      suitable: ["Kitchen renovations", "Bathroom refits"],
      gradient: "from-orange-400 via-amber-500 to-yellow-500",
    },
    {
      id: "8-yard",
      name: "8 Yard Skip",
      size: "8 Yards",
      price: 325,
      hirePeriod: "7 day hire",
      description: "Great for larger projects and construction waste",
      image: "/images/skip-bin-professional.png", // Professional render
      capacity: "70-80 bin bags",
      suitable: ["Construction waste", "Large renovations"],
      gradient: "from-purple-400 via-violet-500 to-indigo-600",
    },
    {
      id: "10-yard",
      name: "10 Yard Skip",
      size: "10 Yards",
      price: 375,
      hirePeriod: "7 day hire",
      description: "Suitable for major home renovations",
      image: "/images/skip-bin-photo.png", // Original photo
      capacity: "90-100 bin bags",
      suitable: ["Major renovations", "House clearance"],
      gradient: "from-rose-400 via-pink-500 to-fuchsia-600",
    },
    {
      id: "12-yard",
      name: "12 Yard Skip",
      size: "12 Yards",
      price: 425,
      hirePeriod: "14 day hire",
      description: "Perfect for commercial projects and large clear-outs",
      image: "/images/skip-bin-professional.png", // Professional render
      capacity: "110-120 bin bags",
      suitable: ["Commercial projects", "Large construction"],
      gradient: "from-blue-400 via-sky-500 to-cyan-600",
    },
    {
      id: "14-yard",
      name: "14 Yard Skip",
      size: "14 Yards",
      price: 475,
      hirePeriod: "14 day hire",
      description: "Our largest skip for major construction projects",
      image: "/images/skip-bin-photo.png", // Original photo
      capacity: "130-140 bin bags",
      suitable: ["Major construction", "Industrial projects"],
      gradient: "from-red-400 via-orange-500 to-amber-600",
    },
    {
      id: "16-yard",
      name: "16 Yard Skip",
      size: "16 Yards",
      price: 525,
      hirePeriod: "14 day hire",
      description: "Extra large skip for major commercial projects",
      image: "/images/skip-bin-professional.png", // Professional render
      capacity: "150-160 bin bags",
      suitable: ["Major commercial", "Industrial demolition"],
      gradient: "from-green-400 via-emerald-500 to-teal-600",
    },
    {
      id: "18-yard",
      name: "18 Yard Skip",
      size: "18 Yards",
      price: 575,
      hirePeriod: "21 day hire",
      description: "Our premium skip for the largest projects",
      image: "/images/skip-bin-photo.png", // Original photo
      capacity: "170-180 bin bags",
      suitable: ["Demolition projects", "Large commercial"],
      gradient: "from-slate-400 via-gray-500 to-zinc-600",
    },
  ]

  useEffect(() => {
    const fetchSkipData = async () => {
      try {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setSkipOptions(mockSkipData)
      } catch (err) {
        setError("Failed to load skip options")
      } finally {
        setLoading(false)
      }
    }

    fetchSkipData()

    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setShowMobileSteps(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSkipSelect = (skipId: string) => {
    setSelectedSkip(skipId)
  }

  const handleContinue = () => {
    if (selectedSkip) {
      console.log("Selected skip:", selectedSkip)
    }
  }

  const toggleMobileSteps = () => {
    setShowMobileSteps(!showMobileSteps)
  }

  // Pagination logic
  const totalPages = Math.ceil(skipOptions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSkips = skipOptions.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="text-center relative z-10">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-700 border-t-blue-500 mx-auto mb-8 shadow-2xl"></div>
            <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-t-blue-400 animate-ping mx-auto"></div>
          </div>
          <p className="text-gray-300 text-xl font-medium">Loading skip options...</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center p-4">
        <div className="text-center bg-gray-800/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 w-full max-w-md shadow-2xl">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-red-400 mb-6 text-lg">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700 shadow-lg">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  const progressSteps = [
    { id: 1, name: "Postcode", completed: true },
    { id: 2, name: "Waste Type", completed: true },
    { id: 3, name: "Select Skip", active: true },
    { id: 4, name: "Permit Check", completed: false },
    { id: 5, name: "Choose Date", completed: false },
    { id: 6, name: "Payment", completed: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="bg-gray-800/80 backdrop-blur-xl border-b border-gray-700/50 sticky top-0 z-50 shadow-xl">
        <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16 py-4 sm:py-6">
          {/* Mobile Progress Indicator */}
          <div className="sm:hidden flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-sm font-bold mr-3 shadow-lg shadow-blue-500/30 ring-4 ring-blue-500/20">
                3
              </div>
              <div>
                <p className="text-white font-semibold">Select Skip</p>
                <p className="text-gray-400 text-xs">Step 3 of 6</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="border-gray-600 text-gray-300 rounded-xl"
              onClick={toggleMobileSteps}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Steps Dropdown */}
          {showMobileSteps && (
            <div className="sm:hidden mt-4 bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-4 animate-fadeInDown shadow-2xl">
              <div className="space-y-4">
                {progressSteps.map((step) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold mr-3 transition-all duration-300 ${
                        step.completed
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                          : step.active
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                            : "bg-gray-700 text-gray-400 border border-gray-600"
                      }`}
                    >
                      {step.completed ? <Check className="w-4 h-4" /> : step.id}
                    </div>
                    <p
                      className={`text-sm font-medium ${step.completed || step.active ? "text-white" : "text-gray-400"}`}
                    >
                      {step.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Desktop & Tablet Progress Bar */}
          <div className="hidden sm:flex items-center justify-between">
            {progressSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                      step.completed
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                        : step.active
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-500/20"
                          : "bg-gray-700 text-gray-400 border-2 border-gray-600"
                    }`}
                  >
                    {step.completed ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <div className="ml-4 hidden md:block">
                    <p
                      className={`text-sm font-semibold ${
                        step.completed || step.active ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {step.name}
                    </p>
                  </div>
                </div>
                {index < progressSteps.length - 1 && (
                  <div
                    className={`hidden md:block w-16 h-1 mx-6 rounded-full transition-all duration-500 ${
                      step.completed ? "bg-gradient-to-r from-blue-500 to-blue-600" : "bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-6 lg:px-12 xl:px-16 py-8 sm:py-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-block mb-6">
            <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              Professional Skip Hire Service
            </Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Perfect Skip
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Select the ideal skip size for your project. All prices include{" "}
            <span className="text-blue-400 font-semibold">free delivery</span>,{" "}
            <span className="text-emerald-400 font-semibold">collection</span>, and{" "}
            <span className="text-purple-400 font-semibold">responsible disposal</span>.
          </p>
        </div>

        {/* Skip Options Grid - Enhanced spacing and full width distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 mb-12 sm:mb-16 justify-items-stretch">
          {currentSkips.map((skip, index) => (
            <div key={skip.id} className="relative">
              {/* Popular Badge - Positioned outside the card */}
              {skip.popular && (
                <div className="absolute -top-2 left-6 z-30">
                  <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold px-4 py-2 shadow-xl rounded-2xl border border-orange-400/30 text-sm">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <Card
                className={`group relative cursor-pointer transition-all duration-700 bg-gray-900 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden hover:border-gray-600/50 w-full ${
                  selectedSkip === skip.id
                    ? "ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/20 transform scale-[1.02] bg-gray-800/60 border-blue-500/50"
                    : "hover:shadow-2xl hover:shadow-gray-900/50 hover:transform hover:scale-[1.02] hover:-translate-y-2"
                } ${skip.popular ? "mt-4" : ""}`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
                onClick={() => handleSkipSelect(skip.id)}
              >
                <CardContent className="p-0 overflow-hidden h-full">
                  {/* Skip Image Section - Distant view with padding */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-200 overflow-hidden p-8">
                    <div className="relative w-full h-full">
                      <Image
                        src={skip.image || "/placeholder.svg"}
                        alt={`${skip.name} - Professional skip bin for waste disposal`}
                        fill
                        className="object-contain transition-transform duration-700 group-hover:scale-110"
                        style={{
                          transform: "scale(0.7)",
                          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                        }}
                      />
                    </div>

                    {selectedSkip === skip.id && (
                      <div className="absolute bottom-4 left-4 animate-fadeInUp">
                        <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center shadow-xl ring-4 ring-white/20">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Skip Details Section */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 mb-2">
                        {skip.name}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
                        {skip.description}
                      </p>
                    </div>

                    {/* Clean Info Grid - No background colors */}
                    <div className="space-y-2">
                      <div className="flex items-center text-xs rounded-xl p-2 border border-gray-700/30 group-hover:border-gray-600/50 transition-colors duration-300">
                        <Truck className="w-3 h-3 mr-2 text-blue-400 flex-shrink-0" />
                        <span className="text-gray-400">Capacity:</span>
                        <span className="ml-1 text-white font-medium">{skip.capacity}</span>
                      </div>
                      <div className="flex items-center text-xs rounded-xl p-2 border border-gray-700/30 group-hover:border-gray-600/50 transition-colors duration-300">
                        <Clock className="w-3 h-3 mr-2 text-emerald-400 flex-shrink-0" />
                        <span className="text-gray-400">Duration:</span>
                        <span className="ml-1 text-white font-medium">{skip.hirePeriod}</span>
                      </div>
                    </div>

                    {/* Road Placement Status - Updated text */}
                    <div className="flex items-center text-xs rounded-xl p-2 border border-gray-700/30 group-hover:border-gray-600/50 transition-colors duration-300">
                      {Number.parseInt(skip.size) <= 8 ? (
                        <>
                          <Check className="w-3 h-3 mr-2 text-green-400 flex-shrink-0" />
                          <span className="text-green-300 font-medium">Road placement allowed</span>
                        </>
                      ) : (
                        <>
                          <X className="w-3 h-3 mr-2 text-red-400 flex-shrink-0" />
                          <span className="text-red-300 font-medium">Not allowed on the road</span>
                        </>
                      )}
                    </div>

                    {/* Suitable For Tags */}
                    <div className="flex flex-wrap gap-1">
                      {skip.suitable.map((item, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-gray-700/30 text-gray-300 text-xs px-2 py-0.5 rounded-lg border border-gray-600/30"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>

                    <Separator className="bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

                    {/* Price and Action */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="space-y-0.5">
                        <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          £{skip.price}
                        </div>
                        <div className="text-xs text-gray-400 font-medium">inc. VAT</div>
                      </div>
                      <Button
                        variant={selectedSkip === skip.id ? "default" : "outline"}
                        size="sm"
                        className={
                          selectedSkip === skip.id
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-600/30 rounded-xl border-0 px-4 py-2 text-sm"
                            : "border-gray-600 text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:border-blue-500 rounded-xl px-4 py-2 backdrop-blur-sm text-sm"
                        }
                      >
                        {selectedSkip === skip.id ? (
                          <>
                            <Check className="w-3 h-3 mr-1" />
                            Selected
                          </>
                        ) : (
                          "Book Size"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
            <div className="text-sm text-gray-400">
              Showing {startIndex + 1}-{Math.min(endIndex, skipOptions.length)} of {skipOptions.length} skip options
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-4 py-2"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(page)}
                    className={
                      currentPage === page
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg rounded-xl w-10 h-10"
                        : "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white rounded-xl w-10 h-10"
                    }
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-4 py-2"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Enhanced Info Sections */}
        <div className="space-y-8 mb-12">
          {/* What's Included Section */}
          <div className="bg-gradient-to-r from-blue-900/20 via-blue-800/20 to-purple-900/20 rounded-3xl p-8 border border-blue-800/30 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 mb-6 sm:mb-0 shadow-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-2xl mb-6">What's Included in Every Skip Hire</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {["Free delivery and collection", "Responsible waste disposal", "Flexible hire periods"].map(
                      (item, index) => (
                        <div key={index} className="flex items-center text-blue-200 bg-blue-500/10 rounded-xl p-3">
                          <Check className="w-5 h-5 mr-4 text-blue-400" />
                          <span className="font-medium">{item}</span>
                        </div>
                      ),
                    )}
                  </div>
                  <div className="space-y-4">
                    {["Professional service guarantee", "Environmental compliance", "24/7 customer support"].map(
                      (item, index) => (
                        <div key={index} className="flex items-center text-blue-200 bg-blue-500/10 rounded-xl p-3">
                          <Check className="w-5 h-5 mr-4 text-blue-400" />
                          <span className="font-medium">{item}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Road Placement Restrictions */}
          <div className="bg-gradient-to-r from-red-900/20 via-orange-900/20 to-yellow-900/20 rounded-3xl p-8 border border-red-800/30 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 mb-6 sm:mb-0 shadow-xl">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-2xl mb-6">Important: Road Placement Guidelines</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-red-200 mb-4 text-lg">Restrictions Apply:</h4>
                    <div className="space-y-3">
                      {[
                        "Skips larger than 8 yards",
                        "Placement without permits",
                        "Blocking traffic or access",
                        "Near schools or hospitals",
                      ].map((item, index) => (
                        <div key={index} className="flex items-center text-red-200 bg-red-500/10 rounded-xl p-3">
                          <X className="w-4 h-4 mr-3 text-red-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-200 mb-4 text-lg">Alternative Options:</h4>
                    <div className="space-y-3">
                      {[
                        "Private driveways",
                        "Front gardens (with access)",
                        "Private car parks",
                        "Council permit areas",
                      ].map((item, index) => (
                        <div key={index} className="flex items-center text-green-200 bg-green-500/10 rounded-xl p-3">
                          <Check className="w-4 h-4 mr-3 text-green-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-gradient-to-r from-yellow-900/30 to-amber-900/30 rounded-2xl border border-yellow-700/30">
                  <div className="flex items-start space-x-4">
                    <Info className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-yellow-200 mb-2">Need Road Placement?</h5>
                      <p className="text-yellow-200 text-sm leading-relaxed">
                        We can help you obtain the necessary council permits. Additional charges may apply. Contact us
                        for more information about permit requirements in your area.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-500 rounded-2xl px-8 py-4 text-lg backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 mr-3" />
            Back to Waste Type
          </Button>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            {selectedSkip && (
              <div className="text-center sm:text-right bg-gray-700/30 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-sm text-gray-400 mb-1">Selected Skip</div>
                <div className="text-white font-bold text-lg">
                  {skipOptions.find((s) => s.id === selectedSkip)?.name} - £
                  {skipOptions.find((s) => s.id === selectedSkip)?.price}
                </div>
              </div>
            )}
            <Button
              size="lg"
              disabled={!selectedSkip}
              onClick={handleContinue}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 w-full sm:w-auto shadow-xl shadow-blue-600/30 disabled:shadow-none rounded-2xl px-8 py-4 text-lg font-semibold"
            >
              Continue to Permit Check
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
