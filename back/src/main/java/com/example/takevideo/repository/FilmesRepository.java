package com.example.takevideo.repository;

import com.example.takevideo.model.Filme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FilmesRepository extends JpaRepository<Filme, Long> {
    @Override
    List<Filme> findAll();
}

