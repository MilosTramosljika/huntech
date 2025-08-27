package org.unibl.etf.huntech.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
//import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.unibl.etf.huntech.base.BaseEntity;
import org.unibl.etf.huntech.models.enums.TipObjave;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
@Entity
@Table(name = "objava")
public class ObjavaEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdObjave", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdGrupe", nullable = false)
    private GrupaEntity idGrupe;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdKorisnika", nullable = false)
    private KorisnikEntity idKorisnika;

    //@Lob
    @Enumerated(EnumType.STRING)
    @Column(name = "TipObjave", nullable = false)
    private TipObjave tipObjave;

    @Column(name = "DatumObjavljivanja", nullable = false)
    private LocalDateTime datumObjavljivanja;

    @Column(name = "Lajk", nullable = false)
    private Integer lajk;

    @Column(name = "Dislajk", nullable = false)
    private Integer dislajk;

    @OneToMany(mappedBy = "idObjave")
    @JsonIgnore
    private Set<KomentarEntity> komentars = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idObjave")
    @JsonIgnore
    private Set<SlikaZaObjavuEntity> slikaZaObjavus = new LinkedHashSet<>();

    @Size(max = 200)
    @Column(name = "NazivObjave", length = 200)
    private String nazivObjave;

    @Size(max = 1000)
    @NotNull
    @Column(name = "Sadrzaj", nullable = false, length = 1000)
    private String sadrzaj;

//    @Size(max = 1000)
//    @NotNull
//    @Column(name = "Sadrzaj", nullable = false, length = 1000)
//    private String sadrzaj;

}