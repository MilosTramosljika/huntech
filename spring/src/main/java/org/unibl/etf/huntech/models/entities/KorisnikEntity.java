package org.unibl.etf.huntech.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.unibl.etf.huntech.base.BaseEntity;

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

    @JsonIgnore
    @OneToMany(mappedBy = "idKorisnika")
    private Set<KHasZarEntity> kHasZars = new LinkedHashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "idKorisnika")
    private Set<KHasZzpEntity> kHasZzps = new LinkedHashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "idKorisnika")
    private Set<KomentarEntity> komentars = new LinkedHashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "idKorisnika")
    private Set<KorisnikHasGrupaEntity> korisnikHasGrupas = new LinkedHashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "idKorisnika")
    private Set<KorisnikHasKonverzacijaEntity> korisnikHasKonverzacijas = new LinkedHashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "idKorisnika")
    private Set<KorisnikHasPrijavaEntity> korisnikHasPrijavas = new LinkedHashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "idKorisnika")
    private Set<KorisnikHasUlogaEntity> korisnikHasUlogas = new LinkedHashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "idKorisnika")
    private Set<ObavjestenjaEntity> obavjestenjas = new LinkedHashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "idKorisnika")
    private Set<ObjavaEntity> objavas = new LinkedHashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "idKorisnika")
    private Set<ObjavaNaLovackiDnevnikEntity> objavaNaLovackiDnevniks = new LinkedHashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "idKorisnika")
    private Set<PorukaEntity> porukas = new LinkedHashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "idKorisnikaKojiPrijavljuje")
    private Set<PrijavaEntity> prijavas = new LinkedHashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "korisnikIdkorisnika")
    private Set<ZahtjevZaPromjenuStatusaEntity> zahtjevZaPromjenuStatusas = new LinkedHashSet<>();


    @Size(max = 255)
    @Column(name = "profilna_slika_putanja")
    private String profilnaSlikaPutanja;

}