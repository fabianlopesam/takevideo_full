package com.example.takevideo.repository;

import com.example.takevideo.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ClientesRepository extends JpaRepository<Cliente, Long> {
    @Override
    List<Cliente> findAll();
}