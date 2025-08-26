package org.unibl.etf.huntech.models.requests;

import lombok.Data;

@Data
public class KomentarRequest {
    private Integer id;
    private Integer idObjave;
    private String sadrzaj;
    private Integer idKorisnika;
}
