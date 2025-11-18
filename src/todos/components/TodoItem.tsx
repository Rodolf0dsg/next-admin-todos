'use client';
import { Todo } from "@/src/generated/prisma/client";
import styles from './TodoItem.module.css';
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { startTransition, useOptimistic } from "react";

interface Props {
  todo: Todo;

  //acciones que quiero llamar
  toggleTodo: (id: string, complete: boolean) => Promise<Todo|void>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {

  const [ todoOptimistic, toggleTodoOptimistic ] = useOptimistic(todo,
    ( state, newCompleteValue: boolean) => ({ ...state, complete: newCompleteValue }),
  );

  const onToggleTodo = async() => {
    try {
      startTransition(() => toggleTodoOptimistic( !todoOptimistic ));
      await toggleTodo( todoOptimistic.id, !todoOptimistic.complete );
    } catch(err) {
      startTransition(() => (toggleTodoOptimistic( !todoOptimistic )))
    }
  }

  return (
    <div 
      // onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.complete) }
      onClick={ onToggleTodo }
      className={ todoOptimistic.complete ? styles.todoDone : styles.todoPending }
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div className={`
          flex p-2 rounded-md cursor-pointer
          hover:bg-opacity-60
          bg-blue-100
          ${ todoOptimistic.complete ? 'bg-blue-100' : 'bg-red-100'}
          `}>
            {
              todoOptimistic.complete
                ? <IoCheckboxOutline size={30} className="text-black"/>
                : <IoSquareOutline size={30} className="text-black"/>
            }
            
        </div>

        <div className="text-center sm:text-left text-black">
          { todoOptimistic.description }
        </div>

      </div>
    </div>
  )
}
