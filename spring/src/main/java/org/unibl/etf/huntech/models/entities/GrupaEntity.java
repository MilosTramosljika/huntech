package org.unibl.etf.huntech.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.unibl.etf.huntech.base.BaseEntity;

import java.util.LinkedHashSet;
import java.util.Set;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
@Entity
@Table(name = "grupa")
public class GrupaEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdGrupe", nullable = false)
    private Integer id;

    @Column(name = "NazivGrupe", nullable = false, length = 100)
    private String nazivGrupe;

    @Column(name = "Opis", nullable = false, length = 500)
    private String opis;

    @Size(max = 500)
    @Column(name = "Slika", nullable = false)
    private String slika;

    @OneToMany(mappedBy = "idGrupe")
    private Set<AktivnostDivljaciEntity> aktivnostDivljacis = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idGrupe")
    private Set<KorisnikHasGrupaEntity> korisnikHasGrupas = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idGrupe")
    private Set<LokacijaEntity> lokacijas = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idGrupe")
    private Set<ObjavaEntity> objavas = new LinkedHashSet<>();

}