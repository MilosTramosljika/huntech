package org.unibl.etf.huntech.models;

import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.GrupaEntity;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;

import java.time.LocalDate;

@Data
public class KorisnikHasGrupa {

    private Integer id;
    private KorisnikEntity idKorisnika;
    private GrupaEntity idGrupe;
    private String statusZaClanstvo;
    private LocalDate datumUclanjivanja;
    private String tipZahtjeva;
}
