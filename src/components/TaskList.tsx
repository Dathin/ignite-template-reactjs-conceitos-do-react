import React, {useState} from 'react'

import '../styles/tasklist.scss'

import {FiCheckSquare, FiTrash} from 'react-icons/fi'
import {getNextValue} from "./Sequence";

interface Task {
    id: number;
    title: string;
    isComplete: boolean;
}

export function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

        function handleCreateNewTask(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (newTaskTitle.length) {
            appendNewTask();
        }
    }

    function appendNewTask() {
        const newTask = {
            id: getNextValue(),
            title: newTaskTitle,
            isComplete: false
        }
        setNewTaskTitle('');
        setTasks([...tasks, newTask]);
    }

    function handleToggleTaskCompletion(id: number) {
        const currentTasks = tasks.map(task => {
            return {
                ...task,
                isComplete: task.id !== id ? task.isComplete : !task.isComplete
            }
        })
        setTasks(currentTasks);
    }

    function handleRemoveTask(id: number) {
        const currentTasks = tasks.filter(task => task.id !== id);
        setTasks(currentTasks);
    }


    return (
        <section className="task-list container">
            <header>
                <h2>Minhas tasks</h2>
                <form>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Adicionar novo todo"
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            value={newTaskTitle}
                        />
                        <button type="submit" data-testid="add-task-button" onClick={event => handleCreateNewTask(event)}>
                            <FiCheckSquare size={16} color="#fff"/>
                        </button>
                    </div>
                </form>
            </header>

            <main>
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <div className={task.isComplete ? 'completed' : ''} data-testid="task">
                                <label className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        readOnly
                                        checked={task.isComplete}
                                        onClick={() => handleToggleTaskCompletion(task.id)}
                                    />
                                    <span className="checkmark"/>
                                </label>
                                <p>{task.title}</p>
                            </div>

                            <button className="invalid" type="button" data-testid="remove-task-button"
                                    onClick={() => handleRemoveTask(task.id)}>
                                <FiTrash size={16}/>
                            </button>
                        </li>
                    ))}

                </ul>
            </main>
        </section>
    )
}
