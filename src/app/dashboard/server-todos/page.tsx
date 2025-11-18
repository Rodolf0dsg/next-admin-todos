// export const dynamic = 'auto'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
// export const revalidate = false
// false | 0 | number

import prisma from "@/src/lib/prisma";
import { NewTodo, TodosGrid } from "@/src/todos";
import { Metadata } from "next";


export const metadata: Metadata = {
 title: 'Todo List',
 description: 'Todo List',
};

export default async function ServerTodosPage() {

  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' }});

  return (
    <>
      <span className="text-3xl mb-10">Server actions</span>

      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      
      <TodosGrid todos={ todos }/>
    </>
  );
}