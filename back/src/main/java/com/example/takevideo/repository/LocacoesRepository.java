package com.example.takevideo.repository;

import com.example.takevideo.model.Cliente;
import com.example.takevideo.model.Locacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LocacoesRepository extends JpaRepository<Locacao, Long> {
    @Override
    List<Locacao> findAll();

    List<Locacao> findByCliente(Cliente cliente);


}