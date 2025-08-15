package org.unibl.etf.huntech.models.requests;

import lombok.Data;

@Data
public class KomentarRequest {

    private Integer idObjave;
    private Integer idKorisnika;
    private String sadrzaj;
}
