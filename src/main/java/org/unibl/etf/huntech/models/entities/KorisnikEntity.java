package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "korisnik")
public class KorisnikEntity {
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
    private Set<KHasZarEntity> kHasZars = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idKorisnika")
    private Set<KHasZzpEntity> kHasZzps = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idKorisnika")
    private Set<KomentarEntity> komentars = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idKorisnika")
    private Set<KorisnikHasGrupaEntity> korisnikHasGrupas = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idKorisnika")
    private Set<KorisnikHasKonverzacijaEntity> korisnikHasKonverzacijas = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idKorisnika")
    private Set<KorisnikHasPrijavaEntity> korisnikHasPrijavas = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idKorisnika")
    private Set<KorisnikHasUlogaEntity> korisnikHasUlogas = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idKorisnika")
    private Set<ObavjestenjaEntity> obavjestenjas = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idKorisnika")
    private Set<ObjavaEntity> objavas = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idKorisnika")
    private Set<ObjavaNaLovackiDnevnikEntity> objavaNaLovackiDnevniks = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idKorisnika")
    private Set<PorukaEntity> porukas = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idKorisnikaKojiPrijavljuje")
    private Set<PrijavaEntity> prijavas = new LinkedHashSet<>();

    @OneToMany(mappedBy = "korisnikIdkorisnika")
    private Set<ZahtjevZaPromjenuStatusaEntity> zahtjevZaPromjenuStatusas = new LinkedHashSet<>();

}