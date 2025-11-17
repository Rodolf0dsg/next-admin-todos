import { Todo } from "@/src/generated/prisma/client";

const sleep = (seconds: number): Promise<boolean> => {
  return new Promise( res => {
    setTimeout(() => {
      res(true)
    }, seconds * 1000);
  });
}

export const updateTodo = async( id: string, complete: boolean): Promise<Todo> => {

  await sleep(2);
  const body = { complete };

  const todo = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify( body ),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then( res => res.json() );

  return todo;

};

export const createTodo = async( desc: string ): Promise<Todo> => {

  await sleep(2);
  const body = { description: desc };

  const todo = await fetch(`/api/todos`, {
    method: 'POST',
    body: JSON.stringify( body ),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then( res => res.json() );
  
  console.log({ todo });
  
  return todo;

};

export const deleteCompleted = async( ): Promise<boolean> => {

  const todo = await fetch(`/api/todos`, {
    method: 'DELETE',
  })
  .then( res => res.json() );
  
  console.log({ todo });

  return true;
};