package org.unibl.etf.huntech.models;

import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.KonverzacijaEntity;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;

@Data
public class KorisnikHasKonverzacija {

    private Integer id;
    private KorisnikEntity idKorisnika;
    private KonverzacijaEntity idKonverzacije;
}
