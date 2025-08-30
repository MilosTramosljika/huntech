package org.unibl.etf.huntech.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.unibl.etf.huntech.base.BaseEntity;
import org.unibl.etf.huntech.models.enums.Uloga;

import java.util.LinkedHashSet;
import java.util.Set;


@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
@Entity
@Table(name = "korisnik")
public class KorisnikEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdKorisnika", nullable = false)
    private Integer id;

    @Column(name = "Ime", nullable = false, length = 45)
    private String ime;

    @Column(name = "Prezime", nullable = false, length = 45)
    private String prezime;

    @Column(name = "Username", nullable = false, length = 45)
    private String username;

    @Column(name = "Mail", nullable = false, length = 45)
    private String mail;

    @Column(name = "Lozinka", nullable = false, length = 45)
    private String lozinka;


    @OneToMany(mappedBy = "idKorisnika")
    @JsonIgnore
    private Set<KHasZarEntity> kHasZars = new LinkedHashSet<>();


    @OneToMany(mappedBy = "idKorisnika")
    @JsonIgnore
    private Set<KHasZzpEntity> kHasZzps = new LinkedHashSet<>();


    @OneToMany(mappedBy = "idKorisnika")
    @JsonIgnore
    private Set<KomentarEntity> komentars = new LinkedHashSet<>();


    @OneToMany(mappedBy = "idKorisnika")
    @JsonIgnore
    private Set<KorisnikHasGrupaEntity> korisnikHasGrupas = new LinkedHashSet<>();


    @OneToMany(mappedBy = "idKorisnika")
    @JsonIgnore
    private Set<KorisnikHasKonverzacijaEntity> korisnikHasKonverzacijas = new LinkedHashSet<>();


    @OneToMany(mappedBy = "idKorisnika")
    @JsonIgnore
    private Set<KorisnikHasPrijavaEntity> korisnikHasPrijavas = new LinkedHashSet<>();


    @OneToMany(mappedBy = "idKorisnika")
    @JsonIgnore
    private Set<ObavjestenjaEntity> obavjestenjas = new LinkedHashSet<>();


    @OneToMany(mappedBy = "idKorisnika")
    @JsonIgnore
    private Set<ObjavaEntity> objavas = new LinkedHashSet<>();


    @OneToMany(mappedBy = "idKorisnika")
    @JsonIgnore
    private Set<ObjavaNaLovackiDnevnikEntity> objavaNaLovackiDnevniks = new LinkedHashSet<>();


    @OneToMany(mappedBy = "idKorisnika")
    @JsonIgnore
    private Set<PorukaEntity> porukas = new LinkedHashSet<>();


    @OneToMany(mappedBy = "idKorisnikaKojiPrijavljuje")
    @JsonIgnore
    private Set<PrijavaEntity> prijavas = new LinkedHashSet<>();


    @OneToMany(mappedBy = "korisnikIdkorisnika")
    @JsonIgnore
    private Set<ZahtjevZaPromjenuStatusaEntity> zahtjevZaPromjenuStatusas = new LinkedHashSet<>();

    @Size(max = 500)
    @Column(name = "Slika", nullable = false, length = 500)
    private String slika;

    @Enumerated(EnumType.STRING)
    @Column(name = "Uloga")
    private Uloga uloga = Uloga.NEVERIFIKOVANI;

}