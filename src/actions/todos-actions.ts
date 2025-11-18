'use server'

import { revalidatePath } from "next/cache";
import { Todo } from "../generated/prisma/client";
import prisma from "../lib/prisma";

const sleep = (seconds: number): Promise<boolean> => {
  return new Promise( res => {
    setTimeout(() => {
      res(true)
    }, seconds * 1000);
  });
}

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {

  sleep(3);

  const todo = await prisma.todo.findFirst({ where: { id }});

  if (!todo) {
    throw `todo con id ${ id } no encontrado`;
  }

  const updateTodo = await prisma.todo.update({
    where: { id },
    data: { complete }
  });

  revalidatePath('/dashboard/server-todos');
  return updateTodo;
};

export const addTodo = async (description: string)/* : Promise<Todo> */ => {

    try {

    const todo =  await prisma.todo.create({ data: {
      description,
    } });
    
    revalidatePath('/dashboard/server-todos');
    return todo;

  } catch (error) {
    return {
      message: 'Error al crear la tarea',
    }
  }
}

export const deleteCompleted= async(): Promise<void> => {
  await prisma.todo.deleteMany({
    where: {
      complete: true,
    },
  });
  revalidatePath('/dashboard/server-todos');
}