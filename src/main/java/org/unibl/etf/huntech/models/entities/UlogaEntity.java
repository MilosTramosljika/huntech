package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "uloga")
public class UlogaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdUloge", nullable = false)
    private Integer id;

    @Lob
    @Column(name = "NazivUloge", nullable = false)
    private String nazivUloge;

    @OneToMany(mappedBy = "idUloge")
    private Set<KorisnikHasUlogaEntity> korisnikHasUlogas = new LinkedHashSet<>();

}