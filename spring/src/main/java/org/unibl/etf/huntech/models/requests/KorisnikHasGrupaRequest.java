package org.unibl.etf.huntech.models.requests;


import lombok.Data;

import java.time.LocalDate;

@Data
public class KorisnikHasGrupaRequest {
    private Integer id;
    private Integer idKorisnika;
    private Integer idGrupe;
    private String statusZaClanstvo;
    private LocalDate datumUclanjivanja;
    private Byte poslatPozivOdDirektora;
}
