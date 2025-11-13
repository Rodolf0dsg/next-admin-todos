
import { Todo } from '@/src/generated/prisma/client';
import prisma from '@/src/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

interface Segments {
  params: {
    id: string;
  }
}

const getTodo = async( id: string ):Promise<Todo | null> => {

  const todo = await prisma.todo.findUnique({
    where: {
      id
    }
  });

  return todo;

}

export async function GET(request: Request, { params }: Segments ) { 

  const { id } = await params;

  const todo = await getTodo( id );

  if( !todo ){
    return NextResponse.json({
      message: `todo with id ${ id } not found`
    }, {
      status: 400,
    });
  }

  return NextResponse.json(todo, { status: 200 } );
};

const putSchema = yup.object({
  complete:    yup.boolean().optional(),
  description: yup.string().optional(),
})

export async function PUT(request: Request, { params }: Segments) {
  
  const { id } = await params;

  const todo = await prisma.todo.findUnique({
    where: {
      id
    }
  });

  if( !todo ){
    return NextResponse.json({
      message: `todo with id ${ id } not found`
    }, {
      status: 400,
    });
  };


  try {
    const { complete, description } = await putSchema.validate(await request.json());

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        complete, 
        description,
      }
    });

    return new Response(JSON.stringify({
      updatedTodo
    }), { status: 200 } );

  } catch (error) {

    return new Response(JSON.stringify( error ), { status: 400 } );

  }

}