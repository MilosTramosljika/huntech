package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.unibl.etf.huntech.base.BaseEntity;

@Data
@Entity
@Table(name = "lokacija")
public class LokacijaEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdLokacije", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdGrupe", nullable = false)
    private GrupaEntity idGrupe;

    @Column(name = "GeografskaSirina", nullable = false)
    private Double geografskaSirina;

    @Column(name = "GeografskaDuzina", nullable = false)
    private Double geografskaDuzina;

}