package org.unibl.etf.huntech.models.requests;

import lombok.Data;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;

@Data
public class ObavjestenjaRequest {

    private Integer idKorisnika;
    private String tipObavjestenja;
    private String sadrzaj;
}

