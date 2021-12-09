package com.example.takevideo.model;

import javax.persistence.*;
import java.math.BigDecimal;

@Table(name = "filmes")
@Entity
public class Filme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String codigo;

    private String nome;

    private BigDecimal valorunitario;




    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {

        this.codigo = codigo;
    }

    public String getNome() {

        return nome;
    }

    public void setNome(String nome) {

        this.nome = nome;
    }

    public BigDecimal getValorunitario() {
        return valorunitario;
    }
      public void  setValorunitario(BigDecimal valorunitario) {

        this.valorunitario = valorunitario;
    }


}