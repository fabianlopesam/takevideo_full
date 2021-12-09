package com.example.takevideo.controller;
import com.example.takevideo.model.Cliente;
import com.example.takevideo.model.Locacao;
import com.example.takevideo.repository.ClientesRepository;
import com.example.takevideo.repository.LocacoesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@Controller // This means that this class is a Controller
@RequestMapping(path="/locacoes") // This means URL's start with /demo (after Application path)

public class LocacoesController {

    @Autowired
    private LocacoesRepository locacoesRepository;

    @Autowired
    private ClientesRepository clientesRepository;

    @PostMapping(value = "/salvar")
    public ResponseEntity<Locacao> salvar (@RequestBody Locacao locacao){

        locacao.setValorlocacao( BigDecimal.ZERO );


        locacao.getItens().forEach( item -> {

            item.setLocacao(locacao);
            item.setValoritem(item.getFilme().getValorunitario().multiply(new BigDecimal(item.getQuantidade())));
            locacao.setValorlocacao(locacao.getValorlocacao().add(item.getValoritem()));

        });

        Locacao nova = locacoesRepository.save(locacao);

        return new ResponseEntity<>(nova, HttpStatus.CREATED);
    }

    @GetMapping(value = "/todos")
    public @ResponseBody Iterable<Locacao> todasLocacoes() {
        return locacoesRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Locacao> buscar(@PathVariable(value = "id") Long id) {
        Locacao b = locacoesRepository.findById(id).get();
        return ResponseEntity.ok().body(b);
    }

    @GetMapping("/cliente/{idCliente}")
    public ResponseEntity<List<Locacao>> buscarPorCliente(@PathVariable(value = "idCliente") Long idCliente) {
        Cliente cliente = clientesRepository.findById(idCliente).get();
        List<Locacao> b = locacoesRepository.findByCliente(cliente);
        return ResponseEntity.ok().body(b);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Locacao> deletar(@PathVariable Long id){
        Locacao d = locacoesRepository.findById(id).get();
        locacoesRepository.delete(d);
        return ResponseEntity.ok().body(d);
    }

    @PutMapping("/{id}")
    public  ResponseEntity<Locacao> alterar (@RequestBody Locacao locacao, @PathVariable Long id) {

        Locacao altera = locacoesRepository.findById(id).get();
        altera.setValorlocacao(BigDecimal.ZERO);
        altera.setDatalocacao(locacao.getDatalocacao());
        altera.setDatadevolucao(locacao.getDatadevolucao());
        altera.setCliente(locacao.getCliente());
        altera.setItens(locacao.getItens());

        altera.getItens().forEach(item -> {
            item.setLocacao(altera);
            item.setValoritem(item.getFilme().getValorunitario().multiply(new BigDecimal(item.getQuantidade())));
            altera.setValorlocacao(altera.getValorlocacao().add(item.getValoritem()));
        });

        //return ResponseEntity.ok(locacoesRepository.save(altera));
        return ResponseEntity.ok(altera);
    }

    @PutMapping("/devolucao/{id}")
    public  ResponseEntity<Locacao> devolver (@RequestBody Locacao locacao, @PathVariable Long id) {
        Locacao altera = locacoesRepository.findById(id).get();
        altera.setDatalocacao(locacao.getDatalocacao());
        altera.setDatadevolucao(locacao.getDatadevolucao());
        return ResponseEntity.ok(locacoesRepository.save(altera));
    }

}
