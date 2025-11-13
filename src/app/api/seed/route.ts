import prisma from '@/src/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 
  
  await prisma.todo.deleteMany(); //delete * from todo

  await prisma.todo.createMany({
    data: [
      { description: 'Piedra del alma', complete: true },
      { description: 'Piedra del poder' },
      { description: 'Piedra del tiempo' },
      { description: 'Piedra del espacio' },
      { description: 'Piedra del realiadd' },
    ]
  });

  // const todo = await prisma.todo.create({
  //   data: { description: 'Piedra del alma'}
  // });

  return new Response(JSON.stringify({
    message: 'SEED EXECUTED'
  }), { status: 200 } );
}