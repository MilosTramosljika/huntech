package org.unibl.etf.huntech.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.KonverzacijaEntity;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;


import java.time.Instant;

@Data
public class Poruka {

    private Integer id;
    private String sadrzaj;
    private Instant datumSlanja;
    private Integer idKorisnika;
    private Integer idKonverzacije;

}
