package org.unibl.etf.huntech.models.requests;


import lombok.Data;
import org.unibl.etf.huntech.models.enums.StatusZaClanstvo;

import java.time.LocalDate;

@Data
public class KorisnikHasGrupaRequest {
    private Integer id;
    private Integer idKorisnika;
    private Integer idGrupe;
    private StatusZaClanstvo statusZaClanstvo;
    private LocalDate datumUclanjivanja;
}
