import prisma from '@/src/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 
  
  const todo = await prisma.todo.create({
    data: { description: 'Piedra del alma'}
  });

  console.log(todo);
  

  return new Response(JSON.stringify({
    message: 'SEED EXECUTED'
  }), { status: 200 } );
}