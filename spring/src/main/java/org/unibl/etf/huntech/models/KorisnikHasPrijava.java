package org.unibl.etf.huntech.models;

import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;
import org.unibl.etf.huntech.models.entities.PrijavaEntity;

@Data
public class KorisnikHasPrijava {

    private Integer id;
    private KorisnikEntity idKorisnika;
    private PrijavaEntity idPrijave;

}
