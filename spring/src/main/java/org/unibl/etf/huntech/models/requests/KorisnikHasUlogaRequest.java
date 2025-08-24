package org.unibl.etf.huntech.models.requests;

import lombok.Data;

import java.time.LocalDate;

@Data
public class KorisnikHasUlogaRequest {
    private Integer id;
    private Integer idKorisnika;
    private Integer idUloge;
    private LocalDate datumDobijanjaUloge;
}
