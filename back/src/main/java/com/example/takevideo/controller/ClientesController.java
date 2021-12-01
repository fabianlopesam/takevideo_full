package com.example.takevideo.controller;
import com.example.takevideo.model.Cliente;
import com.example.takevideo.repository.ClientesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(origins = "http://localhost:4200; http://localhost:8080")

@Controller // This means that this class is a Controller
@RequestMapping(path="/clientes") // This means URL's start with /demo (after Application path)

public class ClientesController {
    @Autowired
    private ClientesRepository clientesRepository;

    @PostMapping(value = "/salvar")
    @ResponseBody
    public ResponseEntity<Cliente> salvar (@RequestBody Cliente cliente){
        Cliente novo = clientesRepository.save(cliente);
        return new ResponseEntity<>(novo, HttpStatus.CREATED);
    }

    @GetMapping(value = "/todos")
    public @ResponseBody Iterable<Cliente> todosClientes() {
        return clientesRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscar(@PathVariable(value = "id") Long id) {
        Cliente b = clientesRepository.findById(id).get();
        return ResponseEntity.ok().body(b);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Cliente> deletar(@PathVariable Long id){
        Cliente d = clientesRepository.findById(id).get();
        clientesRepository.delete(d);
        return ResponseEntity.ok().body(d);
    }

    @PutMapping("/{id}")
    public  ResponseEntity<Cliente> alterar (@RequestBody Cliente cliente, @PathVariable Long id) {
        Cliente altera = clientesRepository.findById(id).get();
        altera.setCodigo(cliente.getCodigo());
        altera.setNome(cliente.getNome());
        return ResponseEntity.ok(clientesRepository.save(altera));
    }

}
