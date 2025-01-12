import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { DogInfo } from '../../types'

// This would be replaced with a database in a real application
let dogs: DogInfo[] = []

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const latitude = parseFloat(formData.get('latitude') as string)
  const longitude = parseFloat(formData.get('longitude') as string)
  const description = formData.get('description') as string
  const name = formData.get('name') as string
  const image = formData.get('image') as File | null

  let imageUrl: string | undefined

  if (image) {
    // In a real application, you would upload this to a cloud storage service
    // and get back a URL. For now, we'll just pretend we did that.
    imageUrl = `/placeholder.svg?height=300&width=300`
  }

  const newDog: DogInfo = {
    id: uuidv4(),
    latitude,
    longitude,
    description,
    name: name || undefined,
    imageUrl,
  }

  dogs.push(newDog)

  return NextResponse.json({ success: true, dog: newDog })
}

export async function GET() {
  return NextResponse.json(dogs)
}

