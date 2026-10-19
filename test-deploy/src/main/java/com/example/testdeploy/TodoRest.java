package com.example.testdeploy;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:4200")
public class TodoRest {
    private TodoService todoService;

    public TodoRest(TodoService todoService) {
        this.todoService = todoService;
    }
    @PostMapping("/saveTodo")
    public Todo creteTodo(@RequestBody Todo todo){
        return todoService.creatTodo(todo);
    }
    @GetMapping("/getAll")
    public List<Todo> getAll(){
        return todoService.getAllTodos();
    }

}
