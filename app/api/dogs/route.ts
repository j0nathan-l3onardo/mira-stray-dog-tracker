import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { DogInfo } from '../../types'

// This would be replaced with a database in a real application
let dogs: DogInfo[] = []

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const address = formData.get('address') as string
    const latitude = parseFloat(formData.get('latitude') as string)
    const longitude = parseFloat(formData.get('longitude') as string)
    const description = formData.get('description') as string
    const name = formData.get('name') as string
    const image = formData.get('image') as File | null

    let imageUrl: string | undefined

    if (image) {
      imageUrl = `/placeholder.svg?height=300&width=300`
    }

    const newDog: DogInfo = {
      id: uuidv4(),
      address,
      latitude,
      longitude,
      description,
      name: name || undefined,
      imageUrl,
    }

    dogs.push(newDog)

    return NextResponse.json({ success: true, dog: newDog })
  } catch (error) {
    console.error('Error in POST /api/dogs:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    return NextResponse.json(dogs)
  } catch (error) {
    console.error('Error in GET /api/dogs:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

