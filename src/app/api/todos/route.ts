import prisma from '@/src/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

export async function GET(request: Request) { 

  const { searchParams } = new URL( request.url );
  const take = Number(searchParams.get('take') ?? '10');
  const skip = Number(searchParams.get('skip') ?? '0');

  if( isNaN( take ) ) {
    return NextResponse.json({
      message: 'el parametro take tiene q ser numero'
    }, {
      status: 400,
    });
  }
    if( isNaN( skip ) ) {
    return NextResponse.json({
      message: 'el parametro skip tiene q ser numero'
    }, {
      status: 400,
    });
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
  });

  return new Response(JSON.stringify( todos), { 
    status: 200 
  });
};

const postSchema = yup.object({
  description: yup.string().required(),
  complete:    yup.boolean().optional().default(false),
})

export async function POST(request: Request) { 
  try {

    const { complete, description } = await postSchema.validate( await request.json() );
    const todo =  await prisma.todo.create({ data: {
      complete,
      description,
    } });
    return NextResponse.json( todo )

  } catch (error) {
    return NextResponse.json( error, { status: 400 } );
  }
}


export async function PUT(request: Request) { 

  return new Response(JSON.stringify({
    message: 'Hello World'
  }), { status: 200 } );
};