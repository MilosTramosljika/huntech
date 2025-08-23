package org.unibl.etf.huntech.models;


import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.ObjavaNaLovackiDnevnikEntity;

import java.time.Instant;

@Data
public class SlikaZaObjavuNaLd {
    private Integer id;
    private Instant datum;
    private String slika;
    private Integer idObjaveNaLD;
}
