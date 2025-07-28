package org.unibl.etf.huntech.models;

import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;
import org.unibl.etf.huntech.models.entities.ZahtjevZaRegistracijuEntity;

@Data
public class KHasZar {


    private Integer id;
    private KorisnikEntity idKorisnika;
    private ZahtjevZaRegistracijuEntity idZahtjeva;
}
