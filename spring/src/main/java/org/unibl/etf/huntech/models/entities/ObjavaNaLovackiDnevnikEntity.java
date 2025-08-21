package org.unibl.etf.huntech.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.base.BaseEntity;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
@Entity
@Table(name = "objava_na_lovacki_dnevnik")
public class ObjavaNaLovackiDnevnikEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdObjaveNaLD", nullable = false)
    private Integer id;

    @Column(name = "Datum", nullable = false)
    private Instant datum;

    @Column(name = "Sadrzaj", nullable = false, length = 400)
    private String sadrzaj;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdKorisnika", nullable = false)
    private KorisnikEntity idKorisnika;

    @OneToMany(mappedBy = "idObjaveNaLD")
    @JsonIgnore
    private Set<SlikaZaObjavuNaLdEntity> slikaZaObjavuNaLds = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idObjaveNaLD")
    @JsonIgnore
    private Set<DogadjajEntity> dogadjaj = new LinkedHashSet<>();
}