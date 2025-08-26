package org.unibl.etf.huntech.models;

import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.KHasZzpEntity;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
public class ZahtjevZaPromjenuStatusa {

    private Integer id;
    private Integer korisnikIdkorisnika;
    private String obrazlozenje;
    private LocalDate datumPodnosenja;
    //private Set<KHasZzpEntity> kHasZzps = new LinkedHashSet<>();
}
