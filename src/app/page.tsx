'use client'

import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Calendar, ChevronRight, Lightbulb, Plus } from "lucide-react"
import Link from "next/link"
import { EventCard } from "../components/event-card"
import { useQuery } from "@tanstack/react-query"
import { Event, Request } from "../types"
import { RequestCard } from "@/components/request-card"

// // Mock data for events and requests
// const events = [
//   { id: 1, title: "Community Clean-up Day", description: "Join us for a day of community service and beautification. We'll be cleaning up local parks and streets to make our city look its best.", date: "2024-03-15" },
//   { id: 2, title: "Town Hall Meeting", description: "Have your voice heard at our town hall meeting. This is your chance to discuss local issues and share your ideas with elected officials.", date: "2024-03-20" },
//   { id: 3, title: "Local Art Festival", description: "Experience the creativity of our community at our annual art festival. Enjoy live music, art demonstrations, and a chance to purchase local artwork.", date: "2024-04-01" },
//   { id: 4, title: "Tech Startup Showcase", description: "Learn about the latest innovations in technology from our local startups. This event is a great opportunity to network with industry leaders and potential investors.", date: "2024-04-15" },
//   { id: 5, title: "Green Energy Workshop", description: "Discover how you can reduce your carbon footprint and save money by switching to green energy. This workshop will cover the latest technologies and incentives available.", date: "2024-04-22" },
// ] as Event[]

// const requests = [
//   { id: 1, title: "Add more bike lanes", votes: 15 },
//   { id: 2, title: "Expand community gardens", votes: 10 },
//   { id: 3, title: "Improve public transportation", votes: 20 },
// ]

const fetchEvents = async (): Promise<Event[]> => {
  const res = await fetch('/api/events')
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  return res.json()
}

const fetchRequests = async (): Promise<Request[]> => {
  const res = await fetch('/api/requests')
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  return res.json()
}

export default function HomePage() {

  const { data: events } = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: fetchEvents,
  })

  const { data: requests } = useQuery<Request[]>({
    queryKey: ['requests'],
    queryFn: fetchRequests,
  })

  return (
    <main className="flex-1">
      <div className="container max-w-7xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Austin Civic Impact Platform</h1>
        <section className="mb-12">
          <div className="text-2xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <Calendar size={32} />
            <h2>Upcoming Events</h2>
            <Button variant="link" size="sm" className="text-gray-500" asChild>
              <Link href="/events">View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {events?.map((event) => (
                <CarouselItem key={event.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <EventCard event={event} variant="compact" showAttendButton={false} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-semibold text-gray-700 flex items-center gap-2 align-middle">
              <Lightbulb size={32} />
              <h2>Community Requests</h2>
              <Button variant="link" size="sm" className="text-gray-500" asChild>
                <Link href="/requests">View All
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <Button asChild size="sm" className="bg-gradient-to-r from-primary to-secondary text-white">
              <Link href="/submit" className="flex items-center gap-2">
                Submit Request
                <Plus className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            {requests?.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

