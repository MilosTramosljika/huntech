package org.unibl.etf.huntech.models;

import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;

@Data
public class Obavjestenja {

    private Integer id;
    private KorisnikEntity idKorisnika;
    private String tipObavjestenja;
    private String sadrzaj;
}
