import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// This would be replaced with a database in a real application
let dogs = []

export async function POST(request) {
  try {
    const formData = await request.formData()
    const address = formData.get('address')
    const latitude = parseFloat(formData.get('latitude'))
    const longitude = parseFloat(formData.get('longitude'))
    const description = formData.get('description')
    const name = formData.get('name')
    const image = formData.get('image')

    let imageUrl

    if (image) {
      imageUrl = `/placeholder.svg?height=300&width=300`
    }

    const newDog = {
      id: uuidv4(),
      address,
      latitude,
      longitude,
      description,
      name: name || undefined,
      imageUrl,
    }

    dogs.push(newDog)

    return NextResponse.json({ success: true, dog: newDog });
  } catch (error) {
    console.error('Error in POST /api/dogs:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json(dogs);
  } catch (error) {
    console.error('Error in GET /api/dogs:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

