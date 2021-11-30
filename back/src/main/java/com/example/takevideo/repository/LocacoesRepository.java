package com.example.takevideo.repository;

import com.example.takevideo.model.Locacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface LocacoesRepository extends JpaRepository<Locacao, Long> {

    @Override
    List<Locacao> findAll();
}