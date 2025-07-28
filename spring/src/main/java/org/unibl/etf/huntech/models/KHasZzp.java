package org.unibl.etf.huntech.models;

import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;
import org.unibl.etf.huntech.models.entities.ZahtjevZaPromjenuStatusaEntity;

import java.time.LocalDate;

@Data
public class KHasZzp {

    private Integer id;
    private KorisnikEntity idKorisnika;
    private ZahtjevZaPromjenuStatusaEntity idZahtjevaZaPromjenuStatusa;
    private LocalDate datumObrade;

}
