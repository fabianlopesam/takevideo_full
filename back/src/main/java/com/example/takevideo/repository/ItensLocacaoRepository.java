package com.example.takevideo.repository;
import com.example.takevideo.model.ItemLocacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ItensLocacaoRepository extends JpaRepository<ItemLocacao, Long> {

    @Override
    List<ItemLocacao> findAll();

}