package com.example.testdeploy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public Todo creatTodo(Todo todo){
        return todoRepository.save(todo);
    }
    public List<Todo> getAllTodos(){
        return todoRepository.findAll();
    }
}
