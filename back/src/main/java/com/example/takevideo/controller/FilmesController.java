package com.example.takevideo.controller;
import com.example.takevideo.model.Filme;
import com.example.takevideo.repository.FilmesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller // This means that this class is a Controller
@RequestMapping(path="/filmes") // This means URL's start with /demo (after Application path)

public class FilmesController {
    @Autowired
    private FilmesRepository filmesRepository;

    @PostMapping(value = "/salvar")
    @ResponseBody
    public ResponseEntity<Filme> salvar (@RequestBody Filme filme){
        Filme novo = filmesRepository.save(filme);
        return new ResponseEntity<>(novo, HttpStatus.CREATED);
    }

    @GetMapping(value = "/todos")
    public @ResponseBody Iterable<Filme> todosFilmes() {
        return filmesRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Filme> buscar(@PathVariable(value = "id") Long id) {
        Filme b = filmesRepository.findById(id).get();
        return ResponseEntity.ok().body(b);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Filme> deletar(@PathVariable Long id){
        Filme d = filmesRepository.findById(id).get();
        filmesRepository.delete(d);
        return ResponseEntity.ok().body(d);
    }

    @PutMapping("/{id}")
    public  ResponseEntity<Filme> alterar (@RequestBody Filme filme, @PathVariable Long id) {
        Filme altera = filmesRepository.findById(id).get();
        altera.setCodigo(filme.getCodigo());
        altera.setNome(filme.getNome());
        altera.setValorunitario(filme.getValorunitario());
        return ResponseEntity.ok(filmesRepository.save(altera));
    }

}
